import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ILoadedEventArgs, IAxisLabelRenderEventArgs, ISharedTooltipRenderEventArgs, IResizeEventArgs, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadChartTheme } from './theme-color';
/**
 * Sample for Column Series with Side by side Placement
 */
@Component({
    selector: 'control-content',
    templateUrl: 'column-placement.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
})
export class PlacementColumnChartComponent {

    public totalData: Object[] = [
        { country: 'India', population: 1450935791 },
        { country: 'China', population: 1419321278 },
        { country: 'USA', population: 345426571 },
        { country: 'Indonesia', population: 283487931 },
        { country: 'Pakistan', population: 251269164 }
    ];

    public maleData: Object[] = [
        { country: 'India', male: 748323427 },
        { country: 'China', male: 723023723 },
        { country: 'USA', male: 173551527 },
        { country: 'Indonesia', male: 142407931 },
        { country: 'Pakistan', male: 127433405 }
    ];

    public femaleData: Object[] = [
        { country: 'India', female: 702612364 },
        { country: 'China', female: 696297555 },
        { country: 'USA', female: 171875044 },
        { country: 'Indonesia', female: 141080014 },
        { country: 'Pakistan', female: 123835758 }
    ];

    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Category',
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 },
        interval: 1,
        majorGridLines: { width: 0 },
        labelRotation: Browser.isDevice ? -45 : 0
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        majorTickLines: { width: 0 },
        lineStyle: { width: 0 },
        title: 'Inhabitants (Millions)',
        interval: 300000000
    };
    public cornerRadius: Object = { topLeft: 4, topRight: 4 };
    public title: string = 'Population Distribution of the Top 5 Most Populous Countries (2024)';
    public subTitle: string = 'Source: statisticstimes.com';
    public tooltip: Object = {
        enable: true,
        shared: true
    };
    public legendSettings: Object = {
        visible: true, shapeWidth: 9, shapeHeight: 9, maximumColumns: 1, position: 'Custom', location: { x: 750, y: 80 }
    };
    public chartArea: Object = {
        border: {
            width: 0
        },
        margin: {
            bottom: 12
        }
    };
    public placement: boolean = false;
    public width: string = Browser.isDevice ? '100%' : '75%';
    // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = loadChartTheme(args);
        if (selectedTheme.indexOf('Dark') !== -1 || selectedTheme.indexOf('HighContrast') !== -1) {
            args.chart.legendSettings.border = { width: 2, color: '#FFFFFF' };
        } else {
            args.chart.legendSettings.border = { width: 2, color: '#000000' };
        }
    };
    // custom code end
    public axisLabelRender = (args: IAxisLabelRenderEventArgs) => {
        const value: number = parseInt(args.text.replace(/,/g, ''), 10);
        if (value >= 1_000_000) {
            args.text = (value / 1_000_000).toFixed(0) + 'M';
        }
    };
    public sharedTooltipRender = (args: ISharedTooltipRenderEventArgs) => {
        if (args.text && args.point && args.series) {
            for (let i: number = 0; i < args.point.length; i++) {
                if (args.point[i] && args.point[i].y !== undefined) {
                    let formattedValue: string = (args.point[i].y as number).toLocaleString('en-US');
                    let seriesName: string = args.series[i] ? args.series[i].name : `Series ${i + 1}`;
                    args.text[i] = `${seriesName}: <b>${formattedValue}</b>`;
                }
            }
        }
    };
    public resized = (args: IResizeEventArgs) => {
        const maxWidth: number = args.chart.availableSize.width;
        args.chart.legendSettings.location.x = maxWidth - 115;
    };
    constructor() {
        //code
    };

}