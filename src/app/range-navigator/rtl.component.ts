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
let theme: ChartTheme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast');
let rtlthemes: string[] =  ['bootstrap5', 'bootstrap5dark', 'tailwind', 'tailwinddark', 'material', 'materialdark', 'bootstrap4', 'bootstrap', 'bootstrapdark', 'fabric', 'fabricdark', 'highcontrast', 'fluent', 'fluentDark', 'material3', 'material3dark'];
let borderColor: string[] = ['#6355C7', '#8F80F4', '#5A61F6', '#8B5CF6', '#00bdae', '#9ECB08', '#a16ee5', '#a16ee5', '#a16ee5', '#4472c4', '#4472c4', '#79ECE4', '#1AC9E6', '#1AC9E6', '#6355C7', '#4EAAFF'];

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
                majorGridLines: { width: 0 }
    };

    public dataSource: Object = axesData;

    public chartArea: Object = { border: { width: 0 } };

    public tooltip:Object= { enable: true, displayMode: 'Always' };

    public fill: string = 'url(#' + theme.toLowerCase() + '-gradient-chart)';

    public border: Object = { width: 2, color: borderColor[rtlthemes.indexOf(theme.toLowerCase())] };

    public primaryYAxis: Object = { majorTickLines: { width: 0 }, lineStyle: { width: 0 }, labelFormat: '{value}%',
    minimum: 82, maximum: 87, interval: 1, };

    public crosshair: Object = { enable: false, lineType: 'None'};

    public chartTooltip: Object = { enable: true, shared: true, header: '<b>England</b>' , format: '${point.x} : <b>${point.y}</b>' };

    public width: string = Browser.isDevice ? '100%' : '80%';

    public legendSettings: Object = { visible: false };

    public theme: ChartTheme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast');;

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