import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';

/**
 * Sample for Line Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'line-segments.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class LineSegmentChartComponent {
    public dataValues: Object[] = [];
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'DateTime',
        labelFormat: 'y',
        intervalType: 'Years',
        edgeLabelPlacement: 'Shift',
        majorGridLines: { width: 0 }
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        labelFormat: '{value}mm',
        rangePadding: 'None',
        minimum: 200,
        maximum: 800,
        interval: 100,
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
        value: 450,
        color: 'red'
    }, {
        value: 500,
        color: 'green'
    }, {
        color: 'blue'
    }];
    public tooltip: Object = {
        enable: true, shared: true
    };
    public load(args: ILoadedEventArgs): void {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
       // custom code end
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
        [
            380, 410, 310, 540, 510, 330, 490, 470, 472, 460, 550, 420, 380, 430, 385, 520, 580, 420, 350, 505,
            535, 410, 204, 400, 415, 408, 415, 350, 375, 500, 390, 450, 440, 350, 400, 365, 490, 400, 520, 510,
            395, 380, 404, 400, 500, 390, 610, 380, 390, 420, 440, 570, 600, 380, 410, 405, 480, 320, 420, 440,
            320, 280, 320, 400, 390, 460, 470, 490, 420, 480, 410, 420, 580, 410, 380, 480, 360, 650, 680, 720,
            580, 480, 520, 440, 420, 430, 380, 520, 410, 540, 400, 390, 460, 470, 490, 420, 480, 470, 490, 330,
            520, 480, 580, 590, 600, 310, 480, 500, 400, 508, 480, 460, 700, 705, 480, 410, 480,
        ].map((value: number, index: number) => {
            this.dataValues.push({ XValue: new Date(1900 + index, 0, 1), YValue: value });
        });
        if (selectedTheme === 'highcontrast') {
            args.chart.series[0].segments[0].color = '#FF4741';
            args.chart.series[0].segments[1].color = '#00B400';
            args.chart.series[0].segments[2].color = '#3F9BFF';
        }
    };
    public title: string = 'Annual Mean Rainfall for Australia';
    constructor() {
        //code
    };

}