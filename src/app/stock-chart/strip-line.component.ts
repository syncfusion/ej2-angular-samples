import { Component, ViewEncapsulation } from '@angular/core';
import { IStockChartEventArgs, ChartTheme, StockChartModule, ChartAllModule, RangeNavigatorAllModule } from '@syncfusion/ej2-angular-charts';
import { amzn } from './stock-data';
import { loadStockChartTheme } from './theme-color';
/**
 * Sample for Plot line Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'strip-line.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ StockChartModule, ChartAllModule, RangeNavigatorAllModule]
})
export class StripLineComponent {

    public data1: Object[] = amzn;

    public primaryXAxis: Object = {
        valueType: 'DateTime', majorGridLines: { width: 0 }
    };

    public primaryYAxis: Object = {
        lineStyle: { color: 'transparent' },
        majorTickLines: { color: 'transparent', height: 0 },
        stripLines: [{ start: 340, end: 380, color: '#3CB371', opacity: 0.1 }]
    };
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public title: string = 'AAPL Historical';
    public enable: boolean = true;
    public seriesType: string[] = [];
    public indicatorType: string[] = [];
    public trendlineType: string[] = ['Linear', 'Exponential', 'Polynomial', 'Logarithmic', 'MovingAverage'];
     // custom code start
    public load(args: IStockChartEventArgs): void {
        loadStockChartTheme(args);
    };
     // custom code end
    constructor() {
        //code
    }
}
