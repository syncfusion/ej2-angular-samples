import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ILoadedEventArgs, IPointerDragEventArgs, GaugeTheme } from '@syncfusion/ej2-circulargauge';
import { CircularGaugeComponent, CircularGaugeModule, GaugeTooltipService } from '@syncfusion/ej2-angular-circulargauge';

@Component({
    selector: 'control-content',
    templateUrl: 'tooltip.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [CircularGaugeModule],
    providers: [GaugeTooltipService]
})

export class TooltipComponent {

    @ViewChild('tooltipContainer')
    public circulargauge: CircularGaugeComponent;

    public title: string = 'Tooltip Customization';
    public rangeWidth: number = 10;

    public cap: Object = {
        radius: 10,
        border: { color: '#33BCBD', width: 5 }
    };

    public animation: Object = {
        enable: true,
        duration: 1500
    };

    public titleStyle: Object = {
        size: '15px',
        color: 'grey'
    };

    public majorTicks: Object = {
        color: 'white', offset: -4, height: 10
    };

    public minorTicks: Object = {
        width: 0
    };

    public labelStyle: Object = {
        useRangeColor: true, font: { color: '#424242', size: '13px', fontFamily: 'inherit' }
    };

    public lineStyle: Object = { width: 0 };

    public tooltip: Object = {
        enable: true,
        type: ['Range', 'Pointer'],
        showAtMousePosition: true,
        format: 'Current Value:  {value}',
        enableAnimation: false,
        textStyle: {
            size: '13px',
            fontFamily: 'inherit'
        },
        rangeSettings: {
            showAtMousePosition: true, format: "Start Value: {start} <br/> End Value: {end}", textStyle: {
                size: '13px',
                fontFamily: 'inherit'
            }
        }
    };

    public load(args: ILoadedEventArgs): void {
        /* custom code start */
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = <GaugeTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-high/i, 'High').replace(/5.3/i, '5');
        /* custom code end */
    }

    public dragEnd(args: IPointerDragEventArgs): void {
        if (args.currentValue >= 0 && args.currentValue <= 50) {
            args.pointer.color = '#3A5DC8';
            args.pointer.cap.border.color = '#3A5DC8';
        } else {
            args.pointer.color = '#33BCBD';
            args.pointer.cap.border.color = '#33BCBD';
        }
        args.pointer.value = args.currentValue;
        args.pointer.animation.enable = false;
        this.circulargauge.refresh();
    }

    constructor() {
        // code
    };
}
