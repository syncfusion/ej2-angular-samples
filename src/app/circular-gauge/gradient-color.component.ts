/**
 * Sample for gradient color
 */
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { CircularGaugeComponent, ILoadedEventArgs, GaugeTheme, GradientService } from '@syncfusion/ej2-angular-circulargauge';
import { DropDownList } from '@syncfusion/ej2-dropdowns';

@Component({
    selector: 'control-content',
    templateUrl: 'gradient-color.html',
    encapsulation: ViewEncapsulation.None,
    providers: [GradientService]
})
export class GradientColorComponent {
    @ViewChild('gauge')
    public circulargauge: CircularGaugeComponent;
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = <GaugeTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    }
    public rangeLinearGradient: object = {
        startValue: '0%',
        endValue: '100%',
        colorStop: [
            { color: '#9E40DC', offset: '0%', opacity: 0.9 },
            { color: '#E63B86', offset: '70%', opacity: 0.9 },
        ]
    };
    public pointerLinearGradient: Object = {
        startValue: '0%',
        endValue: '100%',
        colorStop: [
            { color: '#FEF3F9', offset: '0%', opacity: 0.9 },
            { color: '#E63B86', offset: '70%', opacity: 0.9 }]
    };
    public rangeRadialGradient: object = {
        radius: '50%',
        innerPosition: { x: '50%', y: '50%' },
        outerPosition: { x: '50%', y: '50%' },
        colorStop: [
            { color: '#9E40DC', offset: '90%', opacity: 0.9 },
            { color: '#E63B86', offset: '160%', opacity: 0.9 }]
    };
    public pointerRadialGradient: object = {
        radius: '50%',
        innerPosition: { x: '50%', y: '50%' },
        outerPosition: { x: '50%', y: '50%' },
        colorStop: [
            { color: '#FEF3F9', offset: '0%', opacity: 0.9 },
            { color: '#E63B86', offset: '60%', opacity: 0.9 }]
    };
    public minorTicks: Object = {
        width: 0
    };
    public majorTicks: Object = {
        width: 0, interval: 10
    };
    public ticks: Object = {
        width: 0
    };
    public lineStyle: Object = {
        width: 0
    };
    public startAngle: Object = 210;
    public endangle: Object = 150;
    public minimum: Object = 0;
    public maximum: Object = 100;
    public radius: Object = '80%';
    public labelStyle: Object = {
        font: {
            fontFamily: 'Roboto',
            size: '12px',
            fontWeight: 'Regular'
        },
        offset: 10
    };
    public pointers: Object[] = [{
        animation: { enable: false }, value: 65, radius: '85%', color: '#E63B86',
        pointerWidth: 12,
        cap: { radius: 12, border: { color: '#E63B86', width: 2.5 }, color: 'white' },
        needleTail: { length: '0%' },
        needleStartWidth: 2
    }];
    public ranges: Object[] = [{
        start: 0, end: 120, startWidth: 18, endWidth: 18, color: '#E63B86',
        linearGradient: this.rangeLinearGradient,
        roundedCornerRadius: 10
    }];
    public gradientType: DropDownList; public element: DropDownList;
    ngOnInit(): void {
        this.gradientType = new DropDownList({
            index: 0,
            width: 145,
            change: () => {
                if (this.gradientType.value === '1' && this.element.value === '0') {
                    this.circulargauge.axes[0].ranges[0].linearGradient = null;
                    this.circulargauge.axes[0].ranges[0].radialGradient = this.rangeRadialGradient;
                    this.circulargauge.refresh();
                }
                if (this.element.value === '0' && this.gradientType.value === '0') {
                    this.circulargauge.axes[0].ranges[0].linearGradient = this.rangeLinearGradient;
                    this.circulargauge.axes[0].ranges[0].radialGradient = null;
                    this.circulargauge.refresh();
                }
                if (this.gradientType.value === '1' && this.element.value === '1') {
                    this.circulargauge.axes[0].pointers[0].radialGradient = this.pointerRadialGradient;
                    this.circulargauge.axes[0].pointers[0].linearGradient = null;
                    this.circulargauge.refresh();
                }
                if (this.gradientType.value === '0' && this.element.value === '1') {
                    this.circulargauge.axes[0].pointers[0].linearGradient = this.pointerLinearGradient;
                    this.circulargauge.axes[0].pointers[0].radialGradient = null;
                    this.circulargauge.refresh();
                }
            }
        });
        this.gradientType.appendTo('#gradientType');
        this.element = new DropDownList({
            index: 0,
            width: 145,
            change: () => {
                if (this.gradientType.value === '1' && this.element.value === '0') {
                    this.circulargauge.axes[0].ranges[0].linearGradient = null;
                    this.circulargauge.axes[0].ranges[0].radialGradient = this.rangeRadialGradient;
                    this.circulargauge.axes[0].pointers[0].linearGradient = null;
                    this.circulargauge.axes[0].pointers[0].radialGradient = null;
                    this.circulargauge.refresh();
                }
                if (this.element.value === '0' && this.gradientType.value === '0') {
                    this.circulargauge.axes[0].ranges[0].linearGradient = this.rangeLinearGradient;
                    this.circulargauge.axes[0].ranges[0].radialGradient = null;
                    this.circulargauge.axes[0].pointers[0].linearGradient = null;
                    this.circulargauge.axes[0].pointers[0].radialGradient = null;
                    this.circulargauge.refresh();
                }
                if (this.gradientType.value === '1' && this.element.value === '1') {
                    this.circulargauge.axes[0].pointers[0].radialGradient = this.pointerRadialGradient;
                    this.circulargauge.axes[0].pointers[0].linearGradient = null;
                    this.circulargauge.axes[0].ranges[0].linearGradient = null;
                    this.circulargauge.axes[0].ranges[0].radialGradient = null;
                    this.circulargauge.refresh();
                }
                if (this.gradientType.value === '0' && this.element.value === '1') {
                    this.circulargauge.axes[0].pointers[0].linearGradient = this.pointerLinearGradient;
                    this.circulargauge.axes[0].pointers[0].radialGradient = null;
                    this.circulargauge.axes[0].ranges[0].linearGradient = null;
                    this.circulargauge.axes[0].ranges[0].radialGradient = null;
                    this.circulargauge.refresh();
                }
            }
        });
        this.element.appendTo('#element');
    }
    constructor() {
        // code
    }
}