import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { HeatMap, Tooltip, ILoadedEventArgs, HeatMapTheme, ISelectedEventArgs, SelectedCellDetails, SeriesModel, HeatMapComponent, HeatMapModule } from '@syncfusion/ej2-angular-heatmap';
import { ChartTheme, Chart, ChartComponent, ColumnSeries, Category, Legend, DataLabel, Tooltip as chartTooltip, ILoadedEventArgs as IChartLoadedEventsArgs, SeriesMarkerBorderModel, ChartModule } from '@syncfusion/ej2-angular-charts';
import { SampleDataSource } from './cell-seletion-data';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
HeatMap.Inject(Tooltip);
Chart.Inject(ColumnSeries, DataLabel, Category, Legend, chartTooltip);

@Component({
    selector: 'control-content',
    templateUrl: 'cell-selection.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [HeatMapModule, ChartModule, ButtonModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class HeatmapCellSelectionComponent {
    @ViewChild('heatmap')
    public heatmap: HeatMapComponent;
    @ViewChild('chart')
    public chart: ChartComponent;
    titleSettings: Object = {
        text:'Top export products 2014-2018, Value in USD million',
        textStyle: {
            fontFamily: 'inherit'
        }
    };
    allowSelection : boolean = true;
    dataSource: Object = new SampleDataSource().cellSeletionData;
    xAxis: Object = {
        labels: ['Cereals', 'Meat', 'Spices', 'Tea', 'Edible Oil', 'Dairy Products', 'Wheat'],
        textStyle: {
            fontFamily: 'inherit'
        }
    };
    yAxis: Object = {
        labels:['2014','2015','2016','2017','2018'],
        textStyle: {
            fontFamily: 'inherit'
        }
    };
    paletteSettings: Object = {
        palette: [
            {color: '#3C5E62 '},
            {color: '#86C843 '}
        ],
    };
    cellSettings: Object = {
        textStyle: {
            fontFamily: 'inherit'
        }
    };
    tooltipSettings: Object = {
        textStyle: {
            fontFamily: 'inherit'
        }
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
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.heatmap.theme = <HeatMapTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-high/i, 'High').replace(/5.3/i, '5');
        // custom code end
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
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-high/i, 'High').replace(/5.3/i, '5');
        // custom code end
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