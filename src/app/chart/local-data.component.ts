import { Component, ViewEncapsulation } from '@angular/core';
import { ChartDataService } from './chart-data.service';
import { ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';

/**
 * Sample for local data binding
 */
@Component({
    selector: 'control-content',
    templateUrl: 'local-data.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class LocalDataChartComponent {

    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        title: 'Years',
        skeleton: 'y',
        majorGridLines: { width: 0 },
        valueType: 'DateTime',
        edgeLabelPlacement: 'Shift'
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        title: 'Price',
        labelFormat: '${value}',
        rangePadding: 'None',
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 }
    };

    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public tooltip: Object = {
        enable: true, shared: true
    }
    public crosshair: Object = {
        enable: true,
        line: {
            color: 'rgba(204,214,235,0.25)',
            width: Browser.isDevice ? 50 : 20,
        },
        lineType: 'Vertical'
    };
    public width: string = Browser.isDevice ? '100%' : '80%';
    // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
    // custom code end
    public title: string = 'Stock Price Analysis';
    public animation: Object = { enable: true };
    public series1: Object = ChartDataService.prototype.GetLocalData().series1;
    public series2: Object = ChartDataService.prototype.GetLocalData().series2;
    constructor() {
        //code
    };

}