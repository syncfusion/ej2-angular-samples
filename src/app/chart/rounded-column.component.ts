import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ILoadedEventArgs, ChartComponent, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadChartTheme } from './theme-color';
/**
 * Sample for Column Series with rounded corner
 */
@Component({
    selector: 'control-content',
    templateUrl: 'rounded-column.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
})
export class RoundedColumnChartComponent {
    @ViewChild('roundcol')
    public chart: ChartComponent;

    public data: Object[] = [
        { x: 'Healthcare', y: 0.9, text: '0.9%' },
        { x: 'Real Estate', y: 1.3, text: '1.3%' },
        { x: 'Energy', y: 2.3, text: '2.3%' },
        { x: Browser.isDevice ? 'Consumer <br> Staples' : 'Consumer Staples', y: 12.0, text: '12.0%' },
        { x: 'Industrials', y: 15.6, text: '15.6%' },
        { x: 'Utilities', y: 19.6, text: '19.6%' },
        { x: Browser.isDevice ? 'S&P <br> 500 Average' : 'S&P 500 Average', y: 23.3, text: '23.3%' },
        { x: 'Financials', y: 28.4, text: '28.4%' },
        { x: Browser.isDevice ? 'Consumer <br> Discretionary' : 'Consumer Discretionary', y: 29.1, text: '29.1%' },
        { x: Browser.isDevice ? 'Information <br> Technology' : 'Information Technology', y: 35.7, text: '35.7%' },
        { x: Browser.isDevice ? 'Communication <br> Services' : 'Communication Services', y: 38.9, text: '38.9%' }
    ];
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Category',
        interval: 1,
        majorGridLines: { width: 0 },
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 },
        lineStyle: { width: 0 },
        labelPosition: 'Outside',
        labelIntersectAction: Browser.isDevice ? 'None' : 'Rotate45'
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        minimum: 0,
        maximum: 50,
        title: 'Sector-wise Growth (%)',
        labelFormat: '{value}%',
        interval: 10,
        majorGridLines: { width: 0 },
        majorTickLines: { width: 0 },
        lineStyle: { width: 0 },
        opposedPosition: true
    };
    public radius: Object = { bottomLeft: Browser.isDevice ? 8 : 10, bottomRight: Browser.isDevice ? 8 : 10, topLeft: Browser.isDevice ? 8 : 10, topRight: Browser.isDevice ? 8 : 10 }
    public marker: Object = { dataLabel: { visible: true, name: 'text', enableRotation: false, angle: -90, font: { fontWeight: '600' } } }
    public title: string = 'Top Performing Market Sectors by Growth Rate (2024)';
    public subTitle: string = 'Source: visualcapitalist.com';
    public titleStyle: Object = { position: 'Bottom' };
    public tooltip: Object = {
        enable: true, header: "<b>${point.x}</b>", format: "Growth Rate : <b>${point.text}</b>"
    };
    public legend: Object = {
        visible: false
    }
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public width: string = Browser.isDevice ? '100%' : '77%';
    // custom code start
    public load(args: ILoadedEventArgs): void {
        loadChartTheme(args);
    };
    constructor() {
        //code
    };
}
