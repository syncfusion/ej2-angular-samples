import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadChartTheme } from './theme-color';
/**
 * Sample for Bar Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'bar.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
})
export class BarChartComponent {
    public chartArea: Object = {
        border: {
            width: 0
        },
        margin: {
            bottom: 12
        }
    };
    //Initializing Chart Width
    public width: string = Browser.isDevice ? '100%' : '75%';
    public data: Object[] = [
        { year: '2021', count: 237 },
        { year: '2022', count: 226.4 },
        { year: '2023', count: 234.6 }
    ];
    public data1: Object[] = [
        { year: '2021', count: 190 },
        { year: '2022', count: 153.1 },
        { year: '2023', count: 145.9 }
    ];
    public data2: Object[] = [
        { year: '2021', count: 143 },
        { year: '2022', count: 103.3 },
        { year: '2023', count: 103.1 }
    ];
    //Initializing Marker
    public cornerRadius: Object = { bottomRight: 4, topRight: 4 };
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Category',
        majorGridLines: { width: 0 },
        majorTickLines: { width: 0 }
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        labelFormat: '{value}M',
        title: 'Units Sold (in Millions)',
        maximum: 300,
        edgeLabelPlacement: 'Shift',
        majorTickLines: { width: 0 },
        lineStyle: { width: 0 }
    };
    public tooltip: Object = {
        enable: true,
        enableHighlight: true,
        header: '<b>${series.name}</b>',
        format: '${point.x} : <b>${point.y}</b>'
    };
    public legend: Object = {
        enableHighlight: true, shapeWidth: 9, shapeHeight: 9
    }
    // custom code start
    public load(args: ILoadedEventArgs): void {
        loadChartTheme(args);
    };
    // custom code end
    public title: string = 'Global Smartphone Sales Trends by Brand (2021-2023)';
    public subTitle: string = 'Source: wikipedia.org';
    constructor() {
        //code
    };

}