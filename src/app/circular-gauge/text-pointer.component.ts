import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, GaugeTheme, CircularGaugeModule } from '@syncfusion/ej2-angular-circulargauge';

@Component({
    selector: 'control-content',
    templateUrl: 'text-pointer.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [CircularGaugeModule]
})

export class TextPointerComponent {

    public ticks: Object = {
        width: 0
    };

    public lineStyle: Object = {
        width: 0
    };

    public labelStyle: Object = {
        font: {
            size: '0px'
        },
        offset: -5
    };

    public textStyle: Object = {
        size: '18px', fontFamily: 'inherit'
    };

    public cap: Object = {
        radius: 0
    };

    public animation: Object = {
        enable: false
    };

    public needleAnimation: Object = {
        enable: true
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