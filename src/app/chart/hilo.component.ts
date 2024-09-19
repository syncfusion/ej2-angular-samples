import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { chartValue } from './financial-data';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

/**
 * Sample for Hilo Series
 */


@Component({
    selector: 'control-content',
    templateUrl: 'hilo.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
})
export class HiloChartComponent {

    public data1: Object[] = chartValue;

    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'DateTime',
        crosshairTooltip: { enable: true },
        edgeLabelPlacement: 'Shift',
        majorGridLines: { width: 0 }
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        title: 'Price',
        minimum: 10,
        maximum: 180,
        interval: 20,
        labelFormat: '${value}',
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 }
    };
    public marker: Object = {
        visible: false
    };

    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public width: string = Browser.isDevice ? '100%' : '75%';

    public title: string = 'AAPL Historical';
    public tooltip: Object = {
        enable: true,
        shared: true,
        enableMarker: false, header: "" ,format: "<b>Apple Inc.(AAPL)</b> <br> High : <b>${point.high}</b> <br> Low : <b>${point.low}</b>"
    };
    public legendSettings: Object = {
        visible: false
    };
    public crosshair: Object = {
        enable: false,
        lineType: 'Vertical', line: {
            width: 0,
        }
    };
    // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
    };
    // custom code end
    constructor() {
        //code
    };

}