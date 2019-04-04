import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import {
    ChartTheme, IRangeLoadedEventArgs, IChangedEventArgs, DateTime, AreaSeries, Chart, ChartAnnotation,
    PeriodSelector, StepLineSeries, RangeNavigator, IAxisLabelRenderEventArgs, getElement, withInBounds,
    IAxisRangeCalculatedEventArgs, ITooltipRenderEventArgs, ILoadedEventArgs
} from '@syncfusion/ej2-charts';
import { ChartComponent, RangeNavigatorComponent } from '@syncfusion/ej2-angular-charts';
import { Browser, remove } from '@syncfusion/ej2-base';
import { SwitchComponent, ChangeEventArgs } from '@syncfusion/ej2-angular-buttons';
import { periodData } from './period-data';

/**
 * Sample for Periodic Selector
 */

let selectedTheme: string = location.hash.split('/')[1];
selectedTheme = selectedTheme ? selectedTheme : 'Material';
let theme: ChartTheme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");

let data: any[] = [];
for (let i = 2110; i < periodData.length; i++) {
    data.push({
        High: periodData[i].High,
        Low: periodData[i].Low,
        Close: periodData[i].Close,
        Open: periodData[i].Open,
        date: new Date(2010, 6, i)
    });
}


@Component({
    selector: 'control-content',
    templateUrl: 'period-default.html',
    encapsulation: ViewEncapsulation.None
})

export class PeriodicSelectorRNComponent {
    @ViewChild('chartPeriod')
    public chart: ChartComponent;
    @ViewChild('containerBottom')
    public rangeBottom: RangeNavigatorComponent;
    @ViewChild('containerTop')
    public rangeTop: RangeNavigatorComponent;
    public data: Object = data;
    public primaryXAxis: Object = {
        valueType: 'DateTime', majorGridLines: { width: 0 }, edgeLabelPlacement: 'Shift',
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
      labelFormat: 'n0', opposedPosition: true, lineStyle: { width: 0 }, rangePadding: 'None'
    };
    public zoomSettings: Object = { enableMouseWheelZooming: true, mode: 'X', toolbarItems: [] };
    public tooltip: Object = {
        enable: true,
        shared: true
    };
    public width: string = Browser.isDevice ? '100%' : '80%';
    public crosshair: Object = {
        enable: true
    };
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public theme: string = theme;
    public legendSettings: Object = {
        visible: false
    };
    public periodSelectorSettings: Object = {
        position: 'Top',
        periods: [
            { text: '1M', interval: 1, intervalType: 'Months' },
            { text: '3M', interval: 3, intervalType: 'Months' },
            { text: '6M', interval: 6, intervalType: 'Months' },
            { text: '1Y', interval: 1, intervalType: 'Years' },
            { text: '2Y', interval: 2, intervalType: 'Years', selected: true },
            { text: 'ALL' }
        ]
    };
    public loadPeriodic(args: IRangeLoadedEventArgs): void {
        args.rangeNavigator.periodSelectorSettings.height =
            document.body.className.indexOf('e-bigger') > -1 ? 56 : 42;
    };
    public loaded(args: IRangeLoadedEventArgs): void {
        if (!Browser.isDevice) {
            document.getElementById('containerTop_Secondary_Element').style.transform = 'translate(12%)';
        }
    };
    public changedTop(args: IChangedEventArgs): void {
        if (this.rangeBottom && this.rangeBottom.rangeSlider) {
            this.rangeBottom.rangeSlider.setSlider((args.start as Date).getTime(), (args.end as Date).getTime(), false, false);
        }
        if (this.chart) {
            this.chart.primaryXAxis.zoomFactor = 1;
            this.chart.primaryXAxis.zoomPosition = 0;
            let filterData: Object[] = data.filter((data: object) => {
                /* tslint:disable:no-string-literal */
                return (data['date'].getTime() >= (args.start as Date).getTime() && data['date'].getTime() <= (args.end as Date).getTime());
            });
            this.chart.series[0].animation.enable = false; 
            this.chart.series[0].dataSource = filterData;
            this.chart.refresh();
            this.chart.setAnnotationValue(0, '<div id="annotation"></div>');
        }
    };
    public changedBottom(args: IChangedEventArgs): void {
        if (this.rangeTop) {
            this.rangeTop.periodSelectorModule.datePicker.startDate = args.start as Date;
            this.rangeTop.periodSelectorModule.datePicker.endDate = args.end as Date;
            this.rangeTop.dataBind();
        }
        if (this.chart) {
            this.chart.primaryXAxis.zoomFactor = 1;
            this.chart.primaryXAxis.zoomPosition = 0;
            let filterData: Object[] = data.filter((data: object) => {
                /* tslint:disable:no-string-literal */
                return (data['date'].getTime() >= (args.start as Date).getTime() && data['date'].getTime() <= (args.end as Date).getTime());
            });
            this.chart.series[0].animation.enable = false; 
            this.chart.series[0].dataSource = filterData;
            this.chart.setAnnotationValue(0, '<div id="annotation"></div>');
            this.chart.refresh();
        }

    };
    public axisLabelRender(args: IAxisLabelRenderEventArgs): void {
        if (args.axis.opposedPosition) {
           let value: number = Math.round(Number(args.text)) / 1000; args.text = '$' + String(value) + 'k';
        }

    };
    public value: Object = [new Date('2016-05-15'), new Date('2018-05-15')];
    public axisRangeCalculated(args: IAxisRangeCalculatedEventArgs): void {
        this.chart.setAnnotationValue(0, '<div></div>');
    };
    public tooltipRender(args: ITooltipRenderEventArgs): void {
        if (args.text.length > 0) {
            let text: string[] = args.text.split('<br/>');
            let html: string = '<table><thead>' + text[0] + '</thead>';
            let value: string[];
            for (let i: number = 1; i < text.length; i++) {
                value = text[i].split(':');
                html += '<tr><td style="opacity:0.5">' + value[0] + ':</td><td style="padding-left: 5px;">$' +
                       (+value[1].split('<b>')[1].split('</b>')[0]).toFixed(2) + '</td></tr>';
            }
            html += '</table>';
            this.chart.setAnnotationValue(
                0,
                '<div id="annotation" style="line-height: 18px; font-size: 13px;background: #fff; opacity:0.9; color: #464e56; ' +
                ' box-shadow:0 0 8px 0 rgba(70,78,86,.25); padding: 7px 10px; border-radius: 3px">' + html + '</div>');
        }
        args.text = '';
    };
    public chartMouseMove(): void {
        if (!withInBounds(this.chart.mouseX, this.chart.mouseY, this.chart.chartAxisLayoutPanel.seriesClipRect)) {
            this.removeSecondaryElement();
        }
    };
    public removeSecondaryElement() {
        setTimeout(function () {
            if (getElement('annotation')) {
                remove(getElement('annotation'));
            }
        }, 2000)
    };
    public chartLoad(args: ILoadedEventArgs): void {
        args.chart.tooltip.format = args.chart.series[0].type === 'Candle' ?
            '${point.x}<br/>High : <b>${point.high}</b><br/>Low : <b>${point.low}</b><br/>' +
            'Open : <b>${point.open}</b><br/>Close : <b>${point.close}</b>' :
            '${point.x}<br/>Close : <b>${point.close}</b>';
    };
    public changeSwitch(args: ChangeEventArgs): void {
        this.chart.series[0].type = !args.checked ? 'Line' : 'Candle';
        this.chart.annotations[0].content = '';
        this.chart.refresh();

    }

}