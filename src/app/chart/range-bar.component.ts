import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';

/**
 * Inversed Range Column Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'range-bar.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class RangeBarChartComponent {

    public data1: Object[] = [
        { x: 'Jul', low: 28, high: 72 },
        { x: 'Aug', low: 18, high: 65 }, { x: 'Sep', low: 56, high: 87 },
        { x: 'Oct', low: 40, high: 78 },
        { x: 'Nov', low: 43, high: 64 }, { x: 'Dec', low: 28, high: 54 }
    ];
    public data2: Object[] = [
        { x: 'Jul', low: 38, high: 78 },
        { x: 'Aug', low: 27, high: 78 }, { x: 'Sep', low: 28, high: 79 },
        { x: 'Oct', low: 37, high: 66 },
        { x: 'Nov', low: 25, high: 52 }, { x: 'Dec', low: 20, high: 60 }
    ];

    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Category',
        majorGridLines: { width: 0 }
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        labelFormat: '{value}˚F',
        edgeLabelPlacement: 'Shift',
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 }
    };
    public title: string = 'Temperature Variation';
    public tooltip: Object = {
        enable: true
    };
     // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
     // custom code end
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public width: string = Browser.isDevice ? '100%' : '60%';

    constructor() {
        //code
    };

}