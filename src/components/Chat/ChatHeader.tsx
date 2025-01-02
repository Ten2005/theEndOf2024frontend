import { Button } from "@/components/ui/button";
import { X } from 'lucide-react';

interface ChatHeaderProps {
  currentImage: number;
  imageCount: number;
  onAbort: () => void;
}

export function ChatHeader({ currentImage, imageCount, onAbort }: ChatHeaderProps) {
  return (
    <div className="p-4 border-b flex justify-between items-center">
      <h2 className="text-lg font-semibold">
        画像 {currentImage} / {imageCount}
      </h2>
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground hover:text-destructive"
        onClick={onAbort}
      >
        <X className="w-5 h-5" />
      </Button>
    </div>
  );
}