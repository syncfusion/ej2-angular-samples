import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ILoadedEventArgs, ChartComponent, ChartTheme } from '@syncfusion/ej2-angular-charts';
import { ChartSeriesType } from '@syncfusion/ej2-charts';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Browser } from '@syncfusion/ej2-base';

/**
 * Sample for Polar series with drawType Column
 */
@Component({
    selector: 'control-content',
    templateUrl: 'polar-column.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class PolarColumnChartComponent {

    public data: Object[] = [
        //{text: 'China', 	  x: 'CHN', 	  	y: 1246.3, y1: 1341, y2: 448.3},
        //{text: 'India', 		x: 'IND', 		y: 893.3, y1: 1237, y2: 41.95},
        { text: 'Japan', x: 'JPN', y: 137.9, y1: 127.6, y2: 108.8 },
        //{text: 'USA', 			x: 'USA', 			y: 345.2, y1: 313.9, y2: 287.4},
        { text: 'Indonesia', x: 'IDN', y: 85.0, y1: 246.9, y2: 45.5 },
        //{text: 'Brazil', 		x: 'IDN', 		y: 272.6, y1: 137.2, y2: 110.2 },
        { text: 'Russia', x: 'RUS', y: 237.1, y1: 143.5, y2: 41.2 },
        { text: 'Vietnam', x: 'VNM', y: 127.7, y1: 88.8, y2: 18.0 },
        { text: 'Pakistan', x: 'PAK', y: 126.1, y1: 179.2, y2: null },
        { text: 'Nigeria', x: 'NGA', y: 175.0, y1: 168.8, y2: 12.7 },
        { text: 'Germany', x: 'DEU', y: 113.6, y1: 81.9, y2: 46.0 },
        { text: 'Bangladesh', x: 'BGS', y: 116.0, y1: 154.7, y2: 34.6 },
        { text: 'Philippines', x: 'PHL', y: 109.5, y1: 96.7, y2: 16.6 },
        { text: 'Mexico', x: 'MEX', y: 102.7, y1: 120.8, y2: 19.8 }
    ];
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Category',
        labelPlacement: 'OnTicks',
        coefficient: Browser.isDevice ? 80 : 100,
        interval : 1
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
     labelFormat: '{value}M'
    };
    public  marker: Object = { dataLabel: { name: 'text' } };
      // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");

    };
      // custom code end
    public border: Object = {
        width: 1, color: 'white'
    };
    public tooltip: Object = {
        enable: true, format: '${point.text} : <b>${point.y}%</b>'
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