import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';

/**
 * Sample for Stacked Column Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'stacked-column.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class StackedColumnChartComponent {

    public data: Object[] = [
        { x: '2014', y: 111.1 },
        { x: '2015', y: 127.3 },
        { x: '2016', y: 143.4 },
        { x: '2017', y: 159.9 }
    ];
    public data1: Object[] = [
        { x: '2014', y: 76.9 },
        { x: '2015', y: 99.5 },
        { x: '2016', y: 121.7 },
        { x: '2017', y: 142.5 }
    ];
    public data2: Object[] = [
        { x: '2014', y: 66.1 },
        { x: '2015', y: 79.3 },
        { x: '2016', y: 91.3 },
        { x: '2017', y: 102.4 }
    ];
    public data3: Object[] = [
        { x: '2014', y: 34.1 },
        { x: '2015', y: 38.2 },
        { x: '2016', y: 44.0 },
        { x: '2017', y: 51.6 }
    ];
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        majorGridLines: { width: 0 },
        minorGridLines: { width: 0 },
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 },
        interval: 1,
        lineStyle: { width: 0 },
        labelIntersectAction: 'Rotate45',
        valueType: 'Category'
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        title: 'Sales',
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 },
        majorGridLines: { width: 1 },
        minorGridLines: { width: 1 },
        minorTickLines: { width: 0 },
        labelFormat: '{value}B',
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
    public title: string = 'Mobile Game Market by Country';
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public width: string = Browser.isDevice ? '100%' : '60%';

    constructor() {
        //code
    };

}