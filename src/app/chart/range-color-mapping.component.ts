import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';

/**
 * Inversed Range Column Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'range-color-mapping.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class RangeColorMappingComponent {

    public data1: Object[] = [
        { x: "Jan", y: 6.96 },
        { x: "Feb", y: 8.9 },
        { x: "Mar", y: 12 },
        { x: "Apr", y: 17.5 },
        { x: "May", y: 22.1 },
        { x: "June", y: 25 },
        { x: "July", y: 29.4 },
        { x: "Aug", y: 29.6 },
        { x: "Sep", y: 25.8 },
        { x: "Oct", y: 21.1 },
        { x: "Nov", y: 15.5 },
        { x: "Dec", y: 9.9 }

    ];

    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Category', majorGridLines: { width: 0 }, title: 'Months'
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
            lineStyle: { width: 0 },
            majorTickLines: { width: 0 },
            minorTickLines: { width: 0 },
            labelFormat: '{value}°C',
            title: 'Temperature'
    };
    public title: string = 'USA CLIMATE - WEATHER BY MONTH';

    public tooltip: Object = {
        enable: true
    };

    public colors1: string[] = ['#FFFF99'];
    public colors2: string[] = ['#FFA500'];
    public colors3: string[] = ['#FF4040'];

    public legendSettings: Object = {
        mode: 'Range'
    };

    public animation: Object = {
        enable: false
    };

    public cornerRadius: Object = {
        topLeft: 10, topRight: 10
    }
     // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
     // custom code end
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public width: string = Browser.isDevice ? '100%' : '60%';

    constructor() {
        //code
    };

}