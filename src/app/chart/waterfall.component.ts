import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ITextRenderEventArgs, IAxisLabelRenderEventArgs, ChartTheme } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
/**
 * Sample for Waterfall Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'waterfall.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class WaterfallChartComponent {

    public dataSource: Object[] = [
        { x: 'Income', y: 4711 }, { x: 'Sales', y: -1015 },
        { x: 'Development', y: -688 },
        { x: 'Revenue', y: 1030 }, { x: 'Balance' },
        { x: 'Expense', y: -361 }, { x: 'Tax', y: -695 },
        { x: 'Net Profit' }
    ];

    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Category',
        majorGridLines: { width: 0 },
        plotOffset: 20
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        minimum: 0, maximum: 5000, interval: 1000,
        majorGridLines: { width: 0 },
        title: 'Expenditure',
    };
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public width: string = Browser.isDevice ? '100%' : '80%';

    public title: string = 'Company Revenue and Profit';
    public tooltip: Object = {
        enable: true
    };
    public legendSettings: Object = {
        visible: false
    };
    public marker: Object = {
        dataLabel: { visible: true, font: { color: '#ffffff' } }
    };
    public connector: Object = {
        color: '#5F6A6A', width: 1.5
    };
    public sum: number[] = [7];
    public intermediate: number[] = [4];
    public columnWidth: number = 0.9;
    public textRender(args: ITextRenderEventArgs): void {
        let value: number = Number(args.text) / 1000;
        value = Math.round((value * 100)) / 100;
        args.text = value.toString();
    };
     // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
     // custom code end
    public axisLabelRender(args: IAxisLabelRenderEventArgs): void {
        if (args.axis.name === 'primaryYAxis') {
            args.text = '$' + Number(args.text) / 1000 + 'B';
        }
    };
    constructor() {
        //code
    };

}