import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ILoadedEventArgs, ChartComponent, ChartTheme } from '@syncfusion/ej2-angular-charts';
import { DropDownList } from '@syncfusion/ej2-dropdowns';

/**
 * Sample for stripLineRecurrence
 */
@Component({
    selector: 'control-content',
    templateUrl: 'strip-line-recurrence.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class StripLineRecurrenceChartComponent {

    public data1: Object[] = [
        { x: new Date(1970, 1, 1), y: 16500 }, { x: new Date(1975, 1, 1), y: 16000 }, { x: new Date(1980, 1, 1), y: 15400 },
        { x: new Date(1985, 1, 1), y: 15800 }, { x: new Date(1990, 1, 1), y: 14000 }, { x: new Date(1995, 1, 1), y: 10500 },
        { x: new Date(2000, 1, 1), y: 13300 }, { x: new Date(2005, 1, 1), y: 12800 }
    ];
    public data2: Object[] = [
        { x: new Date(1970, 1, 1), y: 8000 }, { x: new Date(1975, 1, 1), y: 7600 }, { x: new Date(1980, 1, 1), y: 6400 },
        { x: new Date(1985, 1, 1), y: 3700 }, { x: new Date(1990, 1, 1), y: 7200 }, { x: new Date(1995, 1, 1), y: 2300 },
        { x: new Date(2000, 1, 1), y: 4000 }, { x: new Date(2005, 1, 1), y: 4800 }
    ];
    //Initializing Primary Y Axis
    public primaryXAxis: Object = {
        valueType: 'DateTime', interval: 5, intervalType: 'Years', majorGridLines: { width: 0 },
        edgeLabelPlacement: 'Shift',
        minimum: new Date(1965, 1, 1), maximum: new Date(2010, 1, 1),
        //Initializing Striplines
        stripLines: [{
            startFromAxis: true, size: 5, sizeType: 'Years', isRepeat: true, repeatEvery: 10, visible: true,
            color: 'rgba(167,169,171, 0.1)'
        }]
    };
    chartArea: { border: { width: 0 } };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        minimum: 0, maximum: 18000, interval: 2000, majorGridLines: { color: 'rgba(167,169,171, 0.3)' },
            majorTickLines: { width: 0 }, lineStyle: { width: 0 }, labelStyle: { color: 'transparent' },
            stripLines: [{
                startFromAxis: true, size: 2000, isRepeat: true, repeatEvery: 4000, visible: true,
                color: 'rgba(167,169,171, 0.1)'
            }]
    };
    public tooltip: Object = {
        enable: true, format: ' Year: ${point.x}<br> Tons Per Day: ${point.y}'
    };
     // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    }; 
    // custom code end
    public title: string = 'World Pollution Report';
    @ViewChild('chart')
    public chart: ChartComponent;
    public mode: DropDownList;
    public xChange(e: Event): void {
        let element: HTMLInputElement = <HTMLInputElement>e.target;
        this.chart.primaryXAxis.stripLines[0].visible = element.checked;
        this.chart.refresh();
    }
    public yChange(e: Event): void {
        let element: HTMLInputElement = <HTMLInputElement>e.target;
        this.chart.primaryYAxis.stripLines[0].visible = element.checked;
        this.chart.refresh();
    }
    constructor() {
        //code
    };

}