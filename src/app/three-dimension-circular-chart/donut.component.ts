import { Component, ViewEncapsulation } from '@angular/core';
import { CircularChart3DTheme } from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
import { CircularChart3DAllModule, CircularChart3DLoadedEventArgs } from '@syncfusion/ej2-angular-charts';
import { loadCircular3DChartTheme } from './theme-color';

/**
 * Circular Donut 3D Chart sample. 
 */
@Component({
    selector: 'control-content',
    templateUrl: 'donut.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [CircularChart3DAllModule]
})

export class Donut {

    public dataSource: Object[] = [
        { x: 'Tesla', y: 137429 }, { x: 'Aion', y: 80308 }, { x: 'Wuling', y: 76418 }, { x: 'Changan', y: 52849 }, { x: 'Geely', y: 47234 }, { x: 'Nio', y: 31041 }, { x: 'Neta', y: 22449 }, { x: 'BMW', y: 18733 }
    ];
    public radius: string = Browser.isDevice ? '45%' : '75%';
    public dataLabel: Object = {
        visible: true,
        name: 'x',
        position: 'Outside',
        font: {
            fontWeight: '600',
        },
        connectorStyle: { length: Browser.isDevice ? '20px' : '40px' }
    };
    public load(args: CircularChart3DLoadedEventArgs): void {
        loadCircular3DChartTheme(args);
    };
    //Initializing circular 3D-Chart Title
    public title: string = 'Top Selling Electric Cars in China';
    public tooltip: Object = { enable: true, header: "${point.x}", format: 'Sales Count : <b>${point.y}' };
    public legendSettings: Object = { visible: false};
    constructor() {
        // code
    };
}