import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ChartTheme, IRangeLoadedEventArgs, DateTime, AreaSeries, IChangedEventArgs,
    RangeTooltip, Chart } from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
import { axesData } from './stock-data';

/**
 * Sample for range navigator with RTL support
 */

let selectedTheme: string = location.hash.split('/')[1];
selectedTheme = selectedTheme ? selectedTheme : 'Material';
let theme: ChartTheme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
let themes: string[] = ['Material', 'Fabric', 'Bootstrap', 'Highcontrast'];
let borderColor: string[] = ['#00bdae', '#4472c4', '#a16ee5', '#79ECE4'];
let regionColor: string[] = ['rgba(0, 189, 174, 0.3)', 'rgba(68, 114, 196, 0.3)',
    'rgba(161, 110, 229, 0.3)', 'rgba(121, 236, 228, 0.3)'];

@Component({
    selector: 'control-content',
    templateUrl: 'rtl.html',
    encapsulation: ViewEncapsulation.None
})

export class RTLComponent {
    @ViewChild('chartRtl')
    public Chart: Chart;
    public primaryXAxis: Object = {
        valueType: 'DateTime', crosshairTooltip: { enable: true }, edgeLabelPlacement: 'Shift',
                isInversed: true, majorGridLines: { width: 0 }
    };

    public dataSource: Object = axesData;

    public chartArea: Object = { border: { width: 0 } };

    public tooltip:Object= { enable: true, displayMode: 'Always' };

    public fill: string = 'url(#' + theme.toLowerCase() + '-gradient-chart)';

    public border: Object = { width: 2, color: borderColor[themes.indexOf(theme)] };

    public primaryYAxis: Object = { majorTickLines: { width: 0 }, lineStyle: { width: 0 }, labelFormat: '{value}%',
    minimum: 82, maximum: 87, interval: 1, };

    public crosshair: Object = { enable: false, lineType: 'None'};

    public chartTooltip: Object = { enable: true, shared: true, header: '<b>England<b>' , format: '${point.x} : <b>${point.y}<b>' };

    public width: string = Browser.isDevice ? '100%' : '80%';

    public legendSettings: Object = { visible: false };

    public theme: ChartTheme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");

    public value: Object = [new Date(2014, 0, 1), new Date(2015, 11, 31)];

    public load(args: IRangeLoadedEventArgs) {
        args.rangeNavigator.rangeTooltipModule = new RangeTooltip(args.rangeNavigator);
    };

    public changed(args: IChangedEventArgs): void {
        this.Chart.primaryXAxis.zoomFactor = args.zoomFactor;
        this.Chart.primaryXAxis.zoomPosition = args.zoomPosition;
        this.Chart.dataBind();
    }

}