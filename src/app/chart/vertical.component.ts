import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, Series, ChartTheme } from '@syncfusion/ej2-angular-charts';
import { getElement } from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';

/**
 * Sample for vertical chart
 */
@Component({
    selector: 'control-content',
    templateUrl: 'vertical.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class VerticalChartComponent {
    public clrInterval: number;

    public data1: Object[] = [ { Year: "2016", column: 13600 },
    { Year: "2017", column: 12900 },
    { Year: "2018", column: 12500 },
    { Year: "2019", column: 14500 },
    { Year: "2020", column: 14500 },
    { Year: "2021", column: 12000 }];

    public data2: Object[] = [ { Year: "2016",  series: 0.5 },
    { Year: "2017", series: 1.5 },
    { Year: "2018", series: 3.5 },
    { Year: "2019", series: 1.5 },
    { Year: "2020", series: 3 },
    { Year: "2021", series: 2.5 }];

    //Initializing Primary X Axis
    public primaryXAxis: Object = {
         majorGridLines: { width: 0 } , valueType: 'Category', majorTickLines: {width: 0}, minorTickLines: {width: 0}
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        title: 'Sales in Billion',edgeLabelPlacement: 'Shift', majorGridLines: { width: 0 }, minimum: 11000 , maximum: 15000 , interval: 1000, lineStyle:{width: 0},majorTickLines: {width: 0}
    };
    public marker: Object = {
        visible: true,
        width: 7, height: 7, isFilled: true
    };
    public tooltip: Object = {
        enable: true
    };
    public legendSettings: Object = {
        visible: false
    };
    public animation1: Object = {
        enable: false
    };
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
     // custom code start
    public width: string = Browser.isDevice ? '100%' : '75%';
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast');
    }
     // custom code end
    public vertical: boolean = true;
    public count: number = 0;

    public axis: Object = [{
        majorGridLines: { width: 0 }, title:'Profit(In Percentage)',
        majorTickLines:{width: 0},
        opposedPosition: true,
        lineStyle: { width: 0 },
        minimum: 0, maximum: 4, interval: 0.5,
        edgeLabelPlacement: 'Shift',
        name: 'yAxis2',
        labelFormat: '{value}%'
    }];

    public title: string = 'Sales Vs Profit Margins';
    constructor() {
        //code
     };

}