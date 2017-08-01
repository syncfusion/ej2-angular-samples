import { Component, ViewEncapsulation } from '@angular/core';

/**
 * Stacked Column Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'stacked-column100.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class PercentStackedColumnChartComponent {

    public chartData: Object[] = [
        { x: '2006', y: 900, y1: 190, y2: 250, y3: 150 },
        { x: '2007', y: 544, y1: 226, y2: 145, y3: 120 },
        { x: '2008', y: 880, y1: 194, y2: 190, y3: 115 },
        { x: '2009', y: 675, y1: 250, y2: 220, y3: 125 },
        { x: '2010', y: 765, y1: 222, y2: 225, y3: 132 },
        { x: '2011', y: 679, y1: 181, y2: 135, y3: 137 },
        { x: '2012', y: 770, y1: 128, y2: 152, y3: 110 },
    ];
    public primaryXAxis: Object = {
        title: 'Years',
        valueType: 'Category',
        labelIntersectAction : 'Rotate45'
    };
    public primaryYAxis: Object = {
        title: 'GDP (%) Per Annum',
        rangePadding: 'None',
    };
    public tooltip: Object = {
        enable: true,
        format: '${point.x} <br>${series.name} : ${point.y} (${point.percent}%)'
    };
    public title: string = 'Gross Domestic Product Growth';
    constructor() {
        //code
    };

}