import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ILoadedEventArgs, ChartComponent, ChartTheme } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
/**
 * Sample for Column Series with Side by side Placement
 */
@Component({
    selector: 'control-content',
    templateUrl: 'column-placement.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class PlacementColumnChartComponent {

    public data: Object[] = [
        { x: 'Jamesh', y: 10, text: 'Total 10' },
        { x: 'Michael', y: 9, text: 'Total 9' }, { x: 'John', y: 11, text: 'Total 11' }
    ];
    public data1: Object[] = [
        { x: 'Jamesh', y: 5 }, { x: 'Michael', y: 4 }, { x: 'John', y: 5 }
    ];
    public data2: Object[] = [
        { x: 'Jamesh', y: 4 }, { x: 'Michael', y: 3 }, { x: 'John', y: 4 }
    ];
    public data3: Object[] = [
        { x: 'Jamesh', y: 1 }, { x: 'Michael', y: 2 }, { x: 'John', y: 2 }
    ];
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Category', interval: 1, majorGridLines: { width: 0 }
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        minimum: 0, maximum: 12, interval: 3, majorGridLines: { width: 0 },
        majorTickLines: { width: 0 }, lineStyle: { width: 0 }, labelStyle: { color: 'transparent' }
    };
    public marker: Object = { dataLabel: { visible: true, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } };
    public marker1: Object = { dataLabel: { visible: true, name: 'text', position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } }
    public title: string = 'Fruit Consumption';
    public tooltip: Object = {
        enable: true,
        shared: true
    };
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public placement: boolean = false;
    public width: string = Browser.isDevice ? '100%' : '60%';
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