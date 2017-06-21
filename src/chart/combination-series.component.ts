import { Component, ViewEncapsulation } from '@angular/core';

/**
 * Combination Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'combination-series.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class CombinationSeriesChartComponent {

    public data: Object[] = [
        { x: '2005', y: 1.2 }, { x: '2006', y: 1 },
        { x: '2007', y: 1 }, { x: '2008', y: 0.25 },
        { x: '2009', y: 0.1 }, { x: '2010', y: 1 },
        { x: '2011', y: 0.1 }, { x: '2012', y: -0.25 },
        { x: '2013', y: 0.25 }, { x: '2014', y: 0.6 },
        { x: '2015', y: 0.9 }
    ];
    public data1: Object[] = [
        { x: '2005', y: 0.5 }, { x: '2006', y: 0.5 },
        { x: '2007', y: 0.5 }, { x: '2008', y: 0.35 },
        { x: '2009', y: 0.9 }, { x: '2010', y: 0.5 },
        { x: '2011', y: 0.25 }, { x: '2012', y: -0.5 },
        { x: '2013', y: 0.5 }, { x: '2014', y: 0.6 },
        { x: '2015', y: 0.5 }
    ];
    public data2: Object[] = [
        { x: '2005', y: 0.7 }, { x: '2006', y: 1.4 },
        { x: '2007', y: 1.5 }, { x: '2008', y: 0.35 },
        { x: '2009', y: -2.7 }, { x: '2010', y: 0.5 },
        { x: '2011', y: 0.25 }, { x: '2012', y: -0.1 },
        { x: '2013', y: -0.3 }, { x: '2014', y: -0.6 },
        { x: '2015', y: 0 }
    ];
    public data3: Object[] = [
        { x: '2005', y: -0.8 }, { x: '2006', y: 0 },
        { x: '2007', y: -1 }, { x: '2008', y: -.35 },
        { x: '2009', y: -0.3 }, { x: '2010', y: -0.5 },
        { x: '2011', y: 0 }, { x: '2012', y: -0.4 },
        { x: '2013', y: 0 }, { x: '2014', y: -0.6 },
        { x: '2015', y: -0.3 }
    ];
    public data4: Object[] = [
        { x: '2005', y: 1.5 }, { x: '2006', y: 2.3 },
        { x: '2007', y: 2 }, { x: '2008', y: 0.1 },
        { x: '2009', y: -2.7 }, { x: '2010', y: 1.8 },
        { x: '2011', y: 2 }, { x: '2012', y: 0.4 },
        { x: '2013', y: 0.9 }, { x: '2014', y: 0.4 },
        { x: '2015', y: 1.3 }
    ];
    public primaryXAxis: Object = {
        title: 'Years',
        valueType: 'Category',
        interval: 1,
        labelIntersectAction : 'Rotate45'
    };
    public primaryYAxis: Object = {
        title: 'Growth',
        minimum: -3,
        maximum: 3,
        interval: 1
    };
    public legend: Object = {
        visible: false
    };
    public title: string = 'Annual Growth GDP in France';
    public marker: Object = {
        visible: true,
        height: 10,
        width: 10,
        opacity: 0.6
    };
    public tooltip: Object = {
        enable: true,
        format: '${series.name}<br>${point.x} : ${point.y}'
    };
    constructor() {
        //code
     };

}