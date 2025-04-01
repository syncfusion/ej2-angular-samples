import { Component, ViewEncapsulation } from '@angular/core';
import { IStockChartEventArgs, ChartTheme, StockChartModule, ChartAllModule, RangeNavigatorAllModule } from '@syncfusion/ej2-angular-charts';
import { aapl } from './stock-data';
import { loadStockChartTheme } from './theme-color';

/**
 * Sample for Inversed Area Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'inversed-area.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ StockChartModule, ChartAllModule, RangeNavigatorAllModule]
})
export class InversedAreaComponent {

    public data1: Object[] = aapl;
    public primaryXAxis: Object = {
        valueType: 'DateTime', isInversed: true,
        majorGridLines: { width: 0 }, crosshairTooltip: { enable: true }
    };
    public primaryYAxis: Object = {
        lineStyle: { color: 'transparent' },
        crosshairTooltip: { enable: true },
        majorTickLines: { color: 'transparent', height: 0 }, isInversed: true
    };
    public crosshair: Object = {
        enable: true,
        lineType: 'Both' 
    };
    public title: string = 'AAPL Stock Price';
    public seriesType: string[] = [];
    public indicatorType: string[] = [];
     // custom code start
    public load(args: IStockChartEventArgs): void {
        loadStockChartTheme(args);
    };
     // custom code end
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    constructor() {
        //code
    }
}
