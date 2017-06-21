import { Component, ViewEncapsulation } from '@angular/core';
import { ChartDataService } from './chartdata.service';

/**
 * Crosshair 
 */
@Component({
    selector: 'control-content',
    templateUrl: 'crosshair.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class CrosshairChartComponent {

    public primaryXAxis: Object = {
        columnIndex: 0,
        majorGridLines: { width: 0 },
        valueType: 'DateTime',
        title: 'Years', crosshairTooltip: { enable: true },
        labelFormat: 'yMMM'
    };
    public primaryYAxis: Object = {
        minimum: 10, maximum: 90, interval: 10,
        title: 'Temperature (°F)',
        rowIndex: 0,
        crosshairTooltip: {
            enable: true
        }
    };
    public border: Object = {
        width: 1.5
    };
    public title: string = 'Weather Condition';
    public majorGridLines: Object = { width: 0 };
    public crosshairLabel: Object = { enable: true};
    public series1: Object = ChartDataService.prototype.GetCrosshairData().series1;
    public series2: Object = ChartDataService.prototype.GetCrosshairData().series2;
    constructor() {
        //code
    };

}