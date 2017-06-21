import { Component, ViewEncapsulation } from '@angular/core';

/**
 * Numeric Axis
 */
@Component({
    selector: 'control-content',
    templateUrl: 'numeric-axis.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class NumericAxisChartComponent {

    public data: Object[] = [
        { x: 1, y: 7 },
        { x: 2, y: 1 }, { x: 3, y: 1 },
        { x: 4, y: 14 }, { x: 5, y: 1 },
        { x: 6, y: 10 }, { x: 7, y: 8 },
        { x: 8, y: 6 }, { x: 9, y: 10 },
        { x: 10, y: 10 }, { x: 11, y: 16 },
        { x: 12, y: 6 }, { x: 13, y: 14 },
        { x: 14, y: 7 }, { x: 15, y: 5 },
        { x: 16, y: 2 }, { x: 17, y: 14 },
        { x: 18, y: 7 }, { x: 19, y: 7 },
        { x: 20, y: 10 }
    ];
    public data1: Object[] = [
        { x: 1, y: 1 },
        { x: 2, y: 9 }, { x: 3, y: 3 },
        { x: 4, y: 5 }, { x: 5, y: 3 },
        { x: 6, y: 16 }, { x: 7, y: 2 },
        { x: 8, y: 4 }, { x: 9, y: 7 },
        { x: 10, y: 4 }, { x: 11, y: 8 },
        { x: 12, y: 5 }, { x: 13, y: 9 },
        { x: 14, y: 10 }, { x: 15, y: 18 },
        { x: 16, y: 7 }, { x: 17, y: 7 },
        { x: 18, y: 11 }, { x: 19, y: 8 },
        { x: 20, y: 24 }
    ];
    public primaryXAxis: Object = {
        title: 'Overs',
        minimum: 0,
        maximum: 21,
    };
    public primaryYAxis: Object = {
        title: 'Runs',
        minimum: 0,
        maximum: 25,
        interval: 5
    };
     public tooltip: Object = {
        enable: true,
        format: '${series.name}<br>Over ${point.x} : ${point.y} Runs'
    };
    public title: string = 'England vs West Indies';
    constructor() {
        //code
    };

}