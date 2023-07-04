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
    public selectedTheme: string = (location.hash.split('/')[1]) ? (location.hash.split('/')[1]) : 'Material';
    public theme: ChartTheme = <ChartTheme>(this.selectedTheme.charAt(0).toUpperCase() +
    this.selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
    public themes : string[] = ['bootstrap5', 'bootstrap5dark', 'tailwind', 'tailwinddark', 'material', 'materialdark', 'bootstrap4', 'bootstrap', 'bootstrapdark', 'fabric', 'fabricdark', 'highcontrast', 'fluent', 'fluentdark', 'material3', 'material3dark'];
    public borderColor : string[] = ['#6355C7', '#8F80F4', '#5A61F6', '#8B5CF6', '#00bdae', '#9ECB08', '#a16ee5', '#a16ee5', '#a16ee5', '#4472c4', '#4472c4', '#79ECE4', '#1AC9E6', '#1AC9E6', '#6355C7', '#4EAAFF'];
    public fill : string = 'url(#' + this.selectedTheme + '-gradient-chart)';
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
        showToolbar: true
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
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast');;
        let themes : string[] = ['bootstrap5', 'bootstrap5dark', 'tailwind', 'tailwinddark', 'material', 'materialdark', 'bootstrap4', 'bootstrap', 'bootstrapdark', 'fabric', 'fabricdark', 'highcontrast', 'fluent', 'fluentdark', 'material3', 'material3dark'];
        let borderColor : string[] = ['#6355C7', '#8F80F4', '#5A61F6', '#8B5CF6', '#00bdae', '#9ECB08', '#a16ee5', '#a16ee5', '#a16ee5', '#4472c4', '#4472c4', '#79ECE4', '#1AC9E6', '#1AC9E6', '#6355C7', '#4EAAFF'];
        args.chart.scrollBarModule = new ScrollBar(args.chart);
        args.chart.series[0].border.color = borderColor[themes.indexOf(args.chart.theme.toLowerCase())];
        args.chart.series[0].fill = 'url(#' + selectedTheme + '-gradient-chart)';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
        selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i,  'Contrast');
    };
     // custom code end
    public border: Object = { width: 2, color: this.borderColor[this.themes.indexOf(this.theme)] };
    public title: string = 'Sales History of Product X';
    public series1: Object = ChartDataService.prototype.GetZoomingData().series1;
    constructor() {
        //code
    };

}