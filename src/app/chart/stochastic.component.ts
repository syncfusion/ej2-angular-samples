import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-angular-charts';
import { chartData } from './financial-data';
import { Browser } from '@syncfusion/ej2-base';

/**
 * Sample for Stochastic Indicator
 */
@Component({
    selector: 'control-content',
    templateUrl: 'stochastic.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class StochasticIndicatorComponent {
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
        plotOffset: 25,
        interval: 30, rowIndex: 1, opposedPosition: true, lineStyle: { width: 0 }
    };
    public rows: Object = [
        {
            height: '40%'
        }, {
            height: '60%'
        }
    ];
    public showZones: boolean = true;
    public kPeriod: number = 2;
    public dPeriod: number = 3;
    public periodLine: string = 'yellow';
    public upperLine: string = 'red';
    public lowerLine: string = 'green';
    public axes: Object = [{
        name: 'secondary',
        opposedPosition: true, rowIndex: 0,
        majorGridLines: { width: 0 }, lineStyle: { width: 0 }, minimum: 0, maximum: 120, interval: 60,
        majorTickLines: { width: 0 }, title: 'Stochastic', stripLines: [
            {
                start: 0, end: 120, text: '', color: 'black', visible: true,
                opacity: 0.03, zIndex: 'Behind'
            }]

    }];
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