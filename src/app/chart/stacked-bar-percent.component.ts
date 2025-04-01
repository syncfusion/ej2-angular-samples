import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ILegendClickEventArgs, ITooltipRenderEventArgs, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadChartTheme } from './theme-color';

/**
 * Sample for 100 percent Stacked bar Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'stacked-bar-percent.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
})
export class PercentStackedBarChartComponent {

    public data1: Object[] = [
        { x: '2020', y: 466 },
        { x: '2021', y: 656 },
        { x: '2022', y: 763 },
        { x: '2023', y: 886 }
    ];
    public data2: Object[] = [
        { x: '2020', y: 261 },
        { x: '2021', y: 327 },
        { x: '2022', y: 427 },
        { x: '2023', y: 584 }
    ];
    public data3: Object[] = [
        { x: '2020', y: 1355 },
        { x: '2021', y: 1340 },
        { x: '2022', y: 1352 },
        { x: '2023', y: 1286 }
    ];
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Category',
        majorGridLines: { width: 0 },
        majorTickLines: { width: 0 }
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 },
        edgeLabelPlacement: 'Shift'
    };
    //Initializing Tooltip
    public tooltip: Object = {
        enable: true,
        enableHighlight: true,
        header: '<b>Renewable Energy Generation</b>'
    };
    // custom code start
    public load(args: ILoadedEventArgs): void {
        loadChartTheme(args);
    };
    // custom code end
    public chartArea: Object = {
        border: {
            width: 0
        },
        margin: {
            bottom: 12
        }
    };
    public width: string = Browser.isDevice ? '100%' : '75%';
    public border: Object = { color: 'white', width: 1 };
    public cornerRadius: Object = { bottomRight: 4, topRight: 4 };
    public title: string = 'Annual Renewable Energy Generation in China (2020–2023) by Source';
    public subTitle: string = 'Source: wikipedia.org';
    public legend: Object = {
        enableHighlight: true,
        shapeWidth: 9,
        shapeHeight: 9
    };
    public legendClick = (args: ILegendClickEventArgs) => {
        if (args.series.index === 0) {
            if (args.chart.series[2].visible) {
                args.chart.series[2].cornerRadius.bottomRight = 4;
                args.chart.series[2].cornerRadius.topRight = 4;
                args.chart.series[0].cornerRadius.bottomRight = 0;
                args.chart.series[0].cornerRadius.topRight = 0;
            } else if (args.chart.series[1].visible) {
                args.chart.series[1].cornerRadius.bottomRight = 4;
                args.chart.series[1].cornerRadius.topRight = 4;
                args.chart.series[0].cornerRadius.bottomRight = 0;
                args.chart.series[0].cornerRadius.topRight = 0;
            } else {
                args.chart.series[0].cornerRadius.bottomRight = 4;
                args.chart.series[0].cornerRadius.topRight = 4;
            }
        }
        if (args.series.index === 1) {
            if (args.chart.series[2].visible) {
                args.chart.series[2].cornerRadius.bottomRight = 4;
                args.chart.series[2].cornerRadius.topRight = 4;
                args.chart.series[1].cornerRadius.bottomRight = 0;
                args.chart.series[1].cornerRadius.topRight = 0;
            } else if (args.series.visible && args.chart.series[0].visible) {
                args.chart.series[0].cornerRadius.bottomRight = 4;
                args.chart.series[0].cornerRadius.topRight = 4;
                args.chart.series[1].cornerRadius.bottomRight = 0;
                args.chart.series[1].cornerRadius.topRight = 0;
            } else {
                args.chart.series[1].cornerRadius.bottomRight = 4;
                args.chart.series[1].cornerRadius.topRight = 4;
                args.chart.series[0].cornerRadius.bottomRight = 0;
                args.chart.series[0].cornerRadius.topRight = 0;
            }
        }

        if (args.series.index === 2) {
            if (!args.series.visible) {
                args.chart.series[2].cornerRadius.bottomRight = 4;
                args.chart.series[2].cornerRadius.topRight = 4;
                args.chart.series[1].cornerRadius.bottomRight = 0;
                args.chart.series[1].cornerRadius.topRight = 0;
                args.chart.series[0].cornerRadius.bottomRight = 0;
                args.chart.series[0].cornerRadius.topRight = 0;
            } else if (args.chart.series[1].visible) {
                args.chart.series[1].cornerRadius.bottomRight = 4;
                args.chart.series[1].cornerRadius.topRight = 4;
                args.chart.series[2].cornerRadius.bottomRight = 0;
                args.chart.series[2].cornerRadius.topRight = 0;
            } else if (args.series.visible && args.chart.series[0].visible) {
                args.chart.series[0].cornerRadius.bottomRight = 4;
                args.chart.series[0].cornerRadius.topRight = 4;
                args.chart.series[2].cornerRadius.bottomRight = 0;
                args.chart.series[2].cornerRadius.topRight = 0;
            }
        }
    };
    public tooltipRender = (args: ITooltipRenderEventArgs) => {
        if (args.text) {
            let value: string = args.point.y.toLocaleString('en-US');
            args.text = `${args.series.name}: <b>${value}TWh (${args.point.percentage}%)</b>`;
        }
    };
    constructor() {
        //code
    };

}