import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme, IAxisLabelRenderEventArgs } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';

/**
 * Sample for Area Series empty points
 */
@Component({
    selector: 'control-content',
    templateUrl: 'rtl.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class RTLChartComponent {
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    //Initializing Width
    public width: string = Browser.isDevice ? '100%' : '75%';
    public data: Object[] = [{ x: 2016, y: 1000 }, { x: 2017, y: 1170 }, { x: 2018, y: 660 }, { x: 2019, y: 1030 }];
    public data1: Object[] = [{ x: 2016, y: 400 }, { x: 2017, y: 460 }, { x: 2018, y: 1120 }, { x: 2019, y: 540 }];
    public data2: Object[] = [{ x: 2016, y: 200 }, { x: 2017, y: 250 }, { x: 2018, y: 300 }, { x: 2019, y: 350 }];
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Double', majorGridLines: { width: 0 },
        minimum: 2015, maximum: 2020, interval: 1
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        valueType: 'Double', minimum: 0, maximum: 1200, interval: 200,
        lineStyle: { width: 0 }, labelFormat: '{value}B'
    };
    public tooltip: Object = {
        enable: true
    };
    public labelRender(args: IAxisLabelRenderEventArgs): void {
        if (args.axis.orientation === 'Horizontal') {
            args.cancel = args.value === 2015 || args.value === 2020;
        }
    };
    // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
    // custom code end
    //Initializing Chart Title
    public title: string = 'Company Performance';
    constructor() {
        // code
    };
}