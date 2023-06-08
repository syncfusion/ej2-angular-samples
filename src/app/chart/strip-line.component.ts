import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ILoadedEventArgs, ChartComponent, ChartTheme, StripLineSettingsModel} from '@syncfusion/ej2-angular-charts';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Browser} from '@syncfusion/ej2-base';
/**
 * Sample for stripLines
 */
let fontSize: string = Browser.isDevice ? '14px' : '18px';

@Component({
    selector: 'control-content',
    templateUrl: 'strip-line.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class StripLineChartComponent {

    public data: Object[] = [
        { Day: 'Jan', Temperature: 90 },
        { Day: 'Feb', Temperature: 92 },
        { Day: 'Mar', Temperature: 94 },
        { Day: 'Apr', Temperature: 95 },
        { Day: 'May', Temperature: 94 },
        { Day: 'Jun', Temperature: 96 },
        { Day: 'Jul', Temperature: 97 },
        { Day: 'Aug', Temperature: 98 },
        { Day: 'Sep', Temperature: 97 },
        { Day: 'Oct', Temperature: 95 },
        { Day: 'Nov', Temperature: 90 },
        { Day: 'Dec', Temperature: 95 },
    ];
    public data1: Object[] = [
        { Day: "Jan", Temperature: 85 },
        { Day: "Feb", Temperature: 86 },
        { Day: "Mar", Temperature: 87 },
        { Day: "Apr", Temperature: 88 },
        { Day: "May", Temperature: 87 },
        { Day: "Jun", Temperature: 90 },
        { Day: "Jul", Temperature: 91 },
        { Day: "Aug", Temperature: 90 },
        { Day: "Sep", Temperature: 93 },
        { Day: "Oct", Temperature: 90 },
        { Day: "Nov", Temperature: 85 },
        { Day: "Dec", Temperature: 90 },
    ];
    public data2: Object[] = [
        { Day: "Jan", Temperature: 80 },
        { Day: "Feb", Temperature: 81 },
        { Day: "Mar", Temperature: 82 },
        { Day: "Apr", Temperature: 83 },
        { Day: "May", Temperature: 84 },
        { Day: "Jun", Temperature: 83 },
        { Day: "Jul", Temperature: 82 },
        { Day: "Aug", Temperature: 81 },
        { Day: "Sep", Temperature: 85 },
        { Day: "Oct", Temperature: 84 },
        { Day: "Nov", Temperature: 83 },
        { Day: "Dec", Temperature: 82 },
    ];
    //Initializing Primary Y Axis
    public primaryXAxis: Object = {
        valueType: 'Category', majorGridLines: { width: 0 },
        //Initializing Striplines
        majorTickLines: {width : 0},
        minorTickLines: {width: 0}
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        minimum: 80,
        maximum: 100,
        interval: 5,
        lineStyle: { color: '#808080' },
        labelFormat: '{value}%',
        rangePadding: 'None',
        majorTickLines: {width: 0},
        //Initializing Striplines
        stripLines: [
            {
                start: 95,
                end: 100,
                text: 'Good',
                color: '#ff512f',
                visible: true,
                horizontalAlignment: 'Middle',
                textStyle: {
                    size: '16px',
                    color: '#ffffff',
                    fontWeight: '500',
                },
                border: { width: 0 },
            },
            {
                start: 85,
                end: 95,
                text: 'Ok',
                color: '#fc902a',
                horizontalAlignment: 'Middle',
                visible: true,
                textStyle: {
                    size: '16px',
                    color: '#ffffff',
                    fontWeight: '500',
                },
                border: { width: 0 },
            },
            {
                start: 80,
                end: 85,
                text: 'Average',
                horizontalAlignment: 'Middle',
                visible: true,
                textStyle: {
                    size: '16px',
                    color: '#ffffff',
                    fontWeight: '500',
                },
                border: { width: 0 },
                color: '#f9d423',
              },
        ]
    };
    public marker: Object = {
        visible: true, width: 7, height: 7
    };
    public width: string = Browser.isDevice ? '100%' : '75%';
    public tooltip: Object = {
        enable: true,
        header: " ",
        format: "<b>${point.x}</b> <br> Ratings : <b>${point.y}</b>"
    };
    public legendSettings: Object = {
        visible: true,
        enableHighlight: true
    };
     // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
     // custom code end
    public title: string = 'Customer Satisfication Rating';
    @ViewChild('chart')
    public chart: ChartComponent;
    public mode: DropDownList;
    constructor() {
        //code
    };

}