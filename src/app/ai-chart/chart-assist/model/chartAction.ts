
// chart-action.ts
import { ChartComponent, AccumulationChartComponent } from '@syncfusion/ej2-angular-charts';

export interface ChartActionInput {
  ChartConfig?: { series: Array<{ dataSource?: any[] }> };
}

export const executeChartAction = (
  data: ChartActionInput,
  chart: ChartComponent | AccumulationChartComponent
) => {
  if (!data?.ChartConfig?.series || !(chart as any)?.series) return;

  const incoming = data.ChartConfig.series;
  (chart as any).series.forEach((s: any, i: number) => {
    s.dataSource = Array.isArray(incoming[i]?.dataSource) ? incoming[i].dataSource : [];
  });

  (chart as any).setProperties(data.ChartConfig.series, true)
};

