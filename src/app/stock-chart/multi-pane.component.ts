import { Component, ViewEncapsulation } from '@angular/core';
import { IStockChartEventArgs, ChartTheme, ITooltipRenderEventArgs, IAxisLabelRenderEventArgs, StockChartAllModule, ChartAllModule, RangeNavigatorAllModule } from '@syncfusion/ej2-angular-charts';
import { chartData } from './indicator-data';
import { loadStockChartTheme } from './theme-color';

/**
 * Sample for default stockchart
 */
@Component({
    selector: 'control-content',
    templateUrl: 'multi-pane.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ StockChartAllModule, ChartAllModule, RangeNavigatorAllModule]
})
export class MultiPaneComponent {

    public data1: Object[] = chartData;

    public primaryXAxis: Object = {
        valueType: 'DateTime', majorGridLines: { width: 0 }, crosshairTooltip: { enable: true }
    };

    public primaryYAxis: Object = {
        lineStyle: { color: 'transparent' },
        majorTickLines: { color: 'transparent', height: 0 }
    };
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public crosshair: Object = {
        enable: true
    };
    public legend: Object = {
        visible: true,
    };
    public tooltip: object = { enable: true, format:'High : <b>${point.high}</b><br/>Low :<b>${point.low}</b><br/>Open : <b>${point.open}</b><br/>Close : <b>${point.close}</b><br/>Volume : <b>${point.volume}</b>' };
    public columnTooltip: boolean = false;
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
        loadStockChartTheme(args);
    };
    public title: string = 'AAPL Historical';
    constructor() {
        //code
    }
}
