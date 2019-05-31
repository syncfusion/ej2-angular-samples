import { Component, ViewEncapsulation } from '@angular/core';
import { IPointRenderEventArgs, ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
/**
 * Sample for Bubble Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'bubble.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})

export class BubbleChartComponent {

    public data: Object[] = [
        { x: 92.2, y: 7.8, size: 1.347, text: 'China' },
        { x: 74, y: 6.5, size: 1.241, text: 'India' },
        { x: 90.4, y: 6.0, size: 0.238, text: 'Indonesia' },
        { x: 99.4, y: 2.2, size: 0.312, text: 'US' },
        { x: 88.6, y: 1.3, size: 0.197, text: 'Brazil' },
        { x: 99, y: 0.7, size: 0.0818, text: 'Germany' },
        { x: 72, y: 2.0, size: 0.0826, text: 'Egypt' },
        { x: 99.6, y: 3.4, size: 0.143, text: 'Russia' },
        { x: 99, y: 0.2, size: 0.128, text: 'Japan' },
        { x: 86.1, y: 4.0, size: 0.115, text: 'Mexico' },
        { x: 92.6, y: 6.6, size: 0.096, text: 'Philippines' },
        { x: 61.3, y: 1.45, size: 0.162, text: 'Nigeria' },
        { x: 82.2, y: 3.97, size: 0.7, text: 'Hong Kong' },
        { x: 79.2, y: 3.9, size: 0.162, text: 'Netherland' },
        { x: 72.5, y: 4.5, size: 0.7, text: 'Jordan' },
        { x: 81, y: 3.5, size: 0.21, text: 'Australia' },
        { x: 66.8, y: 3.9, size: 0.028, text: 'Mongolia' },
        { x: 78.4, y: 2.9, size: 0.231, text: 'Taiwan' }];


    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        title: 'Literacy Rate',
        minimum: 60,
        maximum: 100,
        interval: 5
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        title: 'GDP Growth Rate',
        minimum: 0,
        maximum: 10,
        interval: 2.5
    };

    public marker: Object = {
        dataLabel: { name: 'text' }
    };
    //Initializing Tooltip
    public tooltip: Object = {
        enable: true,
        format: "${point.text}<br/>Literacy Rate : <b>${point.x}%</b>" +
            "<br/>GDP Annual Growth Rate : <b>${point.y}</b><br/>Population : <b>${point.size} Billion</b>"
    };
    public minRadius: number = 3;
    public maxRadius: number = Browser.isDevice ? 6 : 8;
    public pointRender(args: IPointRenderEventArgs): void {
        let materialColors: string[] = ['#00bdae', '#404041', '#357cd2', '#e56590', '#f8b883', '#70ad47', '#dd8abd', '#7f84e8', '#7bb4eb',
            '#ea7a57', '#404041', '#00bdae'];
        let fabricColors: string[] = ['#4472c4', '#ed7d31', '#ffc000', '#70ad47', '#5b9bd5',
            '#c1c1c1', '#6f6fe2', '#e269ae', '#9e480e', '#997300', '#4472c4', '#70ad47', '#ffc000', '#ed7d31'];
        let bootstrapColors: string[] = ['#a16ee5', '#f7ce69', '#55a5c2', '#7ddf1e', '#ff6ea6',
            '#7953ac', '#b99b4f', '#407c92', '#5ea716', '#b91c52'];
        let highContrastColors: string[] = ['#79ECE4', '#E98272', '#DFE6B6', '#C6E773', '#BA98FF',
            '#FA83C3', '#00C27A', '#43ACEF', '#D681EF', '#D8BC6E'];
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        if (selectedTheme && selectedTheme.indexOf('fabric') > -1) {
            args.fill = fabricColors[args.point.index % 10];
        } else if (selectedTheme === 'material') {
            args.fill = materialColors[args.point.index % 10];
        } else if (selectedTheme === 'highcontrast') {
            args.fill = highContrastColors[args.point.index % 10];
        } else {
            args.fill = bootstrapColors[args.point.index % 10];
        }
    };

    public legend: Object = {
        visible: false
    };
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
     // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
     // custom code end
    public width: string = Browser.isDevice ? '100%' : '60%';

    public title: string = 'World Countries Details';

    constructor() {
        // code
    };
}