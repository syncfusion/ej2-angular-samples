import { Component, ViewEncapsulation } from '@angular/core';
import { IStockChartEventArgs, ChartTheme } from '@syncfusion/ej2-angular-charts';
import { aapl } from './stock-data';

/**
 * Sample for Spline Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'spline.html',
    encapsulation: ViewEncapsulation.None
})
export class SplineComponent {

    public data1: Object[] = aapl;

    public primaryXAxis: Object = {
        valueType: 'DateTime', crosshairTooltip: { enable: true },  majorGridLines: { width: 0 }
    };

    public primaryYAxis: Object = {
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 }
    };
    public tooltip: object = { enable: true };
    public crosshair: object = { enable: true };
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public seriesType: string[] = [];
    public indicatorType: string[] = [];
    public load(args: IStockChartEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.stockChart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
    public title: string = 'AAPL Stock Price';
    public titleStyle: object = { color: 'black ' };
    public enable: boolean = true;
    constructor() {
        //code
    }
}
