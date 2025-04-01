import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ChartTheme, Chart3DLoadedEventArgs } from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
import { Chart3DAllModule } from '@syncfusion/ej2-angular-charts';
import { load3DChartTheme } from './theme-color';

/**
 * 3D Chart Back to back column sample
 */
@Component({
    selector: 'control-content',
    templateUrl: 'back-to-back-column.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [Chart3DAllModule]
})

export class BacktoBackColumnComponent {

    public dataSource: Object[] = [
        { x: 'Jamesh', grapes: 1, orange: 4, apple: 5, total: 10, text: 'Total 10' },
        { x: 'Michael', grapes: 2, orange: 3, apple: 4, total: 9, text: 'Total 9' },
        { x: 'John', grapes: 2, orange: 4, apple: 5, total: 11, text: 'Total 11' },
        { x: 'Jack', grapes: 1, orange: 2, apple: 5, total: 8, text: 'Total 8' },
        { x: 'Lucas', grapes: 1, orange: 3, apple: 6, total: 10, text: 'Total 10' }
    ]
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Category', interval: 1,
        labelPlacement: 'BetweenTicks',
        labelRotation: -45
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        interval: Browser.isDevice ? 4 : 2
    };
    public load(args: Chart3DLoadedEventArgs): void {
        load3DChartTheme(args);
    };
    //Initializing 3D-Chart Title
    public title: string = 'Fruit Consumption by Individuals';
    public width: string = Browser.isDevice ? '100%' : '75%';
    public height: string = '400';
    public rotation: number = Browser.isDevice ? 5 : 25;
    public tooltip: Object = { enable: true };
    public enableSideBySidePlacement: boolean = false;
    public legendSettings: Object = { visible: true, enableHighlight: true };
    public depth: number = 500;
    constructor() {
        // code
    };
}