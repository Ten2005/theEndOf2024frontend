import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';

interface SuggestionData {
  anxiety: number;
  advise: number;
  fortune_telling: string;
  religion: string;
  quote: string;
  philosophy: string;
}

interface SuggestionProps {
  suggestionData: SuggestionData;
}

export function Suggestions({ suggestionData }: SuggestionProps) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">あなたについて</h3>
      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">占い</h2>
          <p className="text-muted-foreground text-sm">{suggestionData.fortune_telling}</p>
          <h2 className="text-lg font-semibold">宗教</h2>
          <p className="text-muted-foreground text-sm">{suggestionData.religion}</p>
          <h2 className="text-lg font-semibold">名言</h2>
          <p className="text-muted-foreground text-sm">{suggestionData.quote}</p>
          <h2 className="text-lg font-semibold">哲学</h2>
          <p className="text-muted-foreground text-sm">{suggestionData.philosophy}</p>
        </div>
      </ScrollArea>
    </Card>
  );
}