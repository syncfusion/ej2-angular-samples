import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ILoadedEventArgs, ChartComponent } from '@syncfusion/ej2-angular-charts';
import { ExportType, ChartTheme, IPointRenderEventArgs } from '@syncfusion/ej2-charts';
import { DropDownList } from '@syncfusion/ej2-dropdowns';

/**
 * Sample for chart export
 */
@Component({
    selector: 'control-content',
    templateUrl: 'export.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class ExportChartComponent {

    public data: Object[] = [
        { x: 'DEU', y: 35.5 }, { x: 'CHN', y: 18.3 }, { x: 'ITA', y: 17.6 }, { x: 'JPN', y: 13.6 },
        { x: 'US', y: 12 }, { x: 'ESP', y: 5.6 }, { x: 'FRA', y: 4.6 }, { x: 'AUS', y: 3.3 },
        { x: 'BEL', y: 3 }, { x: 'UK', y: 2.9 }
    ];
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        title: 'Countries',
        valueType: 'Category',
        majorGridLines: { width: 0 }
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        title: 'Measurements',
        labelFormat: '{value}GW',
        minimum: 0,
        maximum: 40,
        interval: 10,
        majorGridLines: { width: 0 }
    };
    //Initializing Marker
    public marker: Object = {
        visible: true,
        height: 10, width: 10
    };
    // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
    // custom code end
    public tooltip: Object = {
        enable: true
    };
    public chartArea: Object = {
        border: {
            width: 0
        }
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
    public title: string = 'Top 10 Countries Using Solar Power';
    @ViewChild('chart')
    public chart: ChartComponent;
    public onClick(e: Event): void {
        let fileName: string = (<HTMLInputElement>(document.getElementById('fileName'))).value;
        this.chart.exportModule.export(<ExportType>this.exportType.value, fileName);
    }
    public exportType: DropDownList;
    ngOnInit(): void {
        this.exportType = new DropDownList({
            index: 0,
            width: 90,
        });
        this.exportType.appendTo('#exporttype');
    }
    constructor() {
        // code
     };
}