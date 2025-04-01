import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ILoadedEventArgs, ChartComponent, ChartTheme, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { ChartSeriesType } from '@syncfusion/ej2-charts';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadChartTheme } from './theme-color';

/**
 * Sample for Polar series with drawType Line
 */
@Component({
    selector: 'control-content',
    templateUrl: 'polar-line.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
})
export class PolarLineChartComponent {

    public data: Object[] = [
        { x: 'Jan', y: -7.1 }, { x: 'Feb', y: -3.7 },
        { x: 'Mar', y: 0.8 }, { x: 'Apr', y: 6.3 },
        { x: 'May', y: 13.3 }, { x: 'Jun', y: 18.0 },
        { x: 'Jul', y: 19.8 }, { x: 'Aug', y: 18.1 },
        { x: 'Sep', y: 13.1 }, { x: 'Oct', y: 4.1 },
        { x: 'Nov', y: -3.8 }, { x: 'Dec', y: -6.8 },
    ];
    public data1: Object[] = [
        { x: 'Jan', y: -17.4 }, { x: 'Feb', y: -15.6 },
        { x: 'Mar', y: -12.3 }, { x: 'Apr', y: -5.3 },
        { x: 'May', y: 1.0 }, { x: 'Jun', y: 6.9 },
        { x: 'Jul', y: 9.4 }, { x: 'Aug', y: 7.6 },
        { x: 'Sep', y: 2.6 }, { x: 'Oct', y: -4.9 },
        { x: 'Nov', y: -13.4 }, { x: 'Dec', y: -16.4 },
    ];
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        title: 'Months',
        valueType: 'Category',
        labelPlacement: 'OnTicks',
        interval: 1,
        coefficient: Browser.isDevice ? 80 : 100

    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        title: 'Temperature (Celsius)',
        minimum: -25,
        maximum: 25,
        interval: 10,
        edgeLabelPlacement: 'Shift',
        labelFormat: '{value}°C'
    };
    public marker: Object = {
        visible: true,
        height: 7, width: 7,
        shape: 'Pentagon',
        isFilled: true
    };
    public legendSettings: Object = {
        visible: true,
        enableHighlight: true
    };
    public marker1: Object = {
        visible: true, height: 7, width: 7, shape: 'Diamond',
        isFilled: true
    };
      // custom code start
    public load(args: ILoadedEventArgs): void {
        loadChartTheme(args);
    };
      // custom code end
    public tooltip: Object = {
        enable: true,
        enableHighlight: true
    };
    public title: string = 'Alaska Weather Statistics - 2016';
    @ViewChild('chart')
    public chart: ChartComponent;
    public isClosed(e: Event): void {
        let element: HTMLInputElement = <HTMLInputElement>e.target;
        this.chart.series[0].isClosed = element.checked;
        this.chart.series[1].isClosed = element.checked;
        this.chart.series[0].animation.enable = false;
        this.chart.series[1].animation.enable = false;
        this.chart.refresh();
    }
    public isInversed(e: Event): void {
        let element: HTMLInputElement = <HTMLInputElement>e.target;
        this.chart.primaryXAxis.isInversed = element.checked;
        this.chart.primaryYAxis.isInversed = element.checked;
        this.chart.dataBind();
    }
    public startAngle(e: Event): void {
        let value: number = parseInt((<HTMLInputElement>e.target).value, 10);
        this.chart.primaryXAxis.startAngle = value;
        document.getElementById('st-lbl').innerHTML = 'Start Angle: ' + value;
        this.chart.animateSeries =  false;
        this.chart.series[0].animation.enable = false;
        this.chart.series[1].animation.enable = false;
        this.chart.refresh();
        this.chart.animateSeries =  true;
    }
    public seriesType: DropDownList;
    ngOnInit(): void {
        this.seriesType = new DropDownList({
            index: 0,
            width: 80,
            change: () => {
                let type: string = this.seriesType.value.toString();
                this.chart.series[0].type = <ChartSeriesType>type;
                this.chart.series[1].type = <ChartSeriesType>type;
                this.chart.series[0].animation.enable = false;
                this.chart.series[1].animation.enable = false;
                this.chart.refresh();
            }
        });
        this.seriesType.appendTo('#selmode');
    }
    constructor() {
        // code
     };
}