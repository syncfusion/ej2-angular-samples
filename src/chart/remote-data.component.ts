import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { DataManager, Query } from '@syncfusion/ej2-data';
import { IAxisLabelRenderEventArgs, ILoadedEventArgs } from '@syncfusion/ej2-ng-charts';
import { ChartComponent } from '@syncfusion/ej2-ng-charts';
import { Chart } from '@syncfusion/ej2-charts';
/**
 * Remote-Data
 */
@Component({
    selector: 'control-content',
    templateUrl: 'remote-data.html',
    styleUrls: ['remotedata.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class RemoteDataChartComponent {

    public data: DataManager = new DataManager({
        url: 'http://mvc.syncfusion.com/Services/Northwnd.svc/Tasks/'
    });
    @ViewChild('chart')
    public chart: ChartComponent;
    public query: Query = new Query().take(5).where('Estimate', 'lessThan', 3, false);
    public chartArea: {
        border: { width: 1 }
    };
    public labelRender(args: IAxisLabelRenderEventArgs): void {
        if (args.axis.orientation === 'Horizontal') {
            args.text = args.text.split(' ')[0];
        }
    };
    public loadedChart(args: Chart): void {
        let div: HTMLElement = document.getElementById('waitingpopup') as HTMLElement;
        div.style.display = 'none';
    };
    public loadChart(args: ILoadedEventArgs): void {
        let div: HTMLElement = document.getElementById('waitingpopup');
        div.style.display = 'block';
        let width: number = args.chart.element.offsetWidth;
        let height: number = args.chart.element.offsetHeight;
        div.style.top = (height ? height : 300 / 2 - 25) + 'px';
        div.style.left = (width / 2 - 25) + 'px';
        div.style.display = '';
        let selectedTheme: string = location.hash.split('/')[1];
        args.chart.theme = (selectedTheme && selectedTheme.indexOf('fabric') > -1) ? 'Fabric' : 'Material';
    };
    public primaryXAxis: Object = {
        rangePadding: 'Additional',
        valueType: 'Category',
        title: 'Assignee'
    };
    public primaryYAxis: Object = {
        title: 'Estimate',
        minimum: 0,
        maximum: 3,
        interval: 1
    };
    public legend: Object = {
        visible: false
    };
    public tooltip: Object = {
        enable: true,
        format: 'Name: ${point.x} <br>Story Point: ${point.y}'
    };
    public title: string = 'Sprint Task Analysis';
    constructor() {
        //Code
    };

}