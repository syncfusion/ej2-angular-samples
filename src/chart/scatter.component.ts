import { Component, ViewEncapsulation } from '@angular/core';
import { ChartDataService } from './chartdata.service';
import { ILoadedEventArgs } from '@syncfusion/ej2-ng-charts';

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

    public primaryXAxis: Object = {
        title: 'Height (cm)',
        minimum: 120,
        maximum: 180,
        edgeLabelPlacement: 'Shift',
        labelFormat: '{value}cm'
    };
    public primaryYAxis: Object = {
        title: 'Weight (kg)',
        labelFormat: '{value}kg',
        rangePadding: 'None',
        minimum: 60,
        maximum: 90

    };
    public marker: Object = {
       visible: false,
       height: 10,
       width: 10
    };
    public tooltip: Object = {
        enable: true,
        enableAnimation: false,
        format: '${series.name}<br>Height: ${point.x}<br>Weight: ${point.y}'
    };

    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        args.chart.theme = (selectedTheme && selectedTheme.indexOf('fabric') > -1) ? 'Fabric' : 'Material';
    };
    public title: string = 'Height vs Weight';
    public series1: Object = ChartDataService.prototype.GetScatterData().series1;
    public series2: Object = ChartDataService.prototype.GetScatterData().series2;
    constructor() {
        //code
     };

}