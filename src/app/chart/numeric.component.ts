import { Component, ViewEncapsulation } from '@angular/core';
import { IAxisLabelRenderEventArgs, ChartTheme, ILoadedEventArgs, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadChartTheme } from './theme-color';

/**
 * Sample for Numeric Axis
 */
@Component({
    selector: 'control-content',
    templateUrl: 'numeric.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
})
export class NumericAxisChartComponent {
    //Initializing Marker
    public marker: Object = {
        dataLabel: {
            visible: true,
            position: 'Top',
            font: {
                fontWeight: '600'
            }
        }
    }
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public data: Object[] = [
        { x: 16, y: 2 }, { x: 17, y: 14 },
        { x: 18, y: 7 }, { x: 19, y: 7 },
        { x: 20, y: 10 }
    ];
    public data1: Object[] = [
        { x: 16, y: 7 }, { x: 17, y: 7 },
        { x: 18, y: 11 }, { x: 19, y: 8 },
        { x: 20, y: 24 }
    ];
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        minimum: 15,
        maximum: 21,
        interval: 1,
        majorGridLines: { width: 0 }
    };
    
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        majorGridLines: { width: 0 },
        majorTickLines: { width: 0 },
        lineStyle: { width: 0 },
        labelStyle: {
            color: 'transparent'
        }
    };
    public legend: Object = {
        visible: true,
        enableHighlight: true
    };
    public width: string = Browser.isDevice ? '100%' : '75%';
    
     public tooltip: Object = {
        enable: true, format: '${point.x}th Over : <b>${point.y} Runs</b>', enableHighlight: true
    };
    // custom code start
      public load(args: ILoadedEventArgs): void {
        let selectedTheme: ChartTheme | string = loadChartTheme(args);
        if (selectedTheme === 'HighContrast') {
               args.chart.series[0].fill = '#57BCFF';
               args.chart.series[1].fill = '#E58184';
            }
    };
    // custom code end
    public title: string = 'England vs West Indies';
    constructor() {
        //code
    };

}