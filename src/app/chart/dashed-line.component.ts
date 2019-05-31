import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';

/**
 * Sample for Line Series with dashed line
 */
@Component({
    selector: 'control-content',
    templateUrl: 'dashed-line.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class DashedLineChartComponent {
    public data: Object[] = [
        { x: new Date(2005, 0, 1), y: 12 }, { x: new Date(2006, 0, 1), y: 10.6 },
        { x: new Date(2007, 0, 1), y: 15.6 }, { x: new Date(2008, 0, 1), y: 38.6 },
        { x: new Date(2009, 0, 1), y: 27.4 }, { x: new Date(2010, 0, 1), y: 23.5 },
        { x: new Date(2011, 0, 1), y: 16.6 }
    ];
    public data1: Object[] = [
        { x: new Date(2005, 0, 1), y: 9.5 }, { x: new Date(2006, 0, 1), y: 19.9 },
        { x: new Date(2007, 0, 1), y: 25.2 }, { x: new Date(2008, 0, 1), y: 36 },
        { x: new Date(2009, 0, 1), y: 16.6 }, { x: new Date(2010, 0, 1), y: 14.2 }, { x: new Date(2011, 0, 1), y: 10.3 }
    ];
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'DateTime',
        labelFormat: 'y',
        intervalType: 'Years',
        edgeLabelPlacement: 'Shift',
        majorGridLines: { width: 0 }
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        labelFormat: '{value}%',
        rangePadding: 'None',
        lineStyle: { width: 0 },
        minimum: 0,
        maximum: 40,
        interval: 10,
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 }
    };
    //Initializing Marker
    public marker: Object = {
        visible: true,
        width: 10,
        height: 10
    };
    public marker1: Object = {
        visible: true,
        width: 10,
        height: 10,
        shape: 'Diamond'
    };
    public crosshair: Object = {
        enable: true,
        line: {
            color: 'rgba(204,214,235,0.25)',
            width: Browser.isDevice ? 50 : 20,
        },
        lineType: 'Vertical'
    };
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public width: string = Browser.isDevice ? '100%' : '60%';
    public tooltip: Object = {
        enable: true,
        shared: true
    };
      // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
      // custom code end
    public title: string = 'Fruits Production Statistics';
    constructor() {
        //code
    };

}