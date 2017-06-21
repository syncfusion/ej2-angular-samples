import { Component, ViewEncapsulation } from '@angular/core';

/**
 * Multiple Axes
 */
@Component({
    selector: 'control-content',
    templateUrl: 'multiple-axes.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class MultipleAxesChartComponent {
    public data: Object[] = [
        { x: 'Jan', y: 15 }, { x: 'Feb', y: 20 }, { x: 'Mar', y: 35 }, { x: 'Apr', y: 40 },
        { x: 'May', y: 80 }, { x: 'Jun', y: 70 }, { x: 'Jul', y: 65 }, { x: 'Aug', y: 55 },
        { x: 'Sep', y: 50 }, { x: 'Oct', y: 30 }, { x: 'Nov', y: 35 }, { x: 'Dec', y: 35 }
    ];
    public data1: Object[] = [
        { x: 'Jan', y: 33 }, { x: 'Feb', y: 31 }, { x: 'Mar', y: 30 }, { x: 'Apr', y: 28 },
        { x: 'May', y: 29 }, { x: 'Jun', y: 30 }, { x: 'Jul', y: 33 }, { x: 'Aug', y: 32 },
        { x: 'Sep', y: 34 }, { x: 'Oct', y: 32 }, { x: 'Nov', y: 32 }, { x: 'Dec', y: 31 }
    ];
    public primaryXAxis: Object = {
        title: 'Months',
        valueType: 'Category',
        interval: 1,
        labelIntersectAction : 'Rotate90'
    };
    public primaryYAxis: Object = {
        minimum: 0, maximum: 90, interval: 10,
        line: { width: 0 },
        title: 'Temperature (Fahrenheit)',
        labelFormat: '{value}°F'
    };
    public marker: Object = {
        visible: true,
        width: 10,
        height: 10,
        border: { width: 2, color: '#F8AB1D' }
    };
    public majorGridLines: Object = {
       width: 0
    };
    public tooltip: Object = {
        enable: true,
        format: '${series.name}<br> ${point.x} : ${point.y}'
    };
    public title: string = 'Weather Condition';
    constructor() {
        //code
     };

}