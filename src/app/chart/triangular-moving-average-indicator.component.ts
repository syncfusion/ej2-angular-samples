import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-angular-charts';
import { chartData } from './financial-data';
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

    public data1: Object[] = chartData;
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'DateTime',
        majorGridLines: { width: 0 },
        zoomFactor: 0.2, zoomPosition: 0.6,
        crosshairTooltip: { enable: true },
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        title: 'Price',
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
    public title: string = 'AAPL 2012-2017';
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
    public period: number = 14;
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
 // custom code start
    public width: string = Browser.isDevice ? '100%' : '80%';
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