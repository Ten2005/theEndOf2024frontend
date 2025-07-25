import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";

type Gender = 'male' | 'female' | 'unisex';

interface BrainstormingOverlayProps {
  imageCount: number;
  currentImage: number;
  gender: Gender;
  mediaType: string;
  onComplete: (responses: string[]) => void;
}

export function BrainstormingOverlay({ 
  imageCount, 
  currentImage, 
  gender,
  mediaType,
  onComplete 
}: BrainstormingOverlayProps) {
  const [currentResponse, setCurrentResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const getFilteredMedia = () => {
    console.log('getFilteredMedia', currentImage, gender, mediaType);
    const movieFiles = Object.keys(import.meta.glob('/public/movie/*'))
      .filter(file => {
        const fileName = file.split('/').pop() || '';
        return (
          fileName.startsWith(`${currentImage}_${gender}_`) || 
          fileName.startsWith(`${currentImage}_unisex_`)
        );
      })
      .map(file => file.replace('/public', ''));

    const imageFiles = Object.keys(import.meta.glob('/public/images/*'))
      .filter(file => {
        const fileName = file.split('/').pop() || '';
        return (
          fileName.startsWith(`${currentImage}_${gender}_`) || 
          fileName.startsWith(`${currentImage}_unisex_`)
        );
      })
      .map(file => file.replace('/public', ''));

    if (mediaType === 'image') {
      console.log('imageFiles', imageFiles);
      return imageFiles;
    } else {
      console.log('movieFiles', movieFiles);
      return movieFiles;
    }
  };

  const handleSubmitResponse = async () => {
    setCurrentResponse('');
    await handleComplete();
  };

  const handleComplete = async () => {
    setIsLoading(true);
    await onComplete([currentResponse]);
    setIsLoading(false);
  };

  const filteredMedia = getFilteredMedia();

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center">
      <Card className="w-full max-w-2xl p-6 space-y-6 h-[80vh] overflow-y-auto">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">動画 {currentImage} / {imageCount}</h2>
          <p className="text-muted-foreground">
            動画について思うことを自由に入力してください
          </p>
        </div>

        {filteredMedia.length > 0 ? (
          mediaType === 'video' ? (
            <Carousel className="w-full max-w-xl mx-auto">
              <CarouselContent>
                {filteredMedia.map((videoPath, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <Card>
                        <video 
                          src={videoPath} 
                          controls 
                          className="w-full h-auto max-h-[50vh]"
                        />
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {filteredMedia.length > 1 && (
                <>
                  <CarouselPrevious />
                  <CarouselNext />
                </>
              )}
            </Carousel>
          ) : (
            <Carousel className="w-full max-w-xl mx-auto">
              <CarouselContent>
                {filteredMedia.map((imagePath, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <Card>
                        <img 
                          src={imagePath} 
                          alt={`Image ${index + 1}`}
                          className="w-full h-auto max-h-[50vh] object-contain"
                        />
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {filteredMedia.length > 1 && (
                <>
                  <CarouselPrevious />
                  <CarouselNext />
                </>
              )}
            </Carousel>
          )
        ) : (
          <div className="text-center text-red-500">
            選択された条件に合うメディアがありません
          </div>
        )}

        <div className="space-y-4">
          <div className="space-y-2">
            <Textarea
              value={currentResponse}
              onChange={(e) => setCurrentResponse(e.target.value)}
              placeholder={isLoading ? "分析中..." : "思うことを自由に入力して下さい..."}
              className="resize-none"
              rows={4}
            />
            <Button
              className="w-full"
              onClick={handleSubmitResponse}
              disabled={!currentResponse.trim() || isLoading}
            >
              完了
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
