import { Component, ViewEncapsulation } from '@angular/core';
import { ChartTheme, Chart3DLoadedEventArgs } from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
import { Chart3DAllModule } from '@syncfusion/ej2-angular-charts';
import { load3DChartTheme } from './theme-color';

/**
 * 3D Chart Stacking Column 100 sample
 */
@Component({
    selector: 'control-content',
    templateUrl: 'stacked-column-100.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [Chart3DAllModule]
})

export class StackingColumn100Component {

    public dataSource: Object[] = [
        { x: '2013', GeneralMotors: 9628912, Honda: 4298390, Suzuki: 2842133, BMW: 2006366 },
        { x: '2014', GeneralMotors: 9609326, Honda: 4513769, Suzuki: 3016710, BMW: 2165566 },
        { x: '2015', GeneralMotors: 7485587, Honda: 4543838, Suzuki: 3034081, BMW: 2279503 },
        { x: '2016', GeneralMotors: 7793066, Honda: 4999266, Suzuki: 2945295, BMW: 2359756 },
        { x: '2017', GeneralMotors: 6856880, Honda: 5235842, Suzuki: 3302336, BMW: 2505741 }
    ];

    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Category',
        labelPlacement: 'BetweenTicks'
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        rangePadding: 'None',
        interval: Browser.isDevice ? 25 : 20
    };
    //Initializing 3D-Chart Title
    public title: string = 'Motor Vehicle Production by Manufacturer';
    public width: string = Browser.isDevice ? '100%' : '75%';
    public tooltip: Object = { enable: true, format: '${point.x} : <b>${point.y} (${point.percentage}%)</b>' };
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
    constructor() {
        // code
    };
}