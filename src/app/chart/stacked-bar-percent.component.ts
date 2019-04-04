import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';

/**
 * Sample for 100 percent Stacked bar Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'stacked-bar-percent.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class PercentStackedBarChartComponent {

    public data: Object[] = [
        { x: 'Jan', y: 6, y1: 6, y2: 1 }, { x: 'Feb', y: 8, y1: 8, y2: 1.5 },
        { x: 'Mar', y: 12, y1: 11, y2: 2 }, { x: 'Apr', y: 15, y1: 16, y2: 2.5 },
        { x: 'May', y: 20, y1: 21, y2: 3 }, { x: 'Jun', y: 24, y1: 25, y2: 3.5 }
    ];
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Category',
        majorGridLines: { width: 0 },
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        edgeLabelPlacement: 'Shift'
    };
    //Initializing Tooltip
    public tooltip: Object = {
        enable: true,
        format: '${point.x} : <b>${point.y} (${point.percentage}%)</b>'
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

    public title: string = 'Sales Comparison';
    constructor() {
       //code
    };

}