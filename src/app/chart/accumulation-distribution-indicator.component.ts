import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, IAxisLabelRenderEventArgs, ChartTheme, TechnicalIndicatorModel, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { chartValue } from './financial-data';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadChartTheme } from './theme-color';

/**
 * Sample for Accumulation Distribution
 */

@Component({
    selector: 'control-content',
    templateUrl: 'accumulation-distribution-indicator.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
})
export class AccumulationDistributionComponent {
    public data1: Object[] = chartValue;
    // indicators
    public indicators: TechnicalIndicatorModel[] = [
        {
            type: 'AccumulationDistribution',
            xName: 'x',
            field: 'Close',
            yAxisName: 'secondary',
            fill: 'blue',
            period: 3,
            seriesName: 'Apple Inc'
        }
    ];
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
        plotOffset: 25,
        interval: 30, rowIndex: 1, opposedPosition: true, lineStyle: { width: 0 }
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
        majorGridLines: { width: 0 }, lineStyle: { width: 0 }, minimum: -7000000000, maximum: 5000000000,
        interval: 6000000000, majorTickLines: { width: 0 }, title: 'Accumulation Distribution (in Billion)',
        stripLines: [
            {
                start: -7000000000, end: 6000000000, text: '', color: '#6063ff', visible: true,
                opacity: 0.1, zIndex: 'Behind'
            }]

    }];
    public chartArea: Object = {
        border: { width: 0 }
    };
    //Initializing Zooming
    public zoomSettings: Object = {

        enableSelectionZooming: true,
        mode: 'X',
        enablePan : true
    };
    //Initializing Title
    public title: string = 'AAPL Stock Price 2012-2017';
    public tooltip: Object = {
        enable: true, shared: true
    };
    public crosshair: Object = {
        enable: true, lineType: 'Vertical'
    };
    public axisLabelRender(args: IAxisLabelRenderEventArgs): void {
        if (args.axis.name === 'secondary') {
            let value: number = parseInt(args.text) / 1000000000;
            args.text = String(value) + 'B';
        }
    };
    public legendSettings: Object = {
        visible: false
    };
    public width: Object = Browser.isDevice ? '100%' : '75%';
    // custom code start
    public load(args: ILoadedEventArgs): void {
        loadChartTheme(args);
    };
    // custom code end
    constructor() {
        //code
    };
}
