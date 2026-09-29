import { Component, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import {
    IStockChartEventArgs,
    StockChartComponent,
    StockChartModule,
    ChartAllModule,
    RangeNavigatorAllModule,
    DateTimeService,
    CandleSeriesService,
    LastValueLabelService,
    ExportService
} from '@syncfusion/ej2-angular-charts';
import { loadStockChartTheme } from './theme-color';

const ONE_MINUTE_MS: number = 60 * 1000;
const UPDATE_INTERVAL_MS: number = 100;
const UPDATES_PER_CANDLE: number = 10;
const UPDATE_ANIMATION_DURATION: number = 0;
const ADD_ANIMATION_DURATION: number = 100;
const PRICE_MOVEMENT_MULTIPLIER: number = 2;
const INITIAL_CANDLE_COUNT: number = 120;
const INITIAL_PRICE: number = 375;

@Component({
    selector: 'control-content',
    templateUrl: 'live-candlestick.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    providers: [
        DateTimeService,
        CandleSeriesService,
        LastValueLabelService,
        ExportService
    ],
    imports: [StockChartModule, ChartAllModule, RangeNavigatorAllModule]
})
export class LiveCandlestickComponent implements OnDestroy {

    @ViewChild('stockChart')
    public stockChart: StockChartComponent;

    public stockData: object[] = [];

    public title: string = 'Real-Time Stock Market Data';
    public chartArea: Object = { border: { width: 0 } };
    public primaryXAxis: Object = {
        valueType: 'DateTime',
        intervalType: 'Auto',
        labelFormat: 'HH:mm',
        lineStyle: { color: 'transparent' },
        crosshairTooltip: { enable: false }
    };
    public primaryYAxis: Object = {
        labelPosition: 'Outside',
        lineStyle: { color: 'transparent' },
        majorTickLines: { color: 'transparent', height: 0 },
        crosshairTooltip: { enable: false }
    };
    public crosshair: Object = { enable: false };
    public tooltip: Object = { enable: false };
    public seriesType: string[] = [];
    public indicatorType: string[] = [];
    public trendlineType: string[] = [];
    public periods: Object[] = [
        { text: '15m', interval: 15, intervalType: 'Minutes' },
        { text: '1h', interval: 1, intervalType: 'Hours', selected: true },
        { text: 'All' }
    ];
    public enableCustomRange: boolean = false;
    public lastValueLabel: Object = {
        enable: true,
        background: '#FF7F7F',
        dashArray: '3,2',
        lineWidth: 0.5,
        font: { color: '#ffffff', size: '11px' }
    };
    public bullFillColor: string = '#90EE90';
    public bearFillColor: string = '#FF7F7F';
    public enableSolidCandles: boolean = true;
    public seriesBorder: Object = { width: 1 };
    public seriesAnimation: Object = { enable: false };

    public connectionMessage: string = 'Local data ready';
    public connectionClass: string = 'connection-status connected';
    public candleStatus: string = 'Local data loaded';
    public openValue: string = '—';
    public highValue: string = '—';
    public lowValue: string = '—';
    public closeValue: string = '—';
    public volumeValue: string = '—';

    private updateTimer: number | null = null;
    private updateIndex: number = 0;
    private isPageClosing: boolean = false;
    private updateInstanceId: number = 0;

    constructor() {
        this.createInitialLocalData();
        this.updateMarketValues(
            this.stockData.length ? this.stockData[this.stockData.length - 1] : null,
            this.stockData.length ? 'Local data loaded' : 'No local data available'
        );
    }

    public load(args: IStockChartEventArgs): void {
        loadStockChartTheme(args);
    }

    public loaded(): void {
        if (this.isPageClosing) {
            return;
        }

        this.startDynamicUpdates();
    }

    private formatPrice(value: number): string {
        if (!isFinite(value)) {
            return '—';
        }

        return Number(value).toFixed(2);
    }

    private formatVolume(value: number): string {
        if (!isFinite(value)) {
            return '—';
        }

        return Number(value).toFixed(4);
    }

    private updateMarketValues(candle: any, status: string): void {
        if (!candle || this.isPageClosing) {
            return;
        }

        this.openValue = this.formatPrice(candle.open);
        this.highValue = this.formatPrice(candle.high);
        this.lowValue = this.formatPrice(candle.low);
        this.closeValue = this.formatPrice(candle.close);
        this.volumeValue = this.formatVolume(candle.volume);
        this.candleStatus = status;
    }

    private correctFloat(value: number): number {
        return Number(value.toFixed(4));
    }

    private randomBetween(minimum: number, maximum: number): number {
        return minimum + Math.random() * (maximum - minimum);
    }

    private getCurrentMinute(): number {
        return Math.floor(Date.now() / ONE_MINUTE_MS) * ONE_MINUTE_MS;
    }

    private createHistoricalCandle(timestamp: number, openingPrice: number): object {
        const movement: number = this.randomBetween(-1.5, 1.5);
        const close: number = this.correctFloat(Math.max(1, openingPrice + movement));
        const high: number = this.correctFloat(Math.max(openingPrice, close) + this.randomBetween(0.05, 0.7));
        const low: number = this.correctFloat(Math.max(1, Math.min(openingPrice, close) - this.randomBetween(0.05, 0.7)));

        return {
            x: new Date(timestamp),
            open: this.correctFloat(openingPrice),
            high: high,
            low: low,
            close: close,
            volume: this.correctFloat(this.randomBetween(1, 30))
        };
    }

    private createInitialLocalData(): void {
        const currentMinute: number = this.getCurrentMinute();
        const startingTime: number = currentMinute - (INITIAL_CANDLE_COUNT - 1) * ONE_MINUTE_MS;
        let price: number = INITIAL_PRICE;

        this.stockData = [];

        for (let index: number = 0; index < INITIAL_CANDLE_COUNT; index++) {
            const timestamp: number = startingTime + index * ONE_MINUTE_MS;
            const candle: object = this.createHistoricalCandle(timestamp, price);

            this.stockData.push(candle);
            price = (candle as any).close;
        }
    }

    private isChartAvailable(): boolean {
        const stockChart: any = this.stockChart;

        if (this.isPageClosing || !stockChart || stockChart.isDestroyed) {
            return false;
        }

        const element: HTMLElement | null = document.getElementById('liveCandlestickChart');

        if (!element || !element.isConnected) {
            return false;
        }

        const innerChart: any = stockChart.chart;

        return !!innerChart && !innerChart.isDestroyed && !!innerChart.element && innerChart.element.isConnected;
    }

    private getCandleSeries(): any {
        if (!this.isChartAvailable()) {
            return null;
        }

        try {
            const chart: any = this.stockChart;
            const innerChart: any = chart.chart;
            const stockSeries: any = chart.series && chart.series.length ? chart.series[0] : null;

            if (
                stockSeries &&
                stockSeries.chart &&
                !stockSeries.chart.isDestroyed &&
                typeof stockSeries.setData === 'function' &&
                typeof stockSeries.addPoint === 'function'
            ) {
                return stockSeries;
            }

            const innerSeries: any = innerChart.series && innerChart.series.length ? innerChart.series[0] : null;

            if (
                innerSeries &&
                innerSeries.chart &&
                !innerSeries.chart.isDestroyed &&
                typeof innerSeries.setData === 'function' &&
                typeof innerSeries.addPoint === 'function'
            ) {
                return innerSeries;
            }
        } catch (error) {
            return null;
        }

        return null;
    }

    private createUpdatedCandle(currentCandle: any): object {
        const movement: number = this.correctFloat((Math.random() - 0.5) * PRICE_MOVEMENT_MULTIPLIER);
        const newClose: number = this.correctFloat(Math.max(1, currentCandle.close + movement));

        return {
            x: currentCandle.x,
            open: currentCandle.open,
            high: this.correctFloat(Math.max(currentCandle.high, newClose)),
            low: this.correctFloat(Math.min(currentCandle.low, newClose)),
            close: newClose,
            volume: this.correctFloat(currentCandle.volume + this.randomBetween(0.01, 0.3))
        };
    }

    private createNewCandle(previousCandle: any): object {
        const openingPrice: number = previousCandle.close;

        return {
            x: new Date(previousCandle.x.getTime() + ONE_MINUTE_MS),
            open: openingPrice,
            high: openingPrice,
            low: openingPrice,
            close: openingPrice,
            volume: this.correctFloat(this.randomBetween(0.1, 1))
        };
    }

    /**
     * Same timestamp as the last candle -> setData replaces the last point.
     */
    private updateCurrentPoint(candle: object): boolean {
        const series: any = this.getCandleSeries();

        if (!series) {
            return false;
        }

        try {
            series.setData(candle, UPDATE_ANIMATION_DURATION);
            return true;
        } catch (error) {
            this.stopDynamicUpdates();
            return false;
        }
    }

    /**
     * New timestamp, one minute later -> addPoint appends a new candle.
     */
    private addNewPoint(candle: object): boolean {
        const series: any = this.getCandleSeries();

        if (!series) {
            return false;
        }

        try {
            series.addPoint(candle, ADD_ANIMATION_DURATION);
            return true;
        } catch (error) {
            this.stopDynamicUpdates();
            return false;
        }
    }

    private processDynamicUpdate(instanceId: number): void {
        if (instanceId !== this.updateInstanceId || this.isPageClosing) {
            return;
        }

        if (!this.isChartAvailable()) {
            this.stopDynamicUpdates();
            return;
        }

        if (!this.stockData.length || !this.getCandleSeries()) {
            return;
        }

        const lastIndex: number = this.stockData.length - 1;
        const currentCandle: any = this.stockData[lastIndex];
        const shouldAddNewCandle: boolean = this.updateIndex > 0 && this.updateIndex % UPDATES_PER_CANDLE === 0;

        if (shouldAddNewCandle) {
            const newCandle: object = this.createNewCandle(currentCandle);

            if (!this.addNewPoint(newCandle)) {
                return;
            }

            this.stockData.push(newCandle);
            this.updateMarketValues(newCandle as any, 'New simulated one-minute candle');
        } else {
            const updatedCandle: object = this.createUpdatedCandle(currentCandle);

            if (!this.updateCurrentPoint(updatedCandle)) {
                return;
            }

            this.stockData[lastIndex] = updatedCandle;
            this.updateMarketValues(updatedCandle as any, 'Current candle updated');
        }

        this.updateIndex++;
    }

    private startDynamicUpdates(): void {
        this.stopDynamicUpdates();

        if (this.isPageClosing || !this.getCandleSeries()) {
            return;
        }

        const instanceId: number = ++this.updateInstanceId;

        this.updateTimer = window.setInterval((): void => {
            this.processDynamicUpdate(instanceId);
        }, UPDATE_INTERVAL_MS);
    }

    private stopDynamicUpdates(): void {
        this.updateInstanceId++;

        if (this.updateTimer !== null) {
            window.clearInterval(this.updateTimer);
            this.updateTimer = null;
        }
    }

    public ngOnDestroy(): void {
        /*
         * Stop the timer before Angular destroys the StockChart child
         * component and clears the underlying Chart series references.
         */
        this.isPageClosing = true;
        this.stopDynamicUpdates();

        this.stockData = [];
        this.updateIndex = 0;
    }
}
