/**
 * Sample for Default linear gauge
 */
import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, LinearGaugeTheme } from '@syncfusion/ej2-lineargauge';

@Component({
    selector: 'control-content',
    templateUrl: 'default.html',
    encapsulation: ViewEncapsulation.None
})
export class DefaultComponent {
    // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = <LinearGaugeTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    }
    // custom code end
    //Initializing Axes
    public Axes: Object[] = [{
        pointers: [{
            value: 10,
            height: 15,
            width: 15,
            placement: 'Near',
            offset: -50,
            markerType: 'Triangle'
        }],
        majorTicks: {
            interval: 10
        },
        minorTicks: {
            interval: 2
        },
        labelStyle: {
            offset: 48
        }
    }];
    public Annotation: Object = [{
        content: '<div id="pointer" style="width:70px"><h1 style="font-size:14px;">10 MPH</h1></div>',
        axisIndex: 0,
        axisValue: 10,
        x: 10,
        y: -70, zIndex: '1',
    }];
    constructor() {
        // code
    };
}