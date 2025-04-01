import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme, Highlight, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadChartTheme } from './theme-color';
//import { truncate } from 'fs';

/**
 * Inversed Range Column Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'range-color-mapping.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
})
export class RangeColorMappingComponent {

    public data1: Object[] = [
        { x: "Jan", y: 6 },
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
        valueType: 'Category', majorGridLines: { width: 0 }, majorTickLines: {width : 0},
        minorTickLines: {width: 0}
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
            lineStyle: { width: 0 },
            majorTickLines: { width: 0 },
            minorTickLines: { width: 0 },
            labelFormat: '{value}°C',
    };
    public title: string = 'USA CLIMATE - WEATHER BY MONTH';

    public tooltip: Object = {
        enable: false
    };
    public marker: Object = {
        dataLabel: {
            visible: true,
            position: 'Outer',
        }
    }

    public colors1: string[] = ['#F9D422'];
    public colors2: string[] = ['#F28F3F'];
    public colors3: string[] = ['#E94F53'];

    public legendSettings: Object = {
        mode: 'Range',
        visible: true,
        toggleVisibility: false,
    };
    public highlightMode: string = 'Point';
    public highlightPattern: string =  'DiagonalForward';

    public animation: Object = {
        enable: false
    };

    public cornerRadius: Object = {
        topLeft: 10, topRight: 10
    }
     // custom code start
    public load(args: ILoadedEventArgs): void {
        loadChartTheme(args);
    };
     // custom code end
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public width: string = Browser.isDevice ? '100%' : '75%';

    constructor() {
        //code
    };

}