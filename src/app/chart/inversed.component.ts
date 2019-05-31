import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, IPointRenderEventArgs, ChartTheme } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';

/**
 * Sample for Inversed Axis
 */
@Component({
    selector: 'control-content',
    templateUrl: 'inversed.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})

export class InversedAxisChartComponent {
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Category',
        opposedPosition: true,
        isInversed: true,
        majorGridLines: { width: 0 }
    };

    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        edgeLabelPlacement: 'Shift',
        labelIntersectAction: 'Rotate45',
        isInversed: true,
        majorGridLines: { width: 0 },
        majorTickLines: { width: 0 },
        lineStyle: { width: 0 },
        labelStyle: {
            color: 'transparent'
        }
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

    public data: Object[] = [
        { x: '2008', y: 15.1 }, { x: '2009', y: 16 }, { x: '2010', y: 21.4 },
        { x: '2011', y: 18 }, { x: '2012', y: 16.2 }, { x: '2013', y: 11 },
        { x: '2014', y: 7.6 }, { x: '2015', y: 1.5 }
        ];

    public marker: Object = {
        dataLabel: { visible: true, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } }
    };
    public tooltip: Object = {
        enable: true
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
public width: string = Browser.isDevice ? '100%' : '60%';
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
// custom code end
    public title: string = 'Exchange Rate (INR per USD)';


    constructor() {
        //code
    };

}