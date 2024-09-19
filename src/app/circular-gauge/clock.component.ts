import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ILoadedEventArgs, GaugeTheme, CircularGaugeComponent, CircularGauge, IResizeEventArgs, CircularGaugeModule, AnnotationsService } from '@syncfusion/ej2-angular-circulargauge';

@Component({
    selector: 'control-content',
    templateUrl: 'clock.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [CircularGaugeModule],
    providers: [AnnotationsService]
})

export class ClockComponent {

    @ViewChild('gauge')
    public gauge: CircularGaugeComponent;

    public pointerInterval: Object;
    public annotationGaugeOne: CircularGaugeComponent;
    public annotationGaugeTwo: CircularGaugeComponent;
    public NeedlePointer: number = 0.2;
    public needleStartWidth: number = 1;
    public needleStartWidthOne: number = 2;

    public majorTicks: Object = {
        height: 15, width: 2, interval: 1, offset: 5
    };

    public minorTicks: Object = {
        height: 10, width: 1, interval: 0.2, offset: 5
    };

    public lineStyle: Object = {
        width: 2
    };

    public resize(args: IResizeEventArgs): void {
        window.location.reload();
    };

    public labelStyle: Object = {
        font: {
            fontFamily: 'inherit',
        },
        offset: 10,
        hiddenLabel: 'First'
    };

    public cap: Object = {
        radius: 5,
        color: 'white',
        border: { width: 1, color: '#00A8B5' }
    };

    public needleTail: Object = {
        length: '0%'
    };

    public needleTailOne: Object = {
        length: '25%', color: '#00A8B5'
    };

    public animation: Object = {
        enable: false,
    };

    public load(args: ILoadedEventArgs): void {
        /* custom code start */
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = <GaugeTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-high/i, 'High').replace(/5.3/i, '5');
        /* custom code end */
    }

    public loaded(args: ILoadedEventArgs): void {
        let annotationGaugeOne: CircularGauge = new CircularGauge({
            width: '150px',
            height: '150px',
            background: 'transparent',
            axes: [{
                labelStyle: { hiddenLabel: 'First', font: { fontFamily: 'inherit', size: '7px' }, offset: -5 },
                majorTicks: { interval: 2, offset: 2 },
                minorTicks: { interval: 0.4, offset: 2 }, minimum: 0, maximum: 12,
                pointers: [{
                    value: 5,
                    radius: '50%', pointerWidth: 2, color: '#00A8B5',
                    animation: { enable: false }, cap: { radius: 0 }, needleTail: { length: '0%' }
                }], startAngle: 0, endAngle: 0, radius: '70%', lineStyle: { width: 2 }
            }],
            load: function(args){
                let selectedTheme: string = location.hash.split('/')[1];
                selectedTheme = selectedTheme ? selectedTheme : 'Material';
                args.gauge.theme = <GaugeTheme>(selectedTheme.charAt(0).toUpperCase() +
                    selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-high/i, 'High').replace(/5.3/i, '5');
            }
        });
        annotationGaugeOne.appendTo('#subGaugeOne');

        let annotationGaugeTwo: CircularGauge = new CircularGauge({
            width: '150px',
            height: '150px',
            background: 'transparent',
            axes: [{
                labelStyle: { hiddenLabel: 'First', font: { fontFamily: 'inherit', size: '7px' }, offset: -5 },
                majorTicks: { offset: 2, interval: 2 },
                minorTicks: { offset: 2, interval: 0.4 }, minimum: 0, maximum: 12,
                pointers: [{
                    value: 8,
                    radius: '50%', pointerWidth: 2, color: '#00A8B5',
                    animation: { enable: false }, cap: { radius: 0 }, needleTail: { length: '0%' }
                }], startAngle: 0, endAngle: 0, radius: '70%', lineStyle: { width: 2 }
            }],
            load: function(args){
                let selectedTheme: string = location.hash.split('/')[1];
                selectedTheme = selectedTheme ? selectedTheme : 'Material';
                args.gauge.theme = <GaugeTheme>(selectedTheme.charAt(0).toUpperCase() +
                    selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-high/i, 'High').replace(/5.3/i, '5');
            }
        });
        annotationGaugeTwo.appendTo('#subGaugeTwo');

        let pointerInterval: Object = setInterval(
            (): void => {
                if (document.getElementById('clock')) {
                    if (this.NeedlePointer <= 12) {
                        this.gauge.setPointerValue(0, 2, this.NeedlePointer);
                        this.NeedlePointer += 0.2;
                    } else {
                        this.NeedlePointer = 0.2;
                    }
                } else {
                    clearInterval(+pointerInterval);
                }
            }, 1000)
    }

    constructor() {
        // code
    };
}