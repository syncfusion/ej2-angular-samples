import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ILoadedEventArgs, ChartComponent, ChartTheme, IPointRenderEventArgs, ITooltipRenderEventArgs } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
/**
 * Sample for Column Series with rounded corner
 */
@Component({
    selector: 'control-content',
    templateUrl: 'rounded-column.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class RoundedColumnChartComponent {

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
    public data: Object[] = [
        { x: 'BGD', y: 106, text: 'Bangaladesh' },
        { x: 'BTN', y: 103, text: 'Bhutn' },
        { x: 'NPL', y: 198, text: 'Nepal' },
        { x: 'THA', y: 189, text: 'Thiland' },
        { x: 'MYS', y: 250, text: 'Malaysia' }
    ];
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Category', interval: 1, majorGridLines: { width: 0 },
		 tickPosition: 'Inside',
         labelPosition:'Inside', labelStyle: { color: '#ffffff' }
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        minimum: 0, maximum: 300, interval: 50, majorGridLines: { width: 0 },
        majorTickLines: { width: 0 }, lineStyle: { width: 0 }, labelStyle: { color: 'transparent' }
    };
    public radius: Object = { bottomLeft: 10, bottomRight: 10, topLeft: 10, topRight: 10 }
    public marker: Object = { dataLabel: { visible: true, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } }
    public title: string = 'Tiger Population - 2016';
    public tooltip: Object = {
        enable: true
    };
    public legend: Object = {
        visible: false
    }
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public width: string = Browser.isDevice ? '100%' : '60%';

    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    };
    public tooltipRender(args: ITooltipRenderEventArgs): void {
        let tooltip: string = args.text;
        if (tooltip.indexOf('BGD') > -1) {
            tooltip = tooltip.replace('BGD', 'Bangladesh');
        } else if (tooltip.indexOf('BTN') > -1) {
            tooltip = tooltip.replace('BTN', 'Bhutan');
        } else if (tooltip.indexOf('NPL') > -1) {
            tooltip = tooltip.replace('NPL', 'Nepal');
        } else if (tooltip.indexOf('THA') > -1) {
            tooltip = tooltip.replace('THA', 'Thailand');
        } else {
            tooltip = tooltip.replace('MYS', 'Malaysia');
        }
        args.text = tooltip;
    };
    constructor() {
        //code
    };

}