import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ILoadedEventArgs, ChartComponent, ChartTheme } from '@syncfusion/ej2-ng-charts';
import { ChartSeriesType } from '@syncfusion/ej2-charts';
import { DropDownList } from '@syncfusion/ej2-dropdowns';

/**
 * Area Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'polar-column.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class PolarColumnChartComponent {

    public data: Object[] = [
        //  {x: 'China', y: 1246.3, y1: 1341, y2: 448.3},
        //  {x: 'India', y: 893.3, y1: 1237, y2: 41.95},
        {x: 'Japan', y: 137.9, y1: 127.6, y2: 108.8},
        // {x: 'US', y: 345.2, y1: 313.9, y2: 287.4},
          {x: 'Indonesia', y: 85.0, y1: 246.9, y2: 45.5},
       //   {x: 'Brazil', y: 272.6, y1: 137.2, y2: 110.2 },
          {x: 'Russia', y: 237.1, y1: 143.5, y2: 41.2},
          {x: 'Vietnam', y: 127.7, y1: 88.8, y2: 18.0},
          {x: 'Pakistan', y: 126.1, y1: 179.2, y2: null},
          {x: 'Nigeria', y: 175.0, y1: 168.8, y2: 12.7},
          {x: 'Germany', y: 113.6, y1: 81.9, y2: 46.0},
          {x: 'Bangladesh', y: 116.0, y1: 154.7, y2: 34.6},
          {x: 'Philippines', y: 109.5, y1: 96.7, y2: 16.6},
          {x: 'Mexico', y: 102.7, y1: 120.8, y2: 19.8}
    ];
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Category',
        labelPlacement: 'OnTicks'
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        maximum: 250, interval: 50, minimum: 0, labelFormat: '{value}M'
    };
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));

    };
    public border: Object = {
        width: 1, color: 'white'
    };
    public tooltip: Object = {
        enable: true, format: '${series.name}<br>${point.x} : ${point.y}'
    };
    public title: string = 'Top 10 Mobile Markets by Number of Subscriptions';
    @ViewChild('chart')
    public chart: ChartComponent;
    public seriesType: DropDownList;
    ngOnInit(): void {
        this.seriesType = new DropDownList({
            index: 0,
            width: 80,
            change: () => {
                let type: string = this.seriesType.value.toString();
                this.chart.series[0].type = <ChartSeriesType>type;
                this.chart.series[1].type = <ChartSeriesType>type;
                this.chart.series[2].type = <ChartSeriesType>type;
                this.chart.refresh();
            }
        });
        this.seriesType.appendTo('#selmode');
    }
    constructor() {
        // code
     };
}