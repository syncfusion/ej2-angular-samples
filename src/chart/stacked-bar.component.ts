import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs } from '@syncfusion/ej2-ng-charts';

/**
 * Stacked bar Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'stacked-bar.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class StackedBarChartComponent {

    public data: Object[] = [
        { x: 'Jan', y: 6 }, { x: 'Feb', y: 8 }, { x: 'Mar', y: 12 }, { x: 'Apr', y: 15.5 },
        { x: 'May', y: 20 }, { x: 'Jun', y: 24 }, { x: 'Jul', y: 28 }, { x: 'Aug', y: 32 },
        { x: 'Sep', y: 33 }, { x: 'Oct', y: 35 }, { x: 'Nov', y: 40 }, { x: 'Dec', y: 42 }
    ];
    public data1: Object[] = [
        { x: 'Jan', y: 6 }, { x: 'Feb', y: 8 }, { x: 'Mar', y: 11 }, { x: 'Apr', y: 16 },
        { x: 'May', y: 21 }, { x: 'Jun', y: 25 }, { x: 'Jul', y: 27 }, { x: 'Aug', y: 31 },
        { x: 'Sep', y: 34 }, { x: 'Oct', y: 34 }, { x: 'Nov', y: 41 }, { x: 'Dec', y: 42 }
    ];
    public data2: Object[] = [
        { x: 'Jan', y: -1 }, { x: 'Feb', y: -1.5 }, { x: 'Mar', y: -2 }, { x: 'Apr', y: -2.5 },
        { x: 'May', y: -3 }, { x: 'Jun', y: -3.5 }, { x: 'Jul', y: -4 }, { x: 'Aug', y: -4.5 },
        { x: 'Sep', y: -5 }, { x: 'Oct', y: -5.5 }, { x: 'Nov', y: -6 }, { x: 'Dec', y: -6.5 }
    ];
    public primaryXAxis: Object = {
        valueType: 'Category',
        title: 'Months'
    };
    public primaryYAxis: Object = {
        title: 'Percentage (%)',
        minimum: -20,
        maximum: 100,
        labelFormat: '{value}%',
        edgeLabelPlacement: 'Shift'
    };
    public tooltip: Object = {
        enable: true,
        format: '${series.name}<br>${point.x} : ${point.y}'
    };
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        args.chart.theme = (selectedTheme && selectedTheme.indexOf('fabric') > -1) ? 'Fabric' : 'Material';
    };
    public title: string = 'Sales Comparison';
    constructor() {
        //code
     };

}