import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';

/**
 * Sample for Step area Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'step-area.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class StepAreaChartComponent {

    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public width: string = Browser.isDevice ? '100%' : '60%';

    public data: Object[] = [{ x: 2000, y: 416 }, { x: 2001, y: 490 }, { x: 2002, y: 470 }, { x: 2003, y: 500 },
                             { x: 2004, y: 449 }, { x: 2005, y: 470 }, { x: 2006, y: 437 }, { x: 2007, y: 458 },
                             { x: 2008, y: 500 }, { x: 2009, y: 473 }, { x: 2010, y: 520 }, { x: 2011, y: 509 }];


    public data1: Object[] = [{ x: 2000, y: 180 }, { x: 2001, y: 240 }, { x: 2002, y: 370 }, { x: 2003, y: 200 },
                              { x: 2004, y: 229 }, { x: 2005, y: 210 }, { x: 2006, y: 337 }, { x: 2007, y: 258 },
                              { x: 2008, y: 300 }, { x: 2009, y: 173 }, { x: 2010, y: 220 }, { x: 2011, y: 309 }];

    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Double',
        majorGridLines: { width: 0 },
        edgeLabelPlacement: 'Shift'
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        title: 'Production (Billion as kWh)',
        valueType: 'Double',
        labelFormat: '{value}B',
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 }
    };
    public marker: Object = {
        visible: false
    };
     // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
     // custom code end
    public title: string = 'Electricity- Production';
    constructor() {
        //code
    };

}