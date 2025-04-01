import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadChartTheme } from './theme-color';

/**
 * Sample for Line Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'data-editing.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
})
export class DataEditingComponent {
    public data: Object[] = [
        { x: 2005, y: 21 }, { x: 2006, y: 24 },
        { x: 2007, y: 36 }, { x: 2008, y: 38 },
        { x: 2009, y: 54 }, { x: 2010, y: 57 },
        { x: 2011, y: 70 }
    ];
    public data1: Object[] = [
        { x: 2005, y: 28 }, { x: 2006, y: 44 },
        { x: 2007, y: 48 }, { x: 2008, y: 50 },
        { x: 2009, y: 66 }, { x: 2010, y: 78 },
        { x: 2011, y: 84 }
    ];
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Category',
        labelFormat: 'y',
        labelPlacement: 'BetweenTicks',
        majorGridLines: { width: 0 },
        edgeLabelPlacement: 'Shift',
        majorTickLines: {width : 0},
        minorTickLines: {width: 0}
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        rangePadding: 'None',
        minimum: 0,
        maximum: 100,
        interval: 20,
        lineStyle: { width: 0 },
        title : 'Production(Billion in kWh)',
        labelFormat: '{value}B',
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 }
    };
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public width: string = Browser.isDevice ? '100%' : '75%';
    public marker: Object = {
        visible: true,
        height: 7,
        width: 7
    };
    public marker1: Object = {
        visible: true,
        height: 7,
        width: 7,
        isFilled: true
    };
    public dragSettings: Object = {
        enable: true
    };
    // custom code start
    public load(args: ILoadedEventArgs): void {
        loadChartTheme(args);
    };
    // custom code end
    public title: string = 'Electricity - Production';
    constructor() {
       //code
    };

}
