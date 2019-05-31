import { Component, ViewEncapsulation } from '@angular/core';
import { IStockChartEventArgs, ChartTheme } from '@syncfusion/ej2-angular-charts';
import { aapl } from './stock-data';

/**
 * Sample for Inversed Area Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'inversed-area.html',
    encapsulation: ViewEncapsulation.None
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
        majorTickLines: { color: 'transparent', width: 0 }, isInversed: true
    };
    public crosshair: Object = {
        enable: true
    };
    public title: string = 'AAPL Stock Price';
    public titleStyle: object = { color: 'black' };
    public seriesType: string[] = [];
    public indicatorType: string[] = [];
     // custom code start
    public load(args: IStockChartEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.stockChart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
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
