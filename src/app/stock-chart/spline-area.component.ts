import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { IStockChartEventArgs, ChartTheme, StockChartModule, ChartAllModule, RangeNavigatorAllModule, ChartComponent } from '@syncfusion/ej2-angular-charts';
import { googl } from './stock-data';   
import { loadStockChartTheme, borderColor, themes } from './theme-color';
/**
 * Sample for Spline Area Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'spline-area.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ StockChartModule, ChartAllModule, RangeNavigatorAllModule]
})
export class SplineAreaComponent {

    public data1: Object[] = googl;

    public primaryXAxis: Object = {
        valueType: 'DateTime',  majorGridLines: { width: 0 }, crosshairTooltip: { enable: true }
    };

    public primaryYAxis: Object = {
        lineStyle: { width: 0 },
        majorTickLines: { height: 0 }, crosshairTooltip: { enable: true }
    };

    @ViewChild('stockChart')
    public chart: ChartComponent;

    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public title: string = 'Google Stock Price';
    public titleStyle: object = { color: 'black ' };
    public tooltip: object = {
        enable: true,
        format: '<b>${point.x}</b> <br>Stock Price : <b>${point.y}</b>',
        header: '',
        enableMarker: false
    };

    public crosshair: object = {
        enable: true,
        lineType: 'Both',
        snapToData: true, dashArray: '5, 5'
    };
    public seriesType: string[] = [];
    public indicatorType: string[] = [];
    public enable: boolean = true;
    public load(args: IStockChartEventArgs): void {
        let selectedTheme: string = loadStockChartTheme(args);        
        this.chart.series[0].border.color = borderColor[themes.indexOf(args.stockChart.theme.toLowerCase())];
        this.chart.series[0].fill = 'url(#' + selectedTheme.toLowerCase() + '-gradient-chart)';
        this.chart.series[0].border = { width: 2, color: borderColor[themes.indexOf(args.stockChart.theme.toLowerCase())] }
    };
    constructor() {
        //code
    }
}
