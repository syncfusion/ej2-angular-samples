import { Component, ViewEncapsulation } from '@angular/core';
import { IStockChartEventArgs, ChartTheme, StockChartAllModule, ChartAllModule, RangeNavigatorAllModule } from '@syncfusion/ej2-angular-charts';
import { goog, googl } from './stock-data';
import { loadStockChartTheme } from './theme-color';
/**
 * Sample for Multiple series in stock chart
 */
@Component({
    selector: 'control-content',
    templateUrl: 'multiple-series.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ StockChartAllModule, ChartAllModule, RangeNavigatorAllModule]
})
export class MultipleSeriesComponent {

    public data1: Object[] = goog;
    public data2: Object[] = googl;

    public primaryXAxis: Object = {
        valueType: 'DateTime', majorGridLines: { width: 0 }, crosshairTooltip: { enable: true}
    };

    public primaryYAxis: Object = {
        interval: 40, lineStyle: { color: 'transparent' },
        majorTickLines: { color: 'transparent', height: 0 },
        crosshairTooltip: { enable: true}
    };
    public crosshair: Object = {
        enable: true,
        lineType: 'Both' 
    };
    public legend: Object = {
        visible: true
    };
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public title: string = 'Multiple Series';

    public indicatorType: string[] = [];
    public trendlineType: string[] = [];
    public seriesType: string[] = ['Line', 'Hilo', 'HiloOpenClose', 'Spline', 'Candle'];
     // custom code start
    public load(args: IStockChartEventArgs): void {
        loadStockChartTheme(args);
    };
     // custom code end
    public enable: boolean = true;
    constructor() {
        //code
    }
}
