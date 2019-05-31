import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme, MarkerSettingsModel } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';

/**
 * Sample for 100% Stacked Line Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'stacked-line-percent.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class PercentStackedLineChartComponent {

    public data: Object[] = [
        { x: 'Food', y: 90 },
        { x: 'Transport', y: 80 },
        { x: 'Medical', y: 50 },
        { x: 'Clothes', y: 70 },
        { x: 'Personal Care', y: 30 },
        { x: 'Books', y: 10 },
        { x: 'Fitness', y: 100 },
        { x: 'Electricity', y: 55 },
        { x: 'Tax', y: 20 },
        { x: 'Pet Care', y: 40 },
        { x: 'Education', y: 45 },
        { x: 'Entertainment', y: 75 },
    ];
    public data1: Object[] = [
        { x: 'Food', y: 40 },
        { x: 'Transport', y: 90 },
        { x: 'Medical', y: 80 },
        { x: 'Clothes', y: 30 },
        { x: 'Personal Care', y: 80 },
        { x: 'Books', y: 40 },
        { x: 'Fitness', y: 30 },
        { x: 'Electricity', y: 95 },
        { x: 'Tax', y: 50 },
        { x: 'Pet Care', y: 20 },
        { x: 'Education', y: 15 },
        { x: 'Entertainment', y: 45 },
    ];
    public data2: Object[] = [
        { x: 'Food', y: 70 },
        { x: 'Transport', y: 110 },
        { x: 'Medical', y: 120 },
        { x: 'Clothes', y: 60 },
        { x: 'Personal Care', y: 80 },
        { x: 'Books', y: 30 },
        { x: 'Fitness', y: 70 },
        { x: 'Electricity', y: 55 },
        { x: 'Tax', y: 40 },
        { x: 'Pet Care', y: 80 },
        { x: 'Education', y: 45 },
        { x: 'Entertainment', y: 65 },
    ];
    public data3: Object[] = [
        { x: 'Food', y: 120 },
        { x: 'Transport', y: 70 },
        { x: 'Medical', y: 50 },
        { x: 'Clothes', y: 180 },
        { x: 'Personal Care', y: 30 },
        { x: 'Books', y: 270 },
        { x: 'Fitness', y: 40 },
        { x: 'Electricity', y: 75 },
        { x: 'Tax', y: 65 },
        { x: 'Pet Care', y: 95 },
        { x: 'Education', y: 135 },
        { x: 'Entertainment', y: 115 },
    ];
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        majorGridLines: { width: 0 },
        minorGridLines: { width: 0 },
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 },
        interval: 1,
        lineStyle: { width: 0 },
        valueType: 'Category'
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        title: 'Expense',
        lineStyle: { width: 0 },
        interval: 20,
        majorTickLines: { width: 0 },
        majorGridLines: { width: 1 },
        minorGridLines: { width: 1 },
        minorTickLines: { width: 0 },
    };
    public tooltip: Object = {
        enable: true,
        format: '${point.x} : <b>${point.y} (${point.percentage}%)</b>'
    };
     // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark');
    };
     // custom code end
    public title: string = 'Family Expense for Month';
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public width: string = Browser.isDevice ? '100%' : '90%';
    public marker: MarkerSettingsModel = { visible: true };

    constructor() {
        //code
    };

}