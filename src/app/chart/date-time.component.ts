import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';

/**
 * Sample for DateTime Axis
 */
@Component({
    selector: 'control-content',
    templateUrl: 'date-time.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class DateTimeAxisChartComponent {
    public data1: Object[] = [
        { x: new Date(2016, 3, 1), y: 6.3 },
        { x: new Date(2016, 4, 1), y: 13.3 }, { x: new Date(2016, 5, 1), y: 18.0 },
        { x: new Date(2016, 6, 1), y: 19.8 }, { x: new Date(2016, 7, 1), y: 18.1 },
        { x: new Date(2016, 8, 1), y: 13.1 }, { x: new Date(2016, 9, 1), y: 4.1 }
    ];
    public data2: Object[] = [
        { x: new Date(2016, 3, 1), y: -5.3 },
        { x: new Date(2016, 4, 1), y: 1.0 }, { x: new Date(2016, 5, 1), y: 6.9 },
        { x: new Date(2016, 6, 1), y: 9.4 }, { x: new Date(2016, 7, 1), y: 7.6 },
        { x: new Date(2016, 8, 1), y: 2.6 }, { x: new Date(2016, 9, 1), y: -4.9 }
    ];
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'DateTime',
        labelFormat: 'MMM',
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
        height: 10, width: 10,
        shape: 'Pentagon',
        dataLabel: { visible: true, position: 'Top' }
    };
    public marker2: Object = {
        visible: true, height: 10, width: 10, shape: 'Diamond',
        dataLabel: { visible: true, position: 'Bottom' }
    };
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public width: string = Browser.isDevice ? '100%' : '60%';
          // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
          // custom code end
    public title: string = 'Alaska Weather Statistics - 2016';
    constructor() {
        //code
    };

}