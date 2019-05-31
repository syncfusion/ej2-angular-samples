import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';

/**
 * Sample for Area Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'spline-area.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class SplineAreaChartComponent {
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public width: string = Browser.isDevice ? '100%' : '60%';
    public data: Object[] = [
        { x: new Date(2002, 0, 1), y: 2.2 }, { x: new Date(2003, 0, 1), y: 3.4 },
        { x: new Date(2004, 0, 1), y: 2.8 }, { x: new Date(2005, 0, 1), y: 1.6 },
        { x: new Date(2006, 0, 1), y: 2.3 }, { x: new Date(2007, 0, 1), y: 2.5 },
        { x: new Date(2008, 0, 1), y: 2.9 }, { x: new Date(2009, 0, 1), y: 3.8 },
        { x: new Date(2010, 0, 1), y: 1.4 }, { x: new Date(2011, 0, 1), y: 3.1 }
    ];
    public data1: Object[] = [
        { x: new Date(2002, 0, 1), y: 2 }, { x: new Date(2003, 0, 1), y: 1.7 },
        { x: new Date(2004, 0, 1), y: 1.8 }, { x: new Date(2005, 0, 1), y: 2.1 },
        { x: new Date(2006, 0, 1), y: 2.3 }, { x: new Date(2007, 0, 1), y: 1.7 },
        { x: new Date(2008, 0, 1), y: 1.5 }, { x: new Date(2009, 0, 1), y: 2.8 },
        { x: new Date(2010, 0, 1), y: 1.5 }, { x: new Date(2011, 0, 1), y: 2.3 }
    ];
    public data2: Object[] = [
        { x: new Date(2002, 0, 1), y: 0.8 }, { x: new Date(2003, 0, 1), y: 1.3 },
        { x: new Date(2004, 0, 1), y: 1.1 }, { x: new Date(2005, 0, 1), y: 1.6 },
        { x: new Date(2006, 0, 1), y: 2 }, { x: new Date(2007, 0, 1), y: 1.7 },
        { x: new Date(2008, 0, 1), y: 2.3 }, { x: new Date(2009, 0, 1), y: 2.7 },
        { x: new Date(2010, 0, 1), y: 1.1 }, { x: new Date(2011, 0, 1), y: 2.3 }
    ];
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'DateTime',
        labelFormat: 'y',
        majorGridLines: { width: 0 },
        intervalType: 'Years',
        edgeLabelPlacement: 'Shift'
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        labelFormat: '{value}%',
        lineStyle: { width: 0 },
        maximum: 4,
        interval: 1,
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 }
    };
    public marker: Object = {
        visible: false
    };
     // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
     // custom code end
    //Initializing Chart Title
    public title: string = 'Inflation Rate in Percentage';
    constructor() {
        // code
     };
}