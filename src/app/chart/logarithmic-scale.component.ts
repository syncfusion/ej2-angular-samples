import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadChartTheme } from './theme-color';

/**
 * Sample for Logarithmic Axis
 */
@Component({
    selector: 'control-content',
    templateUrl: 'logarithmic-scale.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
})
export class LogarithmicScaleChartComponent {

    public data: Object[] = [
        { x: new Date(1995, 0, 1), y: 80 },
        { x: new Date(1996, 0, 1), y: 200 },
        { x: new Date(1997, 0, 1), y: 400 },
        { x: new Date(1998, 0, 1), y: 600 },
        { x: new Date(1999, 0, 1), y: 700 },
        { x: new Date(2000, 0, 1), y: 1400 },
        { x: new Date(2001, 0, 1), y: 2000 },
        { x: new Date(2002, 0, 1), y: 4000 },
        { x: new Date(2003, 0, 1), y: 6000 },
        { x: new Date(2004, 0, 1), y: 8000 },
        { x: new Date(2005, 0, 1), y: 11000 }];
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        labelFormat: 'y',
        valueType: 'DateTime',
        edgeLabelPlacement: 'Shift'
        
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        valueType: 'Logarithmic',
        edgeLabelPlacement: 'Shift',
        minorTicksPerInterval: 5,
        majorGridLines: { width: 1.5 },
        minorTickLines: { width: 0, height: 4 },
        minimum: 0,
        maximum: 100000,
        interval: 1,
        labelFormat: '${value}'
    };
    public legend: Object = {
        visible: false
    };
    public marker: Object = {
        visible: true,
        height: 7,
        width: 7,
        isFilled: true,
    };
    public tooltip: Object = {
        enable: true,
        header: ' ',
        showNearestTooltip: true,
        enableHighlight: true
    };
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public width: string = Browser.isDevice ? '100%' : '75%';
    // custom code start
    public load(args: ILoadedEventArgs): void {
        loadChartTheme(args);
    };
    // custom code end
    public title: string = 'Product X Growth [1995-2005]';
    constructor() {
        //code
    };

}