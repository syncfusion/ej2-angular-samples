import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-angular-charts';
import { chartData } from './financial-data';
import { Browser } from '@syncfusion/ej2-base';

/**
 * Sample for Hilo Series
 */
let date1: Date = new Date('2017-01-01');
let returnValue: any = chartData.filter(filterValue);
function filterValue(value: { x: Date, high: number, low: number }): any {
    if (value.x >= date1) {
        return value.x, value.high, value.low;
    }
}
@Component({
    selector: 'control-content',
    templateUrl: 'hilo.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class HiloChartComponent {

    public data1: Object[] = returnValue;

    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'DateTime',
        minimum: new Date('2016-12-31'),
        maximum: new Date('2017-09-30'),
        crosshairTooltip: { enable: true },
        majorGridLines: { width: 0 }
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        title: 'Price',
        minimum: 100,
        maximum: 180,
        interval: 20,
        labelFormat: '${value}',
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 }
    };
    public marker: Object = {
        visible: false
    };

    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public width: string = Browser.isDevice ? '100%' : '80%';

    public title: string = 'AAPL Historical';
    public tooltip: Object = {
        enable: true,
        shared: true
    };
    public legendSettings: Object = {
        visible: false
    };
    public crosshair: Object = {
        enable: true,
        lineType: 'Vertical', line: {
            width: 0,
        }
    };
    // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
    // custom code end
    constructor() {
        //code
    };

}