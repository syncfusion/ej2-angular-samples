import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ChartTheme, IRangeLoadedEventArgs, StepLineSeries, AreaSeries, Logarithmic,
     Chart, IChangedEventArgs, RangeTooltip, IRangeTooltipRenderEventArgs, ILabelRenderEventsArgs } from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
import { RangeNavigatorAllModule, ChartAllModule } from '@syncfusion/ej2-angular-charts';

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
selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
let theme: ChartTheme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
let logthemes: string[] = ['bootstrap5', 'bootstrap5dark', 'tailwind', 'tailwinddark', 'material', 'materialdark', 'bootstrap4', 'bootstrap', 'bootstrapdark', 'fabric', 'fabricdark', 'highcontrast', 'fluent', 'fluentDark', 'material3', 'material3dark', 'fluent2', 'fluent2highcontrast', 'fluent2dark'];
let borderColor : string[] = ['#FD7E14', '#FD7E14', '#5A61F6', '#8B5CF6', '#00bdae', '#9ECB08', '#a16ee5', '#a16ee5', '#a16ee5', '#4472c4', '#4472c4', '#79ECE4', '#1AC9E6', '#1AC9E6','#6355C7', '#4EAAFF', '#6200EE', '#9BB449', '#9BB449'];
let regionColor: string[] = ['rgba(99, 85, 199, 0.3)', 'rgba(143, 128, 244, 0.3)', 'rgba(90, 97, 246, 0.3)', 'rgba(139, 92, 246, 0.3)', 'rgba(0, 189, 174, 0.3)',
'rgba(158, 203, 8, 0.3)', 'rgba(161, 110, 229, 0.3)', 'rgba(161, 110, 229, 0.3)', 'rgba(161, 110, 229, 0.3)', 'rgba(68, 114, 196, 0.3)',
'rgba(68, 114, 196, 0.3)', 'rgba(121, 236, 228, 0.3)', 'rgba(26, 201, 230, 0.3)', 'rgba(26, 201, 230, 0.3)', 'rgba(99, 85, 199, 0.3)', 'rgba(78, 170, 255, 0.3)', 'rgba(98, 0, 238, 0.3)', 'rgba(155, 180, 73, 0.3)', 'rgba(155, 180, 73, 0.3)' ];
    
@Component({
    selector: 'control-content',
    templateUrl: 'logarithmic.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [RangeNavigatorAllModule, ChartAllModule]
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

    public theme: string = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');

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