import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { CircularGaugeComponent } from '@syncfusion/ej2-ng-circulargauge';
import { Position, TickModel } from '@syncfusion/ej2-circulargauge';
import { DropDownList } from '@syncfusion/ej2-dropdowns';

/**
 * multiple axis in gauge
 */

@Component({
    selector: 'control-content',
    templateUrl: 'label.html',
    encapsulation: ViewEncapsulation.None
})

export class LabelComponent {
    @ViewChild('label')
    public circulargauge: CircularGaugeComponent;
    public isMajorTicks: boolean = true;

    public margin: Object = {
        left: 0, right: 0, top: 0, bottom: 0
    };
    public border: Object = { color: 'transparent', width: 4 };
    public lineStyle1: Object = {
        width: 2, color: '#9E9E9E'
    };

    public labelStyle1: Object = {
        position: 'Outside', autoAngle: true,
        font: {
            size: '10px', color: '#333333'
        }
    };
    public majorTicks1: Object = {
        position: 'Inside', color: 'black', width: 0.7, height: 10, interval: 20
    };
    public minorTicks1: Object = {
        position: 'Inside', color: 'black', height: 5, width: 0.7, interval: 10
    };

    public ranges: Object[] = [{
        start: 0, end: 145,
        color: '#8BC34A', radius: '60%'
    }];
    public pointers: Object[] = [];
    public ticks: DropDownList; public tickPosition: DropDownList; public labelPosition: DropDownList;
    ngOnInit(): void {
        this.ticks = new DropDownList({
            index: 0, width: 100,
            change: () => {
                let value: string = this.ticks.value.toString();
                let tick: TickModel; this.isMajorTicks = value === 'major';
                if (this.isMajorTicks) {
                    tick = this.circulargauge.axes[0].majorTicks;
                } else {
                    tick = this.circulargauge.axes[0].minorTicks;
                }
                this.tickPosition.value = tick.position;
                (<HTMLInputElement>document.getElementById('tickOffset')).value = tick.offset.toString();
                (<HTMLInputElement>document.getElementById('tickHeight')).value = tick.height.toString();
                document.getElementById('offset').innerHTML = 'Tick Offset <span>&nbsp;&nbsp;&nbsp;' + tick.offset;
                document.getElementById('height').innerHTML = 'Tick Height <span>&nbsp;&nbsp;&nbsp;' + tick.height;
            }
        });
        this.ticks.appendTo('#Ticks');
    
        this.tickPosition = new DropDownList({
            index: 0, width: 100,
            change: () => {
                let value: string = this.tickPosition.value.toString();
                if (this.isMajorTicks) {
                    this.circulargauge.axes[0].majorTicks.position = <Position>value;
                } else {
                    this.circulargauge.axes[0].minorTicks.position = <Position>value;
                }
                this.circulargauge.refresh();
            }
        });
        this.tickPosition.appendTo('#tickposition');
    
        this.labelPosition = new DropDownList({
            index: 0, width: 100,
            change: () => {
                this.circulargauge.axes[0].labelStyle.position = <Position>this.labelPosition.value.toString();
                this.circulargauge.refresh();
            }
        });
        this.labelPosition.appendTo('#labelposition');
    }
    ngAfterViewInit(): void {
        document.getElementById('tickOffset').onpointermove = document.getElementById('tickOffset').ontouchmove =
            document.getElementById('tickOffset').onchange = () => {
                let value: number = parseInt((<HTMLInputElement>document.getElementById('tickOffset')).value, 10);
                if (this.isMajorTicks) {
                    this.circulargauge.axes[0].majorTicks.offset = value;
                } else {
                    this.circulargauge.axes[0].minorTicks.offset = value;
                }
                document.getElementById('offset').innerHTML = 'Tick Offset <span>&nbsp;&nbsp;&nbsp;' + value;
                this.circulargauge.refresh();
            };

        document.getElementById('tickHeight').onpointermove = document.getElementById('tickHeight').ontouchmove =
            document.getElementById('tickHeight').onchange = () => {
                let value: number = parseInt((<HTMLInputElement>document.getElementById('tickHeight')).value, 10);
                if (this.isMajorTicks) {
                    this.circulargauge.axes[0].majorTicks.height = value;
                } else {
                    this.circulargauge.axes[0].minorTicks.height = value;
                }
                document.getElementById('height').innerHTML = 'Tick Height <span>&nbsp;&nbsp;&nbsp;' + value;
                this.circulargauge.refresh();
            };

        document.getElementById('labelOffset').onpointermove = document.getElementById('labelOffset').ontouchmove =
            document.getElementById('labelOffset').onchange = () => {
                let value: number = parseInt((<HTMLInputElement>document.getElementById('labelOffset')).value, 10);
                this.circulargauge.axes[0].labelStyle.offset = value;
                document.getElementById('labelOffsetValue').innerHTML = 'Label Offset <span>&nbsp;&nbsp;&nbsp;' + value;
                this.circulargauge.refresh();
            };

    }
    constructor() {
        // code
    };
}



