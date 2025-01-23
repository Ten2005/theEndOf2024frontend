import { useState } from 'react';
import { Instructions } from './Instructions';
import { ImageSelector } from './ImageSelector';
import { ChatView } from './ChatView';

type Stage = 'instructions' | 'imageSelect' | 'chat';
type Gender = 'male' | 'female';

export function Chat() {
  const [stage, setStage] = useState<Stage>('instructions');
  const [imageCount, setImageCount] = useState(0);
  const [gender, setGender] = useState<Gender>('male');

  const handleImageSelect = (count: number, selectedGender: Gender) => {
    setImageCount(count);
    setGender(selectedGender);
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
        <ChatView 
          imageCount={imageCount} 
          gender={gender} 
        />
      )}
    </div>
  );
}
