import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, GaugeTheme, CircularGaugeModule } from '@syncfusion/ej2-angular-circulargauge';

@Component({
    selector: 'control-content',
    templateUrl: 'default-functionalities.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [CircularGaugeModule]
})

export class DefaultComponent {

    public ticks: Object = {
        offset: 5
    };

    public lineStyle: Object = {
        width: 8,
        color: '#E0E0E0'
    };

    public labelStyle: Object = {
        font: {
            fontFamily: 'inherit'
        },
        offset: -1
    };

    public animation: Object = {
        enable: true,
        duration: 500
    };

    public cap: Object = {
        radius: 8,
        color: '#c06c84',
        border: { width: 0 }
    };

    public tail: Object = {
        length: '0%',
    };

    public load(args: ILoadedEventArgs): void {
        /* custom code start */
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = <GaugeTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-high/i, 'High').replace(/5.3/i, '5');
        /* custom code end */
    }

    constructor() {
        // code
    };
}