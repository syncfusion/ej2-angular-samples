import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs } from '@syncfusion/ej2-ng-charts';

/**
 * Stacked Column Series
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
        { x: '2017', y: 159.9 },
        { x: '2018', y: 175.4 },
        { x: '2019', y: 189.0 },
        { x: '2020', y: 202.7 }
    ];
    public data1: Object[] = [
        { x: '2014', y: 76.9 },
        { x: '2015', y: 99.5 },
        { x: '2016', y: 121.7 },
        { x: '2017', y: 142.5 },
        { x: '2018', y: 166.7 },
        { x: '2019', y: 182.9 },
        { x: '2020', y: 197.3 }
    ];
    public data2: Object[] = [
        { x: '2014', y: 66.1 },
        { x: '2015', y: 79.3 },
        { x: '2016', y: 91.3 },
        { x: '2017', y: 102.4 },
        { x: '2018', y: 112.9 },
        { x: '2019', y: 122.4 },
        { x: '2020', y: 120.9 }
    ];
    public data3: Object[] = [
        { x: '2014', y: 34.1 },
        { x: '2015', y: 38.2 },
        { x: '2016', y: 44.0 },
        { x: '2017', y: 51.6 },
        { x: '2018', y: 61.9 },
        { x: '2019', y: 71.5 },
        { x: '2020', y: 82.0 }
    ];
    public primaryXAxis: Object = {
        title: 'Years',
        line: { width: 0 },
        majorGridLines: { width: 1 },
        minorGridLines: { width: 1 },
        minorTickLines: { width: 1 },
        valueType: 'Category',
        interval: 1,
        labelIntersectAction : 'Rotate45'
    };
    public primaryYAxis: Object = {
        title: 'Sales in Billions',
        minimum: 0,
        maximum: 700,
        interval: 100,
        majorGridLines: { width: 1 },
        minorGridLines: { width: 1 },
        minorTickLines: { width: 1 },
        labelFormat: '{value}B'
    };
    public tooltip: Object = {
        enable: true,
        format: '${series.name}<br>${point.x} : ${point.y}'
    };
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        args.chart.theme = (selectedTheme && selectedTheme.indexOf('fabric') > -1) ? 'Fabric' : 'Material';
    };
    public title: string = 'Mobile Game Market by Country';
    constructor() {
        //code
    };

}