import { Component, ViewEncapsulation } from '@angular/core';
import { ITooltipRenderEventArgs, IStockChartEventArgs, ChartTheme, StockChartModule,  ChartAllModule, RangeNavigatorAllModule } from '@syncfusion/ej2-angular-charts';
import { defaultData } from './indicator-data';
import { loadStockChartTheme } from './theme-color';

/**
 * Sample for default stockchart
 */
@Component({
    selector: 'control-content',
    templateUrl: 'default.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ StockChartModule, ChartAllModule, RangeNavigatorAllModule]
})
export class DefaultComponent {

    public data1: Object[] = defaultData;

    public primaryXAxis: Object = { valueType: 'DateTimeCategory', majorGridLines: { color: 'transparent' }, crosshairTooltip: { enable: true }};

    public primaryYAxis: Object = {
        lineStyle: { color: 'transparent' },
        majorTickLines: { color: 'transparent', height: 0 },
    };
    public crosshair: Object = {
        enable: true
    };
    public tooltipRender(args: ITooltipRenderEventArgs): void {
        if (args.text.split('<br/>')[4]) {
        let target: number = parseInt(args.text.split('<br/>')[4].split('<b>')[1].split('</b>')[0], 10);
        let value: string = (target / 100000000).toFixed(1) + 'B';
        args.text = args.text.replace(args.text.split('<br/>')[4].split('<b>')[1].split('</b>')[0], value);
        }
    };
     // custom code start
    public load(args: IStockChartEventArgs): void {
        loadStockChartTheme(args);
    };
     // custom code end
    public title: string = 'AAPL Stock Price';

    public tooltip: object = { enable: true };
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public enable: boolean = true;
    constructor() {
        //code
    }
}
