import { Component, ViewEncapsulation } from '@angular/core';
import {
AnimationModel, ITooltipRenderEventArgs, IStockChartEventArgs, ChartTheme
} from '@syncfusion/ej2-angular-charts';
import { googl } from './stock-data';

/**
 * Sample for Hilo Open close Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'ohlc.html',
    encapsulation: ViewEncapsulation.None
})
export class HiloOpenCloseComponent {

    public data1: Object[] = googl;

    public primaryXAxis: Object = {
        valueType: 'DateTime',
        majorGridLines: { width: 0 },
        crosshairTooltip: { enable: true },
    };

    public primaryYAxis: Object = {
        labelFormat: 'n0',
        rangePadding: 'None',
        lineStyle: { color: 'transparent' },
        majorTickLines: { color: 'transparent' },
    };
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public animation: AnimationModel = { enable: true };
    public crosshair: Object = {
        enable: true,
    };
    public tooltip: object = { enable: true, shared: true}
    public tooltipRender(args: ITooltipRenderEventArgs): void {
        if (args.text.split('<br/>')[4]) {
        let target: number = parseInt(args.text.split('<br/>')[4].split('<b>')[1].split('</b>')[0], 10);
        let value: string = (target / 100000000).toFixed(1) + 'B';
        args.text = args.text.replace(args.text.split('<br/>')[4].split('<b>')[1].split('</b>')[0], value);
        }
    };
     // custom code start
    public load(args: IStockChartEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.stockChart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
     // custom code end
    public title: string = 'AAPL Stock Price';
    public enable: boolean = true;
    constructor() {
        //code
    }
}
