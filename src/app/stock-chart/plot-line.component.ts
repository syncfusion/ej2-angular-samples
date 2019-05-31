import { Component, ViewEncapsulation } from '@angular/core';
import { IStockChartEventArgs, ChartTheme } from '@syncfusion/ej2-angular-charts';
import { amzn } from './stock-data';

/**
 * Sample for Plot line Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'plot-line.html',
    encapsulation: ViewEncapsulation.None
})
export class PlotLineComponent {

    public data1: Object[] = amzn;

    public primaryXAxis: Object = {
        valueType: 'DateTime', majorGridLines: { color: 'transparent' }
    };

    public primaryYAxis: Object = {
        stripLines: [{ start: 320, sizeType: 'Pixel', size: 1, color: 'green', dashArray: '10,5' },
        { start: 380, sizeType: 'Pixel', size: 1, color: 'red', dashArray: '10,5' }],
    };
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public title: string = 'Plot line on Y axis';
    public titleStyle: object = { color: 'black ' }
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
