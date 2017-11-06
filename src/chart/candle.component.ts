import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, IAxisLabelRenderEventArgs, ChartTheme, ITooltipRenderEventArgs } from '@syncfusion/ej2-ng-charts';
import { chartData } from './financial-data';
import { Browser } from '@syncfusion/ej2-base';

/**
 * Candle Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'candle.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class CandleChartComponent {
    public data1: Object[] = chartData;
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'DateTime',
        skeleton: 'yMd', zoomFactor: 0.2, zoomPosition: 0.6,
        crosshairTooltip: { enable: true },
        majorGridLines: { width: 0 },
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        title: 'Volume',
        labelFormat: '{value}',
        valueType: 'Logarithmic',
        minimum: 500000000, maximum: 130000000, opposedPosition: true,
        majorGridLines: { width: 1 },
        lineStyle: { width: 0 },
        stripLines: [
            {
                end: 1300000000, startFromAxis: true, text: '', color: 'black', visible: true,
                opacity: 0.03, zIndex: 'Behind'
            }]
    };
    public rows: Object = [
        {
            height: '30%'
        }, {
            height: '70%'
        }
    ];

    public axes: Object = [{
        name: 'secondary', minimum: 50, maximum: 180, interval: 40, opposedPosition: true, rowIndex: 1, majorGridLines: { width: 1 },
        labelFormat: '${value}', title: 'Price', plotOffset: 30, lineStyle: { width: 0 }

    }];
    //Initializing Zooming
    public zoomSettings: Object = {
        enableMouseWheelZooming: true,
        enablePinchZooming: true,
        enableSelectionZooming: true,
        mode: 'X'
    };
    public title: string = 'AAPL Historical';
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
    public axisLabelRender(args: IAxisLabelRenderEventArgs): void {
        if (args.axis.name === 'primaryYAxis') {
            args.text = this.getLabelText(+args.text);
        }
    };
    public width: string = Browser.isDevice ? '100%' : '80%';
    public legendSettings: Object = {
        visible: false
    };
    public tooltipRender(args: ITooltipRenderEventArgs): void {
        if (!args.series.index) {
            args.textCollections = 'Volume : <b>' +
                this.getLabelText(args.textCollections.split('<b>')[1].split('</b>')[0]) + '</b>';
        }
    }
    public getLabelText: Function = (value: number): string => {
        return (((value) / 1000000000)).toFixed(1) + 'bn';
    };
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    };
    constructor() {
        //code
    };

}