import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme, ChartAnnotationSettingsModel, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadChartTheme } from './theme-color';

/**
 * Sample for Multiple Axes
 */
@Component({
    selector: 'control-content',
    templateUrl: 'multiple-axis.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
})
export class MultipleAxisChartComponent {
    public annotations: ChartAnnotationSettingsModel[] = [
    {
        x: 'Sun',
        y: 62,
        coordinateUnits: 'Point',
        verticalAlignment: 'Top',
        content: '<div id="chart_cloud"><img src="./assets/chart/images/cloud.png" alt="Cloud Picture" style="width: 41px; height: 41px"/></div>'
    }, {
        x: 'Sat',
        y: 35,
        coordinateUnits: 'Point',
        yAxisName: 'yAxis',
        content: '<div id="chart_cloud"><img src="./assets/chart/images/sunny.png" alt="Sunny Picture" style="width: 41px; height: 41px"/></div>'
    }
];
    public data: Object[] = [
        { x: 'Sun', y: 35 }, { x: 'Mon', y: 40 },
        { x: 'Tue', y: 80 }, { x: 'Wed', y: 70 }, { x: 'Thu', y: 65 }, { x: 'Fri', y: 55 },
        { x: 'Sat', y: 50 }
    ];
    public data1: Object[] = [
        { x: 'Sun', y: 31 }, { x: 'Mon', y: 28 },
        { x: 'Tue', y: 29 }, { x: 'Wed', y: 30 }, { x: 'Thu', y: 33 }, { x: 'Fri', y: 32 },
        { x: 'Sat', y: 34 }
    ];
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Category',
        majorGridLines: { width: 0 },
        majorTickLines: {width : 0},
        minorTickLines: {width: 0}
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        minimum: 0, maximum: 100, interval: 20,
        lineStyle: { width: 0 },
        labelFormat: '{value}°F'
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
    public legend: Object = {
        visible: false
    }
   
    public marker: Object = {
        visible: true,
        width: 7,
        height: 7,
        isFilled: true
    };
    public marker1: Object = {
        visible: true,
        width: 7,
        height: 7,
    };
    public axis: Object = [{
        majorGridLines: { width: 0 },
        majorTickLines: { width: 0 },
        rowIndex: 0, opposedPosition: true,
        lineStyle: { width: 0 },
        minimum: 24, maximum: 36, interval: 2,
        name: 'yAxis',
        labelFormat: '{value}°C'
    }];
    public majorGridLines: Object = {
        width: 0
    };
    public tooltip: Object = {
        enable: true,
        enableHighlight: true
    };
    public title: string = 'Weather Data';
    constructor() {
        //code
    };

}