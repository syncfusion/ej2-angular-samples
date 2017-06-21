import { Component, ViewEncapsulation } from '@angular/core';

/**
 * Spline Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'spline.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class SplineChartComponent {

    public data: Object[] = [
        { x: 'Jan', y: 7 }, { x: 'Feb', y: 10 },
        { x: 'Mar', y: 19 }, { x: 'Apr', y: 22 },
        { x: 'May', y: 25 }, { x: 'Jun', y: 32 },
        { x: 'Jul', y: 33 }, { x: 'Aug', y: 31 },
        { x: 'Sep', y: 29 }, { x: 'Oct', y: 24 },
        { x: 'Nov', y: 18 }, { x: 'Dec', y: 10 }
    ];
    public data1: Object[] = [
        { x: 'Jan', y: 4 }, { x: 'Feb', y: 7 },
        { x: 'Mar', y: 15 }, { x: 'Apr', y: 18 },
        { x: 'May', y: 22 }, { x: 'Jun', y: 28 },
        { x: 'Jul', y: 29 }, { x: 'Aug', y: 28 },
        { x: 'Sep', y: 26 }, { x: 'Oct', y: 20 },
        { x: 'Nov', y: 15 }, { x: 'Dec', y: 8 }
    ];
    public data2: Object[] = [
        { x: 'Jan', y: 0 }, { x: 'Feb', y: 3 },
        { x: 'Mar', y: 10 }, { x: 'Apr', y: 12 },
        { x: 'May', y: 16 }, { x: 'Jun', y: 22 },
        { x: 'Jul', y: 23 }, { x: 'Aug', y: 23 },
        { x: 'Sep', y: 19 }, { x: 'Oct', y: 13 },
        { x: 'Nov', y: 8 }, { x: 'Dec', y: 5 }
    ];
    public primaryXAxis: Object = {
        title: 'Months',
        valueType: 'Category',
        interval: 1,
        labelIntersectAction : 'Rotate90'
    };
    public primaryYAxis: Object = {
        title: 'Temperature (Celsius)',
        minimum: 0,
        maximum: 35,
        interval: 5,
        labelFormat: '{value}°C',
        edgeLabelPlacement: 'Shift'
    };
    public marker: Object = {
        visible: true,
        opacity: 0.6,
        width: 10,
        height: 10
    };
    public tooltip: Object = {
        enable: true,
        format: '${series.name} (°C)<br>${point.x} : ${point.y}'
    };
    public title: string = 'NC Weather Report - 2016';
    constructor() {
        //code
    };

}