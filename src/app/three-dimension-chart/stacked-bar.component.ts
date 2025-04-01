import { Component, ViewEncapsulation } from '@angular/core';
import { ChartTheme, Chart3DLoadedEventArgs } from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
import { Chart3DAllModule } from '@syncfusion/ej2-angular-charts';
import { load3DChartTheme } from './theme-color';

/**
 * 3D Chart Stacking Bar sample
 */
@Component({
    selector: 'control-content',
    templateUrl: 'stacked-bar.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [Chart3DAllModule]
})

export class StackingBarComponent {

    public dataSource: Object[] = [
        { x: 'Sochi 2014', America: 9, Canada: 10, France: 4, Germany: 8 },
        { x: 'Rio 2016', America: 46, Canada: 4, France: 10, Germany: 17 },
        { x: Browser.isDevice ? 'Pyeongchang<br> 2018' : 'Pyeongchang 2018', y: 9, America: 9, Canada: 11, France: 5, Germany: 14 },
        { x: 'Tokyo 2020', America: 39, Canada: 7, France: 10, Germany: 10 },
        { x: 'Beijing 2022', America: 8, Canada: 4, France: 5, Germany: 12 }
    ];

    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Category',
        labelPlacement: 'BetweenTicks'
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        edgeLabelPlacement: 'Shift',
        interval: Browser.isDevice ? 20 : 10
    };
    //Initializing 3D-Chart Title
    public title: string = 'Olympic Gold Medal Comparison';
    public width: string = Browser.isDevice ? '100%' : '75%';
    public tooltip: Object = { enable: true };
    public legendSettings: Object = { visible: true, enableHighlight: true };
    public enableRotation: boolean = true;
    public height: string = '400';
    public rotation: number = 22;
    public depth: number = 100;

    public load(args: Chart3DLoadedEventArgs): void {
        load3DChartTheme(args);
    };
    constructor() {
        // code
    };
}