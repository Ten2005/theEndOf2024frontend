import { LineChart, ResponsiveContainer } from 'recharts';
import { Card } from '@/components/ui/card';
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChartLine } from './ChartLine';
import { ChartAxes } from './ChartAxes';
import { ChartTooltip } from './ChartTooltip';
import { ChartLegend } from './ChartLegend';
import type { EmotionData } from '@/lib/types';

interface EmotionGraphProps {
  data: EmotionData[];
}

const EMOTION_CONFIGS = [
  { dataKey: 'joy' as const, name: '喜び', color: '#4ade80' },
  { dataKey: 'sadness' as const, name: '悲しみ', color: '#60a5fa' },
  { dataKey: 'anger' as const, name: '怒り', color: '#f87171' },
  { dataKey: 'fear' as const, name: '不安', color: '#a78bfa' },
];

function downsampleData(data: EmotionData[], threshold: number = 20): EmotionData[] {
  if (data.length <= threshold) return data;
  
  const step = Math.ceil(data.length / threshold);
  return data.filter((_, index) => index % step === 0);
}

export function EmotionGraph({ data }: EmotionGraphProps) {
  const processedData = downsampleData(data);
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">感情変化の推移</h3>
      <ScrollArea className="h-[500px] pr-4">
        <div className="min-h-[400px]">
          <div style={{ width: `${Math.max(100, processedData.length * 50)}%`, minWidth: "100%" }}>
            <ResponsiveContainer width="100%" height={400}>
            <LineChart 
              data={processedData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <ChartAxes />
              <ChartTooltip />
              <ChartLegend />
              {EMOTION_CONFIGS.map((config) => (
                <ChartLine key={config.dataKey} {...config} />
              ))}
            </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </ScrollArea>
    </Card>
  );
}
