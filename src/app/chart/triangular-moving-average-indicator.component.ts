import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme, TechnicalIndicatorModel } from '@syncfusion/ej2-angular-charts';
import { chartValue } from './financial-data';
import { Browser } from '@syncfusion/ej2-base';
/**
 * Sample for TMA Indicator
 */
@Component({
    selector: 'control-content',
    templateUrl: 'triangular-moving-average-indicator.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class TmaIndicatorComponent {
    public period: number = 14;
    // indicators
    public indicators: TechnicalIndicatorModel[] = [
        {
            type: 'Tma',
            field: 'Close',
            fill: 'blue',
            period: this.period,
            seriesName: 'Apple Inc',
        }
    ];

    public data1: Object[] = chartValue;
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'DateTime',
        majorGridLines: { width: 0 },
        zoomFactor: 0.2, zoomPosition: 0.6,
        crosshairTooltip: { enable: true },
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        title: 'Price (In Million)',
        labelFormat: '${value}M',
        minimum: 50, maximum: 170, interval: 30,
        majorGridLines: { width: 1 }, lineStyle: { width: 0 }
    };
    //Initializing Zooming
    public zoomSettings: Object = {

        enableSelectionZooming: true,
        mode: 'X',
        enablePan : true
    };
    public title: string = 'AAPL Stock Price 2012-2017';
    public tooltip: Object = {
        enable: true,
        shared: true
    };
    public crosshair: Object = {
        enable: true, lineType: 'Vertical'
    };
    public animation: Object = {
        enable: false
    };
    public legendSettings: Object = {
        visible: false
    };
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
 // custom code start
    public width: string = Browser.isDevice ? '100%' : '75%';
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
 // custom code end
    constructor() {
        //code
    };

}