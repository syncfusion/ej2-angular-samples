import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { ChartComponent, ILoadedEventArgs,ChartTheme, TrendlineTypes, LegendSettingsModel } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
/**
 * Sample for trendlines
 */
@Component({
    selector: 'control-content',
    templateUrl: 'trend-lines.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class TrendLineChartComponent {

    public series: Object[] = [{ Period: 1947, Rupees: 4.76 },
    { Period: 1967, Rupees: 7.50 },
    { Period: 1974, Rupees: 8.10 },
    { Period: 1989, Rupees: 16.64 },
    { Period: 1990, Rupees: 17.32 },
    { Period: 2000, Rupees: 43.56 },
    { Period: 2007, Rupees: 39.27 },
    { Period: 2013, Rupees: 56.57 },
    { Period: 2019, Rupees: 71.74 },
    { Period: 2020, Rupees: 76.67 },
    { Period: 2021, Rupees: 72.75 },];
    @ViewChild('chart')
    public chart: ChartComponent;
    public primaryXAxis: Object = {
        valueType: 'Category', majorTickLines: {width: 0},
        lineStyle:{ width: 1}, majorGridLines: { width : 0}, edgeLabelPlacement: 'Shift'
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        minimum: 0,
        maximum: 80,
        interval: 10,
        labelFormat: "₹{value}", title: 'Rupees against Dollars',
        lineStyle: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: {width: 0},
    };
    public chartArea : Object = {
      border: { width : 0}
    };
    public tooltip: Object = {
        enable: true,
    };
    public marker: object = {
        visible: true,
        isFilled: true, height: 7, width: 7
    };
    public width: string = Browser.isDevice ? '100%' : '75%';
    public legendSettings: LegendSettingsModel = { visible: true };
     // custom code start
     public load(args: ILoadedEventArgs): void {       
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast');
    };
     // custom code end
    public title: string = 'USD to INR Rates';
    ngOnInit(): void {
    }
    constructor() {
        //code
    };

}