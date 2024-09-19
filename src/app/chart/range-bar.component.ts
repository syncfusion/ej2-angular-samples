import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

/**
 * Inversed Range Column Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'range-bar.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
})
export class RangeBarChartComponent {

    public data: Object[] = [
        { Month : "Jan", CA_LowTemp : 28, CA_HighTemp : 72, Text : "January", CO_LowTemp : 38, CO_HighTemp : 78 },
        { Month : "Feb", CA_LowTemp : 25, CA_HighTemp : 75, Text : "February", CO_LowTemp : 38, CO_HighTemp : 78 },
        { Month : "Mar", CA_LowTemp : 18, CA_HighTemp : 65, Text : "March", CO_LowTemp : 27, CO_HighTemp : 78 },
        { Month : "Apr", CA_LowTemp : 22, CA_HighTemp : 69, Text : "April", CO_LowTemp : 38, CO_HighTemp : 78 },
        { Month : "May", CA_LowTemp : 56, CA_HighTemp : 87, Text : "May", CO_LowTemp : 28, CO_HighTemp : 79 },
        { Month : "Jun", CA_LowTemp : 48, CA_HighTemp : 75, Text : "June", CO_LowTemp : 38, CO_HighTemp : 78 },
        { Month : "Jul", CA_LowTemp : 40, CA_HighTemp : 78, Text : "July", CO_LowTemp : 37, CO_HighTemp : 66 },
        { Month : "Aug", CA_LowTemp : 35, CA_HighTemp : 73, Text : "August", CO_LowTemp : 38, CO_HighTemp : 78 },
        { Month : "Sep", CA_LowTemp : 43, CA_HighTemp : 64, Text : "September", CO_LowTemp : 25, CO_HighTemp : 52 },
        { Month : "Oct", CA_LowTemp : 38, CA_HighTemp : 77, Text : "October", CO_LowTemp : 38, CO_HighTemp : 78 },
        { Month : "Nov", CA_LowTemp : 28, CA_HighTemp : 54, Text : "November", CO_LowTemp : 20, CO_HighTemp : 60 },
        { Month : "Dec", CA_LowTemp : 29, CA_HighTemp : 56, Text : "December", CO_LowTemp : 20, CO_HighTemp : 60 }
    ];
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Category',
        majorGridLines: { width: 0 },
        majorTickLines: { width: 0 }
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        title: 'Temperature (In Fahrenheit)',
        labelFormat: '{value}˚F',
        edgeLabelPlacement: 'Shift',
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 }
    };
    public title: string = 'Temperature Variation';
    public tooltip: Object = {
        enable: true,
        header: '<b>${point.tooltip}</b>',
        format: 'Temperature : <b>${point.low} - ${point.high}</b>'
    };
    public marker: Object = {
        dataLabel:{ visible:true, position:'Outer'}
    }
     // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
    };
     // custom code end
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public width: string = Browser.isDevice ? '100%' : '75%';

    constructor() {
        //code
    };

}