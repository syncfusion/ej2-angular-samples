import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ILoadedEventArgs, ChartComponent, ChartTheme } from '@syncfusion/ej2-ng-charts';
import { ChartDataService } from './chartdata.service';
import { ChartSeriesType } from '@syncfusion/ej2-charts';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Browser } from '@syncfusion/ej2-base';

/**
 * Column Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'polar-spline.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class PolarSplineChartComponent {

    public series1: Object = ChartDataService.prototype.GetPolarSplineData().series1;
    public series2: Object = ChartDataService.prototype.GetPolarSplineData().series2;
    public series3: Object = ChartDataService.prototype.GetPolarSplineData().series3;
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        minimum: -180,
        maximum: 180,
        interval: 30,
        labelFormat: '{value}°',
        coefficient: Browser.isDevice ? 80 : 100
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        minimum: -20,
        interval: 5,
        maximum: 0
    };
    public title: string = 'Microphone Types Polar Patterns';
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