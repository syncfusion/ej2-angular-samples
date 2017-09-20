import { Component, ViewEncapsulation } from '@angular/core';
import { ChartDataService } from './chartdata.service';
import { ILoadedEventArgs } from '@syncfusion/ej2-ng-charts';

/**
 * Trackball
 */
@Component({
    selector: 'control-content',
    templateUrl: 'zooming.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class ZoomingChartComponent {

    public primaryXAxis: Object = {
        title: 'Years',
        valueType: 'DateTime',
        labelFormat: 'yMMM',
        edgeLabelPlacement: 'Shift',
        majorGridLines : { width : 0 }
    };
    public primaryYAxis: Object = {
        title: 'Profit ($)',
        rangePadding: 'None',
        lineStyle : { width: 0 },
        majorTickLines : {width : 0}
    };
    public legend: Object = {
        visible: false
    };
    public animation: Object = { enable: false};
    public zoomSettings: Object = {
        mode: 'X',
        enableMouseWheelZooming: true,
        enablePinchZooming: true,
        enableSelectionZooming: true,
    };
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        args.chart.theme = (selectedTheme && selectedTheme.indexOf('fabric') > -1) ? 'Fabric' : 'Material';
    };
    public chartArea : Object = {border : {width : 0}};
    public border: Object = { width: 0.5, color: '#00bdae' };
    public title: string = 'Sales History of Product X';
    public series1: Object = ChartDataService.prototype.GetZoomingData().series1;
    constructor() {
        //code
    };

}