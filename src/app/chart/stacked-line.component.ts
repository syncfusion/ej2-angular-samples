import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadChartTheme } from './theme-color';

/**
 * Sample for Stacked Line Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'stacked-line.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
})
export class StackedLineChartComponent {

    public chartData1: Object[] = [
        { x: 2015, y: 28.2 },
        { x: 2016, y: 28.6 },
        { x: 2017, y: 46.0 },
        { x: 2018, y: 52.7 },
        { x: 2019, y: 62.0 },
        { x: 2020, y: 64.6 },
        { x: 2021, y: 60.1 },
        { x: 2022, y: 68.6 },
        { x: 2023, y: 71.81 }
    ];
    public chartData2: Object[] = [
        { x: 2015, y: 15.0 },
        { x: 2016, y: 16.7 },
        { x: 2017, y: 14.2 },
        { x: 2018, y: 15.3 },
        { x: 2019, y: 16.4 },
        { x: 2020, y: 13.9 },
        { x: 2021, y: 14.8 },
        { x: 2022, y: 16.1 },
        { x: 2023, y: 16.02 }
    ];
    public chartData3: Object[] = [
        { x: 2015, y: 8.1 },
        { x: 2016, y: 8.4 },
        { x: 2017, y: 7.73 },
        { x: 2018, y: 5.1 },
        { x: 2019, y: 8.7 },
        { x: 2020, y: 9.4 },
        { x: 2021, y: 10.3 },
        { x: 2022, y: 10.4 },
        { x: 2023, y: 11.17 }
    ];
    public chartData4: Object[] = [
        { x: 2015, y: 4.6 },
        { x: 2016, y: 7.5 },
        { x: 2017, y: 12.1 },
        { x: 2018, y: 25.9 },
        { x: 2019, y: 39.3 },
        { x: 2020, y: 50.1 },
        { x: 2021, y: 60.4 },
        { x: 2022, y: 73.5 },
        { x: 2023, y: 102.01 }
    ];
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        majorGridLines: { width: 0 },
        minorGridLines: { width: 0 },
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 },
        lineStyle: { width: 0 },
        valueType: 'Double',
        labelRotation: Browser.isDevice ? -45 : 0,
        labelIntersectAction: Browser.isDevice ? 'None' : 'Trim'
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 },
        majorGridLines: { width: 1 },
        minorGridLines: { width: 1 },
        minorTickLines: { width: 0 },
        labelFormat: '{value}TWh',
        title: 'Energy Generation (TWh)'
    };
    public tooltip: Object = {
        enable: true,
        enableHighlight: true,
        showNearestTooltip: true,
        header: '<b>${series.name}</b>',
        format: '${point.x} : <b>${point.y}</b>'
    };
    public legend: Object = {
        visible: true,
        enableHighlight: true
    }
    // custom code start
    public load(args: ILoadedEventArgs): void {
        loadChartTheme(args);
    };
    // custom code end
    public title: string = 'Yearly Renewable Energy Generation in India (2015-2023)';
    public subTitle: string = 'Source: wikipedia.org';
    public chartArea: Object = {
        border: {
            width: 0
        },
        margin: {
            bottom: 12
        }
    };
    public width: string = Browser.isDevice ? '100%' : '75%';
    public marker: Object = { isFilled: true, visible: true, shape: 'Circle', width: 7, height: 7 };
    public marker1: Object = { isFilled: true, visible: true, shape: 'Diamond', width: 7, height: 7 };
    public marker2: Object = { isFilled: true, visible: true, shape: 'Rectangle', width: 5, height: 5 };
    public marker3: Object = { isFilled: true, visible: true, shape: 'Triangle', width: 6, height: 6 };

    constructor() {
        //code
    };

}