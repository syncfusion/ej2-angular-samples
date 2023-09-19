import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ILoadedEventArgs, ChartComponent, ChartTheme } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
/**
 * Sample for chart export
 */
@Component({
    selector: 'control-content',
    templateUrl: 'cylindrical-column.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class CylindricalColumnChartComponent {

    public data: Object[] = [
        { x: 'China', y: 26 , tooltipMappingName:'China' },
        { x: 'Australia', y: 8, tooltipMappingName:'Australia'},
        { x: 'Germany', y: 17, tooltipMappingName:'Germany' },
        { x: 'Spain', y: 7, tooltipMappingName:'Spain' },
        { x: 'Japan', y: 12, tooltipMappingName:'Japan' },
        { x: 'USA', y: 46, tooltipMappingName:'United States' }
    ];
    public chart: ChartComponent;
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Category',
        interval: 1,
        majorGridLines: { width: 0 },
        labelIntersectAction: Browser.isDevice ? 'None' : 'Trim',
        labelRotation: Browser.isDevice ? -45 : 0,
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 }
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        title: 'Medal Count',
        majorTickLines: { width: 0 },
        lineStyle: { width: 0 },
        maximum: 50,
        interval: 10
    };
    // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast');
    };
    // custom code end
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public width: string = Browser.isDevice ? '100%' : '75%';
    public title: string = 'Olympic Gold Medal Counts - RIO';
    public tooltip: Object = {
        enable: true,
        header:"<b>${point.tooltip}</b>",
        format:"Gold Medal: <b>${point.y}</b>",
    };
    constructor() {
        // code
     };
}