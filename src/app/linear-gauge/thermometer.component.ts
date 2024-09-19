import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, LinearGaugeTheme } from '@syncfusion/ej2-lineargauge';
import { LinearGaugeModule, AnnotationsService } from '@syncfusion/ej2-angular-lineargauge';

@Component({
    selector: 'control-content',
    templateUrl: 'thermometer.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [LinearGaugeModule],
    providers: [AnnotationsService]
})

export class ThermometerComponent {
    public axes: Object[] = [{
        minimum: -20,
        maximum: 50,
        pointers: [{
            value: 35,
            height: 12,
            width: 12,
            placement: 'Center',
            offset: 3,
            markerType: 'Triangle',
            color: '#0074E3'
        }],
        line: {
            width: 0
        },
        majorTicks: {
            height: 7, interval: 10
        },
        minorTicks: {
            height: 0, interval: 5
        },
        labelStyle: {
            font: { fontFamily: 'inherit' }
        }
    }, {
        minimum: 0,
        maximum: 120,
        opposedPosition: true,
        pointers: [{
            value: 94,
            height: 13,
            width: 13,
            type: 'Bar',
            color: '#0074E3'
        }],
        line: {
            width: 0
        },
        majorTicks: {
            height: 7, interval: 20
        },
        minorTicks: {
            height: 0, interval: 5
        },
        labelStyle: {
            font: { fontFamily: 'inherit' }
        }
    }];

    public annotation: Object = [
        {
            content: '<div style="font-size:13px;margin-left: -20px;margin-top: -30px;"> \u00b0C </div>',
            axisIndex: 0,
            axisValue: 50,
            x: 0,
            y: 0, zIndex: '1'
        },
        {
            content: '<div style="font-size:13px;margin-left: 18px;margin-top: -30px;"> \u00b0F </div>',
            axisIndex: 1,
            axisValue: 120,
            x: 12,
            y: 0, zIndex: '1'
        }
    ];

    public conatiner: Object = {
        width: 13, roundedCornerRadius: 5, type: 'Thermometer', border: { width: 1 }
    };

    public load(args: ILoadedEventArgs): void {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = <LinearGaugeTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-high/i, 'High').replace(/5.3/i, '5');
        // custom code end
    }

    constructor() {
        // code
    };
}