import { Tooltip } from 'recharts';

interface ChartTooltipProps {
  formatter?: (value: number) => string;
  backgroundColor?: string;
  textColor?: string;
}

export function ChartTooltip({ 
  formatter = (value) => `${(value * 100).toFixed(1)}%`,
  backgroundColor = 'hsl(var(--popover))',
  textColor = 'hsl(var(--popover-foreground))'
}: ChartTooltipProps) {
  return (
    <Tooltip 
      formatter={(value: number) => formatter(value)}
      contentStyle={{ 
        backgroundColor, 
        border: 'none', 
        borderRadius: '8px' 
      }}
      labelStyle={{ color: textColor }}
      itemStyle={{ color: textColor }}
    />
  );
}