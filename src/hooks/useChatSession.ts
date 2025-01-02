import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
}

export function useChatSession(imageCount: number) {
  const [currentImage, setCurrentImage] = useState(1);
  const [chatRound, setChatRound] = useState(0);
  const [showBrainstorming, setShowBrainstorming] = useState(true);
  const [showCompletion, setShowCompletion] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const url = 'https://the-end-of-2024-38ff56ee0179.herokuapp.com';

  const { user } = useAuth();

  const CHAT_ROUNDS = 3;

  const generateResponse = async (content: string, newMessages: Message[], chatRound: number) => {
    try {
      const messageContents = newMessages.map(message => message.content);

      const response = await fetch(url + '/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          messages: messageContents,
          chatRound
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
      { id: Date.now().toString(), content, isUser: true }
    ];

    setMessages(newMessages);

    if (chatRound < CHAT_ROUNDS) {
      const response = await generateResponse(content, newMessages, chatRound);
      // AIの応答を追加
      newMessages.push({
        id: (Date.now() + 1).toString(),
        content: response,
        isUser: false
      });
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
        try {
          await fetch(url + '/complete', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user_id: user?.id,
              messages: messages.map(m => ({
                id: m.id,
                content: m.content,
                isUser: m.isUser
              })),
              timestamp: new Date().toISOString()
            }),
          });
        } catch (error) {
          console.error('Error sending completion data:', error);
        }
        setShowCompletion(true);
      }
      return;
    }

  };

  return {
    currentImage,
    showBrainstorming,
    showCompletion,
    messages,
    handleUserMessage,
    setShowBrainstorming
  };
}