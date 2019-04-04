import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';

/**
 * Sample for Chart Symbols
 */
@Component({
    selector: 'control-content',
    templateUrl: 'marker-chart.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class MarkerChartComponent {

    public data: Object[] = [
        { x: 'WW', y: 12, text: 'World Wide' },
        { x: 'EU', y: 9.9, text: 'Europe' },
        { x: 'APAC', y: 4.4, text: 'Asia Pacific' },
        { x: 'LATAM', y: 6.4, text: 'Latin America' },
        { x: 'MEA', y: 30, text: 'Middle East Africa' },
        { x: 'NA', y: 25.3, text: 'North America' }];
    public data1: Object[] = [
        { x: 'WW', y: 22, text: 'World Wide' },
        { x: 'EU', y: 26, text: 'Europe' },
        { x: 'APAC', y: 9.3, text: 'Asia Pacific' },
        { x: 'LATAM', y: 28, text: 'Latin America' },
        { x: 'MEA', y: 45.7, text: 'Middle East Africa' },
        { x: 'NA', y: 35.9, text: 'North America' }];
    public data2: Object[] = [
        { x: 'WW', y: 38.3, text: 'World Wide' },
        { x: 'EU', y: 45.2, text: 'Europe' },
        { x: 'APAC', y: 18.2, text: 'Asia Pacific' },
        { x: 'LATAM', y: 46.7, text: 'Latin America' },
        { x: 'MEA', y: 61.5, text: 'Middle East Africa' },
        { x: 'NA', y: 64, text: 'North America' }];
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        title: 'Countries', valueType: 'Category',
        interval: 1, labelIntersectAction: 'Rotate45',
        majorGridLines: { width: 0 },
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        title: 'Penetration', rangePadding: 'None',
        labelFormat: '{value}%', minimum: 0,
        lineStyle: { width: 0 },
        maximum: 75, interval: 15
    };
    public legend: Object = {
        visible: false
    };
    //Initializing Marker
    public marker1: Object = {
        visible: true, width: 10, height: 10,
        shape: 'Diamond', dataLabel: { name: 'text' }
    };
    public marker2: Object = {
        visible: true, width: 10, height: 10,
        shape: 'Pentagon', dataLabel: { name: 'text' }
    };
    public marker3: Object = {
        visible: true,
        width: 10, height: 10,
        shape: 'Triangle',
        dataLabel: { name: 'text' }
    };
    public tooltip: Object = {
        enable: true
    };
    public chartArea: Object = {
        border: {
            width: 0
        }
    };

    public width: string = Browser.isDevice ? '100%' : '60%';
    // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
    // custom code end
    public title: string = 'FB Penetration of Internet Audience';
    constructor() {
        //code
    };

}