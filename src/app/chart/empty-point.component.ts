import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ILoadedEventArgs, ChartComponent, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { ChartSeriesType, EmptyPointMode, ChartTheme } from '@syncfusion/ej2-charts';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadChartTheme } from './theme-color';

/**
 * Sample for empty points
 */
@Component({
    selector: 'control-content',
    templateUrl: 'empty-point.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
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
        valueType: 'Category', interval: 1, labelIntersectAction: Browser.isDevice ? 'None' : 'Trim', labelRotation: Browser.isDevice ? -45: 0, majorTickLines: {width : 0},
        minorTickLines: {width: 0}, title: 'Product'
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
       minimum: 0, maximum: 100, interval: 20, labelFormat: '{value}%', title: 'Profit'
    };
    //Initializing Marker
    public marker: Object = {
        visible: false,
        height: 7, width: 7
    };
     // custom code start
    public load(args: ILoadedEventArgs): void {
        loadChartTheme(args);
    };
     // custom code end
    public tooltip: Object = {
        enable: true,
        header: " "
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
                if(this.chart.series[0].type === 'Spline') {
                    this.chart.series[0].marker.visible = true;
                }
                else {
                    this.chart.series[0].marker.visible = false;
                }
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