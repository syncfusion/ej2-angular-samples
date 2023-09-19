import { Component, ViewEncapsulation } from '@angular/core';
import { IStockChartEventArgs, ChartTheme, ITooltipRenderEventArgs } from '@syncfusion/ej2-angular-charts';
import { datetimeCategoryData } from './stock-data';

/**
 * Sample for Area Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'datetime-category.html',
    encapsulation: ViewEncapsulation.None
})
export class DateTimeCategoryComponent {

    public data1: Object[] = datetimeCategoryData;
    public primaryXAxis: Object = { valueType: 'DateTimeCategory', majorGridLines: { width: 0 }, crosshairTooltip: { enable: true } };
    public primaryYAxis: Object = {
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 }
    };
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public crosshair: Object = {
        enable: true,
    };
    public tooltip: Object = {
        enable: true, header: 'AAPL Stock Price', format: '${point.x}: <b>${point.y}</b>'
    }
    public title: string = 'AAPL Stock Price';
    public load(args: IStockChartEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.stockChart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
    }
    constructor() {
        //code
    }
}
