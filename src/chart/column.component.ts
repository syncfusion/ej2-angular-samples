import { Component, ViewEncapsulation } from '@angular/core';

/**
 * Column Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'column.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class ColumnChartComponent {

    public data: Object[] = [
        { x: 'USA', y: 46 }, { x: 'GBR', y: 27 }, { x: 'CHN', y: 26 }, { x: 'RUS', y: 19 },
        { x: 'GER', y: 17 }, { x: 'JAP', y: 12 }, { x: 'FRA', y: 10 }
    ];
    public data1: Object[] = [
        { x: 'USA', y: 37 }, { x: 'GBR', y: 23 }, { x: 'CHN', y: 18 }, { x: 'RUS', y: 17 },
        { x: 'GER', y: 10 }, { x: 'JAP', y: 8 }, { x: 'FRA', y: 18 }
    ];
    public data2: Object[] = [
        { x: 'USA', y: 38 }, { x: 'GBR', y: 17 }, { x: 'CHN', y: 26 }, { x: 'RUS', y: 19 },
        { x: 'GER', y: 15 }, { x: 'JAP', y: 21 }, { x: 'FRA', y: 14 }
    ];
    public primaryXAxis: Object = {
        title: 'Countries',
        valueType: 'Category',
        interval: 1
    };
    public primaryYAxis: Object = {
        title: 'Medals',
        minimum: 0,
        maximum: 50,
        interval: 5
    };
    public title: string = 'Olympic Medals - RIO';
    public tooltip: Object = {
        enable: true,
        format: '${series.name}<br>${point.x} : ${point.y}'
    };
    constructor() {
        //code
    };

}