import { Component, ViewEncapsulation } from '@angular/core';
/**
 * Sample for axis type in Sparkline 
 */
@Component({
    selector: 'control-content',
    templateUrl: 'series-type.html',
    encapsulation: ViewEncapsulation.None
})
export class SeriesTypeSparklineComponent {
    public lineData: object[] = [
        { x: 1, yval: 5 },
        { x: 2, yval: 6 },
        { x: 3, yval: 5 },
        { x: 4, yval: 7 },
        { x: 5, yval: 4 },
        { x: 6, yval: 3 },
        { x: 7, yval: 9 },
        { x: 8, yval: 5 },
        { x: 9, yval: 6 },
        { x: 10, yval: 5 },
        { x: 11, yval: 7 },
        { x: 12, yval: 8 },
        { x: 13, yval: 4 },
        { x: 14, yval: 5 },
        { x: 15, yval: 3 },
        { x: 16, yval: 4 },
        { x: 17, yval: 11 },
        { x: 18, yval: 10 },
        { x: 19, yval: 2 },
        { x: 20, yval: 12 },
        { x: 21, yval: 4 },
        { x: 22, yval: 7 },
        { x: 23, yval: 6 },
        { x: 24, yval: 8 },
    ];
    public tooltipSettings: object = {
        visible: true,
        format: '${x} : ${yval}',
        trackLineSettings: {
            visible: true
        }
    };
    public markerSettings: object = {
        visible: ['All'],
        size: 2.5,
        fill: 'blue',
    };
    public border: object =  { color: '#3C78EF', width: 2};
    public axisSettings: {
        lineSettings: {
            visible: true
        }
    };
    public categoryData: object[] = [
        { x: 1, xval: 'Jan', yval: 34 },
        { x: 2, xval: 'Feb', yval: 36 },
        { x: 3, xval: 'Mar', yval: 32 },
        { x: 4, xval: 'Apr', yval: 35 },
        { x: 5, xval: 'May', yval: 40 },
        { x: 6, xval: 'Jun', yval: 38 },
        { x: 7, xval: 'Jul', yval: 33 },
        { x: 8, xval: 'Aug', yval: 37 },
        { x: 9, xval: 'Sep', yval: 34 },
        { x: 10, xval: 'Oct', yval: 31 },
        { x: 11, xval: 'Nov', yval: 30 },
        { x: 12, xval: 'Dec', yval: 29 },
    ];
    public catTooltipSettings: object = {
        visible: true,
        format: '${xval} : ${yval}°C',
        trackLineSettings: {
            visible: true
        }
    };
    public columnData: object[] = [
        { x: 1, xval: 'Jan', yval: 10 },
        { x: 2, xval: 'Feb', yval: 6 },
        { x: 3, xval: 'Mar', yval: 8 },
        { x: 4, xval: 'Apr', yval: -5 },
        { x: 5, xval: 'May', yval: 11 },
        { x: 6, xval: 'Jun', yval: 5 },
        { x: 7, xval: 'Jul', yval: -2 },
        { x: 8, xval: 'Aug', yval: 7 },
        { x: 9, xval: 'Sep', yval: -3 },
        { x: 10, xval: 'Oct', yval: 6 },
        { x: 11, xval: 'Nov', yval: 8 },
        { x: 12, xval: 'Dec', yval: 10 },
    ];
    public columntooltipSettings: object = {
        visible: true,
        format: '${xval} : ${yval}',
    };
    public winloss: object = [12, 15, -10, 13, 15, 6, -12, 17, 13, 0, 8, -10];
    public winlossTooltipSettings: object = {
        format: '${x} : ${y}',
    };
    public pieData1: object[] = [{x: 'Gold', y : 46}, {x: 'Silver', y : 37}, {x: 'Bronze', y : 38}];
    public pieData2: object[] =  [{x: 'Gold', y : 27}, {x: 'Silver', y : 23}, {x: 'Bronze', y : 17}];
    public pieData3: object[] = [{x: 'Gold', y : 26}, {x: 'Silver', y : 18}, {x: 'Bronze', y : 26}];
    public pieData4: object[] = [{x: 'Gold', y : 19}, {x: 'Silver', y : 17}, {x: 'Bronze', y : 19}];
    public pietooltipSettings: object = {
        visible: true,
        format: '${x} : ${y}',
    };
    public pietooltipSettings1: object = {
        visible: true,
        format: '${x} : ${y}',
    };
    public pietooltipSettings2: object = {
        visible: true,
        format: '${x} : ${y}',
    };
}