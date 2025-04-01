import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartAnnotationSettingsModel, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadChartTheme } from './theme-color';

/**
 * Sample for Spline Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'spline.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
})
export class SplineChartComponent {
    public annotations: ChartAnnotationSettingsModel[] = [
        {
            x: 'Jan',
            y: 22.75,
            coordinateUnits: 'Point',
            verticalAlignment: 'Middle',
            content: '<div id="chart_cloud"><img src="./assets/chart/images/cloud.png" alt="Cloud Picture" style="width: 41px; height: 41px"/></div>'
        },{
            x: 'Jul',
            y: 88.43,
            coordinateUnits: 'Point',
            verticalAlignment: 'Middle',
            content: '<div id="chart_cloud"><img src="./assets/chart/images/sunny.png" alt="Sunny Picture" style="width: 41px; height: 41px"/></div>'
        }
    ];

    public data: Object[] = [
        { x: 'Jan', y: 41.02 },
        { x: 'Feb', y: 51.93 },
        { x: 'Mar', y: 56.39 },
        { x: 'Apr', y: 66.06 },
        { x: 'May', y: 74.64 },
        { x: 'Jun', y: 84.58 },
        { x: 'Jul', y: 88.43 },
        { x: 'Aug', y: 86.72 },
        { x: 'Sep', y: 81.86 },
        { x: 'Oct', y: 73.13 },
        { x: 'Nov', y: 55.54 },
        { x: 'Dec', y: 48.36 }
    ];
    public data1: Object[] = [
        { x: 'Jan', y: 31.89 },
        { x: 'Feb', y: 40.82 },
        { x: 'Mar', y: 44.96 },
        { x: 'Apr', y: 53.64 },
        { x: 'May', y: 62.28 },
        { x: 'Jun', y: 71.80 },
        { x: 'Jul', y: 75.69 },
        { x: 'Aug', y: 73.99 },
        { x: 'Sep', y: 68.61 },
        { x: 'Oct', y: 58.95 },
        { x: 'Nov', y: 45.18 },
        { x: 'Dec', y: 38.21 }
    ];
    public data2: Object[] = [
        { x: 'Jan', y: 22.75 },
        { x: 'Feb', y: 29.71 },
        { x: 'Mar', y: 33.53 },
        { x: 'Apr', y: 41.22 },
        { x: 'May', y: 49.87 },
        { x: 'Jun', y: 59.02 },
        { x: 'Jul', y: 62.94 },
        { x: 'Aug', y: 61.27 },
        { x: 'Sep', y: 55.36 },
        { x: 'Oct', y: 44.76 },
        { x: 'Nov', y: 34.79 },
        { x: 'Dec', y: 28.04 }
    ];
    public chartArea: Object = {
        border: {
            width: 0
        },
        margin: {
            bottom: 12
        }
    };
    public width: string = Browser.isDevice ? '100%' : '75%';
    public height: string = '500px';
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Category', 
        interval: 1, 
        majorGridLines: { width: 0 }, 
        labelIntersectAction: 'Rotate90', 
        majorTickLines: { width: 0 }, 
        minorTickLines: { width: 0 }

    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        labelFormat: '{value}°F', 
        minimum: 0, 
        interval: 20, 
        title: 'Temperature (°F)', 
        lineStyle: { width: 0 }, 
        majorTickLines: { width: 0 }, 
        minorTickLines: { width: 0 }
    };
    public marker: Object = {
        visible: true,
        width: 7,
        height: 7,
        isFilled:true
    };
    public tooltip: Object = {
        enable: true, 
        shared: true, 
        showNearestTooltip: true, 
        header: '<b>${point.x}<b>', 
        format: '${series.name} : <b>${point.y}</b>'
    };
    public crosshair: Object = { enable: true, lineType: 'Vertical', highlightCategory: true };
    public legend: Object = {
        visible: true,
        enableHighlight : true
    }

     // custom code start
    public load(args: ILoadedEventArgs): void {
        loadChartTheme(args);
    };
     // custom code end
    public title: string = '2024 US Temperature Trends with Hottest Coldest and Average Records';
    public subTitle: string = 'Source: ncei.noaa.gov';
    constructor() {
        //code
    };

}