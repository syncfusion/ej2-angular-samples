import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';

/**
 * Sample for Stacked bar Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'stacked-bar.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class StackedBarChartComponent {

    public data: Object[] = [
        { x: 'Jan', y: 6 }, { x: 'Feb', y: 8 }, { x: 'Mar', y: 12 }, { x: 'Apr', y: 15.5 },
        { x: 'May', y: 20 }, { x: 'Jun', y: 24 }
    ];
    public data1: Object[] = [
        { x: 'Jan', y: 6 }, { x: 'Feb', y: 8 }, { x: 'Mar', y: 11 }, { x: 'Apr', y: 16 },
        { x: 'May', y: 21 }, { x: 'Jun', y: 25 }
    ];
    public data2: Object[] = [
        { x: 'Jan', y: -1 }, { x: 'Feb', y: -1.5 }, { x: 'Mar', y: -2 }, { x: 'Apr', y: -2.5 },
        { x: 'May', y: -3 }, { x: 'Jun', y: -3.5 }
    ];
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Category',
        majorGridLines: { width: 0 }
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        lineStyle: { width: 0},
        majorTickLines: {width: 0},
        labelFormat: '{value}%',
        edgeLabelPlacement: 'Shift'
    };
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
    public title: string = 'Sales Comparison';
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