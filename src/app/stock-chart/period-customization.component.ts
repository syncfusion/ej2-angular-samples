import { Component, ViewEncapsulation } from '@angular/core';
import { PeriodsModel, IStockChartEventArgs, ChartTheme, StockChartModule, ChartAllModule, RangeNavigatorAllModule } from '@syncfusion/ej2-angular-charts';
import { loadStockChartTheme } from './theme-color';

/**
 * Sample for default stockchart
 */
@Component({
    selector: 'control-content',
    templateUrl: 'period-customization.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ StockChartModule, ChartAllModule, RangeNavigatorAllModule]
})
export class PeriodCustomizationComponent {

    public series1: Object[] = [];
    public point1: Object;
    public value: number = 80;
    public i: number;

    public primaryXAxis: Object = {
        valueType: 'DateTime', majorGridLines: { color: 'transparent' },
        crosshairTooltip: { enable: true }
    };

    public primaryYAxis: Object = {
        lineStyle: { color: 'transparent' },
        majorTickLines: { color: 'transparent', height: 0 },
        crosshairTooltip: { enable: true }
    };
    public periods: PeriodsModel[] = [
        { intervalType: 'Minutes', interval: 1, text: '1m' },
        { intervalType: 'Minutes', interval: 30, text: '30m' },
        { intervalType: 'Hours', interval: 1, text: '1H' },
        { intervalType: 'Hours', interval: 12, text: '12H', selected: true },
        { intervalType: 'Auto', text: '1D' }
    ];
    public seriesType: string[] = [];
    public indicatorType: string[] = [];
    public trendlineType: string[] = [];
    public exportType: string[] = [];
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public title: string = 'AAPL stock price by minutes';
    public crosshair: Object = {
        enable: true,
        lineType: 'Both' 
    };
    public load(args: IStockChartEventArgs): void {
        loadStockChartTheme(args);
    };
    constructor() {
        for (this.i = 1; this.i < 1440; this.i++) {
            if (Math.random() > .5) {
                this.value += Math.random();
            } else {
                this.value -= Math.random();
            }
            this.point1 = { x: new Date(2000, 1, 1, 0, this.i), y: this.value.toFixed(1) };
            this.series1.push(this.point1);
        }
    }
}