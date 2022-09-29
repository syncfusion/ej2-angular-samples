import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ChartTheme, IRangeLoadedEventArgs, StepLineSeries, AreaSeries, Logarithmic,
     Chart, IChangedEventArgs, RangeTooltip, IRangeTooltipRenderEventArgs, ILabelRenderEventsArgs } from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';

/**
 * Sample for range navigator with logarithmic axis
 */
let data: object[] = [];
let max: number = 100;
for (let i: number = 0; i < 100; i++) {
    data.push({
        x: Math.pow(10, i * 0.1),
        y: Math.floor(Math.random() * (80 - 30 + 1)) + 30
    });
}

let selectedTheme: string = location.hash.split('/')[1];
selectedTheme = selectedTheme ? selectedTheme : 'Material';
let theme: ChartTheme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
let logthemes: string[] = ['bootstrap5', 'bootstrap5dark', 'tailwind', 'tailwinddark', 'material', 'materialdark', 'bootstrap4', 'bootstrap', 'bootstrapdark', 'fabric', 'fabricdark', 'highcontrast', 'fluent', 'fluentDark'];
let borderColor: string[] = ['#262E0B', '#5ECB9B', '#5A61F6', '#8B5CF6', '#00bdae', '#9ECB08', '#a16ee5', '#a16ee5', '#a16ee5', '#4472c4', '#4472c4', '#79ECE4', '#614570', '#8AB113'];
let regionColor: string[] = ['rgba(38, 46, 11, 0.3)', 'rgba(94, 203, 155, 0.3)', 'rgba(90, 97, 246, 0.3)', 'rgba(139, 92, 246, 0.3)', 'rgba(0, 189, 174, 0.3)',
'rgba(158, 203, 8, 0.3)', 'rgba(161, 110, 229, 0.3)', 'rgba(161, 110, 229, 0.3)', 'rgba(161, 110, 229, 0.3)', 'rgba(68, 114, 196, 0.3)',
'rgba(68, 114, 196, 0.3)', 'rgba(121, 236, 228, 0.3)'];
    
@Component({
    selector: 'control-content',
    templateUrl: 'logarithmic.html',
    encapsulation: ViewEncapsulation.None
})

export class LogarthmicComponent {
    @ViewChild('chartLog')
    public Chart: Chart;
    public primaryXAxis: Object = {
        valueType: 'Logarithmic',  interval: 1,
        edgeLabelPlacement: 'Shift', majorGridLines: { width: 0 }, title: 'Numbers of Goods Consumers',
    };

    public dataSource: Object = data;

    public chartArea: Object = { border: { width: 0 } };

    public primaryYAxis: Object = { title: 'Inflation', minimum: 0, maximum: 100, labelFormat: '{value}%',
           majorTickLines: { width: 0 }, lineStyle: { width: 0 } };

    public chartHeight: string = '350';

    public width: string = Browser.isDevice ? '100%' : '80%';

    public fill: string = 'url(#' + theme.toLowerCase() + '-gradient-chart)';

    public border: Object = { width: 2, color: borderColor[logthemes.indexOf(theme.toLowerCase())] };

    public marker: Object = { visible: true };

    public tooltip: Object = { enable: true };

    public interval: number = 1;

    public theme: string = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");

    public value: Object = [4, 6];

    public changed(args: IChangedEventArgs): void {
        this.Chart.primaryXAxis.zoomFactor = args.zoomFactor;
        this.Chart.primaryXAxis.zoomPosition = args.zoomPosition;
        this.Chart.dataBind();
    };

    public load(args: IRangeLoadedEventArgs) {
        args.rangeNavigator.rangeTooltipModule = new RangeTooltip(args.rangeNavigator);
    };

    public labelRender(args: ILabelRenderEventsArgs): void {
        args.text = (+args.text).toExponential().toLocaleUpperCase();
    };

    public tooltipRender(args: IRangeTooltipRenderEventArgs): void {
        args.text = [(+(+args.text).toFixed(1)).toExponential(1).toString().toLocaleUpperCase()];
    }

}