import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';

/**
 * Sample for Spline Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'spline-inversed.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class InversedSplineChartComponent {
    public data: Object[] = [
        { x: 'Jan', y: -1 }, { x: 'Mar', y: 12 },
        { x: 'Apr', y: 25 },
        { x: 'Jun', y: 31 },
        { x: 'Aug', y: 26 }, { x: 'Oct', y: 14 },
        { x: 'Dec', y: 8 },
    ];
    public data1: Object[] = [
        { x: 'Jan', y: 7 }, { x: 'Mar', y: 2 },
        { x: 'Apr', y: 13 },
        { x: 'Jun', y: 21 },
        { x: 'Aug', y: 26 }, { x: 'Oct', y: 10 },
        { x: 'Dec', y: 0 },
    ];
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Category',
        interval: 1,
        labelIntersectAction: 'Rotate90',
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 }
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        labelFormat: '{value}°C',
        majorGridLines: { width: 0 }
    };
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public marker: Object = {
        visible: true,
        height: 10,
        width: 10
    };
    //Initializing Tooltip
    public tooltip: Object = {
        enable: true
    };
     // custom code start
    public width: string = Browser.isDevice ? '100%' : '60%';
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
     // custom code end
    public title: string = 'Climate Graph - 2012';
    constructor() {
       //code
    };

}