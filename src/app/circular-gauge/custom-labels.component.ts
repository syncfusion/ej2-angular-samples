import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, IAxisLabelRenderEventArgs, GaugeTheme, CircularGaugeModule, GradientService } from '@syncfusion/ej2-angular-circulargauge';

@Component({
    selector: 'control-content',
    templateUrl: 'custom-labels.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [CircularGaugeModule],
    providers: [GradientService]
})

export class CustomLabelComponent {

    public textValues: string[] = ['0', '2', '5', '10', '20', '50', '100', '150', '200'];
    public needleStartWidth: number = 10;
    public needleEndWidth: number = 5;
    public pointerValue: number = 6.2;

    public majorTicks: Object = {
        width: 0,
        interval: 1
    };

    public minorTicks: Object = {
        width: 0
    };

    public lineStyle: Object = {
        width: 0
    };

    public rangeLinearGradient: Object = {
        startValue: '0%',
        endValue: '100%',
        colorStop: [
            { color: '#9e40dc', offset: '0%', opacity: 1 },
            { color: '#d93c95', offset: '70%', opacity: 1 },
        ]
    };

    public labelStyle: Object = {
        font: {
            fontFamily: 'inherit',
        },
        offset: 10
    };

    public animation: Object = {
        enable: false
    };

    public cap: Object = {
        radius: 0,
        border: { width: 0 }
    };

    public tail: Object = {
        length: '0%',
    };

    public pointerLinearGradient: Object = {
        startValue: '0%',
        endValue: '100%',
        colorStop: [
            { color: '#9e40dc', offset: '0%', opacity: 0.2 },
            { color: '#9e40dc', offset: '70%', opacity: 0.5 }]
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
        args.text = this.textValues[(args.value)];
    }

    constructor() {
        // code
    };
}