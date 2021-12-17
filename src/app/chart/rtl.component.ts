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
    public width: string = Browser.isDevice ? '100%' : '60%';
    public data: Object[] = [{ x: 2016, y: 1000 }, { x: 2017, y: 970 }, { x: 2018, y: 1060 }, { x: 2019, y: 1030 }];
    public data1: Object[] = [{ x: 2016, y: 400 }, { x: 2017, y: 360 }, { x: 2018, y: 920 }, { x: 2019, y: 540 }];
    public data2: Object[] = [{ x: 2016, y: 600 }, { x: 2017, y: 610 }, { x: 2018, y: 140 }, { x: 2019, y: 490 }];
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