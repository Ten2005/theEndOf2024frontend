import { Legend } from 'recharts';

interface ChartLegendProps {
  verticalAlign?: 'top' | 'middle' | 'bottom';
  height?: number;
  iconType?: 'line' | 'plainline' | 'square' | 'rect' | 'circle' | 'cross' | 'diamond' | 'star' | 'triangle' | 'wye';
}

export function ChartLegend({
  verticalAlign = 'bottom',
  height = 36,
  iconType = 'circle'
}: ChartLegendProps) {
  return (
    <Legend
      verticalAlign={verticalAlign}
      height={height}
      iconType={iconType}
      wrapperStyle={{
        paddingTop: '20px',
      }}
    />
  );
}