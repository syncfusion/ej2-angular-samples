import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme, IAxisLabelRenderEventArgs, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadChartTheme } from './theme-color';

/**
 * Sample for Area Series empty points
 */
@Component({
    selector: 'control-content',
    templateUrl: 'rtl.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
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
        minimum: 2015, maximum: 2020, interval: 1, majorTickLines: {width : 0},
        minorTickLines: {width: 0}
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        valueType: 'Double', minimum: 0, maximum: 1200, interval: 200,
        lineStyle: { width: 0 }, labelFormat: '{value}B'
    };
    public tooltip: Object = {
        enable: true,
        enableHighlight: true
    };
    public labelRender(args: IAxisLabelRenderEventArgs): void {
        if (args.axis.orientation === 'Horizontal') {
            args.cancel = args.value === 2015 || args.value === 2020;
        }
    };
    public legend: Object = {
        visible: true,
        enableHighlight : true
    };
    // custom code start
    public load(args: ILoadedEventArgs): void {
        loadChartTheme(args);
    };
    // custom code end
    //Initializing Chart Title
    public title: string = 'Company Performance';
    constructor() {
        // code
    };
}