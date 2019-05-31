import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, GaugeTheme } from '@syncfusion/ej2-angular-circulargauge';

/**
 * Sample for default circular gauge
 */
@Component({
    selector: 'control-content',
    templateUrl: 'default.html',
    encapsulation: ViewEncapsulation.None
})
export class DefaultComponent {
    public ticks: Object = {
        width: 0
    };
    public lineStyle: Object = {
        width: 8
    };
    // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = <GaugeTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    }
    // custom code end
    //Initializing Label Style
    public labelStyle: Object = {
        font: {
            fontFamily: 'Roboto',
            size: '12px',
            fontWeight: 'Regular'
        },
        offset: -5
    };
    public cap: Object = {
        radius: 8,
        border: { width: 0 }
    };
    public tail: Object = {
        length: '25%',
    }
    constructor() {
        // code
    };
}