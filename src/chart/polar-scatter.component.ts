import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ILoadedEventArgs, ChartComponent, ChartTheme } from '@syncfusion/ej2-ng-charts';
import { ChartSeriesType } from '@syncfusion/ej2-charts';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
/**
 * Column Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'polar-scatter.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class PolarScatterChartComponent {

    public data: Object[] = [
        {x: 'Myanmar', y: 7.3, y1: 6.3, y2: 7.5},
        {x: 'India', y: 7.9, y1: 6.8, y2: 7.2},
        {x: 'Bangladesh', y: 6.8, y1: 6.9, y2: 6.9},
        {x: 'Cambodia', y: 7.0, y1: 7.0, y2: 6.9},
        {x: 'China', y: 6.9, y1: 6.7, y2: 6.6},
        {x: 'Bhutan', y: 6.1, y1: 6.2, y2: 5.9},
        {x: 'Iceland', y: 4.1, y1: 7.2, y2: 5.7},
        {x: 'Nepal', y: 2.7, y1: 0.6, y2: 5.5},
        {x: 'Pakistan', y: 4.0, y1: 4.7, y2: 5.0},
        {x: 'Poland', y: 3.9, y1: 2.7, y2: 3.4},
        {x: 'Australia', y: 2.4, y1: 2.5, y2: 3.1},
        {x: 'Korea', y: 2.8, y1: 2.8, y2: 2.7},
        {x: 'Singapore', y: 1.9, y1: 2.0, y2: 2.},
        {x: 'Canada', y: 0.9, y1: 1.4, y2: 1.9},
        {x: 'Germany', y: 1.5, y1: 1.8, y2: 1.6},
        {x: 'Denmark', y: 1.6, y1: 1.1, y2: 1.5},
        {x: 'France', y: 1.3, y1: 1.3, y2: 1.4},
        {x: 'Austria', y: 1.0, y1: 1.5, y2: 1.4},
    ];
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Category'
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        minimum: 0, maximum: 8, interval: 2
    };
    public marker: Object = { height: 10, width: 10 };
    public marker1: Object = { height: 10, width: 10, shape: 'Diamond' };
    public marker2: Object = { height: 10, width: 10, shape: 'Triangle' };
    public title: string = 'Real GDP Growth';
    public tooltip: Object = {
        enable: true,
        format: '${series.name}<br>${point.x} : ${point.y}'
    };
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));

    };
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
        //code
    };

}