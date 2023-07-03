import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme, MarkerSettingsModel } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';

/**
 * Sample for Stacked Line Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'stacked-line.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class StackedLineChartComponent {

    public data: Object[] = [
        { x: 'Jan', y: 90 },
        { x: 'Feb', y: 80 },
        { x: 'Mar', y: 50 },
        { x: 'Apr', y: 70 },
        { x: 'May', y: 30 },
        { x: 'Jun', y: 10 },
        { x: 'Jul', y: 100 },
        { x: 'Aug', y: 55 },
        { x: 'Sep', y: 20 },
        { x: 'Oct', y: 40 },
        { x: 'Nov', y: 45 },
        { x: 'Dec', y: 75 },
    ];
    public data1: Object[] = [
        { x: 'Jan', y: 40 },
        { x: 'Feb', y: 90 },
        { x: 'Mar', y: 80 },
        { x: 'Apr', y: 30 },
        { x: 'May', y: 80 },
        { x: 'Jun', y: 40 },
        { x: 'Jul', y: 30 },
        { x: 'Aug', y: 95 },
        { x: 'Sep', y: 50 },
        { x: 'Oct', y: 20 },
        { x: 'Nov', y: 15 },
        { x: 'Dec', y: 45 },
    ];
    public data2: Object[] = [
        { x: 'Jan', y: 70 },
        { x: 'Feb', y: 110 },
        { x: 'Mar', y: 120 },
        { x: 'Apr', y: 60 },
        { x: 'May', y: 80 },
        { x: 'Jun', y: 30 },
        { x: 'Jul', y: 70 },
        { x: 'Aug', y: 55 },
        { x: 'Sep', y: 40 },
        { x: 'Oct', y: 80 },
        { x: 'Nov', y: 45 },
        { x: 'Dec', y: 65 },
    ];
    public data3: Object[] = [
        { x: 'Jan', y: 120 },
        { x: 'Feb', y: 70 },
        { x: 'Mar', y: 50 },
        { x: 'Apr', y: 180 },
        { x: 'May', y: 30 },
        { x: 'Jun', y: 270 },
        { x: 'Jul', y: 40 },
        { x: 'Aug', y: 75 },
        { x: 'Sep', y: 65 },
        { x: 'Oct', y: 95 },
        { x: 'Nov', y: 135 },
        { x: 'Dec', y: 115 },
    ];
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        majorGridLines: { width: 0 },
        minorGridLines: { width: 0 },
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 },
        interval: 1,
        lineStyle: { width: 0 },
        valueType: 'Category',
        labelRotation: Browser.isDevice ? -45 : 0,
        labelIntersectAction: Browser.isDevice ? 'None' : 'Rotate45',
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        title: 'Expense',
        lineStyle: { width: 0 },
        minimum: 0,
        maximum: 400,
        interval: 100,
        majorTickLines: { width: 0 },
        majorGridLines: { width: 1 },
        minorGridLines: { width: 1 },
        minorTickLines: { width: 0 },
        labelFormat: '${value}',
    };
    public tooltip: Object = {
        enable: true
    };
    public legend: Object = {
        visible: true,
        enableHighlight : true
    }
     // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
    };
     // custom code end
    public title: string = 'Family Expenses for Year';
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public width: string = Browser.isDevice ? '100%' : '75%';
    public marker: Object = { visible: true, height: 7, width: 7 , shape: 'Circle' , isFilled: true };
    public marker1: Object = { visible: true, height: 7, width: 7 , shape: 'Diamond' , isFilled: true };
    public marker2: Object = { visible: true, height: 5, width: 5 , shape: 'Rectangle' , isFilled: true };
    public marker3: Object = { visible: true, height: 6, width: 6 , shape: 'Triangle' , isFilled: true };

    constructor() {
        //code
    };

}