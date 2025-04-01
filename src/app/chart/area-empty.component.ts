import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme, axisLabelClick, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadChartTheme } from './theme-color';

/**
 * Sample for Area Series empty points
 */
@Component({
    selector: 'control-content',
    templateUrl: 'area-empty.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
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
        { Period : new Date(2021, 10, 14), US_InflationRate : 2.2, IN_InflationRate : 0.8 },
        { Period : new Date(2021, 10, 15), US_InflationRate : 2.0, IN_InflationRate : 1.7 },
        { Period : new Date(2021, 10, 16), US_InflationRate : 2.8, IN_InflationRate : 1.8 },
        { Period : new Date(2021, 10, 17), US_InflationRate : 1.6, IN_InflationRate : 2.1 },
        { Period : new Date(2021, 10, 18), US_InflationRate : 2.3, IN_InflationRate : null },
        { Period : new Date(2021, 10, 19), US_InflationRate : 2.5, IN_InflationRate : 2.3 },
        { Period : new Date(2021, 10, 20), US_InflationRate : 2.9, IN_InflationRate : 1.7 },
        { Period : new Date(2021, 10, 21), US_InflationRate : 1.1, IN_InflationRate : 1.5 },
        { Period : new Date(2021, 10, 22), US_InflationRate : 1.4, IN_InflationRate : 0.5 },
        { Period : new Date(2021, 10, 23), US_InflationRate : 1.1, IN_InflationRate : 1.3 }
    ];
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'DateTime',
        labelFormat: 'dd MMM',
        minimum: new Date(2021, 10, 14),
        maximum: new Date(2021, 10, 23),
        majorGridLines: { width: 0 },
        edgeLabelPlacement: 'Shift',
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
        format: '${point.x} : <b>${point.y}</b>',
        showNearestTooltip: true,
        enableHighlight: true
    };
    public legend: Object = {
        visible: true,
        enableHighlight : true
    }
    public border: Object = { width: 2 };
    // custom code start
    public load(args: ILoadedEventArgs): void {
        loadChartTheme(args);
    };
    // custom code end
    //Initializing Chart Title
    public title: string = 'Data Consumption';
    constructor() {
        // code
    };
}