"use client";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";

const usageChartConfig: ChartConfig = {
  design: {
    label: "Design surfaces",
    color: "hsl(222 89% 62%)",
  },
  engineering: {
    label: "Engineering surfaces",
    color: "hsl(162 73% 46%)",
  },
};

const usageChartData = [
  { month: "Jan", design: 24, engineering: 16 },
  { month: "Feb", design: 34, engineering: 22 },
  { month: "Mar", design: 46, engineering: 29 },
  { month: "Apr", design: 58, engineering: 33 },
  { month: "May", design: 62, engineering: 39 },
  { month: "Jun", design: 68, engineering: 44 },
];

export function UsageChartHighlight() {
  return (
    <ChartContainer
      config={usageChartConfig}
      className="flex w-full max-w-2xl flex-col gap-4"
    >
      <LineChart data={usageChartData} margin={{ left: 8, right: 8, top: 16 }}>
        <CartesianGrid strokeDasharray="4 4" className="stroke-border" />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          className="text-xs text-muted-foreground"
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          width={32}
          className="text-xs text-muted-foreground"
        />
        <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Line
          type="monotone"
          dataKey="design"
          stroke="var(--color-design)"
          strokeWidth={2}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="engineering"
          stroke="var(--color-engineering)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
}
