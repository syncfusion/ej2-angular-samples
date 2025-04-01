import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme, TechnicalIndicatorModel, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { chartValue } from './financial-data';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadChartTheme } from './theme-color';

/**
 * Sample for RSI Indicator
 */
@Component({
    selector: 'control-content',
    templateUrl: 'relative-strength-index-indicator.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
})
export class RsiIndicatorComponent {
    public period: number = 3;
    public showZones: boolean = true;
    public overBought: number = 70;
    public overSold: number = 30;
    public upperLine: string = '#ffb735';
    public lowerLine: string = '#f2ec2f';
    // indicators
    public indicators: TechnicalIndicatorModel[] = [
        {
            type: 'Rsi',
            xName: 'x',
            field: 'Close',
            yAxisName: 'secondary',
            fill: 'blue',
            period: this.period,
            seriesName: 'Apple Inc',
            showZones: this.showZones,
            overBought: this.overBought,
            overSold: this.overSold,
            upperLine: { color: this.upperLine },
            lowerLine: {color: this.lowerLine}
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
        title: 'Price(in Million)',
        labelFormat: '${value}M',
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
        majorGridLines: { width: 0 }, lineStyle: { width: 0 }, minimum: 0, maximum: 120, interval: 60,
        majorTickLines: { width: 0 }, title: 'RSI', stripLines: [
            {
                start: 0, end: 120, text: '', color: 'black', visible: true,
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
    public chartArea: Object = {
        border: { width: 0 }
    };
    public legendSettings: Object = {
        visible: false
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