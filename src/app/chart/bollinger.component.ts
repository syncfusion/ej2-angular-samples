import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme, TechnicalIndicatorModel, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { chartValue } from './financial-data';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadChartTheme } from './theme-color';

/**
 * Sample fro Bollinger Band Indicator
 */
@Component({
    selector: 'control-content',
    templateUrl: 'bollinger.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
})
export class BollingerIndicatorComponent {
    public upperLine: Object = {
        color: '#ffb735',
        width: 1
    };
    public lowerLine: Object = {
        color: '#f2ec2f',
        width: 1
    };
    // indicators
    public indicators: TechnicalIndicatorModel[] = [
        {
            type: 'BollingerBands',
            xName: 'x',
            field: 'Close',
            fill: '#606eff',
            period: 14,
            seriesName: 'Apple Inc',
            upperLine: this.upperLine,
            lowerLine: this.lowerLine,
            animation: {enable: true},
            
        }
    ];
    public data1: Object[] = chartValue;
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'DateTime',
        intervalType: 'Months',
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
        lineStyle: { width: 0 },
        
    };

    public zoomSettings: Object = {
        enablePinchZooming: true,
        enableDeferredZooming:true,
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
    public legendSettings: Object = {
        visible: false
    };
    public chartArea: Object = {
        border: {
            width: 0
        }
    };

    public animation: Object = {
        enable: false
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