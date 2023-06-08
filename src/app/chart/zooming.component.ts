import { Component, ViewEncapsulation } from '@angular/core';
import { ChartDataService } from './chart-data.service';
import { ILoadedEventArgs, ChartTheme, ScrollBar } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
/**
 * Sample for Zooming in chart
 */
@Component({
    selector: 'control-content',
    templateUrl: 'zooming.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class ZoomingChartComponent {

    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'DateTime',
        edgeLabelPlacement: 'Shift',
        majorGridLines: { width: 0 }
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        title: 'Profit ($)',
        rangePadding: 'None',
        labelFormat: "${value}k",
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 }
    };
    public legend: Object = {
        visible: false
    };
    public animation: Object = { enable: false };
    public zoomSettings: Object = {
        mode: 'X',
        enableMouseWheelZooming: true,
        enablePinchZooming: true,
        enableSelectionZooming: true,
       
    };
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
     // custom code start
    public width: string = Browser.isDevice ? '100%' : '75%';
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
        let themes : string[] = ['bootstrap5', 'bootstrap5dark', 'tailwind', 'tailwinddark', 'material', 'materialdark', 'bootstrap4', 'bootstrap', 'bootstrapdark', 'fabric', 'fabricdark', 'highcontrast', 'fluent', 'fluentDark'];
        let borderColor : string[] = ['#262E0B', '#5ECB9B', '#5A61F6', '#8B5CF6', '#00bdae', '#9ECB08', '#a16ee5', '#a16ee5', '#a16ee5', '#4472c4', '#4472c4', '#79ECE4', '#614570', '#8AB113'];
        args.chart.scrollBarModule = new ScrollBar(args.chart);
        args.chart.series[0].border.color = borderColor[themes.indexOf(args.chart.theme.toLowerCase())];
        args.chart.series[0].fill = 'url(#' + selectedTheme + '-gradient-chart)';
    };
     // custom code end
    public border: Object = { width: 0.5, color: '#00bdae' };
    public title: string = 'Sales History of Product X';
    public series1: Object = ChartDataService.prototype.GetZoomingData().series1;
    constructor() {
        //code
    };

}