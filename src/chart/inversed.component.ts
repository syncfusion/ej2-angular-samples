import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs } from '@syncfusion/ej2-ng-charts';

/**
 * inversed Axis
 */
@Component({
    selector: 'control-content',
    templateUrl: 'inversed.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})

export class InversedAxisChartComponent {
    public primaryXAxis: Object = {
        valueType: 'Category',
        title: 'Years',
        opposedPosition: true,
        isInversed: true
    };

    public primaryYAxis: Object = {
        title: 'Exchange rate (INR per USD)',
        edgeLabelPlacement: 'Shift',
        labelIntersectAction: 'Rotate45',
        isInversed: true
    };

    public data: Object[] = [
        { x: 2008, y: 15.1 }, { x: 2009, y: 16 }, { x: 2010, y: 21.4 },
        { x: 2011, y: 18 }, { x: 2012, y: 16.2 }, { x: 2013, y: 11 },
        { x: 2014, y: 7.6 }, { x: 2015, y: 1.5 }
        ];

    public marker: Object = {
        dataLabel: {
            visible: true
        }
    };
    public tooltip: Object = {
        enable: true,
        format: 'INR per USD<br>Year ${point.x} : ${point.y}'
    };

    public legend: Object = {
        visible: true
    };

    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        args.chart.theme = (selectedTheme && selectedTheme.indexOf('fabric') > -1) ? 'Fabric' : 'Material';
    };

    public title: string = 'Exchange Rate';


    constructor() {
        //code
    };

}