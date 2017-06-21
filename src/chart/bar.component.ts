import { Component, ViewEncapsulation } from '@angular/core';

/**
 * Bar Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'bar.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class BarChartComponent {

    public data: Object[] = [
        { x: 'Fruit', y: 9.1 }, { x: 'Meat', y: 5.8 },
        { x: 'Cereals', y: 3.2 },{ x: 'Egg', y: 2.2 }, 
        { x: 'Fish', y: 2.4 },{ x: 'Misc', y: 3 },
         { x: 'Tea', y: 3.1 },{ x: 'Feed', y: 2.9 }, 
         { x: 'Oils', y: 1.7 }, { x: 'Sugar', y: 1.3 }
    ];
    public data1: Object[] = [
        { x: 'Fruit', y: 0.9 }, { x: 'Meat', y: 1.5 },
        { x: 'Cereals', y: 2.1 },{ x: 'Egg', y: 1.2 }, 
        { x: 'Fish', y: 1.3 },{ x: 'Misc', y: 1.5 }, 
        { x: 'Tea', y: 2.2 }, { x: 'Feed', y: 0.9 }, 
        { x: 'Oils', y: 0.7 },{ x: 'Sugar', y: 0.4 }
    ];
    public primaryXAxis: Object = {
        title: 'Food',
        valueType: 'Category',
        interval: 1
    };
    public primaryYAxis: Object = {
        title: 'In Billions',
        minimum: 0,
        maximum: 10,
        edgeLabelPlacement: 'Shift',
        labelFormat: '{value}B'
    };
    public tooltip: Object = {
        enable: true,
        format: '${series.name}<br> ${point.x} : ${point.y}'
    };
    public title: string = 'UK Trade in Food Groups - 2015';
    constructor() {
        //code
     };

}