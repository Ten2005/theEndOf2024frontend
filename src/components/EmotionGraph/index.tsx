import { LineChart, ResponsiveContainer } from 'recharts';
import { Card } from '@/components/ui/card';
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

export function EmotionGraph({ data }: EmotionGraphProps) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">感情変化の推移</h3>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart 
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
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
    </Card>
  );
}