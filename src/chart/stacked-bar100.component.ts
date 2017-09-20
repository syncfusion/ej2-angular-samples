import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs } from '@syncfusion/ej2-ng-charts';

/**
 * Stacked bar Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'stacked-bar100.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class PercentStackedBarChartComponent {

    public data: Object[] = [
        { x: '2005', y: 28 }, { x: '2006', y: 25 },
        { x: '2007', y: 26 }, { x: '2008', y: 27 },
        { x: '2009', y: 32 }, { x: '2010', y: 35 },
        { x: '2011', y: 30 }
    ];
    public data1: Object[] = [
        { x: '2005', y: 31 }, { x: '2006', y: 28 },
        { x: '2007', y: 30 }, { x: '2008', y: 36 },
        { x: '2009', y: 36 }, { x: '2010', y: 39 },
        { x: '2011', y: 37 }
    ];
    public data2: Object[] = [
        { x: '2005', y: 36 }, { x: '2006', y: 32 },
        { x: '2007', y: 34 }, { x: '2008', y: 41 },
        { x: '2009', y: 42 }, { x: '2010', y: 42 },
        { x: '2011', y: 43 }
    ];
    public data3: Object[] = [
        { x: '2005', y: 39 }, { x: '2006', y: 36 },
        { x: '2007', y: 40 }, { x: '2008', y: 44 },
        { x: '2009', y: 45 }, { x: '2010', y: 50 },
        { x: '2011', y: 46 }
    ];
    public primaryXAxis: Object = {
        title: 'Years',
        valueType: 'Category',
        edgeLabelPlacement: 'Shift',
    };
    public primaryYAxis: Object = {
        title: 'Percentage (%)',
        rangePadding:  'None',
        edgeLabelPlacement: 'Shift',
    };
    public tooltip: Object = {
        enable: true,
        format: '${point.x} <br>${series.name} : ${point.y} (${point.percent}%)'
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