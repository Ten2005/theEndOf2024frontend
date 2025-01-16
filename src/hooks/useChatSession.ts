import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface Message {
  role: string;
  content: string;
  chatRound: number;
  imageNumber: number;
}

// Add interface for completion request to match Python model
interface CompleteRequest {
  user_id: string;  // Make this required to match Python model
  messages: Message[];
  timestamp: string;
}

export function useChatSession(imageCount: number) {
  const [currentImage, setCurrentImage] = useState(1);
  const [chatRound, setChatRound] = useState(0);
  const [showBrainstorming, setShowBrainstorming] = useState(true);
  const [showCompletion, setShowCompletion] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
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

  const handleUserMessage = async (content: string) => {
    const newMessages = [
      ...messages,
      { role: 'user', content, chatRound: chatRound, imageNumber: imageCount }
    ];

    setMessages(newMessages);

    if (chatRound < CHAT_ROUNDS) {
      const response = await generateResponse(newMessages);
      // AIの応答を追加
      newMessages.push({
        role: 'assistant',
        content: response,
        chatRound: chatRound,
        imageNumber: imageCount
      });
      setMessages(newMessages);
      setChatRound(chatRound + 1);
    } else {
      await Promise.resolve(setMessages(newMessages));
      // 3往復完了後
      if (currentImage < imageCount) {
        setCurrentImage(currentImage + 1);
        setChatRound(0);
        setShowBrainstorming(true);
      } else {
        // すべての画像セッション完了
        const completionData: CompleteRequest = {
          user_id: user?.id || '',  // Add fallback for type safety
          messages: newMessages,
          timestamp: new Date().toISOString()
        };
        console.log(completionData);
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
        }
        setIsCompleting(false);
        setShowCompletion(true);
      }
      return;
    }

  };

  return {
    currentImage,
    showBrainstorming,
    showCompletion,
    isCompleting,
    messages,
    handleUserMessage,
    setShowBrainstorming
  };
}