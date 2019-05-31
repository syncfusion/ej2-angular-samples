import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ILoadedEventArgs, ChartComponent, ChartTheme } from '@syncfusion/ej2-angular-charts';

/**
 * Sample for indexed category axis
 */
@Component({
    selector: 'control-content',
    templateUrl: 'indexed-axis.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class IndexedAxisChartComponent {
    public data1: Object[] = [
        { x: 'Myanmar', y: 7.3 },
        { x: 'India', y: 7.9 },
        { x: 'Bangladesh', y: 6.8 },
        { x: 'Cambodia', y: 7.0 },
        { x: 'China', y: 6.9 }
    ];
    public data2: Object[] = [
        { x: 'Poland', y: 2.7 },
        { x: 'Australia', y: 2.5 },
        { x: 'Singapore', y: 2.0 },
        { x: 'Canada', y: 1.4 },
        { x: 'Germany', y: 1.8 }
    ];
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Category',
        interval: 1, crosshairTooltip: { enable: true },
        isIndexed: true
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        title: 'GDP Growth Rate',
        labelFormat: '{value}%'
    };
    public marker: Object = {
        visible: false,
        height: 10,
        width: 10,
    };
    public marker1: Object = {
        visible: false,
        height: 10,
        width: 10,
    };
    //Initializing Crosshair
    public crosshairLabel: Object = { enable: true, lineType: 'Vertical' };
    public tooltip: Object = { enable: true, shared: true };
    // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
    // custom code end
    public title: string = 'Real GDP Growth';
    @ViewChild('chart')
    public chart: ChartComponent;
    public isIndexed(e: Event): void {
        let element: HTMLInputElement = <HTMLInputElement>e.target;
        this.chart.primaryXAxis.isIndexed = element.checked;
        if (this.chart.primaryXAxis.isIndexed) {
            this.chart.series[0].type = 'Column';
            this.chart.series[1].type = 'Column';
            this.chart.series[0].marker.visible = false;
            this.chart.series[1].marker.visible = false;
            this.chart.primaryXAxis.labelRotation = 0;
            this.chart.crosshair.line.width = 1;
        } else {
            this.chart.series[0].type = 'Line';
            this.chart.series[1].type = 'Line';
            this.chart.series[0].marker.visible = true;
            this.chart.series[1].marker.visible = true;
            this.chart.primaryXAxis.labelRotation = 90;
            this.chart.crosshair.line.width = 0;
        }
        this.chart.refresh();
    }
    constructor() {
        //code
    };

}