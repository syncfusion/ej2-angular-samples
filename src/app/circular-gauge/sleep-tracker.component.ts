import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, GaugeTheme, IAxisLabelRenderEventArgs, CircularGaugeModule, AnnotationsService } from '@syncfusion/ej2-angular-circulargauge';

@Component({
    selector: 'control-content',
    templateUrl: 'sleep-tracker.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [CircularGaugeModule],
    providers: [AnnotationsService]
})

export class SleepTrackerComponent {

    public majorTicks: Object = {
        width: 2,
        height: 12,
        interval: 1,
        offset: 4
    };

    public minorTicks: Object = {
        width: 1,
        height: 7,
        interval: 0.2,
        offset: 4
    };

    public lineStyle: Object = {
        width: 0
    };

    public labelStyle: Object = {
        hiddenLabel: 'First',
        font: {
            fontFamily: 'inherit'
        }
    };

    public animation: Object = {
        enable: false
    };

    public load(args: ILoadedEventArgs): void {
        /* custom code start */
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = <GaugeTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-high/i, 'High').replace(/5.3/i, '5');
        /* custom code end */
    }

    public axisLabelRender(args: IAxisLabelRenderEventArgs): void {
        if (args.value == 3 || args.value == 6 || args.value == 9 || args.value == 12) {
            args.text = args.value.toString();
        }
        else {
            args.text = "";
        }
    }

    constructor() {
        // code
    };
}