import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { CircularGaugeComponent, ILoadedEventArgs, GaugeTheme } from '@syncfusion/ej2-angular-circulargauge';

/**
 * Sample for Pointers
 */
@Component({
    selector: 'control-content',
    templateUrl: 'pointers.html',
    encapsulation: ViewEncapsulation.None
})
export class PointersComponent {
    @ViewChild('fifthgauge')
    public fifthgauge: CircularGaugeComponent;
    public tooltipInterval1: number;
    public tooltipInterval2: number;

    @ViewChild('sixthgauge')
    public sixthgauge: CircularGaugeComponent;

    public lineStyle1: Object = { width: 3, color: '#ff5985' };
    //Initializing LabelStyle
    public labelStyle1: Object = {
        position: 'Outside',
        font: { size: '0px', color: '#ff5985' }
    };
    // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = <GaugeTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    }
    // custom code end
    public majorTicks1: Object = {
        width: 1,
        height: 0,
        interval: 100
    };
    public minorTicks1: Object = {
        height: 0,
        width: 0,
    };
    public pointers1: Object[] = [{
        type: 'RangeBar',
        value: 66,
        radius: '90%',
        color: '#ff5985',
        pointerWidth: 10,
        animation: { enable: true, duration: 1000 }

    }];

    public pointers2: Object[] = [{
        radius: '100%',
        value: 80,
        type: 'Marker',
        markerShape: 'InvertedTriangle',
        markerWidth: 15,
        markerHeight: 15,
        color: 'rgb(0,171,169)'

    }];

    public pointers3: Object[] = [{
        type: 'Marker',
        markerShape: 'Triangle',
        radius: '100%',
        animation: { enable: true, duration: 1000 },
        value: 70,
        markerWidth: 15,
        markerHeight: 15,
        color: '#1E7145',
        border: {
            width: 0,
            color: '#1E7145'
        }

    }];
    public pointers5: Object[] = [{
        radius: '100%',
        animation: { enable: true, duration: 900 },
        value: 70,
        color: '#923C99',
        pointerWidth: 6,
        cap: { radius: 0 },
        needleTail: { length: '4%', color: '#923C99' }

    }];
    public pointers6: Object[] = [{
        radius: '100%',
        animation: { enable: true, duration: 900 },
        value: 40,
        color: '#067bc2',
        pointerWidth: 6,
        cap: { radius: 0 },
        needleTail: { length: '4%', color: '#067bc2' }
    }, {
        radius: '100%',
        type: 'RangeBar',
        animation: { enable: true, duration: 900 },
        value: 40,
        color: '#067bc2',
        pointerWidth: 5

    }];
    public pointers4: Object[] = [{
        radius: '80%',
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
        markerWidth: 5, markerHeight: 5,
        animation: { duration: 1000 },
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
            color: '#ffb133'
        }
    }];
    public lineStyle2: Object = { width: 3, color: '#01aebe' };
    public labelStyle2: Object = {
        position: 'Outside',
        font: { size: '0px', color: '#01aebe' }
    };
    public lineStyle3: Object = { width: 3, color: '#1E7145' };
    public labelStyle3: Object = {
        position: 'Outside',
        font: { size: '0px', color: '#1E7145' }
    };
    public lineStyle4: Object = { width: 3, color: '#e3a21a' };
    public labelStyle4: Object = {
        position: 'Outside',
        font: { size: '0px', color: '#e3a21a' }
    };

    public lineStyle5: Object = { width: 3, color: '#9250e6' };
    public labelStyle5: Object = {
        position: 'Outside',
        font: { size: '0px', color: '#9250e6' }
    };
    public lineStyle6: Object = { width: 0 };
    public labelStyle6: Object = {
        position: 'Outside',
        font: { size: '0px', color: '#067bc2' }
    };

    ngAfterViewInit(): void {
        this.tooltipInterval1 = setInterval(
            (): void => {
                let newVal: number = Math.random() * (90 - 20) + 20;
                if (document.getElementById('container5')) {
                    this.fifthgauge.setPointerValue(0, 0, newVal);
                } else {
                    clearInterval(this.tooltipInterval1);
                }
            },
            1000
        );

        this.tooltipInterval2 = setInterval(
            (): void => {
                let newVal: number = Math.random() * (80 - 30) + 30;
                if (document.getElementById('container6')) {
                    this.sixthgauge.setPointerValue(0, 0, newVal);
                    this.sixthgauge.setPointerValue(0, 1, newVal);
                } else {
                    clearInterval(this.tooltipInterval1);
                }
            },
            1000
        );
    }
    constructor() {
        // code
    };
}