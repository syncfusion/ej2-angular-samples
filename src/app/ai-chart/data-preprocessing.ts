
import {  Component, OnInit, ViewChild, Inject } from '@angular/core';
import {
  ChartComponent,
  ChartModule,
  DateTimeService,
  LineSeriesService,
  MultiColoredLineSeriesService,
  LegendService, ILoadedEventArgs
} from '@syncfusion/ej2-angular-charts';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { fetchAI } from './data-preprocessing/model/ai-input';
import { loadChartTheme } from '../chart/theme-color';
import { executeChartAction } from './data-preprocessing/model/chartAction';


type ChartPoint = { time: Date; visitors: number | null; color?: string };

@Component({
  selector: 'app-assistive-chart',
  templateUrl: './data-preprocessing.html',
  styleUrls: ['./data-preprocessing.css'],
  standalone: true,
  imports: [ChartModule, ButtonModule],
  providers: [DateTimeService, LineSeriesService, MultiColoredLineSeriesService, LegendService],
})
export class DataPreprocessingComponent implements OnInit {
  constructor(@Inject('sourceFiles') private sourceFiles: any) {
    sourceFiles.files = [
      'data-preprocessing.ts',
      'data-preprocessing.css',
      'data-preprocessing.html',
      'data-preprocessing/model/ai-input.ts',
      'data-preprocessing/model/sf-ai-schema.ts'
    ];
  }
  @ViewChild('chart') chartRef?: ChartComponent;

  title = 'E-Commerce Website Traffic Data';
  subTitle = 'AI-powered data cleaning and preprocessing for tracking hourly website visitors';

  isLoading = false;
  
  public primaryXAxis: any;
  public primaryYAxis: any;
  public legendSettings = { visible: true, position: 'Top' as const };
  public chartArea = { border: { width: 0 } };
  public tooltip = { enable: true };
  // custom code start
  public load(args: ILoadedEventArgs): void {
      loadChartTheme(args);
  };
  // custom code end
  public chartData: ChartPoint[] = [];
  public pointColorMapping = 'color';

  private originalList: ChartPoint[] = [
    { time: new Date(2024, 6, 1, 0, 0, 0), visitors: 150 },
    { time: new Date(2024, 6, 1, 1, 0, 0), visitors: 160 },
    { time: new Date(2024, 6, 1, 2, 0, 0), visitors: 155 },
    { time: new Date(2024, 6, 1, 3, 0, 0), visitors: null },
    { time: new Date(2024, 6, 1, 4, 0, 0), visitors: 170 },
    { time: new Date(2024, 6, 1, 5, 0, 0), visitors: 175 },
    { time: new Date(2024, 6, 1, 6, 0, 0), visitors: 145 },
    { time: new Date(2024, 6, 1, 7, 0, 0), visitors: 180 },
    { time: new Date(2024, 6, 1, 8, 0, 0), visitors: null },
    { time: new Date(2024, 6, 1, 9, 0, 0), visitors: 185 },
    { time: new Date(2024, 6, 1, 10, 0, 0), visitors: 200 },
    { time: new Date(2024, 6, 1, 11, 0, 0), visitors: null },
    { time: new Date(2024, 6, 1, 12, 0, 0), visitors: 220 },
    { time: new Date(2024, 6, 1, 13, 0, 0), visitors: 230 },
    { time: new Date(2024, 6, 1, 14, 0, 0), visitors: null },
    { time: new Date(2024, 6, 1, 15, 0, 0), visitors: 250 },
    { time: new Date(2024, 6, 1, 16, 0, 0), visitors: 260 },
    { time: new Date(2024, 6, 1, 17, 0, 0), visitors: 270 },
    { time: new Date(2024, 6, 1, 18, 0, 0), visitors: null },
    { time: new Date(2024, 6, 1, 19, 0, 0), visitors: 280 },
    { time: new Date(2024, 6, 1, 20, 0, 0), visitors: 250 },
    { time: new Date(2024, 6, 1, 21, 0, 0), visitors: 290 },
    { time: new Date(2024, 6, 1, 22, 0, 0), visitors: 300 },
    { time: new Date(2024, 6, 1, 23, 0, 0), visitors: null },
  ];

  ngOnInit(): void {
    this.primaryXAxis = {
      valueType: 'DateTime',
      minimum: new Date(2024, 6, 1, 0, 0, 0),
      maximum: new Date(2024, 6, 1, 23, 0, 0),
      labelFormat: 'h a',
      edgeLabelPlacement: 'Shift',
      majorGridLines: { width: 0 },
    };
    this.primaryYAxis = { minimum: 140, maximum: 320, interval: 30 };

    this.chartData = this.originalList.map(p => ({ ...p }));
  }
  
  // Matches HTML (click)="processChartData()"
  async processChartData() {
    if (!this.chartRef) return;
    showSpinnerById('chartSpinner');

    try {
      const prompt = this.generatePrompt(this.originalList);
      const aiData = await fetchAI(
        prompt,
        this.chartRef,
        this.getChartStateSnapshot(),
        this.originalList
      );
      //executeChartAction(aiData, this.chartRef);
      if (aiData?.props?.series?.[0]?.dataSource) {
        this.chartData = aiData.props.series[0].dataSource;
      }
    } finally {
     hideSpinnerById('chartSpinner');
    }
  }

  private generatePrompt(data: ChartPoint[]): string {
    const fmt = (d: Date) =>
      `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d
        .getDate()
        .toString()
        .padStart(2, '0')}-${d.getHours().toString().padStart(2, '0')}-${d
        .getMinutes()
        .toString()
        .padStart(2, '0')}-${d.getSeconds().toString().padStart(2, '0')}`;

    const header =
      'Clean the following e-commerce website traffic data, resolve outliers and fill missing values:\n';
    const lines = data
      .map(d => `${fmt(d.time)}: ${d.visitors === null ? 'null' : d.visitors}`)
      .join('\n');
    const footer =
      '\nand the output cleaned data should be in the yyyy-MM-dd-HH-m-ss:Value format, no other explanation required';

    return header + lines + footer;
  }

  private getChartStateSnapshot() {
    return {
      primaryXAxis: this.primaryXAxis,
      primaryYAxis: this.primaryYAxis,
      legendSettings: this.legendSettings,
      chartArea: this.chartArea,
      series: [
        {
          type: 'MultiColoredLine',
          xName: 'time',
          yName: 'visitors',
          pointColorMapping: this.pointColorMapping,
        },
      ],
      title: this.title,
      subTitle: this.subTitle,
    };
  }
}

export function showSpinnerById(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.add('visible');
}

export function hideSpinnerById(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.remove('visible');
}
