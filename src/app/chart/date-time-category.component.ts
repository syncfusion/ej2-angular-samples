import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';

/**
 * Sample for DateTime Axis
 */
@Component({
    selector: 'control-content',
    templateUrl: 'date-time-category.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class DateTimeCategoryAxisChartComponent {
    public data1: Object[] =  [
        { x: new Date(2017, 11, 20), y: 21 }, { x: new Date(2017, 11, 21), y: 24 },
        { x: new Date(2017, 11, 22), y: 24 }, { x: new Date(2017, 11, 26), y: 70 },
        { x: new Date(2017, 11, 27), y: 75 }, { x: new Date(2018, 0, 2), y: 82 },
        { x: new Date(2018, 0, 3), y: 53 }, { x: new Date(2018, 0, 4), y: 54 },
        { x: new Date(2018, 0, 5), y: 53 }, { x: new Date(2018, 0, 8), y: 45 }
    ];
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'DateTimeCategory',
        intervalType: 'Days',
        skeleton: 'Ed',
        edgeLabelPlacement: 'Shift',
        majorGridLines: { width: 0 },
        stripLines: [
            { visible: true, start: new Date(2017, 11, 20), end: new Date(2017, 11, 27), color: 'skyblue', opacity: 0.5, },
            { visible: true, start: new Date(2018, 0, 2), end: new Date(2018, 0, 8), color: 'pink', opacity: 0.5 },
        ],
        title: 'Business Days'
    };
    //Initializing Primary X Axis
    public primaryYAxis: Object = {
        labelFormat: '{value}M',
        rangePadding: 'None',
        minimum: 0,
        maximum: 100,
        interval: 20,
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 },
    };
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public tooltip: Object  = {
        enable: true
    };
    public width: string = Browser.isDevice ? '100%' : '60%';
    public legendSettings: Object = { visible: false };
    public x: Date = new Date(2017, 11, 22);
    public x1: Date = new Date(2018, 0, 4);
    public y: number = 90;
      // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
          if (selectedTheme === 'highcontrast') {
args.chart.annotations[0].content = '<div style="color:#ffffff;font-family: bold; font-weight: 600">Christmas Offer<br> Dec 2017</div>';
args.chart.annotations[1].content = '<div style="color:#ffffff;font-family: bold; font-weight: 600">Christmas Offer<br> Dec 2017</div>';
            }
    };
      // custom code end
    public title: string = 'Sales Comparison of a Product';
    constructor() {
        //code
    };

}