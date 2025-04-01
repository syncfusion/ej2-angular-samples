import { Component, ViewEncapsulation } from '@angular/core';
import { CircularChart3DTheme } from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
import { CircularChart3DAllModule, CircularChart3DLoadedEventArgs } from '@syncfusion/ej2-angular-charts';
import { loadCircular3DChartTheme } from './theme-color';

/**
 * Circular Pie 3D Chart sample.
 */
@Component({
    selector: 'control-content',
    templateUrl: 'pie.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [CircularChart3DAllModule]
})

export class Pie {

    public dataSource: Object[] = [
        { 'x': 'Canada', y: 46, text: 'Canada: 46' },
        { 'x': 'Hungary', y: 30, text: 'Hungary: 30' },
        { 'x': 'Germany', y: 79, text: 'Germany: 79' },
        { 'x': 'Mexico', y: 13, text: 'Mexico: 13' },
        { 'x': 'China', y: 56, text: 'Greece: 26' },
        { 'x': 'India', y: 41, text: 'India: 41' },
        { 'x': 'Bangladesh', y: 25, text: 'Bangladesh: 25' },
        { 'x': 'United States', y: 32, text: 'United States: 32' },
        { 'x': 'Belgium', y: 34, text: 'Belgium: 34' }
    ];
    public radius: string = Browser.isDevice ? '45%' : '75%';
    public dataLabel: Object = {
        visible: true, position: 'Outside',
        name: 'x',
        font: { fontWeight: '600' },
        connectorStyle: { length: Browser.isDevice ? '20px' : '40px' }
    };
    public explodeOffset: string = Browser.isDevice ? '10%' : '30%';
    public load(args: CircularChart3DLoadedEventArgs): void {
        loadCircular3DChartTheme(args);
    };
    //Initializing Circular 3D-Chart Title
    public title: string = 'Berlin 2023 Special Olympics Gold Medals';
    public tooltip: Object = { enable: true, format: "<b>${point.x}</b><br> Gold Medals: <b>${point.y}</b>", header: "" };
    public legendSettings: Object = { visible: false};
    constructor() {
        // code
    };
}