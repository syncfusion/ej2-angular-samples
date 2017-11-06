import { Component, ViewEncapsulation } from '@angular/core';
import { ChartDataService } from './chartdata.service';
import { Browser } from '@syncfusion/ej2-base';
import { ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-ng-charts';

/**
 * Scatter Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'scatter.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class ScatterChartComponent {
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public width: string = Browser.isDevice ? '100%' : '60%';

    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        title: 'Height (cm)',
        minimum: 145,
        maximum: 185,
        majorGridLines: { width: 0 },
        edgeLabelPlacement: 'Shift',
        labelFormat: '{value}cm'
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        title: 'Weight (kg)',
        minimum: 60,
        maximum: 90,
        labelFormat: '{value}kg',
        rangePadding: 'None'

    };
    public marker: Object = {
       visible: false,
       height: 10,
       width: 10
    };
    public tooltip: Object = {
        enable: true
    };

    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    };
    public title: string = 'Height vs Weight';
    public series1: Object = ChartDataService.prototype.GetScatterData().series1;
    public series2: Object = ChartDataService.prototype.GetScatterData().series2;
    constructor() {
        //code
     };

}