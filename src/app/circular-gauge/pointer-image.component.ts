import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, GaugeTheme } from '@syncfusion/ej2-angular-circulargauge';

/**
 * Sample for pointer image in circular gauge
 */

@Component({
    selector: 'control-content',
    templateUrl: 'pointer-image.html',
    encapsulation: ViewEncapsulation.None
})
export class PointerImageComponent {
    public font1: Object = {
        size: '15px',
        color: '#00CC66'
    };
    public rangeWidth: number= 25;
    //Initializing titleStyle
    public titleStyle: Object = { size: '18px' };
    public title: string = 'Short Put Distance';
    public font2: Object = {
        size: '15px',
        color: '#fcde0b'
    };
    // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = <GaugeTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    }
    // custom code end
    public value4: number = 0.1;
    public font3: Object = {
        size: '15px',
        color: '#ff5985'
    };

    public font4: Object = {
        size: '15px',
        color: '#00BFFF'
    };

    public animation1: Object = { duration: 1500 };
    public animation2: Object = { duration: 1200 };
    public animation3: Object = { duration: 900 };
    public animation4: Object = { duration: 0 };
    public markerWidth: number = 28;
    public markerHeight: number = 28;
    public value:  number = 12;
    public value1: number = 11;
    public value2: number = 10;
    public value3: number = 12;
    public markerWidth1: number = 90;
    public markerHeight1: number = 90;
    public lineStyle: Object = { width: 0, color: '#1d1d1d' };
    public labelStyle: Object = { font: { size: '0px' } };
    public majorTicks: Object = { interval: 20, width: 0 };
    public minorTicks: Object = { width: 0 };

    constructor() {
        // code
    };

}