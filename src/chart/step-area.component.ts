import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs } from '@syncfusion/ej2-ng-charts'; 

/**
 * Step area Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'step-area.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class StepAreaChartComponent {

    public data: Object[] = [{ x: 2000, y: 416 }, { x: 2001, y: 490 }, { x: 2002, y: 470 }, { x: 2003, y: 500 },
                             { x: 2004, y: 449 }, { x: 2005, y: 470 }, { x: 2006, y: 437 }, { x: 2007, y: 458 },
                             { x: 2008, y: 500 }, { x: 2009, y: 473 }, { x: 2010, y: 520 }, { x: 2011, y: 509 }];


    public data1: Object[] = [{ x: 2000, y: 180 }, { x: 2001, y: 240 }, { x: 2002, y: 370 }, { x: 2003, y: 200 },
                              { x: 2004, y: 229 }, { x: 2005, y: 210 }, { x: 2006, y: 337 }, { x: 2007, y: 258 },
                              { x: 2008, y: 300 }, { x: 2009, y: 173 }, { x: 2010, y: 220 }, { x: 2011, y: 309 }];

    public primaryXAxis: Object = {
        title: 'Year',
        line: { width: 0 },
        valueType: 'Double',
        edgeLabelPlacement: 'Shift'
    };
    public primaryYAxis: Object = {
        title: 'Production (billion kWh)',
        valueType: 'Double',
        labelFormat: '{value}B'
    };
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        args.chart.theme = (selectedTheme && selectedTheme.indexOf('fabric') > -1) ? 'Fabric' : 'Material';
    };
    public title: string = 'Electricity- Production';
    constructor() {
        //code
    };

}