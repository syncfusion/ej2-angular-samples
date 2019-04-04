import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
/**
 * Sample for Pareto Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'pare-to.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class ParetoSeriesChartComponent {
    //Initializing ChartArea
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public width: string = Browser.isDevice ? '100%' : '60%';

    public data: Object[] = [
        { x: 'Traffic', y: 56 }, { x: 'Child Care', y: 44.8 },
        { x: 'Transport', y: 27.2 }, { x: 'Weather', y: 19.6 },
        { x: 'Emergency', y: 6.6 }
    ];
    
    public marker: Object = {
        visible: true,
        width: 10,
        height: 10
    }
   
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        title: 'Defects',
        interval: 1,
        valueType: 'Category',
        majorGridLines: { width: 0 }, minorGridLines: { width: 0 },
        majorTickLines: { width: 0 }, minorTickLines: { width: 0 },
        lineStyle: { width: 0 },
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        title: 'Frequency',
        minimum: 0,
        maximum: 150,
        interval: 30,
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 }, majorGridLines: { width: 1 },
        minorGridLines: { width: 1 }, minorTickLines: { width: 0 }
    };
    public legend: Object = {
        visible: false
    };
    public title: string = 'Defect vs Frequency';
    // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
    // custom code end
    public tooltip: Object = {
        enable: true,
        shared: true
    };
    constructor() {
        //code
     };

}