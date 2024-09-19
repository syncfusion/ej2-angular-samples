/* custom code start */
// tslint:disable
/* custom code end */

import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { CircularGaugeComponent, ILoadedEventArgs, GaugeTheme, CircularGaugeModule, AnnotationsService } from '@syncfusion/ej2-angular-circulargauge';
import { Slider, SliderChangeEventArgs } from '@syncfusion/ej2-inputs';

let sliderValue: number = 60;

@Component({
    selector: 'control-content',
    templateUrl: 'arc-gauge.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [CircularGaugeModule],
    providers: [AnnotationsService]
})

export class ArcGaugeComponent {

    @ViewChild('circulargauge')
    public circulargauge: CircularGaugeComponent;

    public titleStyle: Object = { fontFamily: 'inherit' };
    public title: string = 'Progress Tracker';

    public lineStyle: Object = {
        width: 0
    };

    public labelStyle: Object = {
        position: 'Inside', useRangeColor: true,
        font: { size: '0px', fontFamily: 'inherit' }
    };

    public ranges: Object[] = [
        {
            start: 0, end: 100,
            radius: '90%',
            startWidth: 30, endWidth: 30,
            color: '#E0E0E0',
            roundedCornerRadius: 20
        },
    ];

    public pointers: Object[] = [{
        roundedCornerRadius: 20,
        value: 60,
        type: 'RangeBar',
        radius: '90%',
        color: '#e5ce20',
        border: {
            width: 0
        },
        animation: {
            enable: false
        },
        pointerWidth: 30
    }];

    public majorTicks: Object = {
        height: 0,
    };

    public minorTicks: Object = {
        height: 0
    };

    public tail: Object = {
        length: '18%', color: '#757575'
    };

    public pointerCap: Object = {
        radius: 7, color: '#757575'
    };

    public annotaions: Object = [{
        description:'RangeBar pointer value from the slider',
        content: '<div id="pointervalue" style="font-size:35px;width:120px;text-align:center;">' +
            sliderValue.toString() + '/100</div>',
        angle: 0,
        zIndex: '1',
        radius: '0%'
    }, {
        description: 'Slider',
        content: '<div id="slider" style="height:70px;width:250px;"></div>',
        angle: 0,
        zIndex: '1',
        radius: '-100%'
    }];

    public load(args: ILoadedEventArgs): void {
        /* custom code start */
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = <GaugeTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-high/i, 'High').replace(/5.3/i, '5');
        /* custom code end */
    }

    public loaded(args: ILoadedEventArgs): void {
        let annotation: Element = document.getElementById(args.gauge.element.id + '_Annotations_0');
        if (annotation) {
            this.annotationRender('slider', this.circulargauge.axes[0].pointers[0].value);
            if (document.getElementById('pointervalue')) {
                document.getElementById('pointervalue').innerHTML = this.circulargauge.axes[0].pointers[0].value.toString() + '/100';
            }
        }
    };

    public annotationRender(id: string, sliderValue: number): void {
        let first: Slider = new Slider({
            min: 0, max: 100,
            type: 'MinRange',
            limits: { enabled: true, minStart: 0, minEnd: 100 },
            value: sliderValue,
            change: (args: SliderChangeEventArgs) => {
                sliderValue = args.value as number;
                if (!isNaN(sliderValue)) {
                    this.circulargauge['isProtectedOnChange'] = true;
                    if (sliderValue >= 0 && sliderValue < 20) {
                        this.circulargauge.axes[0].pointers[0].color = '#ea501a';
                    } else if (sliderValue >= 20 && sliderValue < 40) {
                        this.circulargauge.axes[0].pointers[0].color = '#f79c02';
                    } else if (sliderValue >= 40 && sliderValue < 60) {
                        this.circulargauge.axes[0].pointers[0].color = '#e5ce20';
                    } else if (sliderValue >= 60 && sliderValue < 80) {
                        this.circulargauge.axes[0].pointers[0].color = '#a1cb43';
                    } else if (sliderValue >= 80 && sliderValue < 100) {
                        this.circulargauge.axes[0].pointers[0].color = '#82b944';
                    }
                    this.circulargauge.setPointerValue(0, 0, sliderValue);
                    if (document.getElementById('pointervalue')) {
                        document.getElementById('pointervalue').innerHTML = this.circulargauge.axes[0].pointers[0].value.toString() + '/100';
                    }
                }
            }
        });
        first.appendTo('#' + id);
    }

    constructor() {
        // code
    };
}