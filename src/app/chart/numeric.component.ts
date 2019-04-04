import { Component, ViewEncapsulation } from '@angular/core';
import {
 IAxisLabelRenderEventArgs , ChartTheme, ILoadedEventArgs,
} from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';

/**
 * Sample for Numeric Axis
 */
@Component({
    selector: 'control-content',
    templateUrl: 'numeric.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
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
        title: 'Death Overs',
        minimum: 15,
        maximum: 21,
        interval: 1,
        majorGridLines: { width: 0 }
    };
    public labelRender(args: IAxisLabelRenderEventArgs): void {
        if (args.axis.orientation === 'Horizontal') {
            args.cancel = args.value === 15 || args.value === 21;
        }
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
    public width: string = Browser.isDevice ? '100%' : '60%';
    
     public tooltip: Object = {
        enable: true, format: '${point.x}th Over : <b>${point.y} Runs</b>'
    };
    // custom code start
      public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
        if (selectedTheme === 'highcontrast') {
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