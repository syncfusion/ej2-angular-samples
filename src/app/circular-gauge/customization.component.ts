/**
 * Sample for customization of gauge
 */
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { CircularGaugeComponent, ILoadedEventArgs, GaugeTheme } from '@syncfusion/ej2-angular-circulargauge';
import { CircularGauge } from '@syncfusion/ej2-circulargauge';
import { DynamicDataSerive } from './customization.service';
import { DropDownList } from '@syncfusion/ej2-dropdowns';

@Component({
    selector: 'control-content',
    templateUrl: 'customization.html',
    encapsulation: ViewEncapsulation.None
})
export class CustomizationComponent {
    @ViewChild('customization')
    public randomGauge: CircularGaugeComponent;
    @ViewChild('customization1')
    public usageGauge: CircularGaugeComponent;
    
    public isUsage: boolean = false;
    public axes1: object = [{
        annotations: [{
            content: '<div style="color:#666666;font-size:35px;">50.5GB</div>',
            angle: 180, radius: '0%', zIndex: '1'
        }, {
            content: '<div style="color:#757575;font-size:15px;">Used</div>',
            angle: 180, radius: '25%', zIndex: '1',
            textStyle: {
                fontFamily: 'Roboto',
                color: '#9E9E9E',
                fontStyle: 'Bold',
                fontWeight: 'Regular',
                size: '14px'
            }
        }],
        lineStyle: { width: 0 },
        startAngle: 180, endAngle: 180,
        radius: '80%',
        labelStyle: { font: { size: '0px' } },
        majorTicks: { width: 0 },
        minorTicks: { height: 0 },
        minimum: 0, maximum: 100,
        ranges: [{
            start: 0, end: 100,
            radius: '80%', startWidth: 30,
            endWidth: 30, color: '#E0E0E0'
        }],
        pointers: [{
            type: 'RangeBar',
            value: 50.5, radius: '80%',
            color: '#FF2680', animation: { duration: 0 },
            pointerWidth: 30
        }]
    }];
    public axes: object = [{
        annotations: [{
            content: '<div style="color:#666666;font-size:35px;">1800</div>',
            angle: 0,
            radius: '110%', zIndex: '1'
        }],
        lineStyle: { width: 0 },
        startAngle: 300, endAngle: 60,
        radius: '80%',
        labelStyle: { font: { size: '0px' } },
        majorTicks: { width: 0 },
        minorTicks: { height: 0 },
        minimum: 999, maximum: 2000,
        ranges: [{
            start: 1000, end: 2000,
            radius: '90%',
            startWidth: 30, endWidth: 30,
            color: '#E0E0E0'
        }],
        pointers: [{
            type: 'RangeBar',
            value: 1800, radius: '90%',
            color: '#FFDD00', animation: { duration: 0 },
            pointerWidth: 30
        }, {
            radius: '90%', value: 1800,
            color: '#424242',
            animation: { duration: 0 },
            pointerWidth: 9,
            cap: { radius: 10, color: '#424242', border: { width: 0 } }
        }]
    }];
    // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = <GaugeTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    }
    public load1(args: ILoadedEventArgs): void {
        let selectedTheme1: string = location.hash.split('/')[1];
        selectedTheme1 = selectedTheme1 ? selectedTheme1 : 'Material';
        args.gauge.theme = <GaugeTheme>(selectedTheme1.charAt(0).toUpperCase() + selectedTheme1.slice(1));
    }
    // custom code end
    
    public barColor: DropDownList; public rangeColor: DropDownList; public pointerColor: DropDownList;
    ngOnInit(): void {
        this.barColor = new DropDownList({
            index: 0,
            width: 100,
            change: () => {
                let barColor: string = this.barColor.value.toString();
                if (this.isUsage) {
                    this.usageGauge.axes[0].pointers[0].color = barColor;
                    this.usageGauge.refresh();
                } else {
                    this.randomGauge.axes[0].pointers[0].color = barColor;
                    this.randomGauge.refresh();
                }
            }
        });
        this.barColor.appendTo('#barColor');
        this.rangeColor = new DropDownList({
            index: 0,
            width: 100,
            change: () => {
                let barColor: string = this.rangeColor.value.toString();
                if (this.isUsage) {
                    this.usageGauge.axes[0].ranges[0].color = barColor;
                    this.usageGauge.refresh();
                } else {
                    this.randomGauge.axes[0].ranges[0].color = barColor;
                    this.randomGauge.refresh();
                }
            }
        });
        this.rangeColor.appendTo('#rangeColor');
        this.pointerColor = new DropDownList({
            index: 0,
            width: 100,
            change: () => {
                let barColor: string = this.pointerColor.value.toString();
                if (!this.isUsage) {
                    this.randomGauge.axes[0].pointers[1].color = barColor;
                    this.randomGauge.axes[0].pointers[1].cap.border.color = barColor;
                    this.randomGauge.axes[0].pointers[1].cap.color = barColor;
                    this.randomGauge.refresh();
                }
            }
        });
        this.pointerColor.appendTo('#pointerColor');
    }
    ngAfterViewInit(): void {
        let selectedTheme: string = location.hash.split('/')[1]; let color: string;
        if (selectedTheme === 'bootstrap') {
            color = '#a16ee5';
        } else if (selectedTheme === 'fabric') {
            color = '#1783FF';
        } else {
            color = '#ff4081';
        }
        let exisLine: HTMLSelectElement = <HTMLSelectElement>document.getElementById('usage_line');
        let currentLine: HTMLSelectElement = <HTMLSelectElement>document.getElementById('random_line');
        exisLine.style.background = color; currentLine.style.background = color;

        document.getElementById('usage').onclick = () => {
            document.getElementById('customization-container').style.display = 'none';
            document.getElementById('customization-container1').style.display = 'block';
            this.isUsage = true;
            let element: HTMLInputElement = <HTMLInputElement>document.getElementById('currentValue');
            let pointElement: HTMLSelectElement = <HTMLSelectElement>document.getElementById('pointColor');
            element.min = '0.5';
            element.max = '100';
            element.value = this.usageGauge.axes[0].pointers[0].value.toString();
            document.getElementById('currentPointerValue').innerHTML = ' Current Value <span> &nbsp;&nbsp;&nbsp;'
                + this.usageGauge.axes[0].pointers[0].value + '</span>';
            this.barColor.value = this.usageGauge.axes[0].pointers[0].color;
            this.rangeColor.value = this.usageGauge.axes[0].ranges[0].color;
            this.pointerColor.enabled = false;
            pointElement.className = 'e-disabled';
            let currentElement: HTMLSelectElement = <HTMLSelectElement>document.getElementById('usage');
            let existElement: HTMLSelectElement = <HTMLSelectElement>document.getElementById('random');
            currentElement.style.border = '2px solid #E0E0E0';
            existElement.style.border = '';
            let currentLine: HTMLSelectElement = <HTMLSelectElement>document.getElementById('usage_line');
            let exisLine: HTMLSelectElement = <HTMLSelectElement>document.getElementById('random_line');
            currentLine.style.display = 'block';
            exisLine.style.display = 'none';
            //this.usageGauge.refresh();
        };
        document.getElementById('random').onclick = () => {
            document.getElementById('customization-container1').style.display = 'none';
            document.getElementById('customization-container').style.display = 'block';
            this.isUsage = false;
            let currentElement: HTMLSelectElement = <HTMLSelectElement>document.getElementById('random');
            let existElement: HTMLSelectElement = <HTMLSelectElement>document.getElementById('usage');
            currentElement.style.border = '2px solid #E0E0E0';
            existElement.style.border = '';
            let element: HTMLInputElement = <HTMLInputElement>document.getElementById('currentValue');
            let pointElement: HTMLSelectElement = <HTMLSelectElement>document.getElementById('pointColor');
            pointElement.className = 'e-enabled';
            this.pointerColor.enabled = true;
            element.min = '1000';
            element.max = '2000';
            element.value = this.randomGauge.axes[0].pointers[0].value.toString();
            document.getElementById('currentPointerValue').innerHTML = 'Current Value <span> &nbsp;&nbsp;&nbsp;' +
                this.randomGauge.axes[0].pointers[0].value + '</span>';
            this.barColor.value = this.randomGauge.axes[0].pointers[0].color;
            this.rangeColor.value = this.randomGauge.axes[0].ranges[0].color;
            this.pointerColor.value = this.randomGauge.axes[0].pointers[1].color;
            let exisLine: HTMLSelectElement = <HTMLSelectElement>document.getElementById('usage_line');
            let currentLine: HTMLSelectElement = <HTMLSelectElement>document.getElementById('random_line');
            currentLine.style.display = 'block'; exisLine.style.display = 'none';
            //this.randomGauge.refresh();
        };

        document.getElementById('currentValue').onpointermove = document.getElementById('currentValue').ontouchmove =
            document.getElementById('currentValue').onchange = () => {
                let value: number = +(<HTMLInputElement>document.getElementById('currentValue')).value;
                if (this.isUsage) {
                    this.usageGauge.setPointerValue(0, 0, value);
                    this.usageGauge.setAnnotationValue(0, 0, '<div style="color:#666666;font-size:35px;">' + value + 'GB' + '</div>');
                } else {
                    this.randomGauge.axes[0].pointers[0].value = value;
                    this.randomGauge.axes[0].pointers[1].value = value;
                    this.randomGauge.setAnnotationValue(0, 0, '<div style="color:#666666;font-size:35px;">' + value + '' + '</div>');
                }
                document.getElementById('currentPointerValue').innerHTML = 'Current Value <span> &nbsp;&nbsp;&nbsp;' + value + '</span>';
            };
    }
    constructor() {
        // code
    };



}



