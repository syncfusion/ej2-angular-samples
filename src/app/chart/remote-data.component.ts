import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { DataManager, Query } from '@syncfusion/ej2-data';
import { IAxisLabelRenderEventArgs, ILoadedEventArgs, IPointRenderEventArgs, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { ChartComponent } from '@syncfusion/ej2-angular-charts';
import { Chart, ChartTheme } from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadChartTheme, pointRender } from './theme-color';
/**
 * Sample for Remote-Data binding
 */
@Component({
    selector: 'control-content',
    templateUrl: 'remote-data.html',
    styleUrls: ['remotedata.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
})
export class RemoteDataChartComponent {

    public data: DataManager = new DataManager({
        url: 'https://services.syncfusion.com/angular/production/api/orders'
    });
    @ViewChild('chart')
    public chart: ChartComponent;
    public query: Query = new Query().take(5);
    public chartArea: Object = {
        border: { width: 0 }
    };
    
    public loadedChart(args: Chart): void {
        let div: HTMLElement = document.getElementById('waitingpopup') as HTMLElement;
        div.style.display = 'none';
    };
    public pointRender(args: IPointRenderEventArgs): void {
        pointRender(args);
    };
    public tooltipRender(args): void {
        args.text = args.data.pointX + ': <b>' + '$' +args.data.pointY * 1000+ '</b>';
    };
    public axisLabelRender(args: IAxisLabelRenderEventArgs): void {
        if (args.axis.name === 'primaryYAxis') {
            args.text =  ''+args.value * 1000;
            }
    };
    public loadChart(args: ILoadedEventArgs): void {
        let div: HTMLElement = document.getElementById('waitingpopup');
        div.style.display = 'block';
        let width: number = args.chart.element.offsetWidth;
        let height: number = args.chart.element.offsetHeight;
        div.style.top = (height ? height : 300 / 2 - 25) + 'px';
        div.style.left = (width / 2 - 25) + 'px';
        div.style.display = '';
        loadChartTheme(args);
        // custom code end
    };
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        rangePadding: 'Additional',
        valueType: 'Category',
        labelRotation: Browser.isDevice ? -45 : 0,
        labelIntersectAction: Browser.isDevice ? 'None': 'Rotate45',
        majorGridLines: { width: 0 },
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 },
    };
    //Initializing Marker
    public marker: Object = {
        dataLabel: {
            visible: true,
            position: 'Top',
            font: {
                fontWeight: '600', color: '#ffffff'
            },
            format:"{value}K"
        }
    }
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        majorGridLines: { width: 1 },
        majorTickLines: { width: 0 },
        lineStyle: { width: 0 },
        title: 'Freight rate in U.S dollars'
    };
    public legend: Object = {
        visible: false
    };
    public width: Object = Browser.isDevice ? '100%' : '75%';
    public tooltip: Object = {
        enable: true,
        header: '<b>Freight rate</b>'
    };
    public title: string = 'Container freight rate';
    constructor() {
        //Code
    };

}