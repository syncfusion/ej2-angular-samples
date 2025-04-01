import { Component, ViewEncapsulation } from '@angular/core';
import { ChartDataService } from './chart-data.service';
import { ILoadedEventArgs, ChartTheme, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadChartTheme } from './theme-color';

/**
 * Sample for local data binding
 */
@Component({
    selector: 'control-content',
    templateUrl: 'local-data.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
})
export class LocalDataChartComponent {

    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        title: 'Years',
        skeleton: 'y',
        majorGridLines: { width: 0 },
        valueType: 'DateTime',
        edgeLabelPlacement: 'Shift'
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        title: 'Price',
        labelFormat: '${value}',
        rangePadding: 'None',
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 }
    };

    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public tooltip: Object = {
        enable: true, shared: true
    }
    public crosshair: Object = {
        enable: true,
        line: {
            color: 'rgba(204,214,235,0.25)',
            width: Browser.isDevice ? 50 : 20,
        },
        lineType: 'Vertical'
    };
    public legend: Object = {
        enableHighlight : true
    };
    public width: string = Browser.isDevice ? '100%' : '75%';
    // custom code start
    public load(args: ILoadedEventArgs): void {
        loadChartTheme(args);
    };
    // custom code end
    public title: string = 'Stock Price Analysis';
    public animation: Object = { enable: true };
    public series1: Object = ChartDataService.prototype.GetLocalData().series1;
    public series2: Object = ChartDataService.prototype.GetLocalData().series2;
    constructor() {
        //code
    };

}