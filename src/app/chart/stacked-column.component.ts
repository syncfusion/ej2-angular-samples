import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartAllModule, ILegendClickEventArgs } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadChartTheme } from './theme-color';

/**
 * Sample for Stacked Column Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'stacked-column.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
})
export class StackedColumnChartComponent {

    public data1: Object[] = Browser.isDevice ?
        [
            { x: '2021', y: 24.3 },
            { x: '2022', y: 26.3 },
            { x: '2023', y: 25.4 },
            { x: '2024', y: 25 }
        ] :
        [
            { x: '2019', y: 28.5 },
            { x: '2020', y: 27.5 },
            { x: '2021', y: 24.3 },
            { x: '2022', y: 26.3 },
            { x: '2023', y: 25.4 },
            { x: '2024', y: 25 }
        ];
    public data2: Object[] = Browser.isDevice ?
        [
            { x: '2021', y: 26.7 },
            { x: '2022', y: 30.8 },
            { x: '2023', y: 27.4 },
            { x: '2024', y: 31 }
        ] :
        [
            { x: '2019', y: 26.9 },
            { x: '2020', y: 29.3 },
            { x: '2021', y: 26.7 },
            { x: '2022', y: 30.8 },
            { x: '2023', y: 27.4 },
            { x: '2024', y: 31 }
        ];
    public data3: Object[] = Browser.isDevice ?
        [
            { x: '2021', y: 17.5 },
            { x: '2022', y: 14.5 },
            { x: '2023', y: 12.1 },
            { x: '2024', y: 14.4 }
        ] :
        [
            { x: '2019', y: 19.9 },
            { x: '2020', y: 14.6 },
            { x: '2021', y: 17.5 },
            { x: '2022', y: 14.5 },
            { x: '2023', y: 12.1 },
            { x: '2024', y: 14.4 }
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
        title: 'Production (60KG Bags)',
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 },
        majorGridLines: { width: 1 },
        minorGridLines: { width: 1 },
        minorTickLines: { width: 0 },
        labelFormat: '{value}M',
        interval: 20
    };
    public cornerRadius: Object = { topLeft: 4, topRight: 4 };
    public stackLabels: Object = { visible: true, format: '{value}M', font: { size: Browser.isDevice ? '10px' : '12px' } };
    public tooltip: Object = {
        enable: true,
        enableHighlight: true,
        header: '<b>${point.x}</b>',
        format: '${series.name} : <b>${point.y}</b>'
    };
    // custom code start
    public load(args: ILoadedEventArgs): void {
        loadChartTheme(args);
    };
    public legendClick(args: ILegendClickEventArgs) {
        if (args.series.index === 0) {
            if (args.chart.series[2].visible) {
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
            if (args.chart.series[2].visible) {
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
            if (!args.series.visible) {
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
    };
    // custom code end
    public title: string = 'Global Cotton Production by Country (2019–2024)';
    public subTitle: string = 'Source: fas.usda.gov';
    public chartArea: Object = {
        border: {
            width: 0
        },
        margin: {
            bottom: 12
        }
    };
    public legend: Object = {
        enableHighlight: true,
        shapeWidth: 9,
        shapeHeight: 9
    }
    public marker: Object = {
        dataLabel: { visible: true, font: { size: Browser.isDevice ? '10px' : '12px' } }
    };
    public border: Object = { color: 'white', width: 1 };
    public width: string = Browser.isDevice ? '100%' : '75%';

    constructor() {
        //code
    };

}