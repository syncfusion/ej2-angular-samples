import { Component, ViewEncapsulation } from '@angular/core';
import { IStockChartEventArgs, ChartTheme, StockChartModule, RangeNavigatorAllModule, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { aapl } from './stock-data';
/**
 * Sample for Area Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'area.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ StockChartModule, ChartAllModule, RangeNavigatorAllModule]
})
export class AreaComponent {

    public data1: Object[] = aapl;
    public primaryXAxis: Object = { valueType: 'DateTime', majorGridLines: { color: 'transparent' }, crosshairTooltip: { enable: true } };
    public primaryYAxis: Object = {
        lineStyle: { color: 'transparent' },
        majorTickLines: { color: 'transparent', height: 0 },
        crosshairTooltip: { enable: true }
    };
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public crosshair: Object = {
        enable: true,
        lineType: 'Both' 
    };
    public seriesType: string[] = [];
    public indicatorType: string[] = [];
    public title: string = 'AAPL Stock Price';
    public enable: boolean = true;
    public load(args: IStockChartEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.stockChart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
    }
    constructor() {
        //code
    }
}
