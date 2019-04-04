import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, Series, ChartTheme } from '@syncfusion/ej2-angular-charts';
import { getElement } from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';

/**
 * Sample for vertical chart
 */
@Component({
    selector: 'control-content',
    templateUrl: 'vertical.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class VerticalChartComponent {
    public clrInterval: number;

    public data1: Object[] = [{x: 0, y: 0}];

    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        title: 'Time (s)', majorGridLines: { width: 0 } 
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        title: 'Velocity (m/s)', majorGridLines: { width: 0 }, minimum: -15, maximum: 15, interval: 5
    };
    public marker: Object = {
        visible: false
    };
    public animation1: Object = {
        enable: false
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
    }
     // custom code end
    public vertical: boolean = true;
    public count: number = 0;
    public loaded(args: ILoadedEventArgs): void {
        this.clrInterval =
            setInterval(() => {
                args.chart.series[0].dataSource = this.liveData(args.chart.series[0].dataSource as any[], <Series>args.chart.series[0]);
                args.chart.refresh();
            },
      // tslint:disable-next-line:align
      100);
    }

    public liveData(data: any[], series: Series): any[] {
        this.count = this.count + 1;
        let newData: any[] = data;
        if (this.count > 350 || getElement('chart-vertical') === null) {
            clearInterval(this.clrInterval);
        } else if (this.count > 300) {
            newData.push({ x: this.getXValue(data), y: this.getYValue(0, 0) });
        } else if (this.count > 250) {
            newData.push({ x: this.getXValue(data), y: this.getYValue(-2, 1) });
        } else if (this.count > 180) {
            newData.push({ x: this.getXValue(data), y: this.getYValue(-3, 2) });
        } else if (this.count > 100) {
            newData.push({ x: this.getXValue(data), y: this.getYValue(-7, 6) });
        } else if (this.count < 50) {
            newData.push({ x: this.getXValue(data), y: this.getYValue(-3, 3) });
        } else {
            newData.push({ x: this.getXValue(data), y: this.getYValue(-9, 9) });
        }
        return newData;
    }
    public getXValue(data: any[]): number {
        return data.length;
    }

    public getYValue(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }
    public title: string = 'Indonesia - Seismograph Analysis';
    constructor() {
        //code
     };

}