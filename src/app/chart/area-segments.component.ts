import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';

/**
 * Sample for Line Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'area-segments.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class AreaSegmentChartComponent {
    public dataValues: Object[] = [];
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'DateTime',
        labelFormat: 'MMM',
        intervalType: 'Months',
        edgeLabelPlacement: 'Shift',
        majorGridLines: { width: 0 }
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        labelFormat: '${value}K',
        rangePadding: 'None',
        minimum: 0,
        maximum: 200,
        interval: 50,
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 }
    };
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public width: string = Browser.isDevice ? '100%' : '60%';
    public legend: Object = { visible: false };
    public segments: Object[] = [{
        value: new Date(2016, 4, 1),
        color: 'url(#winter)'
    }, {
        value: new Date(2016, 8, 1),
        color: 'url(#summer)'
    }, {
        color: 'url(#spring)'
    }];
    public tooltip: Object = {
        enable: true
    };
       // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
        [150, 71.5, 106.4, 100.25, 70.0, 106.0, 85.6, 78.5, 76.4, 86.1, 155.6, 160.4].map((value: number, index: number) => {
            this.dataValues.push({ XValue: new Date(2016, index, 1), YValue: value });
        });
    };
       // custom code end
    public title: string = 'Organic Revenue in US - 2016';
    constructor() {
        //code
    };

}