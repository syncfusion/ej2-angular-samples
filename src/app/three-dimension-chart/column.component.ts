import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ChartTheme, Chart3DLoadedEventArgs } from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
import { Chart3DPointRenderEventArgs, Chart3DAxisLabelRenderEventArgs, Chart3DAllModule } from '@syncfusion/ej2-angular-charts';
import { pointRender, load3DChartTheme } from './theme-color';

/**
 * 3D Chart Column sample
 */
@Component({
    selector: 'control-content',
    templateUrl: 'column.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [Chart3DAllModule]
})

export class ColumnComponent {

    public dataSource: Object[] = [
        { x: 'Tesla', y: 137429 },{ x: 'Aion', y: 80308 },
        { x: 'Wuling', y: 76418 }, { x: 'Changan', y: 52849 },
        { x: 'Geely', y: 47234 }, { x: 'Nio', y: 31041 },
        { x: 'Neta', y: 22449 }, { x: 'BMW', y: 18733 }];

    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Category',
        labelRotation:  -45,
        labelPlacement: 'BetweenTicks'
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        maximum: 150000,
        interval: 30000
    };
    //Initializing 3D-Chart Title
    public title: string = 'Top Selling Electric Cars in China';
    public width: string = Browser.isDevice ? '100%' : '75%';
    public tooltip: Object = { enable: true, header: "${point.x}", format: 'Sales Count : <b>${point.y}' };
    public legendSettings: Object = { visible: false };
    public enableRotation: boolean = true;
    public wallColor: string = 'transparent';
    public height: string = '400';
    public rotation: number = 7;
    public tilt:  number = 10;
    public depth: number = 100;

    public load(args: Chart3DLoadedEventArgs): void {
        load3DChartTheme(args);
    };

    public axisLabelRender(args: Chart3DAxisLabelRenderEventArgs): void {
        if (args.axis.name === 'primaryYAxis' && Number(args.text)) {
            let value: number = Number(args.text) / 1000;
            args.text = String(value) + 'k';
        }
    };

    public labelRender(args: Chart3DPointRenderEventArgs): void {
        pointRender(args);
    };
    constructor() {
        // code
    };
}