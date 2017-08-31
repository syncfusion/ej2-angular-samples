import { Component, ViewEncapsulation } from '@angular/core';

/**
 * Column Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'range-column.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class RangeColumnChartComponent {

    public data1: Object[] = [
        { x: 'Jan', low: 0.7, high: 6.1 }, { x: 'Feb', low: 1.3, high: 6.3 },
        { x: 'Mar', low: 1.9, high: 8.5 }, { x: 'Apr', low: 3.1, high: 10.8 },
        { x: 'May', low: 5.7, high: 14.4 }, { x: 'June', low: 8.4, high: 16.9 },
        { x: 'July', low: 10.6, high: 19.2 }, { x: 'Aug', low: 10.5, high: 18.9 },
        { x: 'Sep', low: 8.5, high: 16.1 }, { x: 'Oct', low: 6.0, high: 12.5 },
        { x: 'Nov', low: 1.5, high: 6.9 }, { x: 'Dec', low: 5.1, high: 12.1 }
    ];
    public data2: Object[] = [
        { x: 'Jan', low: 1.7, high: 7.1 }, { x: 'Feb', low: 1.9, high: 7.7 },
        { x: 'Mar', low: 1.2, high: 7.5 }, { x: 'Apr', low: 2.5, high: 9.8 },
        { x: 'May', low: 4.7, high: 11.4 }, { x: 'June', low: 6.4, high: 14.4 },
        { x: 'July', low: 9.6, high: 17.2 }, { x: 'Aug', low: 10.7, high: 17.9 },
        { x: 'Sep', low: 7.5, high: 15.1 }, { x: 'Oct', low: 3.0, high: 10.5 },
        { x: 'Nov', low: 1.2, high: 7.9 }, { x: 'Dec', low: 4.1, high: 9.1 }
    ];

    public primaryXAxis: Object = {
        title: 'Month',
        valueType: 'Category'
    };
    public primaryYAxis: Object = {
        title: 'Temperature(Celsius)',
        labelFormat: '{value}°C',
    };
    public title: string = 'Maximum and Minimum Temperature';
    public tooltip: Object = {
        enable: true,
        format: '${point.x}<br>high: ${point.high}<br>low: ${point.low}'
    };
    constructor() {
        //code
    };

}