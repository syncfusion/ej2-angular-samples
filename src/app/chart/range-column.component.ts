import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

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

    public data: Object[] = [
        { Days : "Sun", IND_LowTemp : 3.1, IND_HighTemp : 10.8, GER_LowTemp : 2.5, GER_HighTemp : 9.8  },
        { Days : "Mon", IND_LowTemp : 5.7, IND_HighTemp : 14.4, GER_LowTemp : 4.7, GER_HighTemp : 11.4  },
        { Days : "Tue", IND_LowTemp : 8.4, IND_HighTemp : 16.9, GER_LowTemp : 6.4, GER_HighTemp : 14.4  },
        { Days : "Wed", IND_LowTemp : 9.6, IND_HighTemp : 18.2, GER_LowTemp : 9.6, GER_HighTemp : 17.2 },
        { Days : "Thu", IND_LowTemp : 8.5, IND_HighTemp : 16.1, GER_LowTemp : 7.5, GER_HighTemp : 15.1 },
        { Days : "Fri", IND_LowTemp : 6.0, IND_HighTemp : 12.5, GER_LowTemp : 3.0, GER_HighTemp : 10.5 },
        { Days : "Sat", IND_LowTemp : 1.5, IND_HighTemp : 6.9, GER_LowTemp : 1.2, GER_HighTemp : 7.9  }
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
        minorTickLines: { width: 0 }
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        title: 'Temperature (In Celsius)',
        labelFormat: '{value}˚C',
        maximum: 20,
        edgeLabelPlacement: 'Shift',
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 }
    };
    //Initializing Chart Title
    public title: string = 'Temperature Variation by Week';
    public tooltip: Object = {
        enable: true,
        header: '<b>${point.x}</b>',
        format: 'Temperature : <b>${point.low} - ${point.high}</b>'
    };
    public marker :Object = {
        dataLabel:{visible: true, position: 'Outer'}
      }
     // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
    };
     // custom code end
    constructor() {
        //code
    };

}