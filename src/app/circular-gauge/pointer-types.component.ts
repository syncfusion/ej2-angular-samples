import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { CircularGaugeComponent, ILoadedEventArgs, GaugeTheme, CircularGaugeModule, AnnotationsService } from '@syncfusion/ej2-angular-circulargauge';

@Component({
    selector: 'control-content',
    templateUrl: 'pointer-types.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [CircularGaugeModule],
    providers: [AnnotationsService]
})

export class PointersComponent {

    @ViewChild('needlePointer')
    public needlePointerGauge: CircularGaugeComponent;
    @ViewChild('liveUpdate')
    public liveUpdateGauge: CircularGaugeComponent;

    public needleInterval: number;
    public liveUpdateInterval: number;

    public lineStyleRangeBar: Object = {
        width: 3,
        color: '#ff5985'
    };

    public labelStyleRangeBar: Object = {
        position: 'Outside',
        format: '$ {value}',
        font: { size: '0px' }
    };

    public majorTicks: Object = {
        height: 0,
        interval: 100
    };

    public minorTicks: Object = {
        height: 0,
        width: 0
    };

    public pointerRangeBar: Object[] = [{
        type: 'RangeBar',
        value: 66,
        radius: '90%',
        color: '#ff5985',
        pointerWidth: 10,
        animation: { enable: true, duration: 1000 }

    }];

    public pointerMarker: Object[] = [{
        radius: '100%',
        value: 80,
        type: 'Marker',
        description: 'Marker pointer value : 80',
        markerShape: 'InvertedTriangle',
        markerWidth: 15,
        markerHeight: 15,
        color: 'rgb(0,171,169)'

    }];

    public pointerCustomized: Object[] = [{
        animation: { enable: true, duration: 1000 },
        value: 80,
        description: 'Needle pointer value : 80',
        radius: '80%',
        color: 'green',
        pointerWidth: 2,
        needleStartWidth: 4,
        needleEndWidth: 4,
        cap: {
            radius: 8,
            color: 'green'
        },
        needleTail: {
            length: '0%'
        }
    }];

    public pointerNeedle: Object[] = [{
        radius: '100%',
        description: 'Needle pointer value: 80',
        animation: { enable: true, duration: 900 },
        value: 80,
        color: '#923C99',
        pointerWidth: 6,
        cap: { radius: 0 },
        needleTail: { length: '4%', color: '#923C99' }

    }];

    public pointerUpdate: Object[] = [{
        radius: '100%',
        description: 'Needle pointer value: 40',
        animation: { enable: false, duration: 100 },
        value: 40,
        color: '#067bc2',
        pointerWidth: 6,
        cap: { radius: 0 },
        needleTail: { length: '4%', color: '#067bc2' }
    }, {
        description: 'RangeBar pointer value: 40',
        radius: '100%',
        type: 'RangeBar',
        animation: { enable: false, duration: 100 },
        value: 40,
        color: '#067bc2',
        pointerWidth: 5

    }];

    public pointerMultiple: Object[] = [{
        radius: '60%',
        value: 80,
        markerWidth: 5,
        markerHeight: 5,
        animation: { enable: true, duration: 1000 },
        color: '#e3a21a',
        pointerWidth: 10,
        cap: {
            radius: 8,
            color: 'white',
            border: {
                color: '#e3a21a',
                width: 1
            }
        },
        needleTail: {
            length: '20%',
            color: '#e3a21a'
        }
    }, {
        radius: '60%', value: 40,
        description: 'Needle pointer value :40',
        markerWidth: 5, markerHeight: 5,
        animation: { enable: true, duration: 1000 },
        color: '#ffb133',
        pointerWidth: 10,
        cap: {
            radius: 8, color: 'white',
            border: {
                color: '#ffb133',
                width: 1
            }
        },
        needleTail: {
            length: '20%',
            color: '#e3a21a'
        }
    }];

    public lineStyleMarker: Object = {
        width: 3,
        color: '#01aebe'
    };

    public labelStyleMarker: Object = {
        format:'{value}%',
        position: 'Outside',
        font: { size: '0px' }
    };

    public lineStyleCustomized: Object = {
        width: 3,
        color: '#1E7145'
    };

    public labelStyleCustomized: Object = {
        position: 'Outside',
        format:'${value}',
        font: { size: '0px', color: '#1E7145' }
    };

    public lineStyleMultiple: Object = {
        width: 3,
        color: '#e3a21a'
    };

    public labelStyleMultiple: Object = {
        position: 'Outside',
        format:'{value} s',
        font: { size: '0px', color: '#e3a21a' }
    };

    public lineStyleNeedle: Object = {
        width: 3,
        color: '#9250e6'
    };

    public labelStyleNeedle: Object = {
        position: 'Outside',
        format: '{value}',
        font: { size: '0px', color: '#9250e6' }
    };

    public lineStyleUpdate: Object = {
        width: 0
    };

    public labelStyleUpdate: Object = {
        position: 'Outside',
        format:'{value} seconds',
        font: { size: '0px', color: '#067bc2' }
    };

    public load(args: ILoadedEventArgs): void {
        /* custom code start */
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = <GaugeTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-high/i, 'High').replace(/5.3/i, '5');
        /* custom code end */
    }

    ngAfterViewInit(): void {
        this.needleInterval = window.setInterval(
            (): void => {
                let newVal: number = Math.random() * (90 - 20) + 20;
                if (document.getElementById('needlePointer')) {
                    this.needlePointerGauge.setPointerValue(0, 0, newVal);
                } else {
                    clearInterval(this.needleInterval);
                }
            },
            1000
        );

        this.liveUpdateInterval = window.setInterval(
            (): void => {
                let newVal: number = Math.random() * (80 - 30) + 30;
                if (document.getElementById('liveUpdate')) {
                    this.liveUpdateGauge.setPointerValue(0, 0, newVal);
                    this.liveUpdateGauge.setPointerValue(0, 1, newVal);
                } else {
                    clearInterval(this.needleInterval);
                }
            },
            1000
        );
    }

    constructor() {
        // code
    };
}