import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, Series, ChartTheme, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { getElement } from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadChartTheme } from './theme-color';

/**
 * Sample for vertical chart
 */
@Component({
    selector: 'control-content',
    templateUrl: 'vertical.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
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
        title: 'Sales in Billion',edgeLabelPlacement: 'Shift', majorGridLines: { width: 0 }, minimum: 11000 , maximum: 15000 , interval: 500, lineStyle:{width: 0},majorTickLines: {width: 0}
    };
    public marker: Object = {
        visible: true,
        width: 7, height: 7, isFilled: true
    };
    public tooltip: Object = {
        enable: true,
        enableHighlight: true
    };
    public legendSettings: Object = {
        visible: false
    };
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
     // custom code start
    public width: string = Browser.isDevice ? '100%' : '75%';
    public load(args: ILoadedEventArgs): void {
        loadChartTheme(args);
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