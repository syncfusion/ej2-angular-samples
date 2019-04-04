import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import {
    ILoadedEventArgs, IMouseEventArgs, ChartComponent, IAccLoadedEventArgs, AccumulationTheme,
    SelectionMode, ChartTheme, Series, IAccResizeEventArgs
} from '@syncfusion/ej2-angular-charts';
import {
    AccumulationChart, AccumulationDataLabel
} from '@syncfusion/ej2-charts';
AccumulationChart.Inject(AccumulationDataLabel);
import { Browser } from '@syncfusion/ej2-base';

/**
 * Sample for Annotation in chart
 */
@Component({
    selector: 'control-content',
    templateUrl: 'pie-annotation.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class AnnotationChartComponent {
    public pie: AccumulationChart;
    public render: boolean = false;
    @ViewChild('chart')
    public chart: ChartComponent;
    public legend: Object = {
        visible: true,
        toggleVisibility: false
    };
    //Initializing dataSource
    public dataSource: Object = [
        { x: '2014', y0: 51, y1: 77, y2: 66, y3: 34 }, { x: '2015', y0: 67, y1: 49, y2: 19, y3: 38 },
        { x: '2016', y0: 143, y1: 121, y2: 91, y3: 44 }, { x: '2017', y0: 19, y1: 28, y2: 65, y3: 51 },
        { x: '2018', y0: 30, y1: 66, y2: 32, y3: 61 }, { x: '2019', y0: 189, y1: 128, y2: 122, y3: 76 },
        { x: '2020', y0: 72, y1: 97, y2: 65, y3: 82 }
    ];
    public pieDataSource: Object[] = [
        { x: 'UK', y: 51, text: '22%' }, { x: 'Germany', y: 77, text: '34%' },
        { x: 'France', y: 66, text: '29%' }, { x: 'Italy', y: 34, text: '15%' }
    ];
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        title: 'Years',
        majorGridLines: { width: 0 }, minorGridLines: { width: 1 },
        minorTickLines: { width: 1 }, interval: 1,
        labelIntersectAction: 'Rotate45',
        valueType: 'Category'
    };
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public width: string = Browser.isDevice ? '100%' : '80%';
    // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
    // custom code end
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        title: 'Sales in Billions', lineStyle: { width: 0 },
        minimum: 0, maximum: 700, interval: 100,
        majorGridLines: { width: 1 }, minorGridLines: { width: 1 },
        majorTickLines: { width: 0 }, minorTickLines: { width: 0 }, labelFormat: '{value}B',
    };
    public getValue(series: Series[], pointIndex: number, y: number): string {
        let totalValue: number = 0;
        for (let ser of series) {
            totalValue += ser.points[pointIndex].y as number;
        }
        return (Math.round((y / totalValue) * 100)) + '%';
    };
    public title: string = 'Mobile Game Market by Country';
    public selectedDataIndexes: any[] = [{ series: 0, point: 0 }];
    public selectionMode: SelectionMode = 'Cluster';

    public chartMouseUp(args: IMouseEventArgs): void {
        if (args.target.indexOf('Point') > -1) {
            let pointIndex: number = parseInt(args.target[args.target.length - 1], 10);
            this.pieDataSource = [];
            for (let series of this.chart.visibleSeries) {
                let value: number = series.points[pointIndex].y as number;
                this.pieDataSource.push({
                    'x': series.name,
                    'y': value,
                    'text': this.getValue(this.chart.visibleSeries, pointIndex, value)
                });
            }
            this.pie.series[0].dataSource = this.pieDataSource;
            this.pie.series[0].xName = 'x';
            this.pie.series[0].yName = 'y';
            this.pie.refresh();
        }
    }

    public loaded(args: ILoadedEventArgs): void {
        if (this.render) {
            this.pie.destroy();
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            let theme: ChartTheme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
            this.pie = new AccumulationChart({
                background: 'transparent',
                series: [{
                    radius: '65%', animation: { enable: false },
                    dataSource: this.pieDataSource,
                    xName: 'x', yName: 'y', dataLabel: { visible: true, position: 'Inside', font: { color: 'white' }, name: 'text' },
                }],
                theme: theme,
                legendSettings: { visible: false }
            });
            this.pie.appendTo('#chart_annotation');
        }


    }
    public animationComplete(args: ILoadedEventArgs): void {
        this.render = true;
        this.pie = new AccumulationChart({
            background: 'transparent',
            series: [{
                radius: '65%', animation: { enable: false },
                dataSource: this.pieDataSource,
                xName: 'x', yName: 'y', dataLabel: { visible: true, position: 'Inside', name: 'text' },
            }],
            load: (args: IAccLoadedEventArgs) => {
                let selectedTheme: string = location.hash.split('/')[1];
                selectedTheme = selectedTheme ? selectedTheme : 'Material';
                args.accumulation.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
            },
            legendSettings: { visible: false },
            resized:  (args: IAccResizeEventArgs) => {
                location.reload();
            }
        });
        this.pie.appendTo('#chart_annotation');
    }
    constructor() {
        // code
    };
}