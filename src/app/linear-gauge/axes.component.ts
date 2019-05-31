/**
 * Sample for thermometer model
 */
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { LinearGaugeComponent, ILoadedEventArgs, LinearGaugeTheme } from '@syncfusion/ej2-angular-lineargauge';
import { Point, Placement, MarkerType, Pointer } from '@syncfusion/ej2-lineargauge';
import { DropDownList } from '@syncfusion/ej2-dropdowns';

@Component({
    selector: 'control-content',
    templateUrl: 'axes.html',
    encapsulation: ViewEncapsulation.None
})
export class AxesComponent {
    @ViewChild('gauge')
    public gauge: LinearGaugeComponent;
    @ViewChild('pointerType')
    public pointerType: DropDownList;
    @ViewChild('pointerPlace')
    public markerPlacement: DropDownList;
    // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = <LinearGaugeTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    }
    // custom code end
    //Initializing Annotation
    public Annotation: Object[] = [{
        content: '<div id="pointer" style="width:70px"><h1 style="font-size:14px;' +
        '">${axes[0].pointers[0].currentValue} MPH</h1></div>',
        axisIndex: 0,
        axisValue: 10,
        x: 10,
        y: 60, zIndex: '1'
    }];

    //Initializing Axes
    public Axes: Object[] = [{
        line: {
            color: '#9E9E9E'
        },
        pointers: [{
            value: 10,
            height: 15,
            width: 15,
            color: '#757575',
            offset: 30
        }],
        majorTicks: {
            color: '#9E9E9E',
            interval: 10
        },
        minorTicks: {
            color: '#9E9E9E',
            interval: 2
        },
        labelStyle: {
            offset: 48
        }
    }];
    ngOnInit(): void {
        this.pointerType = new DropDownList({
            index: 0, width: 100,
            change: () => {
                this.gauge.axes[0].pointers[0].type = <Point>this.pointerType.value;
                this.markerPlacement.enabled = (<Point>this.pointerType.value === 'Marker') ? true : false;
                this.markerPlacement.readonly = (<Point>this.pointerType.value === 'Marker') ? false : true;
                this.gauge.refresh();
            }
        });
        this.pointerType.appendTo('#pointerType');

        this.markerPlacement = new DropDownList({
            index: 0, width: 100,
            change: () => {
                this.gauge.axes[0].pointers[0].placement = <Placement>this.markerPlacement.value;
                this.gauge.refresh();
            }
        });
        this.markerPlacement.appendTo('#pointerPlace');
    }
    constructor() {
        //code
    };
    ngAfterViewInit(): void {
        document.getElementById('opposed').onchange = (sender: Event) => {
            let ele: HTMLInputElement = <HTMLInputElement>document.getElementById('opposed');
            this.gauge.axes[0].opposedPosition = ele.checked;
            if (ele.checked) {
                this.gauge.axes[0].pointers[0].placement = 'Near';
                this.gauge.axes[0].pointers[0].markerType = 'Triangle';
                this.gauge.axes[0].pointers[0].offset = -20;
                this.gauge.axes[0].labelStyle.offset = 0;
                this.gauge.annotations[0].x = 10;
                this.gauge.annotations[0].y = -60;
            } else {
                this.gauge.axes[0].pointers[0].placement = 'Far';
                this.gauge.axes[0].pointers[0].offset = 0;
                this.gauge.axes[0].pointers[0].offset = 30;
                this.gauge.axes[0].pointers[0].markerType = 'InvertedTriangle';
                this.gauge.axes[0].labelStyle.offset = 38;
                this.gauge.annotations[0].x = 10;
                this.gauge.annotations[0].y = 60;
            }
            this.gauge.refresh();
        };

        document.getElementById('axisInversed').onchange = (sender: Event) => {
            let ele: HTMLInputElement = <HTMLInputElement>document.getElementById('axisInversed');
            this.gauge.axes[0].isInversed = ele.checked;
            this.gauge.refresh();
        };

        document.getElementById('min').ontouchmove = document.getElementById('min').onpointermove =
            document.getElementById('min').onchange = () => {
                let min: HTMLInputElement = <HTMLInputElement>document.getElementById('min');
                let max: HTMLInputElement = <HTMLInputElement>document.getElementById('max');
                this.gauge.axes[0].minimum = parseInt(min.value, 10);
                this.gauge.axes[0].maximum = parseInt(max.value, 10);
                document.getElementById('minValue').innerHTML = 'Axis Minimum <span>&nbsp;&nbsp;&nbsp;' + min.value;
                this.gauge.refresh();
                this.gauge.annotations[0].axisValue = (<Pointer>this.gauge.axes[0].pointers[0]).currentValue;
                this.gauge.refresh();
            };

        document.getElementById('max').ontouchmove = document.getElementById('max').onpointermove =
            document.getElementById('max').onchange = () => {
                let min: HTMLInputElement = <HTMLInputElement>document.getElementById('min');
                let max: HTMLInputElement = <HTMLInputElement>document.getElementById('max');
                this.gauge.axes[0].maximum = parseInt(max.value, 10);
                this.gauge.axes[0].minimum = parseInt(min.value, 10);
                document.getElementById('maxValue').innerHTML = 'Axis Maximum <span>&nbsp;&nbsp;&nbsp;' + max.value;
                this.gauge.refresh();
                this.gauge.annotations[0].axisValue = (<Pointer>this.gauge.axes[0].pointers[0]).currentValue;
                this.gauge.refresh();
            };

        document.getElementById('format').onchange = () => {
            let ele: HTMLInputElement = <HTMLInputElement>document.getElementById('format');
            this.gauge.axes[0].labelStyle.format = ele.value.indexOf('{value}') > -1 ? ele.value : this.gauge.axes[0].labelStyle.format;
            this.gauge.refresh();
        };
    };

    private getRandomArbitrary(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }
}