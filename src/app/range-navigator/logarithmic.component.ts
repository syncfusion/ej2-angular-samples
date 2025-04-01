import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ChartTheme, IRangeLoadedEventArgs, StepLineSeries, AreaSeries, Logarithmic,
     Chart, IChangedEventArgs, RangeTooltip, IRangeTooltipRenderEventArgs, ILabelRenderEventsArgs } from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
import { RangeNavigatorAllModule, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { borderColor, loadRangeNavigatorTheme, themes } from './theme-colors';

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

let theme: ChartTheme = loadRangeNavigatorTheme();;

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

    public border: Object = { width: 2, color: borderColor[themes.indexOf(theme.toLowerCase())] };

    public marker: Object = { visible: true };

    public tooltip: Object = { enable: true };

    public interval: number = 1;

    public theme: string = theme;

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