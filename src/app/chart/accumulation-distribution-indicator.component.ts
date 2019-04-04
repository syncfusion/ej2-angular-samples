import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, IAxisLabelRenderEventArgs, ChartTheme } from '@syncfusion/ej2-angular-charts';
import { chartData } from './financial-data';
import { Browser } from '@syncfusion/ej2-base';

/**
 * Sample for Accumulation Distribution
 */
@Component({
    selector: 'control-content',
    templateUrl: 'accumulation-distribution-indicator.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class AccumulationDistributionComponent {
    public data1: Object[] = chartData;
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
        interval: 6000000000, majorTickLines: { width: 0 }, title: 'Accumulation Distribution',
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
    public title: string = 'AAPL 2012-2017';
    public tooltip: Object = {
        enable: true, shared: true
    };
    public crosshair: Object = {
        enable: true, lineType: 'Vertical'
    };
    public axisLabelRender(args: IAxisLabelRenderEventArgs): void {
        if (args.axis.name === 'secondary') {
            let value: number = parseInt(args.text) / 1000000000;
            args.text = String(value) + 'bn';
        }
    };
    public legendSettings: Object = {
        visible: false
    };
    public width: Object = Browser.isDevice ? '100%' : '80%';
    public period: number = 3;
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