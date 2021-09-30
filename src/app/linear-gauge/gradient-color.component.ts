/**
 * Sample for containers
 */
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { LinearGaugeComponent } from '@syncfusion/ej2-angular-lineargauge';
import { ILoadedEventArgs, LinearGaugeTheme } from '@syncfusion/ej2-lineargauge';
import { DropDownList } from '@syncfusion/ej2-dropdowns';

@Component({
    selector: 'control-content',
    templateUrl: 'gradient-color.html',
    encapsulation: ViewEncapsulation.None
})
export class GradientColorComponent {
    @ViewChild('gauge')
    public gauge: LinearGaugeComponent;
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = <LinearGaugeTheme>(selectedTheme.charAt(0).toUpperCase() +
        selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i,  'Contrast');
    }
    
    public rangeLinearGradient: object = {
        startValue: '0%',
        endValue: '100%',
        colorStop: [{ color: '#fef3f9', offset: '0%', opacity: 1 },
        { color: '#f54ea2', offset: '100%', opacity: 1 }
        ]};

    public rangeRadialGradient: object = {
        radius: '65%',
        outerPosition: { x: '50%', y: '70%' },
        innerPosition: { x: '60%', y: '60%' },
        colorStop: [{ color: '#fff5f5', offset: '5%', opacity: 0.9 },
        { color: '#f54ea2', offset: '100%', opacity: 0.9 }
        ]};

    public pointerLinearGradient: object = {
        startValue: '0%',
        endValue: '100%',
        colorStop: [{ color: '#fef3f9', offset: '0%', opacity: 1 },
        { color: '#f54ea2', offset: '100%', opacity: 1 }
        ]};

    public pointerRadialGradient: object = {
        radius: '60%',
        outerPosition: { x: '50%', y: '50%' },
        innerPosition: { x: '50%', y: '50%' },
        colorStop: [{ color: '#fff5f5', offset: '0%', opacity: 0.9 },
        { color: '#f54ea2', offset: '100%', opacity: 0.8 }
        ]};
    public container: object = {
        width: 30, offset: 30
        };

    public axes: Object[] = [{
        minimum: 0,
        maximum: 100,
        line: {
            width: 0
        },
        majorTicks: {
            interval: 25,
            height: 0
        },
        minorTicks: {
            height: 0
        },
        labelStyle: {
            offset: 55
        },
        pointers: [
            {
                value: 80, height: 25,
                width: 35, placement: 'Near',
                offset: -44, markerType: 'Triangle',
                color: '#f54ea2',
            }
        ],
        ranges: [{
            start: 0, end: 80,
            startWidth: 30, endWidth: 30,
            color: '#f54ea2', offset: 30,
            linearGradient: this.rangeLinearGradient,
        }]
    }];
    public gradientType: DropDownList; public element: DropDownList;
    ngOnInit(): void {
        this.gradientType = new DropDownList({
            index: 0, width: '100%',
            change: () => {
                if (this.gradientType.value === '1' && this.element.value === '0') {
                    this.gauge.axes[0].ranges[0].linearGradient = null;
                    this.gauge.axes[0].ranges[0].radialGradient = this.rangeRadialGradient;
                    this.gauge.refresh();
                }
                if (this.gradientType.value === '0' && this.element.value === '0') {
                    this.gauge.axes[0].ranges[0].linearGradient = this.rangeLinearGradient;
                    this.gauge.axes[0].ranges[0].radialGradient = null;
                    this.gauge.refresh();
                }
                if (this.gradientType.value === '1' && this.element.value === '1') {
                    this.gauge.axes[0].pointers[0].radialGradient = this.pointerRadialGradient;
                    this.gauge.axes[0].pointers[0].linearGradient = null;
                    this.gauge.refresh();
                }
                if (this.gradientType.value === '0' && this.element.value === '1') {
                    this.gauge.axes[0].pointers[0].linearGradient = this.pointerLinearGradient;
                    this.gauge.axes[0].pointers[0].radialGradient = null;
                    this.gauge.refresh();
                }
            }
        });
        this.gradientType.appendTo('#gradientType');
        this.element = new DropDownList({
            index: 0, width: '100%',
            change: () => {
                if (this.gradientType.value === '1' && this.element.value === '0') {
                    this.gauge.axes[0].ranges[0].linearGradient = null;
                    this.gauge.axes[0].ranges[0].radialGradient = this.rangeRadialGradient;
                    this.gauge.axes[0].pointers[0].linearGradient = null;
                    this.gauge.axes[0].pointers[0].radialGradient = null;
                    this.gauge.refresh();
                }
                if (this.gradientType.value === '0' && this.element.value === '0') {
                    this.gauge.axes[0].ranges[0].linearGradient = this.rangeLinearGradient;
                    this.gauge.axes[0].ranges[0].radialGradient = null;
                    this.gauge.axes[0].pointers[0].linearGradient = null;
                    this.gauge.axes[0].pointers[0].radialGradient = null;
                    this.gauge.refresh();
                }
                if (this.gradientType.value === '1' && this.element.value === '1') {
                    this.gauge.axes[0].pointers[0].radialGradient = this.pointerRadialGradient;
                    this.gauge.axes[0].pointers[0].linearGradient = null;
                    this.gauge.axes[0].ranges[0].linearGradient = null;
                    this.gauge.axes[0].ranges[0].radialGradient = null;
                    this.gauge.refresh();
                }
                if (this.gradientType.value === '0' && this.element.value === '1') {
                    this.gauge.axes[0].pointers[0].linearGradient = this.pointerLinearGradient;
                    this.gauge.axes[0].pointers[0].radialGradient = null;
                    this.gauge.axes[0].ranges[0].linearGradient = null;
                    this.gauge.axes[0].ranges[0].radialGradient = null;
                    this.gauge.refresh();
                }
            }
        });
        this.element.appendTo('#elements');
    }
    constructor() {
        //code
    }
}

