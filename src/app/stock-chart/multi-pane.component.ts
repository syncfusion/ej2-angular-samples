import { Component, ViewEncapsulation } from '@angular/core';
import {
 IStockChartEventArgs, ChartTheme, ITooltipRenderEventArgs, IAxisLabelRenderEventArgs
} from '@syncfusion/ej2-angular-charts';
import { chartData } from './indicator-data';

/**
 * Sample for default stockchart
 */
@Component({
    selector: 'control-content',
    templateUrl: 'multi-pane.html',
    encapsulation: ViewEncapsulation.None
})
export class MultiPaneComponent {

    public data1: Object[] = chartData;

    public primaryXAxis: Object = {
        valueType: 'DateTime', majorGridLines: { width: 0 }, crosshairTooltip: { enable: true }
    };

    public primaryYAxis: Object = {
        lineStyle: { color: 'transparent' },
        majorTickLines: { color: 'transparent', width: 0 }
    };
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public crosshair: Object = {
        enable: true
    };
    public tooltip: object = { enable: true };
    public tooltipRender(args: ITooltipRenderEventArgs): void {
        if (args.text.split('<br/>')[4]) { 
        let target: number = parseInt(args.text.split('<br/>')[4].split('<b>')[1].split('</b>')[0], 10);
        let value: string = (target / 100000000).toFixed(1) + 'B';
        args.text = args.text.replace(args.text.split('<br/>')[4].split('<b>')[1].split('</b>')[0], value);
        }
    };
    public axisLabelRender(args: IAxisLabelRenderEventArgs): void {
        let text: number = parseInt(args.text, 10);
        if (args.axis.name === 'primaryYAxis') {
            args.text = text / 100000000 + 'B';
        }
    };
    public load(args: IStockChartEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.stockChart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
    public title: string = 'AAPL Historical';
    public titleStyle: object = { color: 'black' };
    constructor() {
        //code
    }
}
