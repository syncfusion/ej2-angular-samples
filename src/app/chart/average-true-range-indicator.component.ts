import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-angular-charts';
import { chartData } from './financial-data';
import { Browser } from '@syncfusion/ej2-base';

/**
 * Sample for ATR indicator
 */
@Component({
    selector: 'control-content',
    templateUrl: 'average-true-range-indicator.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class AtrIndicatorComponent {
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
        labelFormat: '${value}',
        minimum: 50, maximum: 170,
        interval: 30, rowIndex: 1,
        plotOffset: 25,
        majorGridLines: { width: 1 }, opposedPosition: true, lineStyle: { width: 0 }
    };
    //Initializing Rows
    public rows: Object = [
        {
            height: '40%'
        }, {
            height: '60%'
        }
    ];

    //Initializing Axes
    public axes: Object = [{
        name: 'secondary',
        opposedPosition: true, rowIndex: 0,
        majorGridLines: { width: 0 }, lineStyle: { width: 0 }, majorTickLines: { width: 0 },
        maximum: 14, minimum: 0, interval: 7, title: 'ATR',
        stripLines: [
            {
                start: 0, end: 14, text: '', color: '#6063ff', visible: true,
                opacity: 0.1, zIndex: 'Behind'
            }]

    }];
    //Initializing Zooming
    public zoomSettings: Object = {

        enableSelectionZooming: true,
        mode: 'X',
        enablePan : true
    };
    //Initializing Chart Title
    public title: string = 'AAPL 2012-2017';
    public tooltip: Object = {
        enable: true,
        shared: true
    };
    //Initializing Crosshair
    public crosshair: Object = {
        enable: true, lineType: 'Vertical'
    };
    public chartArea: Object = {
        border: { width: 0 }
    };
    public legendSettings: Object = {
        visible: false
    };
    public period: number = 3;
    public width: string = Browser.isDevice ? '100%' : '80%';
       // custom code start
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