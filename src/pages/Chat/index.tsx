import { useState } from 'react';
import { Instructions } from './Instructions';
import { ImageSelector } from './ImageSelector';
import { ChatView } from './ChatView';

type Stage = 'instructions' | 'imageSelect' | 'chat';
type Gender = 'male' | 'female';
type MediaType = 'image' | 'video';

export function Chat() {
  const [stage, setStage] = useState<Stage>('instructions');
  const [imageCount, setImageCount] = useState(0);
  const [gender, setGender] = useState<Gender>('male');
  const [mediaType, setMediaType] = useState<MediaType>('image');
  const handleImageSelect = (count: number, selectedGender: Gender, selectedMediaType: MediaType) => {
    setImageCount(count);
    setGender(selectedGender);
    setMediaType(selectedMediaType);
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
          mediaType={mediaType}
        />
      )}
    </div>
  );
}
