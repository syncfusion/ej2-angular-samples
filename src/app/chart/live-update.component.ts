import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { AccumulationChart, AccumulationChartComponent, ChartAllModule, IAccLoadedEventArgs, IAccTextRenderEventArgs, AccumulationTheme, AccumulationChartAllModule, IAccPointRenderEventArgs, AccumulationSeries } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadAccumulationChartTheme } from './theme-color';

/**
 * Sample for Pie Update Data Source
 */
@Component({
  selector: 'control-content',
  templateUrl: 'live-update.html',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [SBActionDescriptionComponent, ChartAllModule, AccumulationChartAllModule, SBDescriptionComponent]
})
export class UpdatePieDataSourceComponent {
  /**
   * Sample for Doughnut
   */

  public updatedData: Object[] = [
    { x: 'Apple', y: 7.8451 },
    { x: 'Google', y: 13.4167 },
    { x: 'Amazon', y: 6.9403 },
    { x: 'Microsoft', y: 20.7127 },
    { x: 'IBM', y: 76.2822 },
    { x: 'Oracle', y: 21.0090 },
    { x: 'Netflix', y: 16.8242 }
  ];
  public updatedData2: Object[] = [
    { x: 'Apple', y: 10.9899 },
    { x: 'Google', y: 14.2521 },
    { x: 'Amazon', y: 9.8100 },
    { x: 'Microsoft', y: 20.4205 },
    { x: 'IBM', y: 100.6536 },
    { x: 'Oracle', y: 26.0708 },
    { x: 'Netflix', y: 27.4937 }
  ];
  public updatedData3: Object[] = [
    { x: 'Apple', y: 17.4344 },
    { x: 'Google', y: 16.1018 },
    { x: 'Amazon', y: 10.9887 },
    { x: 'Microsoft', y: 24.0142 },
    { x: 'IBM', y: 117.6709 },
    { x: 'Oracle', y: 24.9828 },
    { x: 'Netflix', y: 11.8551 }
  ];
  public updatedData4: Object[] = [
    { x: 'Apple', y: 14.5929 },
    { x: 'Google', y: 22.1492 },
    { x: 'Amazon', y: 14.8658 },
    { x: 'Microsoft', y: 26.9842 },
    { x: 'IBM', y: 118.2763 },
    { x: 'Oracle', y: 28.5474 },
    { x: 'Netflix', y: 35.2718 }
  ];
  public updatedData5: Object[] = [
    { x: 'Apple', y: 20.4231 },
    { x: 'Google', y: 28.3890 },
    { x: 'Amazon', y: 16.5876 },
    { x: 'Microsoft', y: 36.2762 },
    { x: 'IBM', y: 113.4907 },
    { x: 'Oracle', y: 34.4296 },
    { x: 'Netflix', y: 57.4951 }
  ];
  public updatedData6: Object[] = [
    { x: 'Apple', y: 27.0239 },
    { x: 'Google', y: 30.9638 },
    { x: 'Amazon', y: 23.8494 },
    { x: 'Microsoft', y: 40.9778 },
    { x: 'IBM', y: 99.4267 },
    { x: 'Oracle', y: 35.4508 },
    { x: 'Netflix', y: 91.8956 }
  ];
  public updatedData7: Object[] = [
    { x: 'Apple', y: 24.0368 },
    { x: 'Google', y: 38.1172 },
    { x: 'Amazon', y: 34.8921 },
    { x: 'Microsoft', y: 49.8084 },
    { x: 'IBM', y: 100.0202 },
    { x: 'Oracle', y: 34.6261 },
    { x: 'Netflix', y: 102.0304 }
  ];
  public updatedData8: Object[] = [
    { x: 'Apple', y: 35.2487 },
    { x: 'Google', y: 46.9350 },
    { x: 'Amazon', y: 48.2920 },
    { x: 'Microsoft', y: 66.5079 },
    { x: 'IBM', y: 108.4717 },
    { x: 'Oracle', y: 41.7164 },
    { x: 'Netflix', y: 165.3743 }
  ];
  public updatedData9: Object[] = [
    { x: 'Apple', y: 44.9396 },
    { x: 'Google', y: 56.0381 },
    { x: 'Amazon', y: 81.8891 },
    { x: 'Microsoft', y: 95.1360 },
    { x: 'IBM', y: 103.0934 },
    { x: 'Oracle', y: 43.7122 },
    { x: 'Netflix', y: 319.2903 }
  ];
  public updatedData10: Object[] = [
    { x: 'Apple', y: 50.2883 },
    { x: 'Google', y: 59.4929 },
    { x: 'Amazon', y: 89.2447 },
    { x: 'Microsoft', y: 124.6044 },
    { x: 'IBM', y: 103.0097 },
    { x: 'Oracle', y: 49.6689 },
    { x: 'Netflix', y: 328.8713 }
  ];

  private intervalId: any;

  @ViewChild('pie')
  public pie: AccumulationChartComponent | AccumulationChart;
  //Initializing Legend
  public legendSettings: Object = {
    visible: false
  };
  public textRender(args: IAccTextRenderEventArgs): void {
    args.text = Browser.isDevice ? String(args.point.x) : String(args.point.x + ": " + "$" + args.text);
  };
  public centerLabel: Object = {
    text: '2010',
    textStyle: {
        fontWeight: '600',
        size: Browser.isDevice ? '25px' : '40px'
    },
  };
  //Initializing Datalabel
  public dataLabel: Object = {
    visible: true, position: 'Outside', font: {
      fontWeight: '600',
    },
    connectorStyle: { type: 'Line', width: 2, length: Browser.isDevice ? '7px' : '18px' }
  };

  // custom code start
  public load(args: IAccLoadedEventArgs): void {
    let yearIndex: number = 2;
    let year: number = 10;
    args.accumulation.centerLabel.text = "2010";
    loadAccumulationChartTheme(args);
    this.updateClearInterval();
    this.intervalId = setInterval(() => {
      let container: HTMLElement = document.getElementById('donut-container');
      if (container && container.id === args.chart.element.id) {
        let newData: Object[] = (this['updatedData' + yearIndex] || []).map(function (item: { x: string; y: number; }) {
          return { x: item.x, y: item.y };
        });
        year = year < 20 ? year + 1 : 10;
        args.accumulation.centerLabel.text = "20" + year;
        if (args.chart.series.length > 0) {
          (args.chart.series[0]).setData(newData, 500);
        }
        yearIndex = yearIndex < 10 ? yearIndex + 1 : 2;
      }
      else {
        this.updateClearInterval();
      }
    }, 2000);
  };
  // custom code end
  public enableAnimation: boolean = true;
  public tooltip: Object = {
    enable: false,
  };

  private updateClearInterval(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
  public title: string = 'Average Stock Market Prices of Leading Tech Giants';
  public radius: string = Browser.isDevice ? '40%' : '75%';
  public titleStyle: Object = {
    size: Browser.isDevice ? '16px' : '18px'
  }
  constructor() {
    //code
  };

}


