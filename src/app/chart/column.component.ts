import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ILoadedEventArgs, ChartComponent, ChartTheme } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
/**
 * Sample for Column Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'column.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class ColumnChartComponent {

    public data: Object[] = [
        { x: 'USA', y: 46 }, { x: 'GBR', y: 27 }, { x: 'CHN', y: 26 }
    ];
    public data1: Object[] = [
        { x: 'USA', y: 37 }, { x: 'GBR', y: 23 }, { x: 'CHN', y: 18 }
    ];
    public data2: Object[] = [
        { x: 'USA', y: 38 }, { x: 'GBR', y: 17 }, { x: 'CHN', y: 26 }
    ];
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Category', interval: 1, majorGridLines: { width: 0 }
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        majorGridLines: { width: 0 },
        majorTickLines: { width: 0 }, lineStyle: { width: 0 }, labelStyle: { color: 'transparent' }
    };
    public marker: Object = { dataLabel: { visible: true, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } }
    public title: string = 'Olympic Medal Counts - RIO';
    public tooltip: Object = {
        enable: true
    };
      // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
        if(selectedTheme === 'highcontrast'){
        args.chart.series[0].marker.dataLabel.font.color= '#000000';
        args.chart.series[1].marker.dataLabel.font.color= '#000000';
        args.chart.series[2].marker.dataLabel.font.color= '#000000';
        }
    };
      // custom code end
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