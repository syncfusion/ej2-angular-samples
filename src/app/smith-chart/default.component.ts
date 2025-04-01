/**
 * default sample
 */
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { SmithchartTheme, ISmithchartLoadEventArgs, Smithchart, RenderType, SmithchartAllModule } from '@syncfusion/ej2-angular-charts';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadSmithChartTheme } from './theme-color';

@Component({
    selector: 'control-content',
    templateUrl: 'default.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SmithchartAllModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class SmithchartDefaultComponent {
    @ViewChild('smithchart')
    public smithchart: Smithchart;
    public data: Object[] = [
        { resistance: 10, reactance: 25 }, { resistance: 8, reactance: 6 },
                    { resistance: 6, reactance: 4.5 }, { resistance: 4.5, reactance: 2 },
                    { resistance: 3.5, reactance: 1.6 }, { resistance: 2.5, reactance: 1.3 },
                    { resistance: 2, reactance: 1.2 }, { resistance: 1.5, reactance: 1 },
                    { resistance: 1, reactance: 0.8 }, { resistance: 0.5, reactance: 0.4 },
                    { resistance: 0.3, reactance: 0.2 }, { resistance: 0, reactance: 0.15 }
    ];
    public data1: Object[] = [
       { resistance: 20, reactance: -50 }, { resistance: 10, reactance: -10 },
                    { resistance: 9, reactance: -4.5 }, { resistance: 8, reactance: -3.5 },
                    { resistance: 7, reactance: -2.5 }, { resistance: 6, reactance: -1.5 },
                    { resistance: 5, reactance: -1 }, { resistance: 4.5, reactance: -0.5 },
                    { resistance: 3.5, reactance: 0 }, { resistance: 2.5, reactance: 0.4 },
                    { resistance: 2, reactance: 0.5 }, { resistance: 1.5, reactance: 0.5 },
                    { resistance: 1, reactance: 0.4 }, { resistance: 0.5, reactance: 0.2 },
                    { resistance: 0.3, reactance: 0.1 }, { resistance: 0, reactance: 0.05 }
    ];
    public marker: Object = {
        shape: 'Circle',
        visible: true,
        border: {
            width: 2,
        }
    };
    title: object = {
        visible: true,
        text: 'Transmission details'
    };
    public legend: Object = {
         visible: true,
         shape: 'Circle'
    };
    public tooltip: Object = {
        visible: true
    };
    public renderType: string = 'Impedance';
    // custom code start
    public load = (args: ISmithchartLoadEventArgs) => {
        loadSmithChartTheme(args);
    }
    // custom code end
    public mode: DropDownList;
    ngOnInit(): void {
    this.mode = new DropDownList({
        index: 0,
        width: 90,
        change: () => {
            let element: RenderType = this.mode.value as RenderType;
            this.smithchart.renderType = element;
            this.smithchart.refresh();
        }
    });
    this.mode.appendTo('#rendering');
    }
    constructor() {
        //code
    };
}