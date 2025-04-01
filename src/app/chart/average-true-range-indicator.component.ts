import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme, TechnicalIndicatorModel, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { chartValue } from './financial-data';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadChartTheme } from './theme-color';

/**
 * Sample for ATR indicator
 */
@Component({
    selector: 'control-content',
    templateUrl: 'average-true-range-indicator.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
})
export class AtrIndicatorComponent {
    // indicators
    public indicators: TechnicalIndicatorModel[] = [
        {
            type: 'Atr',
            xName: 'x',
            field: 'Close',
            yAxisName: 'secondary',
            fill: 'blue',
            period: 3,
            seriesName: 'Apple Inc'
        }
    ];
    public data1: Object[] = chartValue;
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'DateTime',
        majorGridLines: { width: 0 },
        zoomFactor: 0.2, zoomPosition: 0.6,
        crosshairTooltip: { enable: true },
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        title: 'Price',
        labelFormat: '${value}',
        minimum: 50, maximum: 170,
        interval: 30, rowIndex: 1,
        plotOffset: 25,
        majorGridLines: { width: 1 }, opposedPosition: true, lineStyle: { width: 0 }
    };
    //Initializing Rows
    public rows: Object = [
        {
            height: '40%'
        }, {
            height: '60%'
        }
    ];

    //Initializing Axes
    public axes: Object = [{
        name: 'secondary',
        opposedPosition: true, rowIndex: 0,
        majorGridLines: { width: 0 }, lineStyle: { width: 0 }, majorTickLines: { width: 0 }, title: 'ATR',
        stripLines: [
            {
                start: 0, end: 14, text: '', color: '#6063ff', visible: true,
                opacity: 0.1, zIndex: 'Behind'
            }]

    }];
    //Initializing Zooming
    public zoomSettings: Object = {

        enableSelectionZooming: true,
        mode: 'X',
        enablePan : true
    };
    //Initializing Chart Title
    public title: string = 'AAPL Stock Price 2012-2017';
    public tooltip: Object = {
        enable: true,
        shared: true
    };
    //Initializing Crosshair
    public crosshair: Object = {
        enable: true, lineType: 'Vertical'
    };
    public chartArea: Object = {
        border: { width: 0 }
    };
    public legendSettings: Object = {
        visible: false
    };
    public period: number = 3;
    public width: string = Browser.isDevice ? '100%' : '75%';
       // custom code start
    public load(args: ILoadedEventArgs): void {
        loadChartTheme(args);
    };
      // custom code end
    constructor() {
        //code
    };

}