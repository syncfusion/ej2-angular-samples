import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme, TechnicalIndicatorModel, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { chartValue } from './financial-data';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadChartTheme } from './theme-color';

/**
 * Sample for Momentum Indicator
 */
@Component({
    selector: 'control-content',
    templateUrl: 'momentum.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
})
export class MomentumIndicatorComponent {
    public data1: Object[] = chartValue;
    public period: number = 3;
    public upperLine: string = '#ffb735';
    // indicators
    public indicators: TechnicalIndicatorModel[] = [
        {
            type: 'Momentum',
            xName: 'x',
            field: 'Close',
            fill: 'blue',
            yAxisName: 'secondary',
            period: this.period,
            upperLine: {
               color: this.upperLine,
            },
            seriesName: 'Apple Inc'
        }
    ];
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'DateTime',
        majorGridLines: { width: 0 }, zoomFactor: 0.2, zoomPosition: 0.6,

        crosshairTooltip: { enable: true }
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        title: 'Price',
        labelFormat: '${value}',
        plotOffset: 25,
        minimum: 50, maximum: 170,
        interval: 30, rowIndex: 1, opposedPosition: true, lineStyle: { width: 0 },
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
        majorGridLines: { width: 0 }, lineStyle: { width: 0 }, minimum: 80, maximum: 120, interval: 20,
        majorTickLines: { width: 0 }, title: 'Momentum', stripLines: [
            {
                start: 80, end: 120, text: '', color: 'black', visible: true,
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