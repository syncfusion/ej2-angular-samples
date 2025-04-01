import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, IPointRenderEventArgs, ChartTheme, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadChartTheme, pointRender } from './theme-color';

/**
 * Sample for Inversed Axis
 */
@Component({
    selector: 'control-content',
    templateUrl: 'inversed.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
})

export class InversedAxisChartComponent {
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Category',
        opposedPosition: true,
        isInversed: true,
        majorGridLines: { width: 0 },
        majorTickLines: { width: 0},
        minorTickLines: {width: 0}
    };

    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        edgeLabelPlacement: 'Shift',
        labelIntersectAction: 'Rotate45',
        isInversed: true,
        majorGridLines: { width: 0 },
        majorTickLines: { width: 0 },
        lineStyle: { width: 0 },
        labelStyle: {
            color: 'transparent'
        }
    };

    public pointRender(args: IPointRenderEventArgs): void {
        pointRender(args);
    };

    public data: Object[] = [
        { x: '2008', y: 1.5 }, { x: '2009', y: 7.6 }, { x: '2010', y: 11 },
        { x: '2011', y: 16.2 }, { x: '2012', y: 18 }, { x: '2013', y: 21.4 },
        { x: '2014', y: 16 }, { x: '2015', y: 17.1 }
        ];

    public marker: Object = {
        dataLabel: { visible: true,height:7, width:7, isFilled: true, position:'Top', font:{fontWeight: 600, color:'#ffffff'} }
    };
    public tooltip: Object = {
        enable: true
    };

    public legend: Object = {
        visible: false
    };

    public chartArea: Object = {
        border: {
            width: 0
        }
    };
// custom code start
public width: string = Browser.isDevice ? '100%' : '75%';
    public load(args: ILoadedEventArgs): void {
        loadChartTheme(args);
    };
// custom code end
    public title: string = 'Exchange Rate (INR per USD)';


    constructor() {
        //code
    };

}