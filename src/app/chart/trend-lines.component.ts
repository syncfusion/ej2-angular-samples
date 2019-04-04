import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { ChartComponent, ILoadedEventArgs,ChartTheme, TrendlineTypes } from '@syncfusion/ej2-angular-charts';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { NumericTextBox } from '@syncfusion/ej2-inputs';
/**
 * Sample for trendlines
 */
@Component({
    selector: 'control-content',
    templateUrl: 'trend-lines.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class TrendLineChartComponent {

    public series1: Object[] = this.getData();
    public point1: Object;
    public getData(): Object[] {
        let pointCollection: Object[] = [];
        let point1: Object;
        let yValue: number[] = [7.66, 8.03, 8.41, 8.97, 8.77, 8.20, 8.16, 7.89, 8.68, 9.48, 10.11, 11.36, 12.34, 12.60, 12.95,
        13.91, 16.21, 17.50, 22.72, 28.14, 31.26, 31.39, 32.43, 35.52, 36.36,
        41.33, 43.12, 45.00, 47.23, 48.62, 46.60, 45.28, 44.01, 45.17, 41.20, 43.41, 48.32, 45.65, 46.61, 53.34, 58.53];
        let i: number; let j: number = 0;
        for (i = 1973; i <= 2013; i++) {
            point1 = { x: i, y: yValue[j] };
            pointCollection.push(point1);
            j++;
        }
        return pointCollection;
    }

    public powerData: Object[] = [
        { x: 1, y: 10 }, { x: 2, y: 50 }, { x: 3, y: 80 }, { x: 4, y: 110 },
        { x: 5, y: 180 }, { x: 6, y: 220 }, { x: 7, y: 300 }, { x: 8, y: 370 }, { x: 9, y: 490 }, { x: 10, y: 500 }
    ];

    @ViewChild('chart')
    public chart: ChartComponent;
    @ViewChild('forwardForecast')
    public forwardForecast: NumericTextBox;
    @ViewChild('backwardForecast')
    public backwardForecast: NumericTextBox;
    @ViewChild('polynomialOrder')
    public polynomialOrder: NumericTextBox;
    @ViewChild('period')
    public period: NumericTextBox;
    public checkForwardForecast(e: Event): void {
        this.chart.series[0].trendlines[0].forwardForecast = this.forwardForecast.value;
        this.chart.refresh();
    }
    public checkBackwardForecast(e: Event): void {
        this.chart.series[0].trendlines[0].backwardForecast = this.backwardForecast.value;
        this.chart.refresh();
    }
    public checkPolynomialOrder(e: Event): void {
        this.chart.series[0].trendlines[0].polynomialOrder = this.polynomialOrder.value;
        this.chart.refresh();
    }
    public checkPeriod(e: Event): void {
        this.chart.series[0].trendlines[0].period = this.period.value;
        this.chart.refresh();
    }
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        majorGridLines: { width : 0}, edgeLabelPlacement: 'Shift'
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
       title: 'Rupees against Dollars',
       interval: 10, lineStyle: {width: 0}, majorTickLines: { width: 0 }
    };
    public chartArea : Object = {
      border: { width : 0}
    };
    public tooltip: Object = {
        enable: true
    };
    public marker: object = {
        visible: false
    };
    public marker1: Object = {
        visible :true
    }
    public legendSettings: Object = { visible: false };
    public min: number = 1;
    public max: number = 20;
    public value: number = 0;
    public step: number = 1;
     // custom code start
     public load(args: ILoadedEventArgs): void {       
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
     // custom code end
    public title: string = 'Historical Indian Rupee Rate (INR USD)';
    public trendLineType: DropDownList;
    ngOnInit(): void {
        this.trendLineType = new DropDownList({
            index: 0,
            width: 120,
            change: () => {
                let type: string = this.trendLineType.value.toString();
                this.chart.series[0].dataSource = [];
                this.chart.series[0].trendlines[0].type = <TrendlineTypes>type;
                this.chart.series[0].trendlines[0].name = <TrendlineTypes>type;
                let forwardForecast: boolean; let backwardForecast: boolean; let polynomialOrder: boolean; let period: boolean;
                if (type !== 'Power') {
                    this.chart.series[0].dataSource = this.series1;
                    this.chart.series[0].name = 'Rupees';
                    this.chart.primaryXAxis.title = '';
                    this.chart.primaryYAxis.interval = 10;
                    this.chart.primaryYAxis.title = 'Rupees against Dollars';
                    this.chart.title = 'Historical Indian Rupee Rate (INR USD)';
                    if (type === 'MovingAverage') {
                        this.chart.series[0].trendlines[0].marker.visible = false; }
                } else {
                    this.chart.series[0].dataSource = this.powerData;
                    this.chart.series[0].name = 'Meters';
                    this.chart.primaryXAxis.title = 'Seconds';
                    this.chart.primaryYAxis.title = 'Meters';
                    this.chart.primaryYAxis.interval = 100;
                    this.chart.title = 'Distance Measurement';
                }
                if (type !== 'Polynomial' && type !== 'MovingAverage') {
                    period = polynomialOrder = false;
                    forwardForecast = backwardForecast = true;
                } else if (type === 'MovingAverage') {
                    period = true;
                    forwardForecast = backwardForecast = polynomialOrder = false;
                } else {
                    forwardForecast = backwardForecast = polynomialOrder = true;
                    period = false;
                }
                this.forwardForecast.enabled = forwardForecast;
                this.backwardForecast.enabled = backwardForecast;
                this.polynomialOrder.enabled = polynomialOrder;
                this.period.enabled = period;
                this.chart.refresh();
            }
        });
        this.trendLineType.appendTo('#trendLineType');
    }
    constructor() {
        //code
    };

}