import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import {
    ChartTheme, IRangeLoadedEventArgs, DateTime, AreaSeries, IChangedEventArgs,
    RangeTooltip, Chart, ITooltipRenderEventArgs, withInBounds, IAxisLabelRenderEventArgs
} from '@syncfusion/ej2-charts';
import { Browser, remove } from '@syncfusion/ej2-base';
import { getElement } from '@syncfusion/ej2-svg-base/src/tooltip/helper';
import { stockData } from './stock-data';

/**
 * Sample for range navigator with datetime axis
 */

let selectedTheme: string = location.hash.split('/')[1];
selectedTheme = selectedTheme ? selectedTheme : 'Material';
let theme: ChartTheme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
let datethemes: string[] = ['bootstrap5', 'bootstrap5dark', 'tailwind', 'tailwinddark', 'material', 'materialdark', 'bootstrap4', 'bootstrap', 'bootstrapdark', 'fabric', 'fabricdark', 'highcontrast'];
let borderColor: string[] = ['#262E0B', '#5ECB9B', '#5A61F6', '#8B5CF6', '#00bdae', '#9ECB08', '#a16ee5', '#a16ee5', '#a16ee5', '#4472c4', '#4472c4', '#79ECE4'];
let regionColor: string[] = ['rgba(38, 46, 11, 0.3)', 'rgba(94, 203, 155, 0.3)', 'rgba(90, 97, 246, 0.3)', 'rgba(139, 92, 246, 0.3)', 'rgba(0, 189, 174, 0.3)',
'rgba(158, 203, 8, 0.3)', 'rgba(161, 110, 229, 0.3)', 'rgba(161, 110, 229, 0.3)', 'rgba(161, 110, 229, 0.3)', 'rgba(68, 114, 196, 0.3)',
'rgba(68, 114, 196, 0.3)', 'rgba(121, 236, 228, 0.3)'];
    
@Component({
    selector: 'control-content',
    templateUrl: 'date-time.html',
    encapsulation: ViewEncapsulation.None
})

export class DateTimeComponent {
    @ViewChild('chart')
    public Chart: Chart;
    public primaryXAxis: Object = {
        valueType: 'DateTime',
        edgeLabelPlacement: 'Shift', majorGridLines: { width: 0 },
    };

    public dataSource: Object[] = stockData;

    public chartArea: Object = { border: { width: 0 } };

    public primaryYAxis: Object = { labelFormat: 'n1', minimum: 0.6,
           maximum: 1, interval: 0.1, majorTickLines: { width: 0 }, lineStyle: { width: 0 } };

    public crosshair: Object = { enable: false, lineType: 'None'};

    public chartTooltip: Object = { enable: true, shared: true };

    public chartHeight: string = '350';

    public width: string = Browser.isDevice ? '100%' : '80%';

    public axisLabelRender(args: IAxisLabelRenderEventArgs): void {
        if (args.axis.name === 'primaryYAxis') {
            args.text = '€' + args.text;
        }
    };

    public load(args: IRangeLoadedEventArgs) {
    args.rangeNavigator.rangeTooltipModule = new RangeTooltip(args.rangeNavigator);
    };
    public theme: ChartTheme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");

    public rangeMajorTickLines: Object = { width: 0 };

    public value: Object = [new Date('2011-01-01'), new Date('2013-12-31')];

    public tooltip: Object = { enable: true, format: 'yyyy/MM/dd' , displayMode: 'Always' };

    public fill: string = 'url(#' + theme.toLowerCase() + '-gradient-chart)';

    public border: Object = { width: 2, color: borderColor[datethemes.indexOf(theme.toLowerCase())] };

    public legendSettings: Object = { visible: false };

    public changed(args: IChangedEventArgs): void {
        this.Chart.primaryXAxis.zoomFactor = args.zoomFactor;
        this.Chart.primaryXAxis.zoomPosition = args.zoomPosition;
        this.Chart.dataBind();
    }
}