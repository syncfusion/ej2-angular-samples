import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-ng-charts';
import { chartData } from './financial-data';
import { Browser } from '@syncfusion/ej2-base';
/**
 * Sample for MACD Indicator
 */
@Component({
    selector: 'control-content',
    templateUrl: 'macd.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class MacdIndicatorComponent {
    public data1: Object[] = chartData;
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'DateTime',
        intervalType: 'Months', majorGridLines: { width: 0 },
        skeleton: 'yMd',
        crosshairTooltip: { enable: true }, zoomFactor: 0.2, zoomPosition: 0.6
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        title: 'Price',
        labelFormat: '${value}',
        plotOffset: 25,
        minimum: 50, maximum: 170,
        interval: 30, rowIndex: 1, opposedPosition: true, lineStyle: { width: 0 }
    };
    public rows: Object = [
        {
            height: '40%'
        }, {
            height: '60%'
        }
    ];

    public axes: Object = [{
        name: 'secondary',
        opposedPosition: true, rowIndex: 0,
        majorGridLines: { width: 0 }, lineStyle: { width: 0 }, minimum: -3.5, maximum: 3.5, interval: 3.5,
        majorTickLines: { width: 0 }, title: 'MACD', stripLines: [
            {
                start: -3.5, end: 3.5, text: '', color: 'black', visible: true,
                opacity: 0.03, zIndex: 'Behind'
            }]

    }];
    public zoomSettings: Object = {
        enableMouseWheelZooming: true,
        enablePinchZooming: true,
        enableSelectionZooming: true,
        mode: 'X'
    };
    public title: string = 'AAPL 2012-2017';
    public tooltip: Object = {
        enable: true,
        shared: true
    };
    public crosshair: Object = {
        enable: true, lineType: 'Vertical'
    };
    public fastPeriod: number = 8;
    public slowPeriod: number = 5;
    public macdType: string = 'Both';

    public legendSettings: Object = {
        visible: false
    };
    public period: number = 3;
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public width: string = Browser.isDevice ? '100%' : '80%';
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    };
    constructor() {
        //code
    };

}