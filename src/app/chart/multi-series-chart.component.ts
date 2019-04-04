import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
/**
 * Sample for Combination Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'multi-series-chart.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class MultiSeriesChartComponent {
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public width: string = Browser.isDevice ? '100%' : '60%';

    public data: Object[] = [
        { x: '2007', y: 1 }, { x: '2008', y: 0.25 },
        { x: '2009', y: 0.1 }, { x: '2010', y: 1 },
        { x: '2011', y: 0.1 }, { x: '2012', y: -0.25 },
        { x: '2013', y: 0.25 }, { x: '2014', y: 0.6 }
    ];
    public data1: Object[] = [
        { x: '2007', y: 0.5 }, { x: '2008', y: 0.35 },
        { x: '2009', y: 0.9 }, { x: '2010', y: 0.5 },
        { x: '2011', y: 0.25 }, { x: '2012', y: -0.5 },
        { x: '2013', y: 0.5 }, { x: '2014', y: 0.6 }
    ];
    public data2: Object[] = [
        { x: '2007', y: 1.5 }, { x: '2008', y: 0.35 },
        { x: '2009', y: -2.7 }, { x: '2010', y: 0.5 },
        { x: '2011', y: 0.25 }, { x: '2012', y: -0.1 },
        { x: '2013', y: -0.3 }, { x: '2014', y: -0.6 }
    ];
    public data3: Object[] = [
        { x: '2007', y: -1 }, { x: '2008', y: -.35 },
        { x: '2009', y: -0.3 }, { x: '2010', y: -0.5 },
        { x: '2011', y: 0 }, { x: '2012', y: -0.4 },
        { x: '2013', y: 0 }, { x: '2014', y: -0.6 }
    ];
    public data4: Object[] = [
        { x: '2007', y: 2 }, { x: '2008', y: 0.1 },
        { x: '2009', y: -2.7 }, { x: '2010', y: 1.8 },
        { x: '2011', y: 2 }, { x: '2012', y: 0.4 },
        { x: '2013', y: 0.9 }, { x: '2014', y: 0.4 }
    ];
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        title: 'Years',
        interval: Browser.isDevice ? 2 : 1,
        labelIntersectAction: 'Rotate45',
        valueType: 'Category',
        majorGridLines: { width: 0 }, minorGridLines: { width: 0 },
        majorTickLines: { width: 0 }, minorTickLines: { width: 0 },
        lineStyle: { width: 0 },
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        title: 'Growth',
        minimum: -3,
        maximum: 3,
        interval: 1,
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 }, majorGridLines: { width: 1 },
        minorGridLines: { width: 1 }, minorTickLines: { width: 0 },
        labelFormat: '{value}B',
    };
    public legend: Object = {
        visible: true
    };
    public title: string = 'Annual Growth GDP in France';
    public marker: Object = {
        visible: true,
        height: 10,
        width: 10
    };
    // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
    // custom code end
    public tooltip: Object = {
        enable: true
    };
    constructor() {
        //code
     };

}