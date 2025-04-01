import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ILegendClickEventArgs, ITooltipRenderEventArgs, ChartAllModule } from '@syncfusion/ej2-angular-charts'
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadChartTheme } from './theme-color';
/**
 * Sample for Stacked Column Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'stacked-column-percent.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
})
export class PercentStackedColumnChartComponent {

    public data1: Object[] = Browser.isDevice ?
        [
            { x: '2021', y: 24300000 },
            { x: '2022', y: 26300000 },
            { x: '2023', y: 25400000 },
            { x: '2024', y: 25000000 }
        ] :
        [
            { x: '2019', y: 28500000 },
            { x: '2020', y: 27500000 },
            { x: '2021', y: 24300000 },
            { x: '2022', y: 26300000 },
            { x: '2023', y: 25400000 },
            { x: '2024', y: 25000000 }
        ];
    public data2: Object[] = Browser.isDevice ?
        [
            { x: '2021', y: 26700000 },
            { x: '2022', y: 30800000 },
            { x: '2023', y: 27400000 },
            { x: '2024', y: 31000000 }
        ] :
        [
            { x: '2019', y: 26900000 },
            { x: '2020', y: 29300000 },
            { x: '2021', y: 26700000 },
            { x: '2022', y: 30800000 },
            { x: '2023', y: 27400000 },
            { x: '2024', y: 31000000 }
        ];
    public data3: Object[] = Browser.isDevice ?
        [
            { x: '2021', y: 17500000 },
            { x: '2022', y: 14500000 },
            { x: '2023', y: 12100000 },
            { x: '2024', y: 14400000 }
        ] :
        [
            { x: '2019', y: 19900000 },
            { x: '2020', y: 14600000 },
            { x: '2021', y: 17500000 },
            { x: '2022', y: 14500000 },
            { x: '2023', y: 12100000 },
            { x: '2024', y: 14400000 }
        ];
    public data4: Object[] = Browser.isDevice ?
        [
            { x: '2021', y: 10800000 },
            { x: '2022', y: 11700000 },
            { x: '2023', y: 14600000 },
            { x: '2024', y: 17000000 }
        ] :
        [
            { x: '2019', y: 13000000 },
            { x: '2020', y: 13800000 },
            { x: '2021', y: 10800000 },
            { x: '2022', y: 11700000 },
            { x: '2023', y: 14600000 },
            { x: '2024', y: 17000000 }
        ];
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        majorGridLines: { width: 0 },
        minorGridLines: { width: 0 },
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 },
        interval: 1,
        lineStyle: { width: 0 },
        labelIntersectAction: 'Rotate45',
        valueType: 'Category'
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 },
        majorGridLines: { width: 1 },
        minorGridLines: { width: 1 },
        minorTickLines: { width: 0 },
        interval: 20
    };
    public tooltip: Object = {
        enable: true,
        enableHighlight: true,
        header: '<b>${point.x}</b>'
    };
    public chartArea: Object = {
        border: {
            width: 0
        },
        margin: {
            bottom: 12
        }
    };
    public border: Object = { color: 'white', width: 1 };
    public cornerRadius: Object = { topLeft: 4, topRight: 4 };
    // custom code start
    public width: string = Browser.isDevice ? '100%' : '75%';
    public legend: Object = {
        enableHighlight: true,
        shapeWidth: 9,
        shapeHeight: 9
    }
    public load(args: ILoadedEventArgs): void {
        loadChartTheme(args);
    };
    // custom code end
    public title: string = Browser.isDevice ? 'Global Cotton Production by Country (2021–2024)' : 'Global Cotton Production by Country (2019–2024)';
    public subTitle: string = 'Source: fas.usda.gov';
    public legendClick = (args: ILegendClickEventArgs) => {
        if (args.series.index === 0) {
            if (args.chart.series[3].visible) {
                args.chart.series[3].cornerRadius.topLeft = 4;
                args.chart.series[3].cornerRadius.topRight = 4;
                args.chart.series[0].cornerRadius.topLeft = 0;
                args.chart.series[0].cornerRadius.topRight = 0;
            } else if (args.chart.series[2].visible) {
                args.chart.series[2].cornerRadius.topLeft = 4;
                args.chart.series[2].cornerRadius.topRight = 4;
                args.chart.series[0].cornerRadius.topLeft = 0;
                args.chart.series[0].cornerRadius.topRight = 0;
            } else if (args.chart.series[1].visible) {
                args.chart.series[1].cornerRadius.topLeft = 4;
                args.chart.series[1].cornerRadius.topRight = 4;
                args.chart.series[0].cornerRadius.topLeft = 0;
                args.chart.series[0].cornerRadius.topRight = 0;
            } else {
                args.chart.series[0].cornerRadius.topLeft = 4;
                args.chart.series[0].cornerRadius.topRight = 4;
            }
        }

        if (args.series.index === 1) {
            if (args.chart.series[3].visible) {
                args.chart.series[3].cornerRadius.topLeft = 4;
                args.chart.series[3].cornerRadius.topRight = 4;
                args.chart.series[1].cornerRadius.topLeft = 0;
                args.chart.series[1].cornerRadius.topRight = 0;
            } else if (args.chart.series[2].visible) {
                args.chart.series[2].cornerRadius.topLeft = 4;
                args.chart.series[2].cornerRadius.topRight = 4;
                args.chart.series[1].cornerRadius.topLeft = 0;
                args.chart.series[1].cornerRadius.topRight = 0;
            } else if (args.series.visible && args.chart.series[0].visible) {
                args.chart.series[0].cornerRadius.topLeft = 4;
                args.chart.series[0].cornerRadius.topRight = 4;
                args.chart.series[1].cornerRadius.topLeft = 0;
                args.chart.series[1].cornerRadius.topRight = 0;
            } else {
                args.chart.series[1].cornerRadius.topLeft = 4;
                args.chart.series[1].cornerRadius.topRight = 4;
                args.chart.series[0].cornerRadius.topLeft = 0;
                args.chart.series[0].cornerRadius.topRight = 0;
            }
        }

        if (args.series.index === 2) {
            if (args.chart.series[3].visible) {
                args.chart.series[3].cornerRadius.topLeft = 4;
                args.chart.series[3].cornerRadius.topRight = 4;
                args.chart.series[2].cornerRadius.topLeft = 0;
                args.chart.series[2].cornerRadius.topRight = 0;
            } else if (!args.series.visible) {
                args.chart.series[2].cornerRadius.topLeft = 4;
                args.chart.series[2].cornerRadius.topRight = 4;
                args.chart.series[1].cornerRadius.topLeft = 0;
                args.chart.series[1].cornerRadius.topRight = 0;
                args.chart.series[0].cornerRadius.topLeft = 0;
                args.chart.series[0].cornerRadius.topRight = 0;
            } else if (args.chart.series[1].visible) {
                args.chart.series[1].cornerRadius.topLeft = 4;
                args.chart.series[1].cornerRadius.topRight = 4;
                args.chart.series[2].cornerRadius.topLeft = 0;
                args.chart.series[2].cornerRadius.topRight = 0;
            } else if (args.series.visible && args.chart.series[0].visible) {
                args.chart.series[0].cornerRadius.topLeft = 4;
                args.chart.series[0].cornerRadius.topRight = 4;
                args.chart.series[2].cornerRadius.topLeft = 0;
                args.chart.series[2].cornerRadius.topRight = 0;
            }
        }

        if (args.series.index === 3) {
            if (!args.series.visible) {
                args.chart.series[3].cornerRadius.topLeft = 4;
                args.chart.series[3].cornerRadius.topRight = 4;
                args.chart.series[2].cornerRadius.topLeft = 0;
                args.chart.series[2].cornerRadius.topRight = 0;
                args.chart.series[1].cornerRadius.topLeft = 0;
                args.chart.series[1].cornerRadius.topRight = 0;
                args.chart.series[0].cornerRadius.topLeft = 0;
                args.chart.series[0].cornerRadius.topRight = 0;
            } else if (args.chart.series[2].visible) {
                args.chart.series[2].cornerRadius.topLeft = 4;
                args.chart.series[2].cornerRadius.topRight = 4;
                args.chart.series[3].cornerRadius.topLeft = 0;
                args.chart.series[3].cornerRadius.topRight = 0;
            } else if (args.chart.series[1].visible) {
                args.chart.series[1].cornerRadius.topLeft = 4;
                args.chart.series[1].cornerRadius.topRight = 4;
                args.chart.series[3].cornerRadius.topLeft = 0;
                args.chart.series[3].cornerRadius.topRight = 0;
            } else if (args.series.visible && args.chart.series[0].visible) {
                args.chart.series[0].cornerRadius.topLeft = 4;
                args.chart.series[0].cornerRadius.topRight = 4;
                args.chart.series[3].cornerRadius.topLeft = 0;
                args.chart.series[3].cornerRadius.topRight = 0;
            }
        }
    };
    public tooltipRender = (args: ITooltipRenderEventArgs) => {
        if (args.text) {
            let value: string = args.point.y.toLocaleString('en-US');
            args.text = `${args.series.name}: <b>${value}M (${args.point.percentage}%)</b>`;
        }
    };
    constructor() {
        //code
    };

}