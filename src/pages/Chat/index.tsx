import { useState } from 'react';
import { Instructions } from './Instructions';
import { ImageSelector } from './ImageSelector';
import { ChatView } from './ChatView';

type Stage = 'instructions' | 'imageSelect' | 'chat';

export function Chat() {
  const [stage, setStage] = useState<Stage>('instructions');
  const [imageCount, setImageCount] = useState(0);

  const handleImageSelect = (count: number) => {
    setImageCount(count);
    setStage('chat');
  };

  return (
    <div className="min-h-screen bg-background p-4">
      {stage === 'instructions' && (
        <Instructions onContinue={() => setStage('imageSelect')} />
      )}
      
      {stage === 'imageSelect' && (
        <ImageSelector onSelect={handleImageSelect} />
      )}
      
      {stage === 'chat' && (
        <ChatView imageCount={imageCount} />
      )}
    </div>
  );
}