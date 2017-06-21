import { Component, ViewEncapsulation } from '@angular/core';
import { ChartDataService } from './chartdata.service';

/**
 * Crosshair 
 */
@Component({
    selector: 'control-content',
    templateUrl: 'local-data.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class LocalDataChartComponent {

    public primaryXAxis: Object = {
        title: 'Years',
        majorGridLines: { width: 0 },
        valueType: 'DateTime',
        edgeLabelPlacement: 'Shift'
    };
    public primaryYAxis: Object = {
        title: 'Price ($)',
        labelFormat: '${value}',
        rangePadding: 'None'
    };
    public title: string = 'Stock Price Analysis';
    public animation: Object = {enable: true};
    public series1: Object = ChartDataService.prototype.GetLocalData().series1;
    public series2: Object = ChartDataService.prototype.GetLocalData().series2;
    constructor() {
        //code
     };

}