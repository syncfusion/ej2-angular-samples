
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import {
  ChartComponent,
  ChartModule,
  DateTimeService,
  StripLineService,            
  LineSeriesService,
  CandleSeriesService,
  HiloOpenCloseSeriesService,
  LegendService,
  TooltipService, ILoadedEventArgs
} from '@syncfusion/ej2-angular-charts';
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { HttpClient } from '@angular/common/http';
import { fetchAI } from './stock-forecasting/model/ai-input';
import { executeChartAction } from './stock-forecasting/model/chart-action';
import { firstValueFrom } from 'rxjs';
import { loadChartTheme } from '../chart/theme-color'

type ChartPoint = { date: Date; high: number; low: number; open: number; close: number };
type SeriesType = 'Candle' | 'Line' | 'HiloOpenClose';

@Component({
  selector: 'app-ai-stock-toolbar-chart',
  templateUrl: './stock-forecasting.html',
  styleUrls: ['./stock-forecasting.css'],
  standalone: true,
  imports: [
    ChartModule,
    DropDownButtonModule,
    ButtonModule,
    DropDownListModule
  ],
  providers: [
    DateTimeService,
    LineSeriesService,
    CandleSeriesService,
    HiloOpenCloseSeriesService,
    LegendService,
    TooltipService,
    StripLineService           
  ]
})
export class StockForecastingComponent implements OnInit {
  @ViewChild('chart') chartRef?: ChartComponent;
  private baseDataLength = 0;
  title = 'Stock Forecasting';
  subTitle = 'AI-powered candlestick/OHLC forecasting (35 days)';
  isLoading = false;
  public primaryXAxis: any;
  public primaryYAxis: any;
  public legendSettings = { visible: false };
  public chartArea = { border: { width: 0 } };
  public tooltip = { enable: true, shared: true, header: '' };
  public chartData: ChartPoint[] = [];
  public selectedSeriesType: SeriesType = 'Candle';
  public seriesAnimation: Object = { enable: true, duration: 1200 };
  // custom code start
  public load(args: ILoadedEventArgs): void {
      loadChartTheme(args);
  };
  // custom code end
  public selectedSymbol = 'MSFT';
  public symbols = [
    { text: 'MSFT', iconCss: 'e-logo-msft', id: 'MSFT' },
    { text: 'GOOG', iconCss: 'e-logo-goog', id: 'GOOG' },
    { text: 'AMZN', iconCss: 'e-logo-amzn', id: 'AMZN' },
    { text: 'TSLA', iconCss: 'e-logo-tsla', id: 'TSLA' }
  ];

  public selectedRange = 3;

  public seriesOptions: SeriesType[] = [ 'Candle', 'Line', 'HiloOpenClose' ];

  public selectedInfo?: { symbol: string; text?: string; close: number; change: number; percentChange: number };

  constructor(private http: HttpClient, @Inject('sourceFiles') private sourceFiles: any) {
    this.sourceFiles.files = [
      'stock-forecasting.ts',
      'stock-forecasting.css',
      'stock-forecasting.html',
      'stock-forecasting/model/ai-input.ts',
      'stock-forecasting/model/chart-action.ts',
      'stock-forecasting/model/sf-ai-schema.ts'
    ];
  }
  
  ngOnInit(): void {
    this.primaryXAxis = {
      valueType: 'DateTime',
      edgeLabelPlacement: 'Shift',
      labelFormat: 'MMM d',
      majorGridLines: { width: 0 },
      stripLines: []            
    };
    this.primaryYAxis = { title: 'Price (USD)', labelFormat: 'n0',  rangePadding: 'None'};
    this.selectedInfo = this.getDefaultInfo(this.selectedSymbol);
    this.loadChartData();
  }

  getSelectedIconClass(): string {
    switch (this.selectedSymbol) {
      case 'MSFT': return 'e-logo-msft';
      case 'GOOG': return 'e-logo-goog';
      case 'AMZN': return 'e-logo-amzn';
      case 'TSLA': return 'e-logo-tsla';
      default: return 'default-icon';
    }
  }

  onStockItemSelected(args: { item: { id: string; text: string; iconCss: string } }) {
    this.selectedSymbol = args.item.id || args.item.text;
    this.selectedInfo = this.getDefaultInfo(this.selectedSymbol);
    this.loadChartData();
  }

  onSeriesChanged(newType: any) {
    this.selectedSeriesType = newType.value;
  }

  filterDataByMonths(months: number) {
    this.selectedRange = months;
    this.loadChartData();
  }

  async processForecast() {
    if (!this.chartRef) return;
     showSpinnerById('chartSpinner');
    try {
            const beforeLen = this.chartData.length;
      const last10 = this.chartData.slice(Math.max(0, this.chartData.length - 10));
      const prompt = this.generatePrompt(last10);

      const aiDelta = await fetchAI(prompt, this.chartRef, this.getChartStateSnapshot(), this.chartData);
      //executeChartAction(aiDelta, this.chartRef);

      if (aiDelta?.props?.series?.[0]?.dataSource) {
        this.chartData = aiDelta.props.series[0].dataSource;
        
 if (this.chartData.length >= beforeLen && aiDelta.props.series[0].dataSource.length > 0) {
        this.baseDataLength = beforeLen;
      }
      this.showForecastStripLine();

      }
    } finally {
      hideSpinnerById('chartSpinner');
    }
  }

  
async loadChartData() {
  this.isLoading = true;
  try {
    const url = `https://cdn.syncfusion.com/blazor/data/chart/${this.selectedSymbol.toLowerCase()}-data.json`;
    const raw = await firstValueFrom(this.http.get<any[]>(url));

    const all: ChartPoint[] = (raw ?? []).map(r => ({
      date: new Date(r.Date ?? r.date),
      high: +(r.High ?? r.high),
      low:  +(r.Low  ?? r.low),
      open: +(r.Open ?? r.open),
      close:+(r.Close?? r.close)
    }));

    this.chartData = this.filterByMonths(all, this.selectedRange);
   
  this.baseDataLength = this.chartData.length;
    this.primaryXAxis = {
      ...this.primaryXAxis,
      stripLines: []
    };
  } catch (err) {
    console.error('Failed to load chart data', err);
    this.chartData = [];
    
    this.baseDataLength = 0;
    this.primaryXAxis = { ...this.primaryXAxis, stripLines: [] };

  } finally {
    this.isLoading = false;
  }
}

private showForecastStripLine(): void {
  if (!this.chartData?.length || this.chartData.length <= this.baseDataLength) {
    this.primaryXAxis = { ...this.primaryXAxis, stripLines: [] };
    return;
  }

  const start = this.chartData[this.baseDataLength].date;
  const end   = this.chartData[this.chartData.length - 1].date;

  const forecastBand = {
    start,
    end,
    visible: true,
    color: '#E0E0E0',
    opacity: 0.5,
    zIndex: 'Behind'
  };

  this.primaryXAxis = {
    ...this.primaryXAxis,
    stripLines: [forecastBand]
  };
}

public stripStartDate?: Date;
public stripEndDate?: Date;

  filterByMonths(all: ChartPoint[], months: number): ChartPoint[] {
    if (!all.length) return [];
    const latest = all.reduce((a, b) => (new Date(a.date) > new Date(b.date) ? a : b));
    const cutoff = new Date(latest.date);
    cutoff.setMonth(cutoff.getMonth() - months + 1);
    return all
      .filter(p => new Date(p.date) >= cutoff)
      .sort((a, b) => +new Date(a.date) - +new Date(b.date));
  }

  private generatePrompt(lastN: ChartPoint[]): string {
    const lastDate = lastN[lastN.length - 1]?.date || new Date();
    const startDate = new Date(lastDate);
    startDate.setDate(startDate.getDate() + 1);

    let prompt = `Generate 35 realistic financial data points suitable for candlestick, OHLC, and line charts in ':' format.
Use the following format: yyyy-MM-dd: High: Low: Open: Close
Start from ${startDate.toISOString().slice(0,10)} and increment by 1 day for each row.
`;

    for (const d of lastN) {
      const iso = new Date(d.date).toISOString().slice(0,10);
      prompt += `${iso}: ${d.high}, ${d.low}, ${d.open}, ${d.close}\n`;
    }
    prompt += `
### STRICT OUTPUT REQUIREMENTS ###
- Generate EXACTLY 35 rows.
- Format: yyyy-MM-dd:High:Low:Open:Close
- Mix upward/downward trends; no missing/duplicate dates; no extra text.
- Values must be realistic and follow stock behavior.
`;
    return prompt;
  }

  private getDefaultInfo(symbol: string) {
    switch (symbol) {
      case 'MSFT': return { symbol, text: 'Microsoft Crp', close: 138.35, change: -2.0, percentChange: -0.22 };
      case 'GOOG': return { symbol, text: 'Alphabet Inc', close: 152.83, change: -2.0, percentChange: -0.22 };
      case 'AMZN': return { symbol, text: 'Amazon Inc', close: 222.27, change: -2.0, percentChange: -0.22 };
      case 'TSLA': return { symbol, text: 'Tesla Inc', close: 201.73, change: -2.0, percentChange: -0.22 };
      default: return { symbol, close: 0, change: 0, percentChange: 0 };
    }
  }

  private getChartStateSnapshot() {
    return {
      primaryXAxis: this.primaryXAxis,
      primaryYAxis: this.primaryYAxis,
      legendSettings: this.legendSettings,
      chartArea: this.chartArea,
      series: [
        {
          type: this.selectedSeriesType,
          xName: 'date',
          yName: 'close',
          high: 'high', low: 'low', open: 'open', close: 'close'
        }
      ],
      title: this.title,
      subTitle: this.subTitle,
      selectedSymbol: this.selectedSymbol,
      selectedRange: this.selectedRange 
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
