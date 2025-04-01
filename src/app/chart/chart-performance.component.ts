import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { ChartComponent, ChartTheme, ILoadedEventArgs, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadChartTheme } from './theme-color';

/**
 * Sample for Chart Performance
 */
@Component({
    selector: 'control-content',
    templateUrl: 'chart-performance.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
})
export class PerformanceChartComponent {
    public dt1: number = 0;
    public primaryXAxis: Object = {
        intervalType: 'Years',
        valueType: 'DateTime',
        edgeLabelPlacement: 'Shift',
        title: 'Years',
        majorGridLines: { width: 0 }
    };
    public primaryYAxis: Object = {
        interval: 2000,
        minimum: 0,
        maximum: 12000,
        title: 'Values',
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 }
    };
    public title: string = "Chart with 100k points";
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    
    @ViewChild('chart')
    public chart: ChartComponent;
    public onChange(e: Event): void {
         
    }
    constructor() {
        //code
    };
    public width: string = Browser.isDevice ? '100%' : '75%';
    public onChartLoad(args: Object): void {
        let dt2: number;
        dt2 = new Date().getTime();
        if (this.dt1) {
            document.getElementById('performanceTime').innerHTML = (dt2 - this.dt1) + 'ms';
        }
        this.dt1 = 0;
    };
  // custom code start
   public load(args: ILoadedEventArgs): void {
        let selectedTheme: ChartTheme | string = loadChartTheme(args, true);
        let series1: Object[] = [];
        let point1: Object;
        let pts;
        let value = 0;
        for (pts = 0; pts < 100000; pts++) {
            if (pts % 3 == 0) {
                value -= (Math.random() * (100) / 3) * 4;
            }
            else if (pts % 2 == 0) {
                value += (Math.random() * (100) / 3) * 4;
            }
            if (value < 0) {
                value = value * -1;
            }
            if (value >= 12000) {
                value = Math.floor(Math.random() * 11000) + 1000;
            }
            point1 = { x: new Date(2005, 1, 1).setHours(pts), y: value };
            series1.push(point1);
        }
       this.chart.series[0].dataSource = series1;
       this.chart.series[0].xName = 'x';
       this.chart.series[0].yName = 'y';
       let themes : string[] = ['bootstrap5', 'bootstrap5dark', 'tailwind', 'tailwinddark', 'material', 'materialdark', 'bootstrap4', 'bootstrap', 'bootstrapdark', 'fabric', 'fabricdark', 'highcontrast', 'fluent', 'fluentdark', 'material3', 'material3dark', 'fluent2', 'fluent2highcontrast', 'fluent2dark', 'tailwind3', 'tailwind3dark'];
       let borderColor : string[] = ['#FD7E14', '#FD7E14', '#5A61F6', '#8B5CF6', '#00bdae', '#9ECB08', '#a16ee5', '#a16ee5', '#a16ee5', '#4472c4', '#4472c4', '#79ECE4', '#1AC9E6', '#1AC9E6', '#6355C7', '#4EAAFF', '#6200EE', '#9BB449', '#9BB449', '#2F4074', '#8029F1'];
       this.chart.series[0].border.color = borderColor[themes.indexOf(selectedTheme.toLowerCase())];
       this.chart.series[0].fill = 'url(#' + selectedTheme + '-gradient-chart)';
       this.chart.series[0].border = { width: 2, color: borderColor[themes.indexOf(args.chart.theme.toLowerCase())] }
    };
  // custom code end
}