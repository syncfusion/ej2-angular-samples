import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ILoadedEventArgs, ChartComponent, ChartTheme, StripLineSettingsModel, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Browser} from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadChartTheme } from './theme-color';
/**
 * Sample for stripLines
 */
let fontSize: string = Browser.isDevice ? '14px' : '18px';

@Component({
    selector: 'control-content',
    templateUrl: 'strip-line.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ChartAllModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class StripLineChartComponent {

    public data: Object[] = [
        { x: new Date(2023, 4, 1), wind : 19 },
        { x: new Date(2023, 4, 2), wind : 17 },
        { x: new Date(2023, 4, 3), wind : 14 },
        { x: new Date(2023, 4, 4), wind : 9 },
        { x: new Date(2023, 4, 5), wind : 10 },
        { x: new Date(2023, 4, 6), wind : 8 },
        { x: new Date(2023, 4, 7), wind : 8 },
        { x: new Date(2023, 4, 8), wind : 16 },
        { x: new Date(2023, 4, 9), wind : 9 },
        { x: new Date(2023, 4, 10), wind : 13 },
        { x: new Date(2023, 4, 11), wind : 7 },
        { x: new Date(2023, 4, 12), wind : 12 },
        { x: new Date(2023, 4, 13), wind : 10 },
        { x: new Date(2023, 4, 14), wind : 5 },
        { x: new Date(2023, 4, 15), wind : 8 }
    ];
    public data1: Object[] = [
        { x: new Date(2023, 4, 1), gust : 30 },
        { x: new Date(2023, 4, 2), gust : 28 },
        { x: new Date(2023, 4, 3), gust : 26 },
        { x: new Date(2023, 4, 4), gust : 19 },
        { x: new Date(2023, 4, 5), gust : 21 },
        { x: new Date(2023, 4, 6), gust : 14 },
        { x: new Date(2023, 4, 7), gust : 13 },
        { x: new Date(2023, 4, 8), gust : 29 },
        { x: new Date(2023, 4, 9), gust : 19 },
        { x: new Date(2023, 4, 10), gust : 20 },
        { x: new Date(2023, 4, 11), gust : 15 },
        { x: new Date(2023, 4, 12), gust : 25 },
        { x: new Date(2023, 4, 13), gust : 20 },
        { x: new Date(2023, 4, 14), gust : 10 },
        { x: new Date(2023, 4, 15), gust : 15 }
    ];
    //Initializing Primary Y Axis
    public primaryXAxis: Object =  {
        valueType: 'DateTimeCategory', majorGridLines: { width: 0}, labelFormat : 'E dd/MM', labelRotation: -90,
        //Initializing Striplines
        majorTickLines: { width: 0 }, labelIntersectAction: Browser.isDevice ? 'Rotate90' : 'None',
    }
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        minimum: 0, maximum: 30, interval: 10, rangePadding: 'None', majorTickLines: { width: 0 }, title: 'Wind Speed and Gust (km/h)', lineStyle: { width: 0 }, majorGridLines: { width: 0 },
        //Initializing Striplines
        stripLines: [
            {
                start: 0, end: 5, text: 'Calm', color: 'rgba(68, 170, 213, 0.1)', visible: true, horizontalAlignment: 'Start',
                textStyle: { size: '13px' }, border: { width: 0 },
            },
            {
                start: 5, end: 8, text: 'Light Air', color: 'rgba(0, 0, 0, 0)', visible: true, horizontalAlignment: 'Start',
                textStyle: { size: '13px' }, border: { width: 0 },
            },
            {
                start: 8, end: 11, text: 'Light Breeze', visible: true, horizontalAlignment: 'Start',
                textStyle: { size: '13px' }, border: { width: 0 }, color: 'rgba(68, 170, 213, 0.1)'
            },
            {
                start: 11, end: 18, text: 'Gentle Breeze', color: 'rgba(0, 0, 0, 0)', visible: true, horizontalAlignment: 'Start',
                textStyle: { size: '13px' }, border: { width: 0 },
            },
            {
                start: 18, end: 28, text: 'Moderate Breeze', visible: true, horizontalAlignment: 'Start',
                textStyle: { size: '13px' }, border: { width: 0 }, color: 'rgba(68, 170, 213, 0.1)'
            },
            {
                start: 28, end: 30, text: 'Fresh Breeze', visible: true, horizontalAlignment: 'Start',
                textStyle: { size: '13px' }, border: { width: 0 }, color: 'rgba(0, 0, 0, 0)'
            }
        ]
    };
    public chartArea: Object ={
        border: { width: 0 }
    }
    public width: string = Browser.isDevice ? '100%' : '75%';
    public tooltip: Object = {
        enable: true,
        header: " ",
        format: "<b>${point.x}</b> <br> ${series.name} : <b>${point.y}</b>",
        enableMarker: false,
        showNearestTooltip: true,
        enableHighlight: true
    };
    public legendSettings: Object = {
        visible: true,
        enableHighlight: true,
        shapeWidth: 15
    };
     // custom code start
    public load(args: ILoadedEventArgs): void {
        loadChartTheme(args);
    };
     // custom code end
    public title: string = 'Wind Speed and Gust (km/h)';
    public titleStyle: Object = { position : 'Bottom', textAlignment:'Far' }
    public subTitle: Object = 'WorldWeatherOnline.com'
    @ViewChild('chart')
    public chart: ChartComponent;
    public mode: DropDownList;
    constructor() {
        //code
    };

}