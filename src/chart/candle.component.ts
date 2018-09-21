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
    templateUrl: 'candle.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class CandleChartComponent {
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
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    };
    public loadPeriodic(args: IRangeLoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.rangeNavigator.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    };
    public loaded(args: IRangeLoadedEventArgs): void {
        if (!Browser.isDevice) {
            document.getElementById('containerTop_Secondary_Element').style.transform = 'translate(13%)';
        }
    };
    public periodSelectorSettings: Object = {
        position: 'Top',
        periods: [
                { text: '1M', interval: 1, intervalType: 'Months' },
                { text: '3M', interval: 2, intervalType: 'Months' },
                { text: '2Q', interval: 2, intervalType: 'Quarter' },
                { text: '1Y', interval: 1, intervalType: 'Years' },
                { text: '2Y', interval: 2, intervalType: 'Years', selected: true },
                { text: 'YTD' },
                { text: 'All' }
            ]
    };
    public changed(args: IChangedEventArgs): void {
    let data: Object[] = chartDataValue.filter((data: object) => {
                    /* tslint:disable:no-string-literal */
                    return (data['x'].getTime() >= (args.start as Date).getTime() &&
                        data['x'].getTime() <= (args.end as Date).getTime());
                });
          this.chart.series[0].dataSource = data;
          this.chart.series[1].dataSource = data;
          this.chart.series[0].animation.enable = false;
          this.chart.series[1].animation.enable = false;
          this.chart.primaryXAxis.zoomFactor = 1;
          this.chart.primaryXAxis.zoomPosition = 0;
          this.chart.refresh();
    };
    constructor() {
        //code
    };

}