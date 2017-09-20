import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs } from '@syncfusion/ej2-ng-charts';

/**
 * Line Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'line.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class LineChartComponent {
    public data: Object[] = [
        { x: new Date(2005, 0, 1), y: 28 }, { x: new Date(2006, 0, 1), y: 25 },
        { x: new Date(2007, 0, 1), y: 26 }, { x: new Date(2008, 0, 1), y: 27 },
        { x: new Date(2009, 0, 1), y: 32 }, { x: new Date(2010, 0, 1), y: 35 },
        { x: new Date(2011, 0, 1), y: 30 }
    ];
    public data1: Object[] = [
        { x: new Date(2005, 0, 1), y: 31 }, { x: new Date(2006, 0, 1), y: 28 },
        { x: new Date(2007, 0, 1), y: 30 }, { x: new Date(2008, 0, 1), y: 36 },
        { x: new Date(2009, 0, 1), y: 36 }, { x: new Date(2010, 0, 1), y: 39 },
        { x: new Date(2011, 0, 1), y: 37 }
    ];
    public data2: Object[] = [
        { x: new Date(2005, 0, 1), y: 36 }, { x: new Date(2006, 0, 1), y: 32 },
        { x: new Date(2007, 0, 1), y: 34 }, { x: new Date(2008, 0, 1), y: 41 },
        { x: new Date(2009, 0, 1), y: 42 }, { x: new Date(2010, 0, 1), y: 42 },
        { x: new Date(2011, 0, 1), y: 43 }
    ];
    public data3: Object[] = [
        { x: new Date(2005, 0, 1), y: 39 }, { x: new Date(2006, 0, 1), y: 36 },
        { x: new Date(2007, 0, 1), y: 40 }, { x: new Date(2008, 0, 1), y: 44 },
        { x: new Date(2009, 0, 1), y: 45 }, { x: new Date(2010, 0, 1), y: 50 },
        { x: new Date(2011, 0, 1), y: 46 }
    ];
    public primaryXAxis: Object = {
        title: 'Years',
        valueType: 'DateTime',
        labelFormat: 'y',
        edgeLabelPlacement: 'Shift',
        intervalType: 'Years'
    };
    public primaryYAxis: Object = {
        title: 'Percentage (%)',
        labelFormat: '{value}%',
        rangePadding:  'None'
    };
    public marker: Object = {
        visible: true,
        height: 10,
        width: 10
    };
    public tooltip: Object = {
        enable: true,
        format: '${series.name}<br>${point.x} : ${point.y}'
    };
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        args.chart.theme = (selectedTheme && selectedTheme.indexOf('fabric') > -1) ? 'Fabric' : 'Material';
    };
    public title: string = 'Inflation - Consumer Price';
    constructor() {
       //code
    };

}