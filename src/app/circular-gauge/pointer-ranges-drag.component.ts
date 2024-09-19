import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { IPointerDragEventArgs, CircularGaugeComponent, ILoadedEventArgs, GaugeTheme, CircularGaugeModule, AnnotationsService } from '@syncfusion/ej2-angular-circulargauge';
import { CheckBox, ChangeEventArgs as CheckBoxChangeEvents } from '@syncfusion/ej2-buttons';
import { getRangeColor, Range } from '@syncfusion/ej2-circulargauge';
import { EmitType } from '@syncfusion/ej2-base';

@Component({
    selector: 'control-content',
    templateUrl: 'pointer-ranges-drag.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [CircularGaugeModule],
    providers: [AnnotationsService]
})

export class UserInteractionComponent {

    @ViewChild('circulargauge')
    public circulargauge: CircularGaugeComponent;

    public content: string = '<div style="font-size: 14px;color:#E5C31C;font-weight: lighter;font-style: oblique;"><span>';
    public contentOne: string = '<div style="font-size: 14px;color:#E5C31C;font-weight: lighter;font-style: oblique;"><span>70 MPH</span></div>';
    public pointerValue: number;
    public markerHeight: number = 20;
    public markerWidth: number = 20;
    public rangeWidth: number = 8;

    public lineStyle: Object = { width: 0 };
    public labelStyle: Object = {
        useRangeColor: true,
        font: {
            fontFamily: 'inherit'
        }
    };

    public majorTicks: Object = {
        useRangeColor: true
    };

    public minorTicks: Object = {
        useRangeColor: true
    };


    public cap: Object = {
        radius: 10, border: { width: 5, color: '#E5C31C' }
    };

    public tail: Object = {
        length: '0%', color: '#E5C31C'
    };

    public animation: Object = {
        enable: true, duration: 500
    };

    public dragMove(args: IPointerDragEventArgs): void {
        if (args.type.indexOf('pointer') > -1) {
            this.pointerValue = Math.round(args.currentValue);
            document.getElementById('pointerValue').innerHTML = this.pointerValue.toString();
            (<HTMLInputElement>document.getElementById('value')).value = this.pointerValue.toString();
            this.circulargauge.setAnnotationValue(0, 0, this.content + this.pointerValue + ' MPH</span></div>');
        }

    };

    public dragEnd(args: IPointerDragEventArgs): void {
        if (isNaN(args.rangeIndex)) {
            this.setPointersValue(this.circulargauge, Math.round(args.currentValue));
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

    public setPointersValue(circulargauge: CircularGaugeComponent, pointerValue: number): void {
        let color: string = getRangeColor(pointerValue, <Range[]>(circulargauge.axes[0].ranges), circulargauge.axes[0].pointers[0].color);
        circulargauge.axes[0].pointers[0].color = color;
        circulargauge.axes[0].pointers[1].color = color;
        circulargauge.axes[0].pointers[0].animation.enable = false;
        circulargauge.axes[0].pointers[1].animation.enable = false;
        circulargauge.axes[0].pointers[0].needleTail.color = color;
        circulargauge.axes[0].pointers[1].needleTail.color = color;
        circulargauge.axes[0].pointers[0].cap.border.color = color;
        circulargauge.axes[0].pointers[1].cap.border.color = color;
        circulargauge.setPointerValue(0, 1, pointerValue);
        circulargauge.setPointerValue(0, 0, pointerValue);
        this.content = '<div style="font-size: 14px;color:' + color + ';font-weight: lighter;font-style: oblique;"><span>';
        circulargauge.setAnnotationValue(0, 0, this.content + pointerValue + ' MPH</span></div>');
    }

    ngAfterViewInit(): void {
        let pointerDragChange: EmitType<CheckBoxChangeEvents>;
        let rangeDragChange: EmitType<CheckBoxChangeEvents>;
        document.getElementById('value').onpointermove = document.getElementById('value').ontouchmove =
            document.getElementById('value').onchange = () => {
                let value: number = parseInt((<HTMLInputElement>document.getElementById('value')).value, 10);
                document.getElementById('pointerValue').innerHTML = value.toString();
                this.setPointersValue(this.circulargauge, value);
            };

        let pointerDragCheckBox: CheckBox = new CheckBox({
            change: pointerDragChange, checked: true,
        }, '#enable');

        let rangeDragCheckBox: CheckBox = new CheckBox({
            change: rangeDragChange, checked: false
        }, '#rangedrag');

        pointerDragCheckBox.change = pointerDragChange = () => {
            let value: boolean = (<HTMLInputElement>document.getElementById('enable')).checked;
            this.circulargauge.enablePointerDrag = value;
        };
        rangeDragCheckBox.change = rangeDragChange = () => {
            let value: boolean = (<HTMLInputElement>document.getElementById('rangedrag')).checked;
            this.circulargauge.enableRangeDrag = value;
        };
    }

    constructor() {
        // code
    };
}