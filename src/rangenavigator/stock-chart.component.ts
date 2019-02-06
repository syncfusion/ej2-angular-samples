import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import {
    ChartTheme, IRangeLoadedEventArgs, IChangedEventArgs, DateTime, AreaSeries, Chart,
    PeriodSelector, StepLineSeries, RangeNavigator, IAxisMultiLabelRenderEventArgs, withInBounds,
     ITooltipRenderEventArgs, templateAnimate, ChartAnnotation, PeriodSelectorSettingsModel, SeriesModel,
    IAxisLabelRenderEventArgs, IAxisRangeCalculatedEventArgs, IPointRenderEventArgs, ILoadedEventArgs, VisibleLabels
} from '@syncfusion/ej2-charts';
import { Browser, remove } from '@syncfusion/ej2-base';
import { getElement } from '@syncfusion/ej2-svg-base/src/tooltip/helper';
import { chartDataValue } from './stock-data';

/**
 * Sample for stock chart using period selector
 */

let selectedTheme: string = location.hash.split('/')[1];
selectedTheme = selectedTheme ? selectedTheme : 'Material';
let theme: ChartTheme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
let index: number = 0;
let removeSecondaryElement: Function;
let periodsValue: PeriodSelectorSettingsModel = {
    position: 'Top',
    periods: [
        { text: '1M', interval: 1, intervalType: 'Months' }, { text: '3M', interval: 3, intervalType: 'Months' },
        { text: '6M', interval: 6, intervalType: 'Months' }, { text: 'YTD' },
        { text: '1Y', interval: 1, intervalType: 'Years' },
        { text: '2Y', interval: 2, intervalType: 'Years', selected: true },
        { text: 'All' }
    ]
};
let annotationString: string = '<div id="annotation" style="line-height: 18px;' +
    ' font-size: 13px;background: #fff; opacity:0.9; color: #464e56; ' +
    ' box-shadow:0 0 8px 0 rgba(70,78,86,.25); padding: 7px 10px;' +
    ' border-radius: 3px">';
removeSecondaryElement = (): void => {
    setTimeout(() => {
        if (getElement('annotation')) {
            remove(getElement('annotation'));
        }
    },
        // tslint:disable-next-line:align
        2000
    );
};
let pointColors: string[] = [];
let getContent: Function = (value: string): string => {
    let text: string[] = value.split('<br/>'); let html: string = '<table><thead>' + text[0] + '</thead>';
    for (let i: number = 1; i < text.length; i++) {
        let value: string[] = text[i].split(':');
        if (i === text.length - 1) {
            html += '<tr><td style="opacity:0.5">' + value[0] + '</td><td style="padding-left: 5px;">' +
                Math.round(((+value[1].split('</b>')[0].split('<b>')[1]) / 10000000)) + 'B';
        } else {

            html += '<tr><td style="opacity:0.5">' + value[0] + '</td><td style="padding-left: 5px;">$' +
                (+value[1].split(' <b>')[1].split('</b>')[0]).toFixed(2) + '</td></tr>';
        }
    }
    return html;
};


@Component({
    selector: 'control-content',
    templateUrl: 'stock-chart.html',
    encapsulation: ViewEncapsulation.None
})

export class StockChartRNComponent {
    @ViewChild('chartStock')
    public chart: Chart;
    @ViewChild('containerStock')
    public range: RangeNavigator;
    public data: object = chartDataValue;
    public primaryXAxis: Object = {
        valueType: 'DateTime', majorGridLines: { width: 0 }, crosshairTooltip: { enable: true }
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        title: 'Price',
        crosshairTooltip: { enable: true },
        labelFormat: 'n0', plotOffset: 25,
        rowIndex: 1, opposedPosition: true,
        lineStyle: { width: 0 },
        rangePadding: 'None',
        majorGridLines: { width: 0 }
    };
    public rows: Object = [
        { height: '30%' },
        { height: '70%' }
    ];

    public axes: Object = [{
         name: 'secondary', opposedPosition: true, rowIndex: 0,
            majorGridLines: { width: 0 }, lineStyle: { width: 0 }, majorTickLines: { width: 0 }, rangePadding: 'None'
    }];
    public height: string = '350';
     public axisLabelRender(args: IAxisLabelRenderEventArgs): void {
        if (args.axis.name === 'secondary') {
                args.text = Math.round((args.value / 10000000)) + 'B';
            } else if (args.axis.orientation === 'Vertical') {
                args.text = '$' + Math.round(args.value);
            }
    };
    public axisRangeCalculated(args: IAxisRangeCalculatedEventArgs): void {
        this.chart.setAnnotationValue(0, '<div></div>');
    };
    public loaded(args: ILoadedEventArgs): void {
        let labels: VisibleLabels[] = (args.chart.axisCollections[0]).visibleLabels;
        let maxValue: number = args.chart.axisCollections[0].visibleRange.max;
        if (args.chart.primaryXAxis.stripLines.length === 1) {
                for (let i: number = 0; i < labels.length; i += 2) {
                    args.chart.primaryXAxis.stripLines.push({
                        start: new Date(labels[i].value), end: labels[i + 1] ? new Date(labels[i + 1].value) : new Date(maxValue),
                        zIndex: 'Behind', border: { width: 0, color: 'transparent' }, rotation: null,
                        opacity: 0.7, textStyle: {}, text: '', color: 'whitesmoke', visible: true
                    });
                }
                args.chart.refresh();
            }
    };
    public tooltip: Object = {
        enable: true,
        shared: true,
        format: '${point.x}<br/>High : <b>${point.high}</b><br/>Low :' +
                ' <b>${point.low}</b><br/>Open : <b>${point.open}</b><br/>Close : <b>${point.close}</b><br/>Volume : <b>${point.volume}</b>'
    };
    public crosshair: Object = {
        enable: true, lineType: 'Both'
    };
    public fastPeriod: number = 8;
    public slowPeriod: number = 5;
    public macdType: string = 'Both';

    public legendSettings: Object = {
        visible: false
    };
    public period: number = 3;
    public chartArea: Object = {
        border: { width: 1, color: 'whitesmoke' }
    };
    public chartMargin: Object = { top: 0 }
    public width: string = Browser.isDevice ? '100%' : '80%';
    public theme: string = theme;
    public zoomSettings: object = { enableMouseWheelZooming: true, mode: 'X', toolbarItems:[] };
    public changed(args: IChangedEventArgs): void {
        let data: Object[] = chartDataValue.filter((data: object) => {
                    /* tslint:disable:no-string-literal */
                    return (data['x'].getTime() >= (args.start as Date).getTime() &&
                        data['x'].getTime() <= (args.end as Date).getTime());
                });
        this.chart.series[0].animation.enable = false; 
        this.chart.primaryXAxis.zoomPosition = 0;
        this.chart.primaryXAxis.zoomFactor = 1; 
        this.chart.series[1].animation.enable = false;
        this.chart.primaryXAxis.stripLines = [{ visible: true }];
        this.chart.indicators[0].animation.enable = false;
        pointColors = [];
        this.chart.series[0].dataSource = data;
        this.chart.series[1].dataSource = data;
        this.chart.refresh();
        this.chart.setAnnotationValue(0, '<div id="annotation"></div>');
    };
    public rangeloaded(args: IRangeLoadedEventArgs): void {
        let value: number = this.range.svgObject.getBoundingClientRect().left - this.range.element.getBoundingClientRect().left;
        document.getElementById('containerStock').style.transform = 'translateX(' + (value - 10) + 'px)';

    };
    public load(args: IRangeLoadedEventArgs): void {
        args.rangeNavigator.periodSelectorSettings.height = document.body.className.indexOf('e-bigger') > -1 ? 56 : 42;
    };
    public tooltipRender(args: ITooltipRenderEventArgs): void {
        if (args.series.type === 'Candle') {
                this.chart.setAnnotationValue(0, annotationString + (getContent(args.text) + '</table>') + '</div>');
            }
        args.text = '';
    };

    public pointRender(args: IPointRenderEventArgs): void {
         if (args.series.type === 'Candle') {
             pointColors.push(args.fill);
         } else {
                args.fill = pointColors[args.point.index];
            }
    }
    public chartMouseLeave(): void {
        this.removeSecondaryElement();
    };
    public chartMouseMove(): void {
        if (!withInBounds(this.chart.mouseX, this.chart.mouseY, this.chart.chartAxisLayoutPanel.seriesClipRect)) {
            this.removeSecondaryElement();
        }
    };

    public removeSecondaryElement() {
        setTimeout(function () {
            if (getElement("annotation")) {
                remove(getElement("annotation"));
            }
        }, 2000)
    }
    public periodSelectorSettings: object = periodsValue;
}