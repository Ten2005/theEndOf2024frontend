import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';



export function TATAnalysis() {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">TAT分析</h3>
      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-3">
          <p>TAT分析</p>
        </div>
      </ScrollArea>
    </Card>
  );
}