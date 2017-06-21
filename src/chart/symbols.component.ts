import { Component, ViewEncapsulation } from '@angular/core';

/**
 * Chart Symbols
 */
@Component({
    selector: 'control-content',
    templateUrl: 'symbols.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class SymbolsChartComponent {

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
    public data3: Object[] = [
        { x: 'WW', y: 50, text: 'World Wide' },
        { x: 'EU', y: 63.6, text: 'Europe' },
        { x: 'APAC', y: 20.9, text: 'Asia Pacific' },
        { x: 'LATAM', y: 65.1, text: 'Latin America' },
        { x: 'MEA', y: 73, text: 'Middle East Africa' },
        { x: 'NA', y: 81.4, text: 'North America' }];
    public primaryXAxis: Object = {
        title: 'Countries',
        valueType: 'Category',
        edgeLabelPlacement: 'Shift',
        interval: 1, labelIntersectAction : 'Rotate45'
    };
    public primaryYAxis: Object = {
        title: 'Penetration (%)',
        rangePadding: 'None',
        labelFormat: '{value}%',
        minimum: 0,
        maximum: 90
    };
    public legend: Object = {
        visible: false
    };
    public marker1: Object = {
        visible: true,
        width: 10,
        height: 10,
        shape: 'Diamond',
        dataLabel: { name: 'text' }
    };
    public marker2: Object = {
        visible: true,
        width: 10,
        height: 10,
        shape: 'Pentagon',
        dataLabel: { name: 'text' }
    };
    public marker3: Object = {
        visible: true,
        width: 10,
        height: 10,
        shape: 'Triangle',
        dataLabel: { name: 'text' }
    };
    public marker4: Object = {
        visible: true,
        width: 10,
        height: 10,
        shape: 'Circle',
        dataLabel: { name: 'text' }
    };
    public tooltip: Object = {
        enable: true,
        format: '${series.name} <br> ${point.text} : ${point.y}'
    };
    public title: string = 'FB Penetration of Internet Audience';
    constructor() {
        //code
    };

}