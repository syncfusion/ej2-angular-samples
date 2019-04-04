import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ILoadedEventArgs, IAxisLabelRenderEventArgs, ChartTheme, ITooltipRenderEventArgs, IRangeLoadedEventArgs,
 IChangedEventArgs, ChartComponent, IPointRenderEventArgs} from '@syncfusion/ej2-angular-charts';
import { chartDataValue } from './financial-data';
import { Browser } from '@syncfusion/ej2-base';

/**
 * Sample for Candle Series
 */
let pointColors: string[] = [];
@Component({
    selector: 'control-content',
    templateUrl: 'candle-stick.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class CandleStickChartComponent {
    @ViewChild('chartcontainer')
    public chart: ChartComponent;
    public data1: Object[] = chartDataValue;
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'DateTime',
        crosshairTooltip: { enable: true },
        majorGridLines: { width: 0 },
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        valueType: 'Logarithmic',
        opposedPosition: true,
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
        name: 'secondary', opposedPosition: true, rowIndex: 1, majorGridLines: { width: 1 },
        labelFormat: 'n0',  plotOffset: 30, lineStyle: { width: 0 }, rangePadding: 'None'

    }];
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
    public marker: Object = {
        visible: false
    };
    public axisLabelRender(args: IAxisLabelRenderEventArgs): void {
        if (args.axis.name === 'primaryYAxis') {
            args.text = this.getLabelText(+args.text);
        }
        if (args.axis.name === 'secondary') {
                args.text = '$' + args.text;
            }
    };
    public pointRender(args: IPointRenderEventArgs): void {
         if (args.series.type === 'Candle') { pointColors.push(args.fill); } else {
                args.fill = pointColors[args.point.index];
            }
    };
    public width: string = Browser.isDevice ? '100%' : '80%';
    public legendSettings: Object = {
        visible: false
    };
    public tooltipRender(args: ITooltipRenderEventArgs): void {
        if (!args.series.index) {
            args.text = 'Volume : <b>' +
                this.getLabelText(args.text.split('<b>')[1].split('</b>')[0]) + '</b>';
        }
    }
    public getLabelText: Function = (value: number): string => {
        return (((value) / 1000000000)).toFixed(1) + 'bn';
    };
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