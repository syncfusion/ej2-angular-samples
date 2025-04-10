import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import {
    ChartTheme, ExportType, IRangeLoadedEventArgs, IChangedEventArgs, DateTime, AreaSeries,
    Chart, StepLineSeries, RangeNavigator, RangeTooltip, Points
} from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
import { chartData } from './stock-data';
import { RangeNavigatorAllModule, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { borderColor, loadRangeNavigatorTheme, themes } from './theme-colors';
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

let theme: ChartTheme = loadRangeNavigatorTheme();
    
@Component({
    selector: 'control-content',
    templateUrl: 'emptydata.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [RangeNavigatorAllModule, ChartAllModule]
})

export class RangeNavigatorEmptyPointComponent {
    @ViewChild('chartEmpty')
    public chart: Chart;
    public primaryXAxis:Object = {
        valueType: 'DateTime', crosshairTooltip: { enable: true },
        edgeLabelPlacement: 'Shift', majorGridLines: { width: 0 }
    };
    public fill: string = 'url(#' + theme.toLowerCase() + '-gradient-chart)';
    public border:Object= { width: 2, color: borderColor[themes.indexOf(theme.toLowerCase())] };
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
