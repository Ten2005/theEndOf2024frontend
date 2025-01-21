import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from 'lucide-react';
import { CompletionOverlay } from '@/components/Chat/CompletionOverlay';
import { BrainstormingOverlay } from '@/components/Chat/BrainstormingOverlay';
import { ConfirmDialog } from '@/components/Chat/ConfirmDialog';
import { ChatHeader } from '@/components/Chat/ChatHeader';
import { useChatSession } from '@/hooks/useChatSession';

interface ChatViewProps {
  imageCount: number;
}


export function ChatView({ imageCount }: ChatViewProps) {
  const navigate = useNavigate();
  const {
    currentImage,
    showBrainstorming,
    showCompletion,
    isCompleting,
    isLoading,
    messages,
    handleUserMessage,
    setShowBrainstorming
  } = useChatSession(imageCount);
  
  const [input, setInput] = useState('');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const url = process.env.NODE_ENV === 'development' 
    ? 'http://localhost:8000'
    : 'https://the-end-of-2024-38ff56ee0179.herokuapp.com';

  const summarize = async (text: string) => {
    try {
      const response = await fetch(url + '/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
      
      if (!response.ok) {
        throw new Error('Summarization failed');
      }

      const data = await response.json();
      return data.summary;
    } catch (error) {
      console.error('Error summarizing text:', error);
      return text;
    }
  };

  const handleBrainstormingComplete = async (responses: string[]) => {
    try {
      const combinedResponse = responses.join('\n\n');
      // 連結文字列に対して要約したものを返す
      const summary = await summarize(combinedResponse);
      setShowBrainstorming(false);
      await handleUserMessage(summary);
    } catch (error) {
      console.error('Error handling brainstorming completion:', error);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    await handleUserMessage(input);
    setInput('');
  };

  const handleAbort = () => {
    setShowConfirmDialog(true);
  };

  const handleConfirmAbort = () => {
    setShowConfirmDialog(false);
    navigate('/main');
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center p-4">
      {showBrainstorming && (
        <BrainstormingOverlay
          imageCount={imageCount}
          currentImage={currentImage}
          onComplete={handleBrainstormingComplete}
        />
      )}

      {(showCompletion || isLoading) && (
        <CompletionOverlay 
          isCompleting={isCompleting}
          isLoading={isLoading}
        />
      )}

      <ConfirmDialog
        open={showConfirmDialog}
        onConfirm={handleConfirmAbort}
        onCancel={() => setShowConfirmDialog(false)}
      />

      <ChatHeader
        currentImage={currentImage}
        imageCount={imageCount}
        onAbort={handleAbort}
      />

      <ScrollArea className="flex-1 p-4 w-full max-w-screen-lg">
        <div className="space-y-4 w-full max-w-screen-lg w-full">
          {messages.map((message, index) => (
            <Card
              key={index}
              className={`p-4 max-w-[80%] ${
                message.role === 'user' ? 'ml-auto bg-primary/10' : 'bg-secondary'
              }`}
            >
              <pre className="whitespace-pre-wrap font-sans">{message.content}</pre>
            </Card>
          ))}
        </div>
      </ScrollArea>

      <div className="py-4 border-t w-full max-w-screen-lg">
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="メッセージを入力..."
            className="resize-none"
            rows={3}
          />
          <Button
            onClick={handleSend}
            className="self-end"
            disabled={!input.trim() || isLoading}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
