import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, LinearGaugeTheme } from '@syncfusion/ej2-lineargauge';
import { LinearGaugeModule, AnnotationsService } from '@syncfusion/ej2-angular-lineargauge';

@Component({
    selector: 'control-content',
    templateUrl: 'progress-bar.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [LinearGaugeModule],
    providers: [AnnotationsService]
})

export class ProgressBarComponent {

    public container: Object = {
        width: 30,
        roundedCornerRadius: 20,
        backgroundColor: '#D6D6D6',
        type: 'RoundedRectangle',
        border: { width: 1 }
    }

    public axes: Object[] = [{
        minimum: 0,
        maximum: 100,
        line: {
            width: 0
        },
        pointers: [{
            value: 41,
            height: 30,
            width: 30,
            color: '#2196F3',
            type: 'Bar',
            roundedCornerRadius: 20
        }],
        majorTicks: {
            interval: 10, height: 0
        },
        minorTicks: {
            interval: 1, height: 0
        },
        labelStyle: {
            font: { size: '0px' }
        }
    }];

    public annotation: Object = [{
        content: '<div style="font-size: 15px;color: white;margin-top: 30px;margin-left:50%">41%</div>',
        axisIndex: 0,
        axisValue: 10,
        x: 0,
        y: 0, zIndex: '1',
    }];

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