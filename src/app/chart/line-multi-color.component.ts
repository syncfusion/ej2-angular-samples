import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { rainFallData } from './financial-data';

/**
 * Sample for Line Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'line-multi-color.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class MultiLineChartComponent {
    public dataValues: Object[] = [];
    public colors: string[] = ['red', 'green', '#ff0097', 'crimson', 'blue', 'darkorange', 'deepskyblue',
        'mediumvioletred', 'violet', 'peru', 'gray', 'deeppink', 'navy'];
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
        rangePadding: 'None',
        minimum: 4,
        maximum: 10,
        title: 'Particulate Matter(PM)',
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
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
        // custom code end
        rainFallData.map((value: number, index: number) => {
            this.dataValues.push({
                XValue: new Date(2017, -index, 1), YValue: value.toFixed(2),
                color: this.colors[Math.floor(index / 16)]
            });
        });
    };
    public title: string = 'Particulate Levels in Rainfall';
    constructor() {
        //code
    };

}