import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs} from '@syncfusion/ej2-ng-charts';

/**
 * logarithmic Axis
 */
@Component({
    selector: 'control-content',
    templateUrl: 'logarithmic.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class LogarithmicAxisChartComponent {

    public data: Object[] = [
        { x: new Date(1995, 0, 1), y: 80 },
        { x: new Date(1996, 0, 1), y: 200 },
        { x: new Date(1997, 0, 1), y: 400 },
        { x: new Date(1998, 0, 1), y: 600 },
        { x: new Date(1999, 0, 1), y: 700 },
        { x: new Date(2000, 0, 1), y: 1400 },
        { x: new Date(2001, 0, 1), y: 2000 },
        { x: new Date(2002, 0, 1), y: 4000 },
        { x: new Date(2003, 0, 1), y: 6000 },
        { x: new Date(2004, 0, 1), y: 8000 },
        { x: new Date(2005, 0, 1), y: 11000 }];
    public primaryXAxis: Object = {
        title: 'Years',
        labelFormat: 'y',
        valueType: 'DateTime',
        edgeLabelPlacement: 'Shift'
    };
    public primaryYAxis: Object = {
        valueType: 'Logarithmic',
        minorTicksPerInterval: 5,
        majorGridLines: { width: 1.5, opacity: 0.8 },
        minorTickLines: { width: 0, size: 4 },
        minimum: 0,
        maximum: 100000,
        interval: 1,
        title: 'Profit ($)',
        labelFormat: '${value}',
        edgeLabelPlacement: 'Shift'
    };
    public legend: Object = {
        visible: false
    };
    public marker: Object = {
        visible: true,
        height: 10,
        width: 10
    };
    public tooltip: Object = {
        enable: true,
        format: '${series.name}<br> ${point.x} : ${point.y}'
    };
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        args.chart.theme = (selectedTheme && selectedTheme.indexOf('fabric') > -1) ? 'Fabric' : 'Material';
    };
    public title: string = 'Product X Growth [1995-2005]';
    constructor() {
        //code
    };

}