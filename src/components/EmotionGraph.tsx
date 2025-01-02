import { Line, LineChart, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card } from '@/components/ui/card';
import type { EmotionData } from '@/lib/types';

interface EmotionGraphProps {
  data: EmotionData[];
}

export function EmotionGraph({ data }: EmotionGraphProps) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">感情変化の推移</h3>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis 
              dataKey="timestamp"
              tick={{ fill: 'currentColor' }}
              stroke="currentColor"
            />
            <YAxis
              tick={{ fill: 'currentColor' }}
              stroke="currentColor"
            />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="joy" 
              stroke="#4ade80" 
              name="喜び"
              strokeWidth={2}
            />
            <Line 
              type="monotone" 
              dataKey="sadness" 
              stroke="#60a5fa" 
              name="悲しみ"
              strokeWidth={2}
            />
            <Line 
              type="monotone" 
              dataKey="anger" 
              stroke="#f87171" 
              name="怒り"
              strokeWidth={2}
            />
            <Line 
              type="monotone" 
              dataKey="fear" 
              stroke="#a78bfa" 
              name="不安"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}