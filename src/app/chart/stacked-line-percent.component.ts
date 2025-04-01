import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ILegendClickEventArgs, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadChartTheme } from './theme-color';

/**
 * Sample for 100% Stacked Line Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'stacked-line-percent.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
})
export class PercentStackedLineChartComponent {

    public chartData1: Object[] = [
        { x: 'O+ve', y: 39.0 },
        { x: 'A+ve', y: 36.0 },
        { x: 'B+ve', y: 7.6 },
        { x: 'AB+ve', y: 2.5 },
        { x: 'O-ve', y: 7.0 },
        { x: 'A-ve', y: 6.0 },
        { x: 'B-ve', y: 1.4 },
        { x: 'AB-ve', y: 0.5 }
    ];
    public chartData2: Object[] = [
        { x: 'O+ve', y: 40.0 },
        { x: 'A+ve', y: 30.0 },
        { x: 'B+ve', y: 15.0 },
        { x: 'AB+ve', y: 4.25 },
        { x: 'O-ve', y: 6.6 },
        { x: 'A-ve', y: 2.3 },
        { x: 'B-ve', y: 1.1 },
        { x: 'AB-ve', y: 0.75 }
    ];
    public chartData3: Object[] = [
        { x: 'O+ve', y: 47.0 },
        { x: 'A+ve', y: 26.0 },
        { x: 'B+ve', y: 9.0 },
        { x: 'AB+ve', y: 2.0 },
        { x: 'O-ve', y: 8.0 },
        { x: 'A-ve', y: 5.0 },
        { x: 'B-ve', y: 2.0 },
        { x: 'AB-ve', y: 1.0 }
    ];
    public chartData4: Object[] = [
        { x: 'O+ve', y: 29.0 },
        { x: 'A+ve', y: 46.3 },
        { x: 'B+ve', y: 12.0 },
        { x: 'AB+ve', y: 5.6 },
        { x: 'O-ve', y: 2.0 },
        { x: 'A-ve', y: 3.7 },
        { x: 'B-ve', y: 1.0 },
        { x: 'AB-ve', y: 0.4 }
    ];
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 },
        majorGridLines: { width: 0 },
        lineStyle: { width: 0 },
        valueType: 'Category',
        labelRotation: Browser.isDevice ? -45 : 0,
        labelIntersectAction: Browser.isDevice ? 'None' : 'Trim'
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        title: 'Population Share (%)',
        lineStyle: { width: 0 },
        interval: 20,
        minorTickLines: { width: 0 },
        majorTickLines: { width: 0 },
        majorGridLines: { width: 1 },
        minorGridLines: { width: 1 }
    };
    public tooltip: Object = {
        enable: true,
        format: '${point.x} : <b>${point.y}% (${point.percentage}%)</b>',
        enableHighlight: true,
        showNearestTooltip: true
    };
    // custom code start
    public load(args: ILoadedEventArgs): void {
        loadChartTheme(args);
    };
    // custom code end
    public title: string = 'Blood Type Distribution by Country';
    public subTitle: string = 'Source: wikipedia.org';
    public chartArea: Object = {
        border: {
            width: 0
        },
        margin: {
            bottom: 12
        }
    };
    public legend: Object = {
        visible: true,
        enableHighlight: true
    }
    public width: string = Browser.isDevice ? '100%' : '75%';
    public marker: Object = { visible: true, isFilled: true, shape: 'Circle', width: 7, height: 7 };
    public marker1: Object = { visible: true, isFilled: true, shape: 'Diamond', width: 7, height: 7 };
    public marker2: Object = { visible: true, isFilled: true, shape: 'Rectangle', width: 5, height: 5 };
    public marker3: Object = { isFilled: true, visible: true, shape: 'Triangle', width: 6, height: 6 };
    public legendClick(args: ILegendClickEventArgs): void {
        if (args.series.index === 0) {
            if (args.chart.series[3].visible) {
                args.chart.series[3].width = 3;
                args.chart.series[0].width = 2;
            } else if (args.chart.series[2].visible) {
                args.chart.series[2].width = 3;
                args.chart.series[0].width = 2;
            } else if (args.chart.series[1].visible) {
                args.chart.series[1].width = 3;
                args.chart.series[0].width = 2;
            } else {
                args.chart.series[0].width = 3;
            }
        }

        if (args.series.index === 1) {
            if (args.chart.series[3].visible) {
                args.chart.series[3].width = 3;
                args.chart.series[1].width = 2;
            } else if (args.chart.series[2].visible) {
                args.chart.series[2].width = 3;
                args.chart.series[1].width = 2;
            } else if (args.series.visible && args.chart.series[0].visible) {
                args.chart.series[0].width = 3;
                args.chart.series[1].width = 2;
            } else {
                args.chart.series[1].width = 3;
                args.chart.series[0].width = 2;
            }
        }

        if (args.series.index === 2) {
            if (args.chart.series[3].visible) {
                args.chart.series[3].width = 3;
                args.chart.series[2].width = 2;
            } else if (!args.series.visible) {
                args.chart.series[2].width = 3;
                args.chart.series[1].width = 2;
                args.chart.series[0].width = 2;
            } else if (args.chart.series[1].visible) {
                args.chart.series[1].width = 3;
                args.chart.series[2].width = 2;
            } else if (args.series.visible && args.chart.series[0].visible) {
                args.chart.series[0].width = 3;
                args.chart.series[2].width = 2;
            }
        }

        if (args.series.index === 3) {
            if (!args.series.visible) {
                args.chart.series[3].width = 3;
                args.chart.series[2].width = 2;
                args.chart.series[1].width = 2;
                args.chart.series[0].width = 2;
            } else if (args.chart.series[2].visible) {
                args.chart.series[2].width = 3;
                args.chart.series[3].width = 2;
            } else if (args.chart.series[1].visible) {
                args.chart.series[1].width = 3;
                args.chart.series[3].width = 2;
            } else if (args.series.visible && args.chart.series[0].visible) {
                args.chart.series[0].width = 3;
                args.chart.series[3].width = 2;
            }
        }
    };

    constructor() {
        //code
    };

}