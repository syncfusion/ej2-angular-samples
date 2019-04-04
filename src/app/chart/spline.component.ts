import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';

/**
 * Sample for Spline Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'spline.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class SplineChartComponent {

    public data: Object[] = [
        { x: 'Sun', y: 15 }, { x: 'Mon', y: 22 },
        { x: 'Tue', y: 32 },
        { x: 'Wed', y: 31 },
        { x: 'Thu', y: 29 }, { x: 'Fri', y: 24 },
        { x: 'Sat', y: 18 },
    ];
    public data1: Object[] = [
        { x: 'Sun', y: 10 }, { x: 'Mon', y: 18 },
        { x: 'Tue', y: 28 },
        { x: 'Wed', y: 28 },
        { x: 'Thu', y: 26 }, { x: 'Fri', y: 20 },
        { x: 'Sat', y: 15 }
    ];
    public data2: Object[] = [
        { x: 'Sun', y: 2 }, { x: 'Mon', y: 12 },
        { x: 'Tue', y: 22 },
        { x: 'Wed', y: 23 },
        { x: 'Thu', y: 19 }, { x: 'Fri', y: 13 },
        { x: 'Sat', y: 8 },
    ];
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public width: string = Browser.isDevice ? '100%' : '60%';
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Category',
        interval: 1, majorGridLines: { width: 0 },
        labelIntersectAction: 'Rotate90'
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        labelFormat: '{value}°C',
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 }
    };
    public marker: Object = {
        visible: true,
        width: 10,
        height: 10
    };
    public tooltip: Object = {
        enable: true
    };
     // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
     // custom code end
    public title: string = 'NC Weather Report - 2016';
    constructor() {
        //code
    };

}