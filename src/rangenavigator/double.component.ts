import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ChartTheme, ChartAnnotation, ILoadedEventArgs, ChartAnnotationSettingsModel, getSeriesColor,
     IRangeLoadedEventArgs, DateTime, StepLineSeries, Chart, IChangedEventArgs,
      IRangeTooltipRenderEventArgs , RangeTooltip, IAxisLabelRenderEventArgs } from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
import { sl, aus } from './double_data';

/**
 * Sample for range navigator with numeric axis
 */

let selectedTheme: string = location.hash.split('/')[1];
selectedTheme = selectedTheme ? selectedTheme : 'Material';
let theme: ChartTheme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
let chartAnnotation: ChartAnnotationSettingsModel[] = [];
chartAnnotation.push({ content: '<div id="exchangeRate"></div>', coordinateUnits: 'Pixel', region: 'Chart', x: '85%', y: '15%' });
let backgroundColor: string = 'white';

function getAnnotaiton(args: object[], color: string): void {
    for (let i: number = 0; i < args.length; i++) {
        /* tslint:disable:no-string-literal */
        if (args[i]['isWicket']) {
            chartAnnotation.push({
                content: '<div id= "wicket" style="width: 20px; height:20px; border-radius: 5px;' +
                    'background: ' + backgroundColor + '; border: 2px solid ' + color + '; color:' + color + '">W</div>',
                /* tslint:disable:no-string-literal */
                x: args[i]['x'],
                /* tslint:disable:no-string-literal */
                y: args[i]['y'],
                coordinateUnits: 'Point'
            });
        }
    }

}
getAnnotaiton(aus, getSeriesColor(theme)[0]);
getAnnotaiton(sl, getSeriesColor(theme)[1]);

@Component({
    selector: 'control-content',
    templateUrl: 'double.html',
    encapsulation: ViewEncapsulation.None
})

export class DoubleComponent {
    @ViewChild('chartDouble')

    public Chart: Chart;

    public primaryXAxis: Object = { title: 'Overs', edgeLabelPlacement: 'Shift', majorGridLines: { width: 0 },
                                  labelFormat: 'n1' };

    public dataSource: Object[] = aus;

    public dataSource1: Object[] = sl;

    public chartArea: Object = { border: { width: 0 } };

    public primaryYAxis: Object = { title: 'Runs', minimum: 0, majorTickLines: { width: 0 }, lineStyle: { width: 0 } };

    public  chartTooltip: Object = { enable: true, shared: true };

    public chartHeight: string = '350';

    public animation: Object = { enable: false};

    public width: string = Browser.isDevice ? '100%' : '80%';

    public theme: ChartTheme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");

    public value: Object = [31, 50];

    public annotations: Object = chartAnnotation;

    public tooltip:Object = { enable: true };

    public legendSettings: Object = { visible: false };

    public axisLabelRender(args: IAxisLabelRenderEventArgs): void {
        if (args.axis.orientation === 'Horizontal') {
            let value: number = Math.abs(Number(args.text));
            args.text = String(value);
        }
    };

    public loaded(args: ILoadedEventArgs): void {
        let series1: string = args.chart.visibleSeries[0].interior;
        let series2: string = args.chart.visibleSeries[1].interior;
        let html: string = '<table>';
        html += '<tr><td><div style="width:10px; height: 10px; border: 2px solid '
                    + series1 + '; background: ' + series1 + ';"></div></td><td style="padding-left:10px;">' + ' Australia' + '</td>';
        html += '<tr><td><div style="width:10px; height: 10px; border: 2px solid '
                    + series2 + '; background: ' + series2 + ';"></div></td><td style="padding-left:10px;">' + ' Sri Lanka' + '</td>';
        html += '</table>';
        this.Chart.setAnnotationValue(0, '<div id="exchangeRate" style="line-height: 18px;' +
                    'font-size: 13px;background: #fff; opacity:0.9; color: #464e56; ' +
                    ' box-shadow:0 0 8px 0 rgba(70,78,86,.25); padding: 7px 10px;' +
                    'border-radius: 3px">' +
                    html +
                    '</div>');
    };
    public tooltipRender(args: IRangeTooltipRenderEventArgs): void {
        args.text[0] = Math.round(parseInt(args.text[0], 10)).toString();
    };

   public load(args: IRangeLoadedEventArgs) {
    args.rangeNavigator.rangeTooltipModule = new RangeTooltip(args.rangeNavigator);
    };

    public changed(args: IChangedEventArgs): void {
        this.Chart.primaryXAxis.zoomFactor = args.zoomFactor;
        this.Chart.primaryXAxis.zoomPosition = args.zoomPosition;
        this.Chart.dataBind();
    };
}