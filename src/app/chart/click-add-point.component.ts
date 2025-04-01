import { Component, ViewEncapsulation, ViewChild  } from '@angular/core';
import { ILoadedEventArgs, IMouseEventArgs, IAxisRangeCalculatedEventArgs, ChartTheme, ChartAllModule, Series, ChartComponent } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadChartTheme } from './theme-color';

/**
 * Sample for Spline Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'click-add-point.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
})
export class ClickAddPointComponent {
    @ViewChild('chart')
    public chart: ChartComponent;
    public data: Object[] = [
        { x: 20, y: 20 }, 
        { x: 80, y: 80 }
    ]
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public width: string = Browser.isDevice ? '100%' : '70%';
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        edgeLabelPlacement: 'Shift',
        rangePadding: 'Additional',
        majorGridLines: { width: 0 }
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        title: 'Value', 
        interval: 20, 
        lineStyle: { width: 0 }, 
        majorTickLines: { width: 0 }
    };
    public marker: Object = {
        visible: true, 
        isFilled: true, 
        border: { width: 2, color: 'White' }, 
        width: 13, 
        height: 13 
    };
    public title: string = 'User supplied data';
    public tooltip: Object = {
        enable: true,
        enableHighlight: true
    };
    public load(args: ILoadedEventArgs): void {
        loadChartTheme(args);
    };
    public chartMouseClick(args: IMouseEventArgs): void {
        let isRemoved: boolean = false;
        if (args.axisData) {
            for (let i: number = 0; i < (this.chart.series[0] as Series).points.length; i++) {
                let markerWidth: number = (this.chart.series[0] as Series).marker.width / 2;
                let roundedX: number = Math.round(args.axisData['primaryXAxis']) + markerWidth;
                    let roundedY: number = Math.round(args.axisData['primaryYAxis']) + markerWidth;
                    let pointX: number = Math.round((this.chart.series[0] as Series).points[i].x as number) + markerWidth;
                    let pointY: number = Math.round((this.chart.series[0] as Series).points[i].y as number) + markerWidth;
                    if ((roundedX === pointX || roundedX + 1 === pointX || roundedX - 1 === pointX) &&
                        (roundedY === pointY || roundedY + 1 === pointY || roundedY - 1 === pointY)) {
                    if ((this.chart.series[0] as Series).points.length > 1) {
                        const points = (this.chart.series[0] as Series).points;
                        const duration: number = i === 0 || i === points[points.length - 1].index ? 500 : 0;
                        this.chart.series[0].removePoint(i, duration);
                    }
                    isRemoved = true;
                }
            }
            if (!isRemoved) {
                this.chart.series[0].addPoint({ x: Math.round(args.axisData['primaryXAxis']), y: Math.round(args.axisData['primaryYAxis']) });
            }
        }
    };
    public axisRangeCalculated(args: IAxisRangeCalculatedEventArgs): void {
        if (args.axis.name === 'primaryXAxis') {
            if (args.interval < 10) {
                args.maximum = args.maximum + 10;
                args.minimum = args.minimum - 10;
                args.interval = 10;
            }
        }
        if (args.axis.name === 'primaryYAxis') {
            if (args.maximum <= 60) {
                args.interval = 10;
            }
        }
    };
    constructor() {
        //code
    };

}