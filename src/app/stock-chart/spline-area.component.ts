import { Component, ViewEncapsulation } from '@angular/core';
import { IStockChartEventArgs, ChartTheme } from '@syncfusion/ej2-angular-charts';
import { googl } from './stock-data';

/**
 * Sample for Spline Area Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'spline-area.html',
    encapsulation: ViewEncapsulation.None
})
export class SplineAreaComponent {

    public data1: Object[] = googl;

    public primaryXAxis: Object = {
        valueType: 'DateTime',  majorGridLines: { width: 0 }, crosshairTooltip: { enable: true }
    };

    public primaryYAxis: Object = {
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 }, crosshairTooltip: { enable: true }
    };

    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public title: string = 'Google Stock Price';
    public titleStyle: object = { color: 'black ' };
    public crosshair: object = { enable: true };
    public seriesType: string[] = [];
    public indicatorType: string[] = [];
    public enable: boolean = true;
    public load(args: IStockChartEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.stockChart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
    constructor() {
        //code
    }
}
