import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { ChartComponent,ChartTheme, ILoadedEventArgs } from '@syncfusion/ej2-angular-charts';

/**
 * Sample for Chart Performance
 */
@Component({
    selector: 'control-content',
    templateUrl: 'chart-performance.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class PerformanceChartComponent {
    public dt1: number = 0;
    public primaryXAxis: Object = {
        majorGridLines: { color: 'transparent' }
    };

    @ViewChild('chart')
    public chart: ChartComponent;

    public onChange(e: Event): void {
        let series1: Object[] = [];
        let point1: Object;
        let value: number = 0;
        let i: number;
        for (i = 0; i < 100000; i++) {
            value += (Math.random() * 10 - 5);
            point1 = { x: i, y: value };
            series1.push(point1);
        }
        this.dt1 = new Date().getTime();
        this.chart.series[0].animation.enable = false;
        this.chart.series[0].dataSource = series1;
        this.chart.series[0].xName = 'x';
        this.chart.series[0].yName = 'y';
        this.chart.series[0].marker.visible = false;
        this.chart.refresh();
    }
    constructor() {
        //code
    };
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
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
  // custom code end
}