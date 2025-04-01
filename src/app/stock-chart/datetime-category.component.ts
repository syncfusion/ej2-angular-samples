import { Component, ViewEncapsulation } from '@angular/core';
import { IStockChartEventArgs, ChartTheme, ITooltipRenderEventArgs, StockChartModule, ChartAllModule, RangeNavigatorAllModule } from '@syncfusion/ej2-angular-charts';
import { datetimeCategoryData } from './stock-data';
import { loadStockChartTheme } from './theme-color';
/**
 * Sample for Area Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'datetime-category.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ StockChartModule, ChartAllModule, RangeNavigatorAllModule]
})
export class DateTimeCategoryComponent {

    public data1: Object[] = datetimeCategoryData;
    public primaryXAxis: Object = { valueType: 'DateTimeCategory', majorGridLines: { width: 0 }, edgeLabelPlacement: 'Shift', crosshairTooltip: { enable: true } };
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
        loadStockChartTheme(args);
    }
    constructor() {
        //code
    }
}
