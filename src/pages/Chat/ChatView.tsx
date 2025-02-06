import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
  gender?: 'male' | 'female' | 'unisex';
  mediaType: string;
}


export function ChatView({ imageCount, gender = 'male', mediaType }: ChatViewProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const finalGender = state?.gender || gender;

  const {
    currentImage,
    showBrainstorming,
    showCompletion,
    isCompleting,
    isLoading,
    messages,
    handleUserMessage,
    setShowBrainstorming
  } = useChatSession({ 
    imageCount, 
    gender: finalGender,
  });
  
  const [input, setInput] = useState('');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleBrainstormingComplete = async (responses: string[]) => {
    try {
      const combinedResponse = responses.join('\n\n');
      // const summary = await summarize(combinedResponse);
      setShowBrainstorming(false);
      await handleUserMessage(combinedResponse);
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
      gender={finalGender}
      mediaType={mediaType}
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
