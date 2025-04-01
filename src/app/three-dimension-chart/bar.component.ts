import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ChartTheme, Chart3DLoadedEventArgs } from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
import { Chart3DAllModule } from '@syncfusion/ej2-angular-charts';
import { load3DChartTheme } from './theme-color';

/**
 * 3D Chart Bar sample
 */
@Component({
    selector: 'control-content',
    templateUrl: 'bar.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [Chart3DAllModule]
})

export class BarComponent {

    public dataSource: Object[] = [
        { x: 'Japan', y: 1.71 }, { x: 'France', y: 1.82 },
        { x: 'India', y: 6.68 }, { x: 'Germany', y: 2.22 }, { x: 'Italy', y: 1.50 }, { x: 'Canada', y: 3.05 }
    ]
    public dataSource1: Object[] = [
        { x: 'Japan', y: 6.02 }, { x: 'France', y: 3.19 },
        { x: 'India', y: 3.28 }, { x: 'Germany', y: 4.56 }, { x: 'Italy', y: 2.40 }, { x: 'Canada', y: 2.04 }
    ]
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Category',
        labelPlacement: 'BetweenTicks'
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        labelFormat: '{value}%',
        maximum: Browser.isDevice ? 8 : 7, interval: Browser.isDevice ? 2 : 1,
        edgeLabelPlacement: 'Shift'
    };
    public load(args: Chart3DLoadedEventArgs): void {
        load3DChartTheme(args);
    };
    //Initializing 3D-Chart Title
    public title: string = 'GDP Percentage by Country in 2017';
    public width: string = Browser.isDevice ? '100%' : '70%';
    public tooltip: Object = { enable: true };
    public enableRotation: boolean = true;
    public legendSettings: Object = { visible: true, enableHighlight: true };
    public height: string = '400';
    public rotation: number = 22;
    public depth: number = 100;
    constructor() {
        // code
    };
}