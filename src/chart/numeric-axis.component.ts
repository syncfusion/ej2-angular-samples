import { Component, ViewEncapsulation } from '@angular/core';
import {
    IAxisLabelRenderEventArgs
} from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';

/**
 * Numeric Axis
 */
@Component({
    selector: 'control-content',
    templateUrl: 'numeric-axis.html',
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
        majorGridLines: { width: 0 }
    };
    public labelRender(args: IAxisLabelRenderEventArgs): void {
        if (args.axis.orientation === 'Horizontal') {
            args.cancel = args.value === 15 || args.value === 21;
        }
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        minimum: 0,
        maximum: 25,
        interval: 5,
        majorGridLines: { width: 0 },
        majorTickLines: { width: 0 },
        lineStyle: { width: 0 },
        labelStyle: {
            color: 'transparent'
        }
    };
    public width: string = Browser.isDevice ? '100%' : '60%';
    
     public tooltip: Object = {
        enable: true, format: '${point.x}th Over : ${point.y} Runs'
    };
    public title: string = 'England vs West Indies';
    constructor() {
        //code
    };

}