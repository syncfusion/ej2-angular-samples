import { Component, ViewEncapsulation } from '@angular/core';
/**
 * Sample for axis type in Sparkline 
 */
@Component({
    selector: 'control-content',
    templateUrl: 'axis-type.html',
    encapsulation: ViewEncapsulation.None
})
export class AxisTypeSparklineComponent {
    public datetimeData: object[] = [
        { xDate: new Date(2018, 0, 1), x: 0, yval: 4 },
        { xDate: new Date(2018, 0, 2), x: 1, yval: 4.5 },
        { xDate: new Date(2018, 0, 3), x: 2, yval: 8 },
        { xDate: new Date(2018, 0, 4), x: 3, yval: 7 },
        { xDate: new Date(2018, 0, 5), x: 4, yval: 6 },
        { xDate: new Date(2018, 0, 8), x: 5, yval: 8 },
        { xDate: new Date(2018, 0, 9), x: 6, yval: 8 },
        { xDate: new Date(2018, 0, 10), x: 7, yval: 6.5 },
        { xDate: new Date(2018, 0, 11), x: 8, yval: 4 },
        { xDate: new Date(2018, 0, 12), x: 9, yval: 5.5 },
        { xDate: new Date(2018, 0, 15), x: 10, yval: 8 },
        { xDate: new Date(2018, 0, 16), x: 11, yval: 6 },
        { xDate: new Date(2018, 0, 17), x: 12, yval: 6.5 },
        { xDate: new Date(2018, 0, 18), x: 13, yval: 7.5 },
        { xDate: new Date(2018, 0, 19), x: 14, yval: 7.5 },
        { xDate: new Date(2018, 0, 22), x: 15, yval: 4 },
        { xDate: new Date(2018, 0, 23), x: 16, yval: 8 },
        { xDate: new Date(2018, 0, 24), x: 17, yval: 6 },
        { xDate: new Date(2018, 0, 25), x: 18, yval: 7.5 },
        { xDate: new Date(2018, 0, 26), x: 19, yval: 4.5 },
        { xDate: new Date(2018, 0, 29), x: 20, yval: 6 },
        { xDate: new Date(2018, 0, 30), x: 21, yval: 5 },
        { xDate: new Date(2018, 0, 31), x: 22, yval: 7 }
    ];
    public dateTooltipSettings: object = {
        visible: true,
        format: '${xDate} : ${yval}hrs'
    };
    public tooltipSettings: object =  {
        visible: true,
        format: '${xval} : ${yval}%'
    };
    public dollartooltipSettings: object =  {
        visible: true,
        format: '${x} : $${yval}'
    };
    public categoryData: object[] = [
        { x: 0, xval: 'Robert', yval: 60 },
        { x: 1, xval: 'Andrew', yval: 65 },
        { x: 2, xval: 'Suyama', yval: 70 },
        { x: 3, xval: 'Michael', yval: 80 },
        { x: 4, xval: 'Janet', yval: 55 },
        { x: 5, xval: 'Davolio', yval: 90 },
        { x: 6, xval: 'Fuller', yval: 75 },
        { x: 7, xval: 'Nancy', yval: 85 },
        { x: 8, xval: 'Margaret', yval: 77 },
        { x: 9, xval: 'Steven', yval: 68 },
        { x: 10, xval: 'Laura', yval: 96 },
        { x: 11, xval: 'Elizabeth', yval: 57 }
    ];
    public numericData: object[] = [
        { x: 1, xval: 2010, yval: 190 },
            { x: 2, xval: 2011, yval: 165 },
            { x: 3, xval: 2012, yval: 158 },
            { x: 4, xval: 2013, yval: 175 },
            { x: 5, xval: 2014, yval: 200 },
            { x: 6, xval: 2015, yval: 180 },
            { x: 7, xval: 2016, yval: 210 }
    ];
}