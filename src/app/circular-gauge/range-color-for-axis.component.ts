/**
 * Sample for range color for axis in the Circular Gauge
 */
import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, GaugeTheme } from '@syncfusion/ej2-angular-circulargauge';

@Component({
    selector: 'control-content',
    templateUrl: 'range-color-for-axis.html',
    encapsulation: ViewEncapsulation.None
})

export class RangeColorComponent {

    public majorTicks: Object = {
        position: 'Outside',
        width: 1,
        height: 25,
        interval: 10,
        useRangeColor: true
    };

    public minorTicks: Object = {
        position: 'Outside',
        width: 1,
        height: 8,
        interval: 2,
        useRangeColor: true
    };

    public lineStyle: Object = {
        width: 0
    };

    public labelStyle: Object = {
        font: {
            fontFamily: 'inherit',
        },
        offset: 2,
        position: 'Outside',
        useRangeColor: true,
        hiddenLabel: 'First'
    };

    public cap: Object = {
        radius: 0
    };

    public load(args: ILoadedEventArgs): void {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = <GaugeTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
        // custom code end
    }

    constructor() {
        // code
    };
}