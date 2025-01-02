import { XAxis, YAxis } from 'recharts';

interface AxisProps {
  color?: string;
}

export function ChartAxes({ color = 'currentColor' }: AxisProps) {
  const axisProps = {
    tick: { fill: color },
    stroke: color,
    tickLine: { stroke: color }
  };

  return (
    <>
      <XAxis
        dataKey="timestamp"
        {...axisProps}
      />
      <YAxis
        {...axisProps}
        domain={[0, 1]}
        tickFormatter={(value: number) => `${value * 100}%`}
      />
    </>
  );
}