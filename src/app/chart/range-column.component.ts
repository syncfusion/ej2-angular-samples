import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadChartTheme } from './theme-color';

/**
 * Sample for RangeColumn series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'range-column.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
})
export class RangeColumnChartComponent {

    public rangeColumnData: Object[] = [
        { month: 'Jan', min: 22.75, max: 41.02, text: 'January' },
        { month: 'Feb', min: 29.71, max: 51.93, text: 'February' },
        { month: 'Mar', min: 33.53, max: 56.39, text: 'March' },
        { month: 'Apr', min: 41.22, max: 66.06, text: 'April' },
        { month: 'May', min: 49.87, max: 74.64, text: 'May' },
        { month: 'Jun', min: 59.02, max: 84.58, text: 'June' },
        { month: 'Jul', min: 62.94, max: 88.43, text: 'July' },
        { month: 'Aug', min: 61.27, max: 86.72, text: 'August' },
        { month: 'Sep', min: 55.36, max: 81.86, text: 'September' },
        { month: 'Oct', min: 44.76, max: 73.13, text: 'October' },
        { month: 'Nov', min: 34.79, max: 55.54, text: 'November' },
        { month: 'Dec', min: 28.04, max: 48.36, text: 'December' }
    ];
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public width: string = Browser.isDevice ? '100%' : '75%';

    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Category',
        majorGridLines: { width: 0 },
        majorTickLines: { width: 0 },
        lineStyle: { width: 0 }
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        labelFormat: '{value}°F',
        minimum: 0,
        maximum: 100,
        interval: 20,
        edgeLabelPlacement: 'Shift',
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 },
        title: 'Monthly Temperature Variation (°F)'
    };
    //Initializing Chart Title
    public title: string = 'Contiguous U.S. Average Temperature in 2024';
    public subTitle: string = 'Source: ncei.noaa.gov';
    public legendSettings: Object = {
        visible: false
    };
    public tooltip: Object = {
        enable: true,
        header: '<b>${point.tooltip}</b>',
        format: 'Temperature : <b>${point.low} - ${point.high}</b>'
    };
    public cornerRadius: Object = { topLeft: 4, topRight: 4, bottomLeft: 4, bottomRight: 4 };
    public marker: Object = {
        dataLabel: { visible: true, position: 'Outer' }
    };
    // custom code start
    public load(args: ILoadedEventArgs): void {
        loadChartTheme(args);
    };
    // custom code end
    constructor() {
        //code
    };

}