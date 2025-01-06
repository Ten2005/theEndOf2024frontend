import { Card } from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ImageSelectorProps {
  onSelect: (count: number) => void;
}

export function ImageSelector({ onSelect }: ImageSelectorProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center">
      <Card className="max-w-md mx-auto p-6 w-full max-w-lg h-screen max-h-48">
        <h2 className="text-2xl font-bold mb-6 text-center">画像枚数を選択</h2>
        
      <div className="space-y-6">
        <Select onValueChange={(value) => onSelect(Number(value))}>
          <SelectTrigger>
            <SelectValue placeholder="枚数を選択してください" />
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <SelectItem key={num} value={num.toString()}>
                {num}枚
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <p className="text-sm text-muted-foreground text-center">
          ※選択後、チャット画面に移動します
        </p>
      </div>
    </Card>
    </div>
  );
}
