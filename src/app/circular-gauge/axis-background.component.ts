import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, GaugeTheme, CircularGaugeComponent, CircularGauge, IResizeEventArgs, CircularGaugeModule, AnnotationsService } from '@syncfusion/ej2-angular-circulargauge';

@Component({
    selector: 'control-content',
    templateUrl: 'axis-background.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [CircularGaugeModule],
    providers: [AnnotationsService]
})

export class AxisBackGroundComponent {

    public annotationGauge: CircularGaugeComponent;

    public ticks: Object = {
        width: 0
    };

    public lineStyle: Object = {
        width: 0
    };

    public labelStyle: Object = {
        format:'{value} %',
        font: {
            size: '0px'
        }
    };

    public cap: Object = {
        radius: 8,
        border: { width: 0 }
    };

    public tail: Object = {
        length: '25%',
    };

    public load(args: ILoadedEventArgs): void {
        /* custom code start */
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = <GaugeTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-high/i, 'High').replace(/5.3/i, '5');
        /* custom code end */
    }

    public resize(args: IResizeEventArgs): void {
        window.location.reload();
    }

    public loaded(args: ILoadedEventArgs): void {
        this.updateGauge();
    }

    public updateGauge(): void {
        let annotationGauge: CircularGauge = new CircularGauge({
            width: '600px',
            height: '450px',
            background: 'transparent',
            axes: [{
                labelStyle: { hiddenLabel: 'First', font: { fontFamily: 'inherit', color: 'White' } },
                majorTicks: { height: 15, interval: 30 },
                minorTicks: { height: 10, interval: 6 }, minimum: 0, maximum: 360,
                pointers: [{
                    value: 90,
                    description:'Marker pointer value : 90',
                    radius: '45%', markerWidth: 12, markerHeight: 12,
                    type: 'Marker', markerShape: 'Triangle', color: 'Orange',
                    animation: { enable: true, duration: 500 }
                }], startAngle: 0, endAngle: 0, radius: '60%', lineStyle: { width: 0 }
            }]
        });
        annotationGauge.appendTo('#subGauge');
    }

    constructor() {
        // code
    };
}
