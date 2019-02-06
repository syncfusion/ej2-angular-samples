import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import {
    ChartTheme, ExportType, IRangeLoadedEventArgs, IChangedEventArgs, DateTime, AreaSeries,
    Chart, StepLineSeries, RangeNavigator, RangeTooltip, Points
} from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
import { chartData } from './stock-data';

/**
 * Sample for empty points
 */
let stockData: Object[] = [];
let startDate: Date = new Date(2012, 4, 2);
for (let i: number = 0; i <= 250; i++) {
    stockData.push(chartData[i]);
    if (i > 45 && 50 > i) {
        (stockData[i] as Points).open = null;
    } else if (i > 95 && 100 > i) {
        (stockData[i] as Points).open = null;
    } else if (i > 145 && 150 > i) {
        (stockData[i] as Points).open = null;
    } else if (i > 195 && 200 > i) {
        (stockData[i] as Points).open = null;
    } else if (i > 245 && 250 > i) {
        (stockData[i] as Points).open = null;
    }
}
let selectedTheme: string = location.hash.split('/')[1];
selectedTheme = selectedTheme ? selectedTheme : 'Material';
let theme: ChartTheme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
let themes: string[] = ['Material', 'Fabric', 'Bootstrap', 'Highcontrast'];
let borderColor: string[] = ['#00bdae', '#4472c4', '#a16ee5', '#79ECE4'];
let regionColor: string[] = ['rgba(0, 189, 174, 0.3)', 'rgba(68, 114, 196, 0.3)',
    'rgba(161, 110, 229, 0.3)', 'rgba(121, 236, 228, 0.3)'];

@Component({
    selector: 'control-content',
    templateUrl: 'emptydata.html',
    encapsulation: ViewEncapsulation.None
})

export class RangeNavigatorEmptyPointComponent {
    @ViewChild('chartEmpty')
    public chart: Chart;
    public primaryXAxis:Object = {
        valueType: 'DateTime', crosshairTooltip: { enable: true },
        edgeLabelPlacement: 'Shift', majorGridLines: { width: 0 }
    };
    public fill: string = 'url(#' + theme.toLowerCase() + '-gradient-chart)';
    public border:Object= { width: 2, color: borderColor[themes.indexOf(theme)] };
    public chartArea: Object= { border: { width: 0 } };
    public primaryYAxis: Object = { labelFormat: '${value}', minimum: 40, maximum: 140, interval: 20,
           majorTickLines: { width: 0 }, lineStyle: { width: 0 } };
    public crosshair: Object = { enable: false, lineType: 'None'};
    public chartTooltip: Object = { enable: true, shared: true };
    public width: string = Browser.isDevice ? '100%' : '80%';
    public majorTickLines: Object = { width: 0 };
    public majorGridLines: Object = { width: 0 };
    public tooltip: Object = { enable: true, displayMode: 'Always'};
    public legendSettings: Object = { visible: false };
    public value: Object = [new Date('2013-12-27'), new Date('2015-03-23')];
    public navigatorBorder:Object = { width: 0 };
    public changed(args: IChangedEventArgs): void {
        this.chart.primaryXAxis.zoomFactor = args.zoomFactor;
        this.chart.primaryXAxis.zoomPosition = args.zoomPosition;
        this.chart.dataBind();
    };
    public load(args: IRangeLoadedEventArgs) {
    args.rangeNavigator.rangeTooltipModule = new RangeTooltip(args.rangeNavigator);
    };
    public themes: string = theme;
    public data: Object = stockData;
}
