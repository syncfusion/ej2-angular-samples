import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { ILoadedEventArgs, ChartComponent, BoxPlotMode, IPointRenderEventArgs, ChartTheme } from '@syncfusion/ej2-angular-charts';
import { getSaturationColor} from '@syncfusion/ej2-charts';
/**
 * Sample for box and whisker series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'box-and-whisker.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class BoxandWhiskerChartComponent {
    public data1: Object[] = [
        { x: 'Development', y: [22, 22, 23, 25, 25, 25, 26, 27, 27, 28, 28, 29, 30, 32, 34, 32, 34, 36, 35, 38] },
        { x: 'Testing', y: [22, 33, 23, 25, 26, 28, 29, 30, 34, 33, 32, 31, 50] },
        { x: 'HR', y: [22, 24, 25, 30, 32, 34, 36, 38, 39, 41, 35, 36, 40, 56] },
        { x: 'Finance', y: [26, 27, 28, 30, 32, 34, 35, 37, 35, 37, 45] },
        { x: 'R&D', y: [26, 27, 29, 32, 34, 35, 36, 37, 38, 39, 41, 43, 58] },
        { x: 'Sales', y: [27, 26, 28, 29, 29, 29, 32, 35, 32, 38, 53] },
        { x: 'Inventory', y: [21, 23, 24, 25, 26, 27, 28, 30, 34, 36, 38] },
        { x: 'Graphics', y: [26, 28, 29, 30, 32, 33, 35, 36, 52] },
        { x: 'Training', y: [28, 29, 30, 31, 32, 34, 35, 36] }
    ];
    public pointRender(args: IPointRenderEventArgs): void {
        let materialColors: string[] = ['#00bdae', '#404041', '#357cd2', '#e56590', '#f8b883', '#70ad47', '#dd8abd', '#7f84e8', '#7bb4eb',
            '#ea7a57', '#404041', '#00bdae'];
        let fabricColors: string[] = ['#4472c4', '#ed7d31', '#ffc000', '#70ad47', '#5b9bd5',
            '#c1c1c1', '#6f6fe2', '#e269ae', '#9e480e', '#997300', '#4472c4', '#70ad47', '#ffc000', '#ed7d31'];
        let bootstrapColors: string[] = ['#a16ee5', '#f7ce69', '#55a5c2', '#7ddf1e', '#ff6ea6',
            '#7953ac', '#b99b4f', '#407c92', '#5ea716', '#b91c52'];
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        if (selectedTheme && selectedTheme.indexOf('fabric') > -1) {
            args.fill = fabricColors[args.point.index % 10];
        } else if (selectedTheme === 'material') {
            args.fill = materialColors[args.point.index % 10];
        } else {
            args.fill = bootstrapColors[args.point.index % 10];
        }
        args.border.color = getSaturationColor(args.fill, -0.6);
    };
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Category',
        majorGridLines: { width: 0 },
        edgeLabelPlacement: 'Shift',
        labelIntersectAction: 'Trim'
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
        majorGridLines: { width: 0 },
        majorTickLines: { width: 0 }
    };
    public marker: Object = {
        visible: true,
        height: 10,
        width: 10,
    };
    //Initializing Tooltip
    public tooltip: Object = { enable: true };
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
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