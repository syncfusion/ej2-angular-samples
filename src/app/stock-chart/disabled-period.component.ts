import { Component, ViewEncapsulation } from '@angular/core';
import { IStockChartEventArgs, ChartTheme, ITooltipRenderEventArgs, StockChartModule, ChartAllModule, RangeNavigatorAllModule } from '@syncfusion/ej2-angular-charts';
import { aapl } from './stock-data';
import { loadStockChartTheme } from './theme-color';

/**
 * Sample for Area Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'disabled-period.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ StockChartModule, ChartAllModule, RangeNavigatorAllModule]
})
export class DisabledPeriodComponent {

    public data1: Object[] = aapl;
    public primaryXAxis: Object = { valueType: 'DateTime', majorGridLines: { width: 0 }, crosshairTooltip: { enable: true } };
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
     // custom code start
    public load(args: IStockChartEventArgs): void {
        loadStockChartTheme(args);
        args.stockChart.series[0].fill = 'url(#' + args.stockChart.theme.toLowerCase() + '-gradient-chart)';
    };
    public tooltipRender(args: ITooltipRenderEventArgs): void {
        if (args.text.split('<br/>')[4]) {
        let target: number = parseInt(args.text.split('<br/>')[4].split('<b>')[1].split('</b>')[0], 10);
        let value: string = (target / 100000000).toFixed(1) + 'B';
        args.text = args.text.replace(args.text.split('<br/>')[4].split('<b>')[1].split('</b>')[0], value);
        }
    };
     // custom code end
    public enable: boolean = false;
    constructor() {
        //code
    }
}
