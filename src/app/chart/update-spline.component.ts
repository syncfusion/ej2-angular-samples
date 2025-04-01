import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, IAxisRangeCalculatedEventArgs, ChartTheme, ChartAllModule, Series } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadChartTheme } from './theme-color';
 
@Component({
    selector: 'control-content',
    templateUrl: 'update-spline.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
})
export class UpdateSplineComponent implements OnDestroy {
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public width: string = Browser.isDevice ? '100%' : '75%';
    public primaryXAxis: Object = {
        valueType: 'DateTime',
        edgeLabelPlacement: Browser.isDevice ? 'None' : 'Shift',
        labelRotation: Browser.isDevice ? 45 : 0,
        majorGridLines: { width: 0 },
        interval: 7,
        plotOffsetRight: 30,
        labelIntersectAction: 'Hide'
    };
    public primaryYAxis: Object = {
        title: 'Value',
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 }
    };
    public marker: Object = {
        visible: true,
        width: 7,
        height: 7,
        isFilled: true
    };
    public splineData = [
        { x: new Date(2024, 5, 6, 6, 7, 3), y: 42 },
        { x: new Date(2024, 5, 6, 6, 7, 5), y: 52 },
        { x: new Date(2024, 5, 6, 6, 7, 7), y: 83 },
        { x: new Date(2024, 5, 6, 6, 7, 9), y: 75 },
        { x: new Date(2024, 5, 6, 6, 7, 11), y: 35 },
        { x: new Date(2024, 5, 6, 6, 7, 13), y: 85 },
        { x: new Date(2024, 5, 6, 6, 7, 15), y: 78 },
        { x: new Date(2024, 5, 6, 6, 7, 17), y: 29 },
        { x: new Date(2024, 5, 6, 6, 7, 19), y: 62 },
        { x: new Date(2024, 5, 6, 6, 7, 21), y: 95 },
        { x: new Date(2024, 5, 6, 6, 7, 23), y: 32 },
        { x: new Date(2024, 5, 6, 6, 7, 25), y: 76 },
        { x: new Date(2024, 5, 6, 6, 7, 27), y: 83 },
        { x: new Date(2024, 5, 6, 6, 7, 29), y: 53 },
        { x: new Date(2024, 5, 6, 6, 7, 31), y: 32 },
        { x: new Date(2024, 5, 6, 6, 7, 33), y: 75 },
    ];
    public data: Object[];
    public title: string = 'Live data';
    private intervalId: any;
 
    constructor() {
    }
 
    ngOnDestroy(): void {
        this.clearInterval();
    }
 
    public load(args: ILoadedEventArgs): void {
        loadChartTheme(args);
 
        this.startInterval(args.chart);
    }
 
    public axisRangeCalculated(args: IAxisRangeCalculatedEventArgs): void {
        if (args.axis.name === 'primaryXAxis') {
            let lastPoint: Object = args.axis.series[0].points[args.axis.series[0].points.length - 1].x;
            args.maximum = new Date(Number(lastPoint)).getTime() + 500;
        }
    }
 
    private startInterval(chart: any): void {
        this.clearInterval(); // Clear any existing interval
        this.intervalId = setInterval(() => {
            if (document.getElementById('spline')) {
                if (chart && chart.series.length > 0 && chart.series[0].dataSource) {
                    var lastDataPointIndex = chart.series[0].dataSource.length - 1;
                    if (lastDataPointIndex >= 0) {
                        var timestamp = chart.series[0].dataSource[lastDataPointIndex].x;
                        var lastTimestamp = new Date(timestamp).getTime();
                        var x = new Date(lastTimestamp + 2000);
                        var y = 0;
                        if (x.getSeconds() % 3 === 0) {
                            y = Math.max(30, Math.random() * 150);
                        } else if (x.getSeconds() % 2 === 0) {
                            y = Math.max(30, Math.random() * 200);
                        } else {
                            y = Math.max(30, Math.random() * 100);
                        }
                        (chart.series[0]).addPoint({ x: x, y: y }, 800);
                        (chart.series[0]).removePoint(0, 800);
                    }
                }
            } else {
                this.clearInterval();
            }
        }, 1000);
    }
 
    private clearInterval(): void {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
 
}