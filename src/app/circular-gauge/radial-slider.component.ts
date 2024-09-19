import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ILoadedEventArgs, GaugeTheme, IPointerDragEventArgs, CircularGaugeComponent, CircularGaugeModule, AnnotationsService } from '@syncfusion/ej2-angular-circulargauge';

@Component({
    selector: 'control-content',
    templateUrl: 'radial-slider.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [CircularGaugeModule],
    providers: [AnnotationsService]
})

export class RadialSliderComponent {

    @ViewChild('gauge')
    public gauge: CircularGaugeComponent;

    public pointerValue?: number;

    public ticks: Object = {
        height: 0
    };

    public lineStyle: Object = {
        width: 0
    };

    public labelStyle: Object = {
        font: {
            size: '0px'
        },
        offset: -1
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

    public dragMove(args: IPointerDragEventArgs): void {
        this.pointerValue = args.currentValue;
        if (this.pointerValue != null) {
            this.gauge.setPointerValue(0, 0, this.pointerValue);
            this.gauge.setRangeValue(0, 0, 0, this.pointerValue);
            this.gauge.setRangeValue(0, 1, this.pointerValue, 100);
            this.gauge.setAnnotationValue(0, 0, '<div style="font-style: oblique; margin-left: 8px;font-size: 20px;"><span>' + Math.ceil(this.pointerValue) + '%</span></div>');
        }
    }

    constructor() {
        // code
    };
}