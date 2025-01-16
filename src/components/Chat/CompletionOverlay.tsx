import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CompletionOverlayProps {
  isCompleting: boolean;
}

export function CompletionOverlay({ isCompleting }: CompletionOverlayProps) {
  const navigate = useNavigate();

  if (isCompleting) {
    return (
      <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="w-full max-w-md p-6 text-center space-y-6">
          <div className="flex justify-center">
          <CheckCircle className="w-16 h-16 text-primary" />
        </div>
      </div>
    </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center">
      <Card className="w-full max-w-md p-6 text-center space-y-6">
        <div className="flex justify-center">
          <CheckCircle className="w-16 h-16 text-primary" />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">セッション完了</h2>
          <p className="text-muted-foreground">
            すべての画像セッションが完了しました。
            分析結果は「Review」ページでご確認いただけます。
          </p>
        </div>

        <div className="flex gap-4 justify-center">
          <Button onClick={() => navigate('/review')}>
            分析結果を見る
          </Button>
          <Button variant="outline" onClick={() => navigate('/main')}>
            メインメニューへ
          </Button>
        </div>
      </Card>
    </div>
  );
}