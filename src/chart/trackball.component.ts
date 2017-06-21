import { Component, ViewEncapsulation } from '@angular/core';

/**
 * Trackball
 */
@Component({
    selector: 'control-content',
    templateUrl: 'trackball.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class TrackBallChartComponent {

    public john: Object[] = [
        { x: new Date(2000, 2, 11), y: 15 }, { x: new Date(2000, 9, 14), y: 20 },
        { x: new Date(2001, 2, 11), y: 25 }, { x: new Date(2001, 9, 16), y: 21 },
        { x: new Date(2002, 2, 7), y: 13 }, { x: new Date(2002, 9, 7), y: 18 },
        { x: new Date(2003, 2, 11), y: 24 }, { x: new Date(2003, 9, 14), y: 23 },
        { x: new Date(2004, 2, 6), y: 19 }, { x: new Date(2004, 9, 6), y: 31 },
        { x: new Date(2005, 2, 11), y: 39 }, { x: new Date(2005, 9, 11), y: 50 },
        { x: new Date(2006, 2, 11), y: 24 }
    ];
    public andrew: Object[] = [
        { x: new Date(2000, 2, 11), y: 39 }, { x: new Date(2000, 9, 14), y: 30 },
        { x: new Date(2001, 2, 11), y: 28 }, { x: new Date(2001, 9, 16), y: 35 },
        { x: new Date(2002, 2, 7), y: 39 }, { x: new Date(2002, 9, 7), y: 41 },
        { x: new Date(2003, 2, 11), y: 45 }, { x: new Date(2003, 9, 14), y: 48 },
        { x: new Date(2004, 2, 6), y: 54 }, { x: new Date(2004, 9, 6), y: 55 },
        { x: new Date(2005, 2, 11), y: 57 }, { x: new Date(2005, 9, 11), y: 60 },
        { x: new Date(2006, 2, 11), y: 60 }
    ];
    public thomas: Object[] = [
        { x: new Date(2000, 2, 11), y: 60 }, { x: new Date(2000, 9, 14), y: 55 },
        { x: new Date(2001, 2, 11), y: 48 }, { x: new Date(2001, 9, 16), y: 57 },
        { x: new Date(2002, 2, 7), y: 62 }, { x: new Date(2002, 9, 7), y: 64 },
        { x: new Date(2003, 2, 11), y: 57 }, { x: new Date(2003, 9, 14), y: 53 },
        { x: new Date(2004, 2, 6), y: 63 }, { x: new Date(2004, 9, 6), y: 50 },
        { x: new Date(2005, 2, 11), y: 66 }, { x: new Date(2005, 9, 11), y: 65 },
        { x: new Date(2006, 2, 11), y: 79 }
    ];

    public mark: Object[] = [
        { x: new Date(2000, 2, 11), y: 75 }, { x: new Date(2000, 9, 14), y: 75 },
        { x: new Date(2001, 2, 11), y: 68 }, { x: new Date(2001, 9, 16), y: 75 },
        { x: new Date(2002, 2, 7), y: 71 }, { x: new Date(2002, 9, 7), y: 69 },
        { x: new Date(2003, 2, 11), y: 81 }, { x: new Date(2003, 9, 14), y: 84 },
        { x: new Date(2004, 2, 6), y: 85 }, { x: new Date(2004, 9, 6), y: 87 },
        { x: new Date(2005, 2, 11), y: 75 }, { x: new Date(2005, 9, 11), y: 70 },
        { x: new Date(2006, 2, 11), y: 85 }
    ];

    public william: Object[] = [
        { x: new Date(2000, 2, 11), y: 85 }, { x: new Date(2000, 9, 14), y: 83 },
        { x: new Date(2001, 2, 11), y: 85 }, { x: new Date(2001, 9, 16), y: 87 },
        { x: new Date(2002, 2, 7), y: 82 }, { x: new Date(2002, 9, 7), y: 74 },
        { x: new Date(2003, 2, 11), y: 73 }, { x: new Date(2003, 9, 14), y: 75 },
        { x: new Date(2004, 2, 6), y: 73 }, { x: new Date(2004, 9, 6), y: 60 },
        { x: new Date(2005, 2, 11), y: 48 }, { x: new Date(2005, 9, 11), y: 55 },
        { x: new Date(2006, 2, 11), y: 40 }
    ];
    public primaryXAxis: Object = {
        title: 'Years',
        minimum: new Date(2000, 1, 1), maximum: new Date(2006, 2, 11),
        intervalType: 'Years',
        valueType: 'DateTime',
        lineStyle: { width: 0 },
        majorGridLines: { width: 0 },
        edgeLabelPlacement: 'Shift'
    };
    public primaryYAxis: Object = {
        title: 'Revenue in Millions',
        labelFormat: '{value}M',
        majorTickLines: { width: 0 },
        minimum: 10, maximum: 90,
        lineStyle: { width: 0 },
    };
    public title: string = 'Average Sales per Person';
    public marker: Object = { visible: true };
    public tooltip: Object = { enable: true, shared: true, format: '${series.name} : ${point.x} : ${point.y}' };
    public crosshair: Object = { enable: true, lineType: 'Vertical' };
    constructor() {
        //code
    };

}