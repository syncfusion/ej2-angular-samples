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
        { Month : 2000, LDN_Temperature : -1, FR_Temperature : 10 },
        { Month : 2002, LDN_Temperature : -1, FR_Temperature : 7 },
        { Month : 2004, LDN_Temperature : 25, FR_Temperature : 13 },
        { Month : 2005, LDN_Temperature : 31, FR_Temperature : 16 },
        { Month : 2007, LDN_Temperature : 14, FR_Temperature : 11 },
        { Month : 2010, LDN_Temperature : 8, FR_Temperature : 10 },
        { Month : 2011, LDN_Temperature : 8, FR_Temperature : 15 },
        { Month : 2013, LDN_Temperature : 8, FR_Temperature : 20 },
        { Month : 2014, LDN_Temperature : 8, FR_Temperature : 17 },
        { Month : 2015, LDN_Temperature : 8, FR_Temperature : 5 }
    ];

    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        title: 'Years',
        valueType: 'Double',
        maximum: 2016,
        minimum: 2000,
        interval: 4,
        minorTickLines: { width: 0 }
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        title: 'Sales (In Millions)',
        edgeLabelPlacement: 'Shift', 
        maximum: 25,
        minimum: 0,
        interval: 5,
        labelFormat: '{value}M',
    };
    public chartArea: Object = {
        border: {
            width: 1
        }
    };
    public marker: Object = {
        visible: true,
        height: 7,
        width: 7,
        isFilled: true
    };
    //Initializing Tooltip
    public tooltip: Object = {
        enable: true,
        header: "<b>Album Sale</b>",
        shared: true,
        format: '${point.x}: <b>${point.y}</b>',
    };
     // custom code start
    public width: string = Browser.isDevice ? '100%' : '75%';
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast');
    };
     // custom code end
    public title: string = 'Music Album Sales';
    constructor() {
       //code
    };

}