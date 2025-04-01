import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ILoadedEventArgs, ChartComponent, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadChartTheme } from './theme-color';
/**
 * Sample for chart export
 */
@Component({
    selector: 'control-content',
    templateUrl: 'cylindrical-column.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
})
export class CylindricalColumnChartComponent {

    public data: Object[] = [
        { year: '2017 - 18', energy: 228.0 },
        { year: '2018 - 19', energy: 261.8 },
        { year: '2019 - 20', energy: 294.3 },
        { year: '2020 - 21', energy: 297.5 },
        { year: '2021 - 22', energy: 322.6 },
        { year: '2022 - 23', energy: 365.59 }
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
        title: 'Total Renewable Power (TWh)',
        labelFormat: '{value}TWh',
        minimum: 150,
        maximum: 400,
        interval: 50,
        majorTickLines: { width: 0 },
        lineStyle: { width: 0 }
    };
    // custom code start
    public load(args: ILoadedEventArgs): void {
        loadChartTheme(args);
    };
    // custom code end
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public width: string = Browser.isDevice ? '100%' : '75%';
    public title: string = 'Year-wise Renewable Energy Generation Trends in India';
    public subTitle: string = 'Source: wikipedia.org';
    public tooltip: Object = {
        enable: true,
        header: '<b>${point.x}</b>',
        format: '${series.name}: <b>${point.y}</b>'
    };
    public legendSettings: Object = { visible: false };
    constructor() {
        // code
    };
}