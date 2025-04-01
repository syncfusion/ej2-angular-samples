import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ILoadedEventArgs, ChartComponent, ChartTheme, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { ChartDataService } from './chart-data.service';
import { ChartSeriesType } from '@syncfusion/ej2-charts';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadChartTheme } from './theme-color';

/**
 * Sample for Polar series with drawType Spline
 */
@Component({
    selector: 'control-content',
    templateUrl: 'polar-spline.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
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
    public legend: Object = {
        enableHighlight : true
    };
    public title: string = 'Microphone Types Polar Patterns';
    public tooltip: Object = {
        enable: true,
        enableHighlight: true
    };
    public closed: boolean = false;
      // custom code start
    public load(args: ILoadedEventArgs): void {
        loadChartTheme(args);
    };
      // custom code end
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
                this.chart.series[0].animation.enable = false;
                this.chart.series[1].animation.enable = false;
                this.chart.series[2].animation.enable = false;
                this.chart.refresh();
            }
        });
        this.seriesType.appendTo('#selmode');
    }
    constructor() {
        //code
    };

}