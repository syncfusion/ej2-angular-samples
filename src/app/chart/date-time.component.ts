import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadChartTheme } from './theme-color';

/**
 * Sample for DateTime Axis
 */
@Component({
    selector: 'control-content',
    templateUrl: 'date-time.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
})
export class DateTimeAxisChartComponent {
    public data1: Object[] = [
        { x: new Date(2016, 2, 7), y: 6.3 },
        { x: new Date(2016, 3, 15), y: 13.3 }, { x: new Date(2016, 4, 10), y: 18.0 },
        { x: new Date(2016, 5, 17), y: 19.8 }, { x: new Date(2016, 6, 13), y: 18.1 },
        { x: new Date(2016, 7, 11), y: 13.1 }, { x: new Date(2016, 8, 16), y: 4.1 }
    ];
    public data2: Object[] = [
        { x: new Date(2016, 2, 7), y: -5.3 },
        { x: new Date(2016, 3, 15), y: 1.0 }, { x: new Date(2016, 4, 10), y: 6.9 },
        { x: new Date(2016, 5, 17), y: 9.4 }, { x: new Date(2016, 6, 13), y: 7.6 },
        { x: new Date(2016, 7, 11), y: 2.6 }, { x: new Date(2016, 8, 16), y: -4.9 }
    ];
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'DateTime',
        intervalType: 'Days',
        labelFormat: 'MMM d',
        edgeLabelPlacement: 'Shift',
        majorGridLines: { width: 0 }
    };
    //Initializing Primary X Axis
    public primaryYAxis: Object = {

        minimum: -20,
        maximum: 30,
        interval: 10,
        edgeLabelPlacement: 'Shift',
        labelFormat: '{value}°C',
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 }
    };
    //Initializing Marker
    public marker1: Object = {
        visible: true,
        height: 8, width: 8,
        shape: 'Pentagon',isFilled: true,
        dataLabel: { visible: true, position: 'Top',  }
    };
    public marker2: Object = {
        visible: true, height: 8, width: 8, shape: 'Diamond',isFilled: true ,
        dataLabel: { visible: true, position: 'Top', }
    };
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public width: string = Browser.isDevice ? '100%' : '75%';
          // custom code start
    public load(args: ILoadedEventArgs): void {
        loadChartTheme(args);
    };
          // custom code end
    public title: string = 'Alaska Weather Statistics - 2016';
    constructor() {
        //code
    };

}