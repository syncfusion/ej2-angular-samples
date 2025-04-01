import { Component, ViewEncapsulation } from '@angular/core';
import { CircularChart3DTheme } from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
import { CircularChart3DAllModule, CircularChart3DLoadedEventArgs } from '@syncfusion/ej2-angular-charts';
import { loadCircular3DChartTheme } from './theme-color';

/**
 * Circular 3D Chart with various radius sample. 
 */
@Component({
    selector: 'control-content',
    templateUrl: 'pie-radius.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [CircularChart3DAllModule]
})

export class PieRadius {

    public dataSource: Object[] = [
        { x: 'Belgium', y: 551500, r: Browser.isDevice ? '120' : '110.7', text: 'Belgium' },
        { x: 'Dominican Republic', y: 312685, r: '137.5', text: 'Dominican Republic' },
        { x: 'Cuba', y: 350000, r: '124.6', text: 'Cuba' },
        { x: 'Egypt', y: 301000, r: Browser.isDevice ? '130.8' : '150.8', text: 'Egypt' },
        { x: 'Kazakhstan', y: 300000, r: Browser.isDevice ? '135.5' : '155.5', text: 'Kazakhstan' },
        { x: 'Somalia', y: 357022, r: Browser.isDevice ? '104.6' : '160.6', text: 'Somalia' },
        { x: 'Argentina', y: 505370, r: Browser.isDevice ? '110' : '100', text: 'Argentina' },
    ];
    public animation: Object = { enable: false };
    public dataLabel: Object = {
        visible: true, position: Browser.isDevice ? 'Inside' : 'Outside',
        name: 'text', enableRotation: true,
        font: { fontWeight: '600' },
        connectorStyle: { length: '20px' }
    };
    public load(args: CircularChart3DLoadedEventArgs): void {
        loadCircular3DChartTheme(args);
    };
    //Initializing Circular 3D-Chart Title
    public title: string = 'Population Density per Square Kilometer by Country';
    public tooltip: Object = { enable: true, format: '<b>${point.x}</b><br/>Area in square km: <b>${point.y} </b> <br/> Population density per square km: <b>${point.tooltip}</b>' };
    public legendSettings: Object = {
        visible: true,
        reverse: true
    };
    public rotation: number = 15;
    constructor() {
        // code
    };
}