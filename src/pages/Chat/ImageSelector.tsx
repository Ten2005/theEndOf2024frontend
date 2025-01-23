import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";

type Gender = 'male' | 'female';

interface ImageSelectorProps {
  onSelect: (count: number, gender: Gender) => void;
}

export function ImageSelector({ onSelect }: ImageSelectorProps) {
  const [movieCount, setMovieCount] = useState<number | null>(null);
  const [gender, setGender] = useState<Gender | null>(null);

  const getFilteredImages = () => {
    if (!movieCount || !gender) return [];

    const movieFiles = Object.keys(import.meta.glob('/public/movie/*'))
      .filter(file => {
        const fileName = file.split('/').pop() || '';
        return (
          fileName.startsWith(`${movieCount}_${gender}_`) || 
          fileName.startsWith(`${movieCount}_unisex_`)
        );
      })
      .map(file => file.replace('/public', ''));

    return movieFiles;
  };

  const filteredImages = getFilteredImages();

  const handleMovieCountSelect = (value: string) => {
    setMovieCount(Number(value));
    if (gender) {
      onSelect(Number(value), gender);
    }
  };

  const handleGenderSelect = (value: Gender) => {
    setGender(value);
    if (movieCount) {
      onSelect(movieCount, value);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center">
    <Card className="max-w-md mx-auto p-6 w-full max-w-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">動画と性別を選択</h2>
      
      <div className="space-y-6">
        <Select onValueChange={handleMovieCountSelect}>
          <SelectTrigger>
            <SelectValue placeholder="動画枚数を選択" />
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <SelectItem
              key={num}
              value={num.toString()}
              >
                {num}枚
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={handleGenderSelect}>
          <SelectTrigger>
            <SelectValue placeholder="性別を選択" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">男性</SelectItem>
            <SelectItem value="female">女性</SelectItem>
          </SelectContent>
        </Select>

        {movieCount && gender && (
          <Carousel className="w-full max-w-xs mx-auto">
            <CarouselContent>
              {filteredImages.map((imagePath, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card>
                      <video 
                        src={imagePath} 
                        controls 
                        className="w-full h-auto"
                      />
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        )}

        {movieCount && gender && filteredImages.length === 0 && (
          <p className="text-sm text-red-500 text-center">
            選択された条件に合う動画がありません
          </p>
        )}

        <p className="text-sm text-muted-foreground text-center">
          ※選択後、チャット画面に移動します
        </p>
      </div>
    </Card>
  </div>
  );
}
