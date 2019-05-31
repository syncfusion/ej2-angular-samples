import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';

/**
 * Sample for Multiple Axes
 */
@Component({
    selector: 'control-content',
    templateUrl: 'multiple-axis.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class MultipleAxisChartComponent {
    public data: Object[] = [
        { x: 'Sun', y: 35 }, { x: 'Mon', y: 40 },
        { x: 'Tue', y: 80 }, { x: 'Wed', y: 70 }, { x: 'Thu', y: 65 }, { x: 'Fri', y: 55 },
        { x: 'Sat', y: 50 }
    ];
    public data1: Object[] = [
        { x: 'Sun', y: 30 }, { x: 'Mon', y: 28 },
        { x: 'Tue', y: 29 }, { x: 'Wed', y: 30 }, { x: 'Thu', y: 33 }, { x: 'Fri', y: 32 },
        { x: 'Sat', y: 34 }
    ];
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Category',
        interval: 1,
        labelIntersectAction: 'Rotate90',
        majorGridLines: { width: 0 }
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        minimum: 0, maximum: 100, interval: 20,
        lineStyle: { width: 0 },
        labelFormat: '{value}°F'
    };
    public chartArea: Object = {
        border: {
            width: 0
        }
    };

    public width: string = Browser.isDevice ? '100%' : '60%';
    // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
    // custom code end
    public legend: Object = {
        visible: false
    }
    public marker: Object = {
        visible: true,
        width: 10,
        height: 10,
        border: { width: 2, color: '#F8AB1D' }
    };
    public axis: Object = [{
        majorGridLines: { width: 0 },
        majorTickLines: { width: 0 },
        rowIndex: 0, opposedPosition: true,
        lineStyle: { width: 0 },
        minimum: 24, maximum: 36, interval: 2,
        name: 'yAxis',
        labelFormat: '{value}°C'
    }];
    public majorGridLines: Object = {
        width: 0
    };
    public tooltip: Object = {
        enable: true
    };
    public title: string = 'Weather Condition JPN vs DEU';
    constructor() {
        //code
    };

}