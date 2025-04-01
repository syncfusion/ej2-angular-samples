import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme, TechnicalIndicatorModel, MacdType, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { chartValue } from './financial-data';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadChartTheme } from './theme-color';
/**
 * Sample for MACD Indicator
 */
@Component({
    selector: 'control-content',
    templateUrl: 'moving-average-convergence-divergence-indicator.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
})
export class MacdIndicatorComponent {
    public period: number = 3;
    public fastPeriod: number = 8;
    public slowPeriod: number = 5;
    public macdType: string = 'Both';
    // indicators
    public indicators: TechnicalIndicatorModel[] = [
        {
            type: 'Macd',
            xName: 'x',
            field: 'Close',
            fill: 'blue',
            yAxisName: 'secondary',
            period: this.period,
            fastPeriod: this.fastPeriod,
            slowPeriod: this.slowPeriod,
            macdType: this.macdType as MacdType,
            seriesName: 'Apple Inc'
        }
    ];
    public data1: Object[] = chartValue;
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'DateTime',
        majorGridLines: { width: 0 },
        crosshairTooltip: { enable: true }, zoomFactor: 0.2, zoomPosition: 0.6
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        title: 'Price',
        labelFormat: '${value}',
        plotOffset: 25,
        minimum: 50, maximum: 170,
        interval: 30, rowIndex: 1, opposedPosition: true, lineStyle: { width: 0 }
    };
    public rows: Object = [
        {
            height: '40%'
        }, {
            height: '60%'
        }
    ];

    public axes: Object = [{
        name: 'secondary',
        opposedPosition: true, rowIndex: 0,
        majorGridLines: { width: 0 }, lineStyle: { width: 0 }, minimum: -3.5, maximum: 3.5, interval: 3.5,
        majorTickLines: { width: 0 }, title: 'MACD', stripLines: [
            {
                start: -3.5, end: 3.5, text: '', color: 'black', visible: true,
                opacity: 0.03, zIndex: 'Behind'
            }]

    }];
    public zoomSettings: Object = {

        enableSelectionZooming: true,
        mode: 'X',
        enablePan : true
    };
    public title: string = 'AAPL Stock Price 2012-2017';
    public tooltip: Object = {
        enable: true,
        shared: true
    };
    public crosshair: Object = {
        enable: true, lineType: 'Vertical'
    };

    public legendSettings: Object = {
        visible: false
    };
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    // custom code start
    public width: string = Browser.isDevice ? '100%' : '75%';
    public load(args: ILoadedEventArgs): void {
        loadChartTheme(args);
    };
    // custom code end
    constructor() {
        //code
    };

}