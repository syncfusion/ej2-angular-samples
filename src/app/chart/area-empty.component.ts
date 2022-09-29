import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme, axisLabelClick } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';

/**
 * Sample for Area Series empty points
 */
@Component({
    selector: 'control-content',
    templateUrl: 'area-empty.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class EmptyAreaChartComponent {
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    //Initializing Width
    public width: string = Browser.isDevice ? '100%' : '75%';
    public data: Object[] = [
        { Period : "Nov 14", US_InflationRate : 2.2, IN_InflationRate : 0.8 },
        { Period : "Nov 15", US_InflationRate : 2.0, IN_InflationRate : 1.7 },
        { Period : "Nov 16", US_InflationRate : 2.8, IN_InflationRate : 1.8 },
        { Period : "Nov 17", US_InflationRate : 1.6, IN_InflationRate : 2.1 },
        { Period : "Nov 18", US_InflationRate : 2.3, IN_InflationRate : null },
        { Period : "Nov 19", US_InflationRate : 2.5, IN_InflationRate : 2.3 },
        { Period : "Nov 20", US_InflationRate : 2.9, IN_InflationRate : 1.7 },
        { Period : "Nov 21", US_InflationRate : 1.1, IN_InflationRate : 1.5 },
        { Period : "Nov 22", US_InflationRate : 1.4, IN_InflationRate : 0.5 },
        { Period : "Nov 23", US_InflationRate : 1.1, IN_InflationRate : 1.3 }
    ];
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Category',
        majorGridLines: { width: 0 },
        edgeLabelPlacement: 'Shift',
        axisLabelStyle:{fontStyle:'bold'}
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        maximum: 5,
        minimum: 0,
        interval: 1,
        labelFormat: '{value}MB',
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 },
    };
    public marker: Object = { visible: true, height: 7, width: 7 , isFilled: true };
    public diamondMarker: Object = { visible: true, height: 7, width: 7 , shape: 'Diamond' , isFilled: true };
    public tooltip: Object = {
        enable: true,
        format: '${point.x} : <b>${point.y}</b>'
    };
    public legend: Object = {
        visible: true,
        enableHighlight : true
    }
    public border: Object = { width: 2 };
    // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
    // custom code end
    //Initializing Chart Title
    public title: string = 'Data Consumption';
    constructor() {
        // code
    };
}