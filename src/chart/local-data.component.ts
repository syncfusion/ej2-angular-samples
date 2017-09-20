import { Component, ViewEncapsulation } from '@angular/core';
import { ChartDataService } from './chartdata.service';
import { ILoadedEventArgs } from '@syncfusion/ej2-ng-charts';

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

    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        args.chart.theme = (selectedTheme && selectedTheme.indexOf('fabric') > -1) ? 'Fabric' : 'Material';
    };
    public title: string = 'Stock Price Analysis';
    public animation: Object = {enable: true};
    public series1: Object = ChartDataService.prototype.GetLocalData().series1;
    public series2: Object = ChartDataService.prototype.GetLocalData().series2;
    constructor() {
        //code
     };

}