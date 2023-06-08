import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme, TechnicalIndicatorModel } from '@syncfusion/ej2-angular-charts';
import { chartValue } from './financial-data';
import { Browser } from '@syncfusion/ej2-base';

/**
 * Sample for Stochastic Indicator
 */
@Component({
    selector: 'control-content',
    templateUrl: 'stochastic.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class StochasticIndicatorComponent {
    public showZones: boolean = true;
    public period: number = 3;
    public periodLine: string = '#f2ec2f';
    public upperLine: string = '#ffb735';
    public lowerLine: string = '#f2ec2f';
    // indicators
    public indicators: TechnicalIndicatorModel[] = [
        {
            type: 'Stochastic',
            field: 'Close',
            yAxisName: 'secondary',
          
            fill: '#6063ff',
            period: this.period,
            seriesName: 'Apple Inc',
            upperLine: {
                color: this.upperLine
            },
            overBought: 70,
            overSold: 30,
            showZones: this.showZones,
            periodLine: {
                color: this.periodLine
            },
            lowerLine:  {
                color: this.lowerLine
            }
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
        labelFormat: '${value}',
        minimum: 50, maximum: 170,
        plotOffset: 25,
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
        majorTickLines: { width: 0 }, title: 'Stochastic', stripLines: [
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
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
     // custom code end
    constructor() {
        //code
    };

}