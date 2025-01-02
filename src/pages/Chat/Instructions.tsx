import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface InstructionsProps {
  onContinue: () => void;
}

export function Instructions({ onContinue }: InstructionsProps) {
  return (
    <Card className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">TAT×Chat</h2>
      
      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-4">
          <section>
            <h3 className="text-lg font-semibold mb-2">概要</h3>
            <p>TAT（主題統覚検査）と対話を組み合わせた新しいアプローチです。</p>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">手順</h3>
            <ol className="list-decimal list-inside space-y-2">
              <li>画像枚数を選択します（1-10枚）</li>
              <li>表示される画像について自由に物語を語ってください</li>
              <li>3つの質問に答えてください</li>
              <li>画像の枚数分、この手順を繰り返します</li>
              <li>AI技術によって、あなたの回答から無意識的な要素を分析します</li>
            </ol>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">注意事項</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>正解/不正解はありません</li>
              <li>思ったままを自由に表現してください</li>
              <li>時間制限はありません</li>
            </ul>
          </section>
        </div>
      </ScrollArea>

      <div className="mt-6 text-center">
        <Button 
          size="lg"
          onClick={onContinue}
          className="bg-primary hover:bg-primary/90"
        >
          理解しました
        </Button>
      </div>
    </Card>
  );
}