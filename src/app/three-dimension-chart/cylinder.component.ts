import { Component, ViewEncapsulation } from '@angular/core';
import { ChartTheme, Chart3DLoadedEventArgs } from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
import { Chart3DPointRenderEventArgs, Chart3DAxisLabelRenderEventArgs, Chart3DAllModule } from '@syncfusion/ej2-angular-charts';
import { pointRender, load3DChartTheme } from './theme-color';

/**
 * 3D Chart Cylinder sample
 */
@Component({
    selector: 'control-content',
    templateUrl: 'cylinder.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [Chart3DAllModule]
})

export class CylinderComponent {

    public dataSource: Object[] = [
        { x: 'Czechia', y: 1.11 }, { x: 'Spain', y: 1.66 },
        { x: 'USA', y: 1.56 },{ x: 'Germany', y: 3.1 },
        { x: 'Russia', y: 1.35 },{ x: 'Slovakia', y: 1 },
        { x: 'South Korea', y: 3.16 },{ x: 'France', y: 0.92 }];

    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Category', interval: 1,
        labelPlacement: 'BetweenTicks',
        labelRotation: -45
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        maximum: 4,
        interval: 1
    };

    public rotation: number = 7;
    public tilt: number = 10;
    //Initializing 3D-Chart Title
    public title: string = 'Passenger Car Production in Selected Countries – 2021';
    public width: string = Browser.isDevice ? '100%' : '75%';
    public tooltip: Object = { enable: true, header: "${point.x}", format: 'Car Production : <b>${point.y}M' };
    public wallColor: string = 'transparent';
    public height: string = '400';
    public depth: number = 100;

    public load(args: Chart3DLoadedEventArgs): void {
        load3DChartTheme(args);
    };

    public axisLabelRender(args: Chart3DAxisLabelRenderEventArgs): void {
        if (args.axis.name === 'primaryYAxis') {
            args.text = args.text + 'M';
        }
    };

    public labelRender(args: Chart3DPointRenderEventArgs): void {
        pointRender(args);
    };
    constructor() {
        // code
    };
}