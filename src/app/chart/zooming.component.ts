import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme, ScrollBar, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { data } from './financial-data'
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadChartTheme, themes, borderColor } from './theme-color';
/**
 * Sample for Zooming in chart
 */
@Component({
    selector: 'control-content',
    templateUrl: 'zooming.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ChartAllModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class ZoomingChartComponent {
    public theme: ChartTheme | string = loadChartTheme();   
    // public fill: string = 'url(#' + this.selectedTheme + '-gradient-chart)';
    public seriesData: Object[] = [];

    private loadSeriesData(): void {
        this.seriesData = [];
        for (let i = 0; i < data.length; i++) {
            let point = { x: new Date(1941, i + 2, i), y: data[i as number] / 1000 - 0.5 };
            this.seriesData.push(point);
        }
    }

    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'DateTime',
        majorGridLines: { width: 0 },
        majorTickLines: { width: 0 },
        scrollbarSettings: {
            enableZoom: false, position: 'Bottom'
        }
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        title: 'Temperature Anomaly (°C)',
        intervalType: 'Months',
        labelFormat: '{value}°C',
        enableScrollbarOnZooming: false,
        majorTickLines: { width: 0 },
        lineStyle: { width: 0 },
    };
    public legend: Object = {
        visible: false
    };
    public animation: Object = { enable: true };
    public zoomSettings: Object = {
        enableSelectionZooming: true,
        enableMouseWheelZooming: true,
        enableDeferredZooming: false,
        enableScrollbar: true,
        mode: 'X',
        enablePinchZooming: true,
        enableAnimation: true,
        showToolbar : true,
        toolbarPosition:{y: -60, draggable: true}
    };
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public margin: Object ={
        top: 20,
    };
    public tooltip: Object = {
        enable: true, 
        showNearestTooltip: true, 
        header: '<b>${point.x}</b>', 
        format: 'Temperature: <b>${point.y}</b>',
        enableHighlight: true
    };

    // custom code start
    public load(args: ILoadedEventArgs): void {
        loadChartTheme(args, true);
        args.chart.scrollBarModule = new ScrollBar(args.chart);
        args.chart.series[0].border.color = borderColor[themes.indexOf(args.chart.theme.toLowerCase())];
    };
    // custom code end
    public border: Object = { width: 2, color: borderColor[themes.indexOf(this.theme)] };
    public width: string = Browser.isDevice ? '100%' : '80%'
    public title: string = Browser.isDevice ? 'Monthly Temperature Anomalies' : 'Global Warming: Monthly Temperature Anomalies'
    public titleStyle: Object = { textAlignment: Browser.isDevice ? 'Near' : 'Center' };
    constructor() {
        this.loadSeriesData();

    };

}