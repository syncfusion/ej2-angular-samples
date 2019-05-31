import { Component, ViewEncapsulation } from '@angular/core';
import { IStockChartEventArgs, ChartTheme } from '@syncfusion/ej2-angular-charts';
import { goog, googl } from './stock-data';

/**
 * Sample for Multiple series in stock chart
 */
@Component({
    selector: 'control-content',
    templateUrl: 'multiple-series.html',
    encapsulation: ViewEncapsulation.None
})
export class MultipleSeriesComponent {

    public data1: Object[] = goog;
    public data2: Object[] = googl;

    public primaryXAxis: Object = {
        valueType: 'DateTime', majorGridLines: { width: 0 }, crosshairTooltip: { enable: true}
    };

    public primaryYAxis: Object = {
        interval: 40, lineStyle: { color: 'transparent' },
        majorTickLines: { color: 'transparent', width: 0 },
        crosshairTooltip: { enable: true}
    };
    public crosshair: Object = {
        enable: true
    };
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public title: string = 'Multiple Series';
    public titleStyle: object = { color: 'black' };

    public indicatorType: string[] = [];
    public trendlineType: string[] = [];
     // custom code start
    public load(args: IStockChartEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.stockChart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
     // custom code end
    public enable: boolean = true;
    constructor() {
        //code
    }
}
