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
        {  y: 12, x: 'World Wide' },
        { y: 9.9, x: 'Europe' },
        { y: 4.4, x: 'Asia Pacific' },
        { y: 6.4, x: 'Latin America' },
        { y: 30, x: 'Middle East Africa' },
        { y: 25.3, x: 'North America' }];
    public data1: Object[] = [
        { y: 22, x: 'World Wide' },
        { y: 26, x: 'Europe' },
        {  y: 9.3, x: 'Asia Pacific' },
        {  y: 28, x: 'Latin America' },
        {  y: 45.7, x: 'Middle East Africa' },
        { y: 35.9, x: 'North America' }];
    public data2: Object[] = [
        {  y: 38.3, x: 'World Wide' },
        {  y: 45.2, x: 'Europe' },
        {  y: 18.2, x: 'Asia Pacific' },
        {  y: 46.7, x: 'Latin America' },
        {  y: 61.5, x: 'Middle East Africa' },
        {  y: 64, x: 'North America' }];
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
         valueType: 'Category',
        interval: 1, labelIntersectAction: Browser.isDevice ? 'None' : 'Trim', 
        majorGridLines: { width: 0 }, majorTickLines: {width : 0},
        minorTickLines: {width: 0}, labelRotation: Browser.isDevice ? -45 : 0
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        title: 'Penetration',
        rangePadding: 'None',
        labelFormat: '{value}%', minimum: 0,
        lineStyle: { width: 0 },
        maximum: 75, interval: 15
    };
    public legend: Object = {
        visible: true,
        enableHighlight : true
    };
    //Initializing Marker
    public marker1: Object = {
        visible: true, width: 8, height: 8,
        shape: 'Diamond', dataLabel: { name: 'x' }, isFilled: true
    };
    public marker2: Object = {
        visible: true, width: 8, height: 8,
        shape: 'Pentagon', dataLabel: { name: 'x' }, isFilled: true
    };
    public marker3: Object = {
        visible: true,
        width: 8, height: 8,
        shape: 'Triangle',
        dataLabel: { name: 'x' }, isFilled: true
    };
    public tooltip: Object = {
        enable: true, header:"" ,format:"<b>${point.x}</b> <br> ${series.name} : <b>${point.y}</b>"
    };
    public chartArea: Object = {
        border: {
            width: 0
        }
    };

    public width: string = Browser.isDevice ? '100%' : '75%';
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