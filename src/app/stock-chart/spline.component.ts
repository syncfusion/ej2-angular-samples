import { Component, ViewEncapsulation } from '@angular/core';
import { IStockChartEventArgs, ChartTheme, ITooltipRenderEventArgs, StockChartModule, ChartAllModule, RangeNavigatorAllModule } from '@syncfusion/ej2-angular-charts';
import { aapl } from './stock-data';
/**
 * Sample for Spline Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'spline.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ StockChartModule, ChartAllModule, RangeNavigatorAllModule]
})
export class SplineComponent {

    public data1: Object[] = aapl;

    public primaryXAxis: Object = {
        valueType: 'DateTime', crosshairTooltip: { enable: true },  majorGridLines: { width: 0 }
    };

    public primaryYAxis: Object = {
        lineStyle: { width: 0 },
        majorTickLines: { height: 0 }
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
     // custom code start
    public load(args: IStockChartEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.stockChart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
    };
     // custom code end
    public title: string = 'AAPL Stock Price';
    public tooltipRender(args: ITooltipRenderEventArgs): void {
        if (args.text.split('<br/>')[4]) {
        let target: number = parseInt(args.text.split('<br/>')[4].split('<b>')[1].split('</b>')[0], 10);
        let value: string = (target / 100000000).toFixed(1) + 'B';
        args.text = args.text.replace(args.text.split('<br/>')[4].split('<b>')[1].split('</b>')[0], value);
        }
    };
    public enable: boolean = true;
    constructor() {
        //code
    }
}
