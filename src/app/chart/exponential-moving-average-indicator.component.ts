import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme, TechnicalIndicatorModel, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { chartValue } from './financial-data';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadChartTheme } from './theme-color';

/**
 * Sample for EMA Indicator
 */
@Component({
    selector: 'control-content',
    templateUrl: 'exponential-moving-average-indicator.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
})
export class EmaIndicatorComponent {
    public period: number = 14;
    // indicators
    public indicators: TechnicalIndicatorModel[] = [
        {
            type: 'Ema',
            xName: 'x',
            field: 'Close',
            fill: 'blue',
            period: this.period,
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
        title: 'Price (in Million)',
        labelFormat: '${value}M',
        minimum: 50, maximum: 170, interval: 30,
        majorGridLines: { width: 1 },
        lineStyle: { width: 0 }
    };
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
    public animation: Object = {
        enable: false
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