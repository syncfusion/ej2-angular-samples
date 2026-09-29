
// src/app/models/chart-action.ts
import { ChartComponent } from '@syncfusion/ej2-angular-charts';

export const executeChartAction = (data: any, chart: ChartComponent, includedProps?: object) => {
  if (data?.props) {
    chart.setProperties(data.props, false);
  }
}