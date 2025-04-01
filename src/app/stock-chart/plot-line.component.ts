import { Component, ViewEncapsulation } from '@angular/core';
import { IStockChartEventArgs, ChartTheme, StockChartModule, ChartAllModule, RangeNavigatorAllModule } from '@syncfusion/ej2-angular-charts';
import { amzn } from './stock-data';
import { loadStockChartTheme } from './theme-color';
/**
 * Sample for Plot line Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'plot-line.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ StockChartModule, ChartAllModule, RangeNavigatorAllModule]
})
export class PlotLineComponent {

    public data1: Object[] = amzn;

    public primaryXAxis: Object = {
        valueType: 'DateTime', majorGridLines: { color: 'transparent' }
    };

    public primaryYAxis: Object = {
        stripLines: [{ start: 320, sizeType: 'Pixel', size: 1, color: 'green', dashArray: '10,5' },
        { start: 380, sizeType: 'Pixel', size: 1, color: 'red', dashArray: '10,5' }],
        majorTickLines: { color: 'transparent', height: 0 },
    };
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public title: string = 'Plot line on Y axis';
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
