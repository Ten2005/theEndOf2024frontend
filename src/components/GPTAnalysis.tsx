import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';

interface GPTAnalysisProps {
  analysis: string;
}

export function GPTAnalysis({ analysis }: GPTAnalysisProps) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">GPT分析</h3>
      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-3">
          <p>{analysis}</p>
        </div>
      </ScrollArea>
    </Card>
  );
}