import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme, ChartAnnotationSettingsModel, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

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
            x: 'Sun',
            y: 2,
            coordinateUnits: 'Point',
            verticalAlignment: 'Top',
            content: '<div id="chart_cloud"><img src="./assets/chart/images/cloud.png" alt="Cloud Picture" style="width: 41px; height: 41px"/></div>'
        },{
            x: 'Tue',
            y: 33,
            coordinateUnits: 'Point',
            verticalAlignment: 'Top',
            content: '<div id="chart_cloud"><img src="./assets/chart/images/sunny.png" alt="Sunny Picture" style="width: 41px; height: 41px"/></div>'
        }
    ];

    public data: Object[] = [
        { x: 'Sun', y: 15 }, { x: 'Mon', y: 22 },
        { x: 'Tue', y: 32 },
        { x: 'Wed', y: 31 },
        { x: 'Thu', y: 29 }, { x: 'Fri', y: 24 },
        { x: 'Sat', y: 18 },
    ];
    public data1: Object[] = [
        { x: 'Sun', y: 10 }, { x: 'Mon', y: 18 },
        { x: 'Tue', y: 28 },
        { x: 'Wed', y: 28 },
        { x: 'Thu', y: 26 }, { x: 'Fri', y: 20 },
        { x: 'Sat', y: 15 }
    ];
    public data2: Object[] = [
        { x: 'Sun', y: 2 }, { x: 'Mon', y: 12 },
        { x: 'Tue', y: 22 },
        { x: 'Wed', y: 23 },
        { x: 'Thu', y: 19 }, { x: 'Fri', y: 13 },
        { x: 'Sat', y: 8 },
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
        interval: 1, majorGridLines: { width: 0 },
        labelIntersectAction: 'Rotate90',
        majorTickLines: {width: 0},
        minorTickLines: {width: 0}

    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        labelFormat: '{value}°C',
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 }
    };
    public marker: Object = {
        visible: true,
        width: 10,
        height: 10
    };
    public tooltip: Object = {
        enable: true
    };
    public legend: Object = {
        visible: true,
        enableHighlight : true
    }

     // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
    };
     // custom code end
    public title: string = 'NC Weather Report - 2016';
    constructor() {
        //code
    };

}