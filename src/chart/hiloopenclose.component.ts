import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-ng-charts';
import { chartData } from './financial-data';
import { Browser } from '@syncfusion/ej2-base';

/**
 * Sample for HiloOpenClose Series
 */
let date1: Date = new Date(2017, 1, 1);
let returnValue: any = chartData.filter(filterValue);
function filterValue(value: { x: Date, high: number, low: number }): any {
    if (value.x >= date1) {
        return value.x, value.high, value.low;
    }
}
@Component({
    selector: 'control-content',
    templateUrl: 'hiloopenclose.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class HiloOpenCloseChartComponent {

    public data1: Object[] = returnValue;

    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'DateTime',
        minimum: new Date(2016, 12, 31),
        maximum: new Date(2017, 9, 31),
        crosshairTooltip: { enable: true },
        majorGridLines: { width: 0 }
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        title: 'Price',
        labelFormat: '${value}',
        minimum: 100, maximum: 180,
        interval: 20,
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 }
    };

    //Initializing Chart Title
    public title: string = 'AAPL Historical';
    public tooltip: Object = {
        enable: true,
        shared: true
    };
    public marker: Object = {
        visible: false
    };
    public crosshair: Object = {
        enable: true,
        lineType: 'Vertical', line: {
            width: 0,
        }
    };
    public legendSettings: Object = {
        visible: false
    };
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    };
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public width: string = Browser.isDevice ? '100%' : '80%';

    constructor() {
        //code
    };

}