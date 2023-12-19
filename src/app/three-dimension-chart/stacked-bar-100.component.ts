import { Component, ViewEncapsulation } from '@angular/core';
import { ChartTheme, Chart3DLoadedEventArgs } from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';

/**
 * 3D Chart Stacking Bar sample
 */
@Component({
    selector: 'control-content',
    templateUrl: 'stacked-bar-100.html',
    encapsulation: ViewEncapsulation.None
})

export class StackingBar100Component {

    public dataSource: Object[] = [
        { x: '2013', y: 9628912, y1: 4298390, y2: 2842133, y3: 2006366 },
        { x: '2014', y: 9609326, y1: 4513769, y2: 3016710, y3: 2165566 },
        { x: '2015', y: 7485587, y1: 4543838, y2: 3034081, y3: 2279503 },
        { x: '2016', y: 7793066, y1: 4999266, y2: 2945295, y3: 2359756 },
        { x: '2017', y: 6856880, y1: 5235842, y2: 3302336, y3: 2505741 }
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
    public title: string = 'Motor Vehicle Production by Manufacturer';
    public width: string = Browser.isDevice ? '100%' : '70%';
    public tooltip: Object = { enable: true, format: '${point.x} : <b>${point.y} (${point.percentage}%)</b>' };
    public legendSettings: Object = { visible: true, enableHighlight: true };
    public enableRotation: boolean = true;
    public height: string = '400';
    public rotation: number = 22;
    public depth: number = 100;
    
    public load(args: Chart3DLoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
    };
    constructor() {
        // code
    };
}