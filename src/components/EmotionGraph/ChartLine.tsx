import { Line } from 'recharts';

interface ChartLineProps {
  dataKey: 'joy' | 'sadness' | 'anger' | 'fear';
  name: string;
  color: string;
  strokeWidth?: number;
  dotSize?: number;
}

export function ChartLine({ 
  dataKey, 
  name, 
  color,
  strokeWidth = 2,
  dotSize = 2
}: ChartLineProps) {
  return (
    <Line
      type="monotone"
      dataKey={dataKey}
      name={name}
      stroke={color}
      strokeWidth={strokeWidth}
      dot={{ strokeWidth: dotSize }}
      activeDot={{ strokeWidth: dotSize, r: 6 }}
    />
  );
}