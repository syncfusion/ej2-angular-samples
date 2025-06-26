import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, IAxisRangeCalculatedEventArgs, LastValueLabel, ChartTheme, ChartAllModule, Series } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadChartTheme } from './theme-color';
/**
 * Sample for Spline Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'live-stock-data.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
})
export class LiveStockDataComponent implements OnDestroy {
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public width: string = Browser.isDevice ? '100%' : '90%';
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'DateTime', 
        interval: Browser.isDevice ? 8 : 4, 
        crosshairTooltip: { enable: true }, 
        edgeLabelPlacement: Browser.isDevice ? 'None' : 'Shift',
        majorGridLines: { width: 0 },
        labelIntersectAction: 'Hide'
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        interval: 20, 
        opposedPosition: true, 
        minimum: 120, 
        crosshairTooltip: { enable: true }, 
        lineStyle: { width: 0 },
        majorGridLines: { width: 1 }, 
        majorTickLines: { width: 0 }
    };
    public lastValueLabel: Object = { enable: true, background: 'red', dashArray: '3,2', lineWidth: 0.5, font: {size: '10px'} };
    public getData = (): { series: Candlestick[] } => {
        let value: number = 180;
        let series: Candlestick[] = [];
        let point: Candlestick;
        for (let i: number = 0; i < 30; i++) {
        value = 180 + (Math.random() * 25) * Math.sin(i * Math.PI / 8); // Adjust the function as needed
        value = Math.max(140, Math.min(260, value));
        if (value > 260) {
            value = 260;
        }
        if (value < 140) {
            value = 140;
        }
        value += Math.random() * 0.1;
            let open: number = value + Math.round(Math.random() * 18);
            let low: number = Math.min(value, open) - Math.round(Math.random() * 6);
            let high: number = Math.min(220, Math.max(value, open) + Math.round(Math.random() * 15));
            point = {
                x: new Date(2000, 5, 2, 2, 0, i),
                close: value,
                open: open,
                low: low,
                high: high
            };
            series.push(point);
        }
        return { series: series };
    };
    public data: Candlestick[] = this.getData().series;
    public updateVal: number = this.data.length;
    public incVal: number = 0;
    public pointAdded: boolean = false;
    private intervalId: any;
    public load(args: ILoadedEventArgs): void {
        loadChartTheme(args);
        let chart: this = this;
        this.clearInterval(); // Clear any existing interval
        this.intervalId = setInterval(function () {
            var container = document.getElementById('stock');
            if (container && container.id === args.chart.element.id) {
                let newData1: Candlestick[] = [];
                let value: number = 180;
                chart.pointAdded = true;
                for (let i: number = 0; i < (args.chart.series[0].dataSource as Object[]).length; i++) {
                    newData1.push(Object.assign({}, args.chart.series[0].dataSource[i]));
                }
                if (newData1.length > 0) {
                    const lastIndex: number = newData1.length - 1;
                    const previousClose: number = newData1[lastIndex].close;
                    newData1[lastIndex].close += (Math.random() < 0.5 ? 1 : -1) * Math.random() * 25;
                    newData1[lastIndex].close = Math.min(Math.min(Math.max(newData1[lastIndex].close, newData1[lastIndex].low + 5), newData1[lastIndex].high - 5), newData1[lastIndex].open - 2);
                    if (previousClose === newData1[lastIndex].close) {
                        newData1[lastIndex].close -= 5;
                    }
                }
                if (chart.incVal < 10) {
                    if (args.chart.series.length > 0) {
                        args.chart.series[0].setData(newData1);
                        chart.incVal++;
                    }
                }
                else {
                    let change: number = (Math.random() < 0.49 ? 1 : -1) * Math.random() * 10;
                    value += change;
                    if (value > 260) {
                        value = 260;
                    }
                    if (value < 140) {
                        value = 140;
                    }
                    value += Math.random() * 0.1;
                    let open: number = value + Math.round(Math.random() * 12);
                    let low: number = Math.min(value, open) - Math.round(Math.random() * 8);
                    let high: number = Math.max(value, open) + Math.round(Math.random() * 15);
                    if (args.chart.series.length > 0) {
                        var lastDataPointIndex = (args.chart.series[0].dataSource as []).length - 1;
                        if (lastDataPointIndex >= 0) {
                            var timestamp = args.chart.series[0].dataSource[lastDataPointIndex].x;
                            var lastTimestamp = new Date(timestamp).getTime();
                            args.chart.series[0].addPoint({ x: new Date(lastTimestamp + 1000), high: high, low: low, open: open, close: value });
                        }
                    }
                    chart.incVal = 0;
                    chart.updateVal++;
                }
            } else {
                this.clearInterval();
            }
        }, 1000);
    };

    private clearInterval(): void {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
 
    public axisRangeCalculated (args: IAxisRangeCalculatedEventArgs): void {
        if (args.axis.name === 'primaryXAxis') {
            let lastPoint: Object = args.axis.series[0].points[args.axis.series[0].points.length - 1].x;
            args.maximum = new Date(Number(lastPoint)).getTime() + 2500;
            let firstPoint: Object = args.axis.series[0].points[0].x;
            args.minimum = new Date(Number(firstPoint)).getTime() + 500;
        }
    }
    public pointRender (args): void {
        args.series.lastValueLabel.background = args.fill;
    };
    public title: string = 'AAPL Historical';
    public crosshair: Object = { enable: true, dashArray: '5,5' };
    constructor() {
        //code
    };
    ngOnDestroy(): void {
        this.clearInterval();
    }
}
interface Candlestick {
    open: number;
    close: number;
    high: number;
    low: number;
    x: Date;
}