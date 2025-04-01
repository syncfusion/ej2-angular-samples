import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { ILoadedEventArgs, ChartComponent, BoxPlotMode, IPointRenderEventArgs, ChartTheme, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { getSaturationColor} from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadChartTheme, pointRender } from './theme-color';
/**
 * Sample for box and whisker series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'box-and-whisker.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
})
export class BoxandWhiskerChartComponent {
    public data1: Object[] = [
        { x: 'Development', y: [22, 22, 23, 25, 25, 25, 26, 27, 27, 28, 28, 29, 30, 32, 34, 32, 34, 36, 35, 38] },
        { x: 'Testing', y: [22, 33, 23, 25, 26, 28, 29, 30, 34, 33, 32, 31, 50] },
        { x: 'Finance', y: [26, 27, 28, 30, 32, 34, 35, 37, 35, 37, 45] },
        { x: 'R&D', y: [26, 27, 29, 32, 34, 35, 36, 37, 38, 39, 41, 43, 58] },
        { x: 'Sales', y: [27, 26, 28, 29, 29, 29, 32, 35, 32, 38, 53] },
        { x: 'Inventory', y: [21, 23, 24, 25, 26, 27, 28, 30, 34, 36, 38] },
        { x: 'Graphics', y: [26, 28, 29, 30, 32, 33, 35, 36, 52] },
        { x: 'Training', y: [22, 24, 25, 30, 32, 34, 36, 38, 39, 41, 35, 36, 40, 56] },
        { x: 'HR', y: [28, 29, 30, 31, 32, 34, 35, 36] }
    ];
    public pointRender(args: IPointRenderEventArgs): void {
        pointRender(args);
    };
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Category',
        majorGridLines: { width: 0 },
        labelIntersectAction : Browser.isDevice ? 'None' : 'Rotate90',
        majorTickLines: {width : 0},
        minorTickLines: {width: 0},
        labelRotation: Browser.isDevice ? -45 : 0
    };
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        minimum: 10,
        maximum: 60,
        interval: 10,
        title: 'Age',
        majorGridLines: { width: 1 },
        majorTickLines: { width: 0 },
        lineStyle: {width: 0}
    };
    public marker: Object = {
        visible: true,
        height: 7,
        width: 7,
    };
    public width: string = Browser.isDevice ? '100%' : '75%';
    //Initializing Tooltip
    public tooltip: Object = { enable: true };
    public load(args: ILoadedEventArgs): void {
        loadChartTheme(args);
    };
    public title: string = 'Employee Age Group in various department';
    @ViewChild('chart')
    public chart: ChartComponent;
    public check(e: Event): void {
        let element: HTMLInputElement = <HTMLInputElement>e.target;
        this.chart.series[0].showMean = element.checked;
        this.chart.series[0].animation.enable = false;
        this.chart.refresh();
    };
    public legend: Object = {
        visible: false
    }
    public onChange(e: Event): void {
        let element: HTMLInputElement = <HTMLInputElement>e.target;
        this.chart.series[0].boxPlotMode = <BoxPlotMode>element.value;
        this.chart.series[0].animation.enable = false;
        this.chart.refresh();
    }
    public boxPlotMode: DropDownList;
    ngOnInit(): void {
        this.boxPlotMode = new DropDownList({
            index: 0,
            width: 120,
            change: () => {
                let mode: string = this.boxPlotMode.value.toString();
                this.chart.series[0].boxPlotMode = <BoxPlotMode>mode;
                this.chart.series[0].animation.enable = false;
                this.chart.refresh();
            }
        });
        this.boxPlotMode.appendTo('#selmode');
    }
    constructor() {
        //code
    };

}