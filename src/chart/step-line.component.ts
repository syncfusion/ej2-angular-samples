import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs} from '@syncfusion/ej2-ng-charts';

/**
 * Step line Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'step-line.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class StepLineChartComponent {

    public data: Object[] = [
        { x: new Date(1975, 0, 1), y: 16 },
                    { x: new Date(1980, 0, 1), y: 12.5 },
                    { x: new Date(1985, 0, 1), y: 19 },
                    { x: new Date(1990, 0, 1), y: 14.4 },
                    { x: new Date(1995, 0, 1), y: 11.5 },
                    { x: new Date(2000, 0, 1), y: 14 },
                    { x: new Date(2005, 0, 1), y: 10 },
                    { x: new Date(2010, 0, 1), y: 16 }
    ];
    public data1: Object[] = [
       { x: new Date(1975, 0, 1), y: 10 },
                    { x: new Date(1980, 0, 1), y: 7.5 },
                    { x: new Date(1985, 0, 1), y: 11 },
                    { x: new Date(1990, 0, 1), y: 7 },
                    { x: new Date(1995, 0, 1), y: 8 },
                    { x: new Date(2000, 0, 1), y: 6 },
                    { x: new Date(2005, 0, 1), y: 3.5 },
                    { x: new Date(2010, 0, 1), y: 7 }
    ];
    public data2: Object[] = [
         { x: new Date(1975, 0, 1), y: 4.5 },
                    { x: new Date(1980, 0, 1), y: 5 },
                    { x: new Date(1985, 0, 1), y: 6.5 },
                    { x: new Date(1990, 0, 1), y: 4.4 },
                    { x: new Date(1995, 0, 1), y: 5 },
                    { x: new Date(2000, 0, 1), y: 1.5 },
                    { x: new Date(2005, 0, 1), y: 2.5 },
                    { x: new Date(2010, 0, 1), y: 3.7 }
    ];
    public primaryXAxis: Object = {
        title: 'Years',
        line: { width: 0 },
        labelFormat: 'y',
        intervalType: 'Years',
        valueType: 'DateTime',
        edgeLabelPlacement: 'Shift'
    };
    public primaryYAxis: Object = {
        title: 'Percentage (%)',
        minimum: 0,
        maximum: 20,
        interval: 2,
        labelFormat: '{value}%'
    };
    public marker: Object = {
        visible: true,
        width: 10,
        height: 10
    };
    public tooltip: Object = {
        enable: true,
        format: '${series.name}<br>${point.x} : ${point.y}'
    };
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        args.chart.theme = (selectedTheme && selectedTheme.indexOf('fabric') > -1) ? 'Fabric' : 'Material';
    };
    public title: string = 'Unemployment Rates 1975-2010';
    constructor() {
        //code
     };

}