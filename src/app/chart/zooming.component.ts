import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme, ScrollBar, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { data } from './financial-data'
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
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
    public selectedTheme: string = (location.hash.split('/')[1]) ? (location.hash.split('/')[1]) : 'Material';
    public theme: ChartTheme = <ChartTheme>(this.selectedTheme.charAt(0).toUpperCase() +
        this.selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
    public themes: string[] = ['bootstrap5', 'bootstrap5dark', 'tailwind', 'tailwinddark', 'material', 'materialdark', 'bootstrap4', 'bootstrap', 'bootstrapdark', 'fabric', 'fabricdark', 'highcontrast', 'fluent', 'fluentdark', 'material3', 'material3dark', 'fluent2', 'fluent2dark', 'fluent2highcontrast'];
    public borderColor: string[] = ['#FD7E14', '#FD7E14', '#5A61F6', '#8B5CF6', '#00bdae', '#9ECB08', '#a16ee5', '#a16ee5', '#a16ee5', '#4472c4', '#4472c4', '#79ECE4', '#1AC9E6', '#1AC9E6', '#6355C7', '#4EAAFF', '#6200EE', '#9BB449', '#9BB449'];
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
            enableZoom: false
        }
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        title: 'Temperature',
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
        enableAnimation: true
    };
    public chartArea: Object = {
        border: {
            width: 0
        }
    };

    // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'fluent2';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
        let themes: string[] = ['bootstrap5', 'bootstrap5dark', 'tailwind', 'tailwinddark', 'material', 'materialdark', 'bootstrap4', 'bootstrap', 'bootstrapdark', 'fabric', 'fabricdark', 'highcontrast', 'fluent', 'fluentdark', 'material3', 'material3dark', 'fluent2', 'fluent2dark', 'fluent2highcontrast'];
        let borderColor: string[] = ['#6355C7', '#8F80F4', '#5A61F6', '#8B5CF6', '#00bdae', '#9ECB08', '#a16ee5', '#a16ee5', '#a16ee5', '#4472c4', '#4472c4', '#79ECE4', '#1AC9E6', '#1AC9E6', '#6355C7', '#4EAAFF', '#6200EE', '#9BB449', '#9BB449'];
        args.chart.scrollBarModule = new ScrollBar(args.chart);
        args.chart.series[0].border.color = borderColor[themes.indexOf(args.chart.theme.toLowerCase())];
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');;
    };
    // custom code end
    public border: Object = { width: 2, color: this.borderColor[this.themes.indexOf(this.theme)] };
    public width: string = Browser.isDevice ? '100%' : '80%'
    public title: string = 'Global Warming: Monthly Temperature Anomalies'
    constructor() {
        this.loadSeriesData();

    };

}