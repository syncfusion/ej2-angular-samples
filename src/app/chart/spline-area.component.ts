import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadChartTheme } from './theme-color';

/**
 * Sample for Area Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'spline-area.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
})
export class SplineAreaChartComponent {
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public width: string = Browser.isDevice ? '100%' : '75%';
    public data: Object[] = [
        { Period : new Date(2002, 1, 1), US_InflationRate : 2.2, FR_InflationRate : 2    },
        { Period : new Date(2003, 1, 1), US_InflationRate : 3.4, FR_InflationRate : 1.7  },
        { Period : new Date(2004, 1, 1), US_InflationRate : 2.8, FR_InflationRate : 1.8, },
        { Period : new Date(2005, 1, 1), US_InflationRate : 1.6, FR_InflationRate : 2.1, },
        { Period : new Date(2006, 1, 1), US_InflationRate : 2.3, FR_InflationRate : 2.3, },
        { Period : new Date(2007, 1, 1), US_InflationRate : 2.5, FR_InflationRate : 1.7, },
        { Period : new Date(2008, 1, 1), US_InflationRate : 2.9, FR_InflationRate : 1.5, },
        { Period : new Date(2009, 1, 1), US_InflationRate : 1.1, FR_InflationRate : 0.5, },
        { Period : new Date(2010, 1, 1), US_InflationRate : 1.4, FR_InflationRate : 1.5, },
        { Period : new Date(2011, 1, 1), US_InflationRate : 1.1, FR_InflationRate : 1.3, }
    ];
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'DateTime',
        labelFormat: 'y',
        majorGridLines: { width: 0 },
        intervalType: 'Years',
        edgeLabelPlacement: 'Shift',
        minimum: new Date(2001, 0, 1),
        maximum: new Date(2012, 0, 1)
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        labelFormat: '{value}%',
        lineStyle: { width: 0 },
        minimum: 0,
        maximum: 4,
        interval: 1,
        majorTickLines: { width: 0 },   
    };
    public circleMarker: Object = { visible: true, height: 6, width: 6 , shape: 'Circle' , isFilled: true };
    public diamondMarker: Object = { visible: true, height: 7, width: 7 , shape: 'Diamond' , isFilled: true };
    public border: Object = {
        width: 2,
    };
    public tooltip: Object = { enable: true, showNearestTooltip: true, enableHighlight: true };
    public legend: Object = {
        visible: true,
        enableHighlight : true
    }
     // custom code start
    public load(args: ILoadedEventArgs): void {
        loadChartTheme(args);
    };
     // custom code end
    //Initializing Chart Title
    public title: string = 'Inflation Rate in Percentage';
    constructor() {
        // code
     };
}