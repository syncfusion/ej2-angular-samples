import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ILoadedEventArgs, ChartComponent } from '@syncfusion/ej2-angular-charts';
import { ChartSeriesType, EmptyPointMode, ChartTheme } from '@syncfusion/ej2-charts';
import { DropDownList } from '@syncfusion/ej2-dropdowns';

/**
 * Sample for empty points
 */
@Component({
    selector: 'control-content',
    templateUrl: 'empty-point.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class EmptyPointChartComponent {

    public data: Object[] = [
        { x: 'Rice', y: 80 }, { x: 'Wheat', y: null }, { x: 'Oil', y: 70 },
        { x: 'Corn', y: 60 }, { x: 'Gram', y: null },
        { x: 'Milk', y: 70 }, { x: 'Peas', y: 80 },
        { x: 'Fruit', y: 60 }, { x: 'Butter', y: null }
    ];
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        title: 'Product', valueType: 'Category', interval: 1
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        title: 'Profit', minimum: 0, maximum: 100, interval: 20, labelFormat: '{value}%'
    };
    //Initializing Marker
    public marker: Object = {
        visible: true,
        height: 10, width: 10
    };
     // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
     // custom code end
    public tooltip: Object = {
        enable: true
    };
    public title: string = 'Annual Product-Wise Profit Analysis';
    @ViewChild('chart')
    public chart: ChartComponent;
    public legendSettings: Object = {
        visible: false
    }
    public seriesType: DropDownList;
    public pointMode: DropDownList;
    ngOnInit(): void {
        this.seriesType = new DropDownList({
            index: 0,
            width: 100,
            change: () => {
                let type: string = this.seriesType.value.toString();
                this.chart.series[0].type = <ChartSeriesType>type;
                this.chart.refresh();
            }
        });
        this.seriesType.appendTo('#seriestype');
        this.pointMode = new DropDownList({
            index: 0,
            width: 100,
            change: () => {
                let mode: string = this.pointMode.value.toString();
                this.chart.series[0].emptyPointSettings.mode = <EmptyPointMode>mode;
                this.chart.series[0].emptyPointSettings.fill = '#e6e6e6';
                this.chart.refresh();
            }
        });
        this.pointMode.appendTo('#emptyPointMode');
    }
    constructor() {
        // code
     };
}