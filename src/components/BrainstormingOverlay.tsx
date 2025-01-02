import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { CheckCircle } from 'lucide-react';

interface BrainstormingOverlayProps {
  imageCount: number;
  currentImage: number;
  onComplete: (responses: string[]) => void;
}

export function BrainstormingOverlay({ 
  imageCount, 
  currentImage, 
  onComplete 
}: BrainstormingOverlayProps) {
  const [responses, setResponses] = useState<string[]>([]);
  const [currentResponse, setCurrentResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitResponse = () => {
    if (currentResponse.trim()) {
      setResponses([...responses, currentResponse.trim()]);
      setCurrentResponse('');
    }
  };

  const handleComplete = () => {
    if (responses.length > 0) {
      setIsLoading(true);
      onComplete(responses);
    }
  };

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center">
      <Card className="w-full max-w-2xl p-6 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">画像 {currentImage} / {imageCount}</h2>
          <p className="text-muted-foreground">
            画像について思うことを自由に入力してください
          </p>
        </div>

        <div className="flex justify-center">
          <div className="w-96 h-64 bg-muted flex items-center justify-center overflow-auto">
            <img
              src={`/public/images/${currentImage}.png`}
              alt={`Image ${currentImage}`}
              className="max-w-none h-auto"
              style={{
                minWidth: "100%",
                minHeight: "100%",
                objectFit: "contain"
              }}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              入力回数: {responses.length}（制限なし）
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleComplete}
              disabled={responses.length === 0 || isLoading}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              完了
            </Button>
          </div>

          <div className="space-y-2">
            <Textarea
              value={currentResponse}
              onChange={(e) => setCurrentResponse(e.target.value)}
              placeholder="思うことを自由に入力して下さい..."
              className="resize-none"
              rows={4}
            />
            <Button
              className="w-full"
              onClick={handleSubmitResponse}
              disabled={!currentResponse.trim()}
            >
              追加
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}