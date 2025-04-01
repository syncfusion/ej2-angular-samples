import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { ChartAllModule, ChartComponent, ChartTheme, ILoadedEventArgs } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadChartTheme } from './theme-color';

@Component({
    selector: 'control-content',
    templateUrl: 'cross-hair.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
})
export class CrosshairChartComponent {
    public primaryXAxis: Object = {
        valueType: 'Category',
        crosshairTooltip: { enable: true },
        majorGridLines: { width: 0 },
        majorTickLines: { width: 0 },
        lineStyle: { width: 0 },
    };

    public primaryYAxis: Object = {
        title: "Stock Value",
        crosshairTooltip: { enable: true },
        majorTickLines: { width: 0 },
        lineStyle: { width: 0 },
        // interval: 4,
        maximum: 318,
        minimum: 288
    };

    public chartData: Object[] = [
        { time: '09:00', value: 289.92 },
        { time: '09:05', value: 289.33 },
        { time: '09:10', value: 289.73 },
        { time: '09:15', value: 299.39 },
        { time: '09:20', value: 298.95 },
        { time: '09:25', value: 297.14 },
        { time: '09:30', value: 297.13 },
        { time: '09:35', value: 296.63 },
        { time: '09:40', value: 293.42 },
        { time: '09:45', value: 295.84 },
        { time: '09:50', value: 297.90 },
        { time: '09:55', value: 298.07 },
        { time: '10:00', value: 300.50 },
        { time: '10:05', value: 300.75 },
        { time: '10:10', value: 301.39 },
        { time: '10:15', value: 305.91 },
        { time: '10:20', value: 305.19 },
        { time: '10:25', value: 304.72 },
        { time: '10:30', value: 304.40 },
        { time: '10:35', value: 303.64 },
        { time: '10:40', value: 302.80 },
        { time: '10:45', value: 302.08 },
        { time: '10:50', value: 301.90 },
        { time: '10:55', value: 300.62 },
        { time: '11:00', value: 297.24 },
        { time: '11:05', value: 297.49 },
        { time: '11:10', value: 297.37 },
        { time: '11:15', value: 297.10 },
        { time: '11:20', value: 296.84 },
        { time: '11:25', value: 296.07 },
        { time: '11:30', value: 292.96 },
        { time: '11:35', value: 296.05 },
        { time: '11:40', value: 294.97 },
        { time: '11:45', value: 297.45 },
        { time: '11:50', value: 291.37 },
        { time: '11:55', value: 296.01 },
        { time: '12:00', value: 294.21 },
        { time: '12:05', value: 294.77 },
        { time: '12:10', value: 293.22 },
        { time: '12:15', value: 293.50 },
        { time: '12:20', value: 293.78 },
        { time: '12:25', value: 295.67 },
        { time: '12:30', value: 294.68 },
        { time: '12:35', value: 294.21 },
        { time: '12:40', value: 293.31 },
        { time: '12:45', value: 298.67 },
        { time: '12:50', value: 292.96 },
        { time: '12:55', value: 293.29 },
        { time: '13:00', value: 293.65 },
        { time: '13:05', value: 293.60 },
        { time: '13:10', value: 293.43 },
        { time: '13:15', value: 292.48 },
        { time: '13:20', value: 292.21 },
        { time: '13:25', value: 291.46 },
        { time: '13:30', value: 292.20 },
        { time: '13:35', value: 293.68 },
        { time: '13:40', value: 291.76 },
        { time: '13:45', value: 291.40 },
        { time: '13:50', value: 290.75 },
        { time: '13:55', value: 294.13 },
        { time: '14:00', value: 296.75 },
        { time: '14:05', value: 297.97 },
        { time: '14:10', value: 299.41 },
        { time: '14:15', value: 300.87 },
        { time: '14:20', value: 300.82 },
        { time: '14:25', value: 301.87 },
        { time: '14:30', value: 300.80 },
        { time: '14:35', value: 301.33 },
        { time: '14:40', value: 301.83 },
        { time: '14:45', value: 303.68 },
        { time: '14:50', value: 303.01 },
        { time: '14:55', value: 303.97 },
        { time: '15:00', value: 303.86 },
        { time: '15:05', value: 306.28 },
        { time: '15:10', value: 304.54 },
        { time: '15:15', value: 304.23 },
        { time: '15:20', value: 301.14 },
        { time: '15:25', value: 302.12 },
        { time: '15:30', value: 301.91 },
        { time: '15:35', value: 304.58 },
        { time: '15:40', value: 302.32 },
        { time: '15:45', value: 302.89 },
        { time: '15:50', value: 302.45 },
        { time: '15:55', value: 302.12 },
        { time: '16:00', value: 302.76 },
        { time: '16:05', value: 303.23 },
        { time: '16:10', value: 303.98 },
        { time: '16:15', value: 304.54 },
        { time: '16:20', value: 304.01 },
        { time: '16:25', value: 304.67 },
        { time: '16:30', value: 305.12 },
        { time: '16:35', value: 305.45 },
        { time: '16:40', value: 306.23 },
        { time: '16:45', value: 306.87 },
        { time: '16:50', value: 306.32 },
        { time: '16:55', value: 307.98 },
        { time: '17:00', value: 310.65 },
        { time: '17:05', value: 309.43 },
        { time: '17:10', value: 308.21 },
        { time: '17:15', value: 307.89 },
        { time: '17:20', value: 307.54 },
        { time: '17:25', value: 305.32 },
        { time: '17:30', value: 305.76 },
        { time: '17:35', value: 304.23 },
        { time: '17:40', value: 304.65 },
        { time: '17:45', value: 304.01 },
        { time: '17:50', value: 304.43 },
        { time: '17:55', value: 305.76 },
        { time: '18:00', value: 305.12 },
        { time: '18:05', value: 306.45 },
        { time: '18:10', value: 306.23 },
        { time: '18:15', value: 304.98 },
        { time: '18:20', value: 304.65 },
        { time: '18:25', value: 304.32 },
        { time: '18:30', value: 304.98 },
        { time: '18:35', value: 303.65 },
        { time: '18:40', value: 303.32 },
        { time: '18:45', value: 303.01 },
        { time: '18:50', value: 302.76 },
        { time: '18:55', value: 301.54 },
        { time: '19:00', value: 301.32 },
        { time: '19:05', value: 301.21 },
        { time: '19:10', value: 300.43 },
        { time: '19:15', value: 300.76 },
        { time: '19:20', value: 301.12 },
        { time: '19:25', value: 301.54 },
        { time: '19:30', value: 300.89 },
        { time: '19:35', value: 300.23 },
        { time: '19:40', value: 300.56 },
        { time: '19:45', value: 299.87 }
    ]


    public tooltip: Object = {
        enable: true,
        showNearestTooltip: true,
        location: { x: 70, y:52 },
        format: '<b>${point.x}</b> <br>Stock Price : <b>${point.y}</b>',
        header: '',
        enableMarker: false
    };

    public legend: Object = {
        visible: false,
       
    }
    public crosshair: Object = {
        enable: true,
        snapToData: true,
        dashArray: '5,5'
    };

    @ViewChild('chart')
    public chart: ChartComponent;

    public chartArea: Object = {
        border: { width: 0 }
    };

    public width: string = Browser.isDevice ? '100%' : '75%';
    public title: string = "Intraday Stock Price Movement";
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: ChartTheme | string = loadChartTheme(args, true);
        let themes: string[] = ['bootstrap5', 'bootstrap5dark', 'tailwind', 'tailwinddark', 'material', 'materialdark', 'bootstrap4', 'bootstrap', 'bootstrapdark', 'fabric', 'fabricdark', 'highcontrast', 'fluent', 'fluentdark', 'material3', 'material3dark', 'fluent2', 'fluent2highcontrast', 'fluent2dark', 'tailwind3', 'tailwind3dark'];
        let borderColor: string[] = ['#FD7E14', '#FD7E14', '#5A61F6', '#8B5CF6', '#00bdae', '#9ECB08', '#a16ee5', '#a16ee5', '#a16ee5', '#4472c4', '#4472c4', '#79ECE4', '#1AC9E6', '#1AC9E6', '#6355C7', '#4EAAFF', '#6200EE', '#9BB449', '#9BB449', '#2F4074', '#8029F1'];
        this.chart.series[0].border.color = borderColor[themes.indexOf(args.chart.theme.toLowerCase())];
        this.chart.series[0].fill = 'url(#' + selectedTheme.toLowerCase() + '-gradient-chart)';
        this.chart.series[0].border = { width: 2, color: borderColor[themes.indexOf(selectedTheme.toLowerCase())] }
    }
}
