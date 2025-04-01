import { Component, ViewEncapsulation } from '@angular/core';
import { ChartTheme, Chart3DLoadedEventArgs, Chart3DAxisLabelRenderEventArgs } from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
import { Chart3DAllModule } from '@syncfusion/ej2-angular-charts';
import { load3DChartTheme } from './theme-color';

/**
 * 3D Chart Stacking Column sample 
 */
@Component({
    selector: 'control-content',
    templateUrl: 'stacked-column.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [Chart3DAllModule]
})

export class StackingColumnComponent {

    public dataSource: Object[] = [
        { x: '2018', Iran: 24.5, Indonesia: 6.2, Italy: 24.5, France: 15.4 },
        { x: '2019', Iran: 25.6, Indonesia: 15.6, Italy: 23.2, France: 21.1 },
        { x: '2020', Iran: 29, Indonesia: 14.3, Italy: 20.4, France: 13.9 },
        { x: '2021', Iran: 28.5, Indonesia: 9.3, Italy: 23.2, France: 11.6 },
        { x: '2022', Iran: 30.6, Indonesia: 7.8, Italy: 24.5, France: 14.4 }
    ];

    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Category',
        interval: 1,
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        maximum: Browser.isDevice ? 50 : 60,
        interval: Browser.isDevice ? 25 : 10
    };
    //Initializing 3D-Chart Title
    public title: string = 'Steel Production by Countries, Grouped by Continent';
    public width: string = Browser.isDevice ? '100%' : '75%';
    public tooltip: Object = { enable: true, format: '${point.x} : <b>${point.y} Mmt' };
    public legendSettings: Object = { visible: true, enableHighlight: true };
    public enableRotation: boolean = true;
    public wallColor: string = 'transparent';
    public height: string = '400';
    public rotation: number = 7;
    public tilt:  number = 10;
    public depth: number = 100;

    public load(args: Chart3DLoadedEventArgs): void {
        load3DChartTheme(args);
    };

    public axisLabelRender(args: Chart3DAxisLabelRenderEventArgs) {
        if (args.axis.name === 'primaryYAxis') {
            args.text = args.text + ' Mmt';
        }
    }
    constructor() {
        // code
    };
}