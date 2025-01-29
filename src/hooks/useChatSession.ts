import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

type Gender = 'male' | 'female' | 'unisex';

interface Message {
  role: string;
  content: string;
  chatRound: number;
  imageNumber: number;
  gender: Gender;
}
interface CompleteRequest {
  user_id: string;
  messages: Message[];
  timestamp: string;
  gender: Gender;
}

interface UseChatSessionParams {
  imageCount: number;
  gender: Gender;
}

export function useChatSession({ imageCount, gender }: UseChatSessionParams) {
  const [currentImage, setCurrentImage] = useState(1);
  const [chatRound, setChatRound] = useState(0);
  const [showBrainstorming, setShowBrainstorming] = useState(true);
  const [showCompletion, setShowCompletion] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const url = process.env.NODE_ENV === 'development' 
    ? 'http://localhost:8000'
    : 'https://the-end-of-2024-38ff56ee0179.herokuapp.com';

  const { user } = useAuth();

  const CHAT_ROUNDS = 3;

  const generateResponse = async (newMessages: Message[]) => {
    try {
      const response = await fetch(url + '/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: newMessages,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate response');
      }

      const data = await response.json();
      return data.reply;
    } catch (error) {
      console.error('Error generating response:', error);
      return 'すみません、エラーが発生しました。もう一度お試しください。';
    }
  };

  const createMessage = (role: 'user' | 'assistant', content: string) => ({
    role,
    content,
    chatRound,
    imageNumber: currentImage,
    gender
  });

  const handleChatRoundCompletion = async (newMessages: Message[]) => {
    await Promise.resolve(setMessages(newMessages));
    
    if (currentImage < imageCount) {
      setCurrentImage(currentImage + 1);
      setChatRound(0);
      setShowBrainstorming(true);
      return;
    }

    await handleFinalCompletion(newMessages);
  };

  const handleFinalCompletion = async (messages: Message[]) => {
    const completionData: CompleteRequest = {
      user_id: user?.id || '',
      messages,
      timestamp: new Date().toISOString(),
      gender
    };

    try {
      setIsCompleting(true);
      await fetch(url + '/complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(completionData),
      });
    } catch (error) {
      console.error('Error sending completion data:', error);
    } finally {
      setIsCompleting(false);
      setShowCompletion(true);
    }
  };

  const handleUserMessage = async (content: string) => {
    setIsLoading(true);
    try {
      const newMessages = [
        ...messages,
        createMessage('user', content)
      ];
      setMessages(newMessages);

      if (chatRound < CHAT_ROUNDS) {
        const response = await generateResponse(newMessages);
        newMessages.push(createMessage('assistant', response));
        setMessages(newMessages);
        setChatRound(chatRound + 1);
      } else {
        await handleChatRoundCompletion(newMessages);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    currentImage,
    showBrainstorming,
    showCompletion,
    isCompleting,
    isLoading,
    messages,
    handleUserMessage,
    setShowBrainstorming
  };
}
