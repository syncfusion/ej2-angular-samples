import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { HeatMap, Tooltip, ILoadedEventArgs, HeatMapTheme, ISelectedEventArgs, SelectedCellDetails, SeriesModel, HeatMapComponent } from '@syncfusion/ej2-angular-heatmap';
import { ChartTheme, Chart, ChartComponent, ColumnSeries, Category, Legend, DataLabel, Tooltip as chartTooltip, ILoadedEventArgs as IChartLoadedEventsArgs, SeriesMarkerBorderModel } from '@syncfusion/ej2-angular-charts';
import { SampleDataSource } from './data';
HeatMap.Inject(Tooltip);
Chart.Inject(ColumnSeries, DataLabel, Category, Legend, chartTooltip);

/**
 * HeatMap default sample
 */
@Component({
    selector: 'control-content',
    templateUrl: 'cell-selection.html',
    encapsulation: ViewEncapsulation.None
})
export class HeatmapCellSelectionComponent {
    @ViewChild('heatmap')
    public heatmap: HeatMapComponent;
    @ViewChild('chart')
    public chart: ChartComponent;
    titleSettings: Object = {
        text:'Top export products 2014-2018, Value in USD million'
    };
    allowSelection : boolean = true;
    dataSource: Object = new SampleDataSource().cellSeletionData;
    xAxis: Object = {
        labels: ['Cereals', 'Meat', 'Spices', 'Tea', 'Edible Oil', 'Dairy Products', 'Wheat']
    };
    yAxis: Object = {
        labels:['2014','2015','2016','2017','2018']
    };
    paletteSettings: Object = {
        palette: [
            {color: '#3C5E62 '},
            {color: '#86C843 '}
        ],
    };
    legendSettings: Object = {
        visible: false
    };
    primaryXAxis: Object = {
        valueType: 'Category', interval: 1, majorGridLines: { width: 0 }
    };
    chartArea: Object = { border: { width: 0 } };
    primaryYAxis: object =
    {
        majorGridLines: { width: 0 },
        majorTickLines: { width: 0 }, lineStyle: { width: 0 }, labelStyle: { color: 'transparent' }
    };
    series: Object = new SampleDataSource().chartData;
    tooltip: Object = {
        enable: true
    };
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.heatmap.theme = <HeatMapTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    };
    public cellSelected(args: ISelectedEventArgs): void {
        let data: SelectedCellDetails[]  = args.data
            let length : number = data.length;
            let xAxis : string[] = [];
            let flag : boolean[] = []
            let series: any = [];
             for (let i: number = 0; i < length; i++) {
                 if (xAxis.indexOf(data[i].xLabel) === -1) {
                     xAxis.push(data[i].xLabel);
                     flag.push(false);
                 }
             }
             for (var i: number = 0; i < length; i++) {
                 var index = xAxis.indexOf(data[i].xLabel);
                 if (!flag[index]) {
                     flag[index] = true;
                     var column: any = {};
                     column.type = 'Column';
                     column.xName = 'x';
                     column.yName = 'y';
                     column.width = 2;
                     column.name = data[i].xLabel;
                     column.marker = { dataLabel: { visible: false } };
                     column.dataSource = [];
                     var columnData: any = {};
                     columnData.x = data[i].yLabel;
                     columnData.y = data[i].value;
                     column.dataSource.push(columnData);
                     series.push(column);
                 }
                 else {
                     var columnData: any = {};
                     columnData.x = data[i].yLabel;
                     columnData.y = data[i].value;
                     series[index].dataSource.push(columnData);
                 }
             }
             this.chart.series = series;
             this.chart.refresh();
    };
    public chartLoad(args: IChartLoadedEventsArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    };
    public onSubmit(): void {
        this.heatmap.clearSelection();
        this.chart.series = (new SampleDataSource().chartData) as [SeriesModel];
        this.chart.refresh();
    };
    constructor() {
        //code
    };
}