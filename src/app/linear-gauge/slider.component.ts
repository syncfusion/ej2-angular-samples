import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { LinearGaugeComponent, LinearGaugeModule, GaugeTooltipService } from '@syncfusion/ej2-angular-lineargauge';
import { ILoadedEventArgs, LinearGaugeTheme, IPointerDragEventArgs } from '@syncfusion/ej2-lineargauge';

@Component({
    selector: 'control-content',
    templateUrl: 'slider.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [LinearGaugeModule],
    providers: [GaugeTooltipService]
})

export class SliderComponent {
    @ViewChild('enableSliderGauge')
    private enableSliderGauge: LinearGaugeComponent;
    public tooltip: Object = {
        enable: true,
        showAtMousePosition: true,
        textStyle: { fontFamily: 'inherit' }
    };
    public enableSliderAxes: Object[] = [{
        minimum: 0,
        maximum: 100,
        opposedPosition: true,
        line: {
            width: 5,
            color: '#C2DEF8'
        },
        pointers: [
            {
                value: 50,
                height: 5,
                width: 5,
                placement: 'Center',
                color: '#0074E3',
                type: 'Bar',
                offset: 12,
                enableDrag: true
            },
            {
                value: 50,
                height: 15,
                width: 15,
                placement: 'Center',
                color: '#0074E3',
                offset: -10,
                markerType: 'Circle',
                enableDrag: true
            }
        ],
        majorTicks: {
            interval: 20, height: 0
        },
        minorTicks: {
            interval: 10, height: 0
        },
        labelStyle: {
            offset: 10,
            font: { fontFamily: 'inherit' }
        }
    }];

    public disableSliderAxes: Object[] = [{
        minimum: 0,
        maximum: 100,
        opposedPosition: true,
        line: {
            width: 5,
            color: '#E0E0E0'
        },
        pointers: [
            {
                value: 50,
                height: 5,
                width: 5,
                placement: 'Center',
                color: '#ADADAD',
                type: 'Bar',
                offset: 12,
                enableDrag: false
            },
            {
                value: 50,
                height: 15,
                width: 15,
                placement: 'Center',
                color: '#ADADAD',
                offset: -10,
                markerType: 'Circle',
                enableDrag: false
            },
        ],
        majorTicks: {
            interval: 20, height: 0
        },
        minorTicks: {
            interval: 10, height: 0
        },
        labelStyle: {
            offset: 10,
            font: { fontFamily: 'inherit' }
        }
    }];

    public titleStyle: Object = {
        fontFamily: 'inherit', fontWeight: 'normal'
    };

    public dragMove(args: IPointerDragEventArgs): void {
        if (args.pointerIndex == 1) {
            this.enableSliderGauge.setPointerValue(0, 0, args.currentValue);
        }
    }

    public load(args: ILoadedEventArgs): void {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = <LinearGaugeTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-high/i, 'High').replace(/5.3/i, '5');
        // custom code end
    }

    constructor() {
        // code
    };
}