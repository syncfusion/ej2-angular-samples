import { Component, ViewEncapsulation } from '@angular/core';
import { IPointRenderEventArgs, ChartTheme, ILoadedEventArgs } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
/**
 * Sample for Category axis
 */
@Component({
    selector: 'control-content',
    templateUrl: 'category.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class CategoryChartComponent {
    public data: Object[] = [
        { x: 'Germany', y: 72, country: 'GER: 72'},
        { x: 'Russia', y: 103.1, country: 'RUS: 103.1'},
        { x: 'Brazil', y: 139.1, country: 'BRZ: 139.1'},
        { x: 'India', y: 462.1, country: 'IND: 462.1'},
        { x: 'China', y: 721.4, country: 'CHN: 721.4'},
        { x: 'United States<br>Of America', y: 286.9, country: 'USA: 286.9'},
        { x: 'Great Britain', y: 115.1, country: 'GBR: 115.1'},
        { x: 'Nigeria', y: 97.2, country: 'NGR: 97.2'},
    ];
    public tooltipMappingName: 'country';
    public marker: Object = {
        dataLabel: {
            visible: true,
            position: 'Top', font: {
                fontWeight: '600',
                color: '#ffffff'
            }
        }
    }
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        title: 'Country',
        valueType: 'Category',
        majorGridLines: { width: 0 },
        enableTrim: false,
    };
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
      // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        //args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
      // custom code end
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        minimum: 0,
        maximum: 800,
        labelFormat: Browser.isDevice ? '{value}' : '{value}M',
        edgeLabelPlacement: 'Shift',
        majorGridLines: { width: 0 },
        majorTickLines: { width: 0 },
        lineStyle: { width: 0 },
        labelStyle: {
            color: 'transparent'
        }
    };
    //Initializing Tooltip
    public tooltip: Object = {
        enable: true, format: '${point.tooltip}'
    };
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public legend: Object = {
        visible: false
    }
    public width: string = Browser.isDevice ? '100%' : '60%';

    public title: string = 'Internet Users – 2016';
    constructor() {
        //code
    };

}