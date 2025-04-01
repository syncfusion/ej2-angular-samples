import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadChartTheme } from './theme-color';

/**
 * Sample for DateTime Axis
 */
@Component({
    selector: 'control-content',
    templateUrl: 'date-time-category.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
})
export class DateTimeCategoryAxisChartComponent {
    public data1: Object[] =  [
        { x: new Date(2017, 11, 20), y: 21, DataLabelMappingName: "21M" }, { x: new Date(2017, 11, 21), y: 24, DataLabelMappingName: "24M" },
        { x: new Date(2017, 11, 22), y: 24, DataLabelMappingName: "24M" }, { x: new Date(2017, 11, 26), y: 70, DataLabelMappingName: "70M" },
        { x: new Date(2017, 11, 27), y: 75, DataLabelMappingName: "75M" }, { x: new Date(2018, 0, 2), y: 82, DataLabelMappingName: "82M" },
        { x: new Date(2018, 0, 3), y: 53, DataLabelMappingName: "53M" }, { x: new Date(2018, 0, 4), y: 54, DataLabelMappingName: "54M" },
        { x: new Date(2018, 0, 5), y: 53, DataLabelMappingName: "53M" }, { x: new Date(2018, 0, 8), y: 45, DataLabelMappingName: "45M" }
    ];
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'DateTimeCategory',
        intervalType: 'Days',
        skeleton: 'Ed',
        majorGridLines: { width: 0 },
        stripLines: [
            { visible: true, start: new Date(2017, 11, 20), end: new Date(2017, 11, 27), color: 'skyblue', opacity: 0.5, },
            { visible: true, start: new Date(2018, 0, 2), end: new Date(2018, 0, 8), color: 'pink', opacity: 0.5 },
        ],
        title: 'Business Days',
        labelIntersectAction: Browser.isDevice ? 'None' : 'Rotate45',
        labelRotation: Browser.isDevice ? -45 : 0
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
    public marker: Object = { dataLabel: { visible: true, position: 'Top', enableRotation: Browser.isDevice ? true : false, angle: -90, name: 'DataLabelMappingName' } }
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public tooltip: Object  = {
        enable: false
    };
    public width: string = Browser.isDevice ? '100%' : '75%';
    public legendSettings: Object = { visible: false };
    public x: Date = new Date(2017, 11, 22);
    public x1: Date = new Date(2018, 0, 4);
    public y: number = 90;
      // custom code start
    public load(args: ILoadedEventArgs): void {
        loadChartTheme(args);
        if (args.chart.theme === 'HighContrast') {
            args.chart.annotations[0].content = '<div style="color:#ffffff;font-family: bold; font-weight: 600">Christmas Offer<br> Dec 2017</div>';
            args.chart.annotations[1].content = '<div style="color:#ffffff;font-family: bold; font-weight: 600">New Year Offer<br> Jan 2018</div>';
        }
    };
      // custom code end
    public title: string = 'Sales Comparison of a Product';
    constructor() {
        //code
    };

}