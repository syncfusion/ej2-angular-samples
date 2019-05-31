import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';

/**
 * Sample for Step line Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'step-line.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class StepLineChartComponent {

    public data: Object[] = [
        { x: new Date(1975, 0, 1), y: 16 },
        { x: new Date(1980, 0, 1), y: 12.5 },
        { x: new Date(1985, 0, 1), y: 19 },
        { x: new Date(1990, 0, 1), y: 14.4 },
        { x: new Date(1995, 0, 1), y: 11.5 },
        { x: new Date(2000, 0, 1), y: 14 },
        { x: new Date(2005, 0, 1), y: 10 },
        { x: new Date(2010, 0, 1), y: 16 }
    ];
    public data1: Object[] = [
        { x: new Date(1975, 0, 1), y: 10 },
        { x: new Date(1980, 0, 1), y: 7.5 },
        { x: new Date(1985, 0, 1), y: 11 },
        { x: new Date(1990, 0, 1), y: 7 },
        { x: new Date(1995, 0, 1), y: 8 },
        { x: new Date(2000, 0, 1), y: 6 },
        { x: new Date(2005, 0, 1), y: 3.5 },
        { x: new Date(2010, 0, 1), y: 7 }
    ];
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public width: string = Browser.isDevice ? '100%' : '60%';
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        labelFormat: 'y',
        intervalType: 'Years',
        majorGridLines: { width: 0 },
        valueType: 'DateTime',
        edgeLabelPlacement: 'Shift'
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        lineStyle: { width: 0 },
        interval: 5,
        majorTickLines: { width: 0 },
        labelFormat: '{value}%'
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
    public title: string = 'Unemployment Rates 1975-2010';
    constructor() {
        //code
    };

}