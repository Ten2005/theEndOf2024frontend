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
  strokeWidth = 1.5,
  dotSize = 1
}: ChartLineProps) {
  return (
    <Line
      type="basis"
      dataKey={dataKey}
      name={name}
      stroke={color}
      strokeWidth={strokeWidth}
      dot={{ strokeWidth: dotSize, r: 2 }}
      activeDot={{ strokeWidth: 2, r: 4 }}
    />
  );
}
