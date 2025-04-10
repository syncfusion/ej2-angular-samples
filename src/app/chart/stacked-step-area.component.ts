import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadChartTheme } from './theme-color';

/**
 * Sample for Step area Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'stacked-step-area.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
})
export class StackedStepAreaChartComponent {
    public opacity: number = 0.5;
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public width: string = Browser.isDevice ? '100%' : '75%';

    public data: Object[] = [{ x: 2000, y: 416 }, { x: 2001, y: 490 }, { x: 2002, y: 470 }, { x: 2003, y: 500 },
    { x: 2004, y: 449 }, { x: 2005, y: 470 }, { x: 2006, y: 437 }, { x: 2007, y: 458 },
    { x: 2008, y: 500 }, { x: 2009, y: 473 }, { x: 2010, y: 520 }, { x: 2011, y: 520 }];


    public data1: Object[] = [{ x: 2000, y: 180 }, { x: 2001, y: 240 }, { x: 2002, y: 370 }, { x: 2003, y: 200 },
    { x: 2004, y: 229 }, { x: 2005, y: 210 }, { x: 2006, y: 337 }, { x: 2007, y: 258 },
    { x: 2008, y: 300 }, { x: 2009, y: 173 }, { x: 2010, y: 220 }, { x: 2011, y: 220 }];

    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Double',
        majorGridLines: { width: 0 },
        edgeLabelPlacement: 'Shift',
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        title: 'Production (Billion as kWh)',
        valueType: 'Double',
        labelFormat: '{value}B',
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 }
    };
    public legend: Object = {
        visible: true,
        enableHighlight : true
    }
    public border: Object = {
        width: 2,
    };
    // custom code start
    public load(args: ILoadedEventArgs): void {
        loadChartTheme(args);
    };
    // custom code end
    public title: string = 'Electricity- Production';
    constructor() {
        //code
    };

}