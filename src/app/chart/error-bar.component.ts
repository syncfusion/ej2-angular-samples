import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ILoadedEventArgs, ChartComponent, IPointRenderEventArgs } from '@syncfusion/ej2-angular-charts';
import { ErrorBarMode, ErrorBarDirection, ErrorBarType, ChartTheme } from '@syncfusion/ej2-charts';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { NumericTextBox } from '@syncfusion/ej2-angular-inputs'

/**
 * Sample for Error bar 
 */
@Component({
    selector: 'control-content',
    templateUrl: 'error-bar.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class ErrorBarChartComponent {

    public data: Object[] = [
        { x: 'IND', y: 24 }, { x: 'AUS', y: 20 }, { x: 'USA', y: 35 },
        { x: 'DEU', y: 27 }, { x: 'ITA', y: 30 },
        { x: 'UK', y: 41 }, { x: 'RUS', y: 26 }
    ];
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Category', interval: 1, majorGridLines: { width: 0 }
    };
    public pointRender(args: IPointRenderEventArgs): void {
        let materialColors: string[] = ['#00bdae', '#404041', '#357cd2', '#e56590', '#f8b883', '#70ad47', '#dd8abd', '#7f84e8', '#7bb4eb',
            '#ea7a57', '#404041', '#00bdae'];
        let fabricColors: string[] = ['#4472c4', '#ed7d31', '#ffc000', '#70ad47', '#5b9bd5',
            '#c1c1c1', '#6f6fe2', '#e269ae', '#9e480e', '#997300', '#4472c4', '#70ad47', '#ffc000', '#ed7d31'];
        let bootstrapColors: string[] = ['#a16ee5', '#f7ce69', '#55a5c2', '#7ddf1e', '#ff6ea6',
            '#7953ac', '#b99b4f', '#407c92', '#5ea716', '#b91c52'];
        let highContrastColors: string[] = ['#79ECE4', '#E98272', '#DFE6B6', '#C6E773', '#BA98FF',
            '#FA83C3', '#00C27A', '#43ACEF', '#D681EF', '#D8BC6E'];
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        if (selectedTheme && selectedTheme.indexOf('fabric') > -1) {
            args.fill = fabricColors[args.point.index % 10];
        } else if (selectedTheme === 'material') {
            args.fill = materialColors[args.point.index % 10];
        } else if (selectedTheme === 'highcontrast') {
            args.fill = highContrastColors[args.point.index % 10];
        } else {
            args.fill = bootstrapColors[args.point.index % 10];
        }
    };
       // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
       // custom code end
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        labelFormat: '{value}%', lineStyle: { width: 0 }, minimum: 15, maximum: 45
    };
    public legend: Object = {
        visible: false
    };
    public chartArea: Object = { border: { width: 0 } }; 
    public title: string = 'Sales Distribution of Car by Region';
    public errorBar: Object = { visible: true, verticalError: 3, horizontalError: 3 };
    public marker: Object = { height: 10, width: 10 };
    public tooltip: Object = { enable: true };
    @ViewChild('chart')
    public chart: ChartComponent;
    public errorBarVisible(e: Event): void {
        let element: HTMLInputElement = <HTMLInputElement>e.target;
        this.chart.series[0].errorBar.visible = element.checked;
        this.chart.series[0].animation.enable = false;
        this.chart.refresh();
    }
    public verticalError(e: Event): void {
        this.chart.series[0].errorBar.verticalError = this.verticalerror.value;
        this.chart.series[0].animation.enable = false;
        this.chart.refresh();
    };
    public horizontalError(e: Event): void {
        this.chart.series[0].errorBar.horizontalError = this.horizontalerror.value;
        this.chart.series[0].animation.enable = false;
        this.chart.refresh();
    };
    @ViewChild('verror')
    public verticalerror: NumericTextBox;
    @ViewChild('herror')
    public horizontalerror: NumericTextBox;
    public min: number = 1;
    public max: number = 20;
    public value: number = 3;
    public step: number = 1;
    public errorBarType: DropDownList;
    public errorBarDirection: DropDownList;
    public errorBarMode: DropDownList;
    ngOnInit(): void {
        this.errorBarType = new DropDownList({
            index: 0,
            width: 120,
            change: () => {
                let type: string = this.errorBarType.value.toString();
                this.chart.series[0].errorBar.type = <ErrorBarType>type;
                this.chart.series[0].animation.enable = false;
                this.chart.refresh();
            }
        });
        this.errorBarType.appendTo('#errorBarType');
        this.errorBarMode = new DropDownList({
            index: 0,
            width: 120,
            change: () => {
                let mode: string = this.errorBarMode.value.toString();
                this.chart.series[0].errorBar.mode = <ErrorBarMode>mode;
                this.chart.series[0].animation.enable = false;
                this.chart.refresh();
            }
        });
        this.errorBarMode.appendTo('#drawmode');
        this.errorBarDirection = new DropDownList({
            index: 0,
            width: 120,
            change: () => {
                let direction: string = this.errorBarDirection.value.toString();
                this.chart.series[0].errorBar.direction = <ErrorBarDirection>direction;
                this.chart.series[0].animation.enable = false;
                this.chart.refresh();
            }
        });
        this.errorBarDirection.appendTo('#direction');
    }
    constructor() {
        // code
    };
}