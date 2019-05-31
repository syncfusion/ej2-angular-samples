import { Component, ViewEncapsulation } from '@angular/core';
import { IStockChartEventArgs, ChartTheme } from '@syncfusion/ej2-angular-charts';
import { amzn } from './stock-data';

/**
 * Sample for Plot line Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'strip-line.html',
    encapsulation: ViewEncapsulation.None
})
export class StripLineComponent {

    public data1: Object[] = amzn;

    public primaryXAxis: Object = {
        valueType: 'DateTime', majorGridLines: { width: 0 }
    };

    public primaryYAxis: Object = {
        lineStyle: { color: 'transparent' },
        majorTickLines: { color: 'transparent', width: 0 },
        stripLines: [{ start: 340, end: 380, color: '#3CB371', opacity: 0.1 }]
    };
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public title: string = 'AAPL Historical';
    public titleStyle: object = { color: 'black' };
    public enable: boolean = true;
    public seriesType: string[] = [];
    public indicatorType: string[] = [];
     // custom code start
    public load(args: IStockChartEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.stockChart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
     // custom code end
    constructor() {
        //code
    }
}
