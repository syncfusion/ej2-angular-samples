import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { CircularGaugeComponent, ILoadedEventArgs, GaugeTheme, CircularGaugeModule, AnnotationsService } from '@syncfusion/ej2-angular-circulargauge';
import { Position, TickModel } from '@syncfusion/ej2-circulargauge';
import { CheckBox, ChangeEventArgs as CheckBoxChangeEvents } from '@syncfusion/ej2-buttons';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { EmitType } from '@syncfusion/ej2-base';

/* custom code start */
// tslint:disable
/* custom code end */

@Component({
    selector: 'control-content',
    templateUrl: 'ticks-and-labels.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [CircularGaugeModule],
    providers: [AnnotationsService]
})

export class LabelComponent {

    @ViewChild('label')
    public circulargauge: CircularGaugeComponent;
    public isMajorTicks: boolean = true;
    public ticks: DropDownList;
    public tickPosition: DropDownList;
    public labelPosition: DropDownList;

    public margin: Object = {
        left: 0, right: 0, top: 0, bottom: 0
    };

    public lineStyle: Object = {
        width: 2, color: '#9E9E9E'
    };

    public labelStyle: Object = {
        position: 'Outside', autoAngle: true, offset: 0,
        font: {
            fontFamily: 'inherit',
            size: '10px'
        }
    };

    public majorTicks: Object = {
        position: 'Inside', color: '#757575', width: 2, height: 10, interval: 20, offset: 0
    };

    public minorTicks: Object = {
        position: 'Inside', color: '#757575', height: 5, width: 2, interval: 10, offset: 0
    };

    public pointers: Object[] = [{
        value: 145, type: 'RangeBar', roundedCornerRadius: 10, animation: { enable: false },
        pointerWidth: 7, color: '#8BC34A', radius: '60%'
    }];

    public load(args: ILoadedEventArgs): void {
        /* custom code start */
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = <GaugeTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-high/i, 'High').replace(/5.3/i, '5');
        /* custom code end */
    }

    ngOnInit(): void {
        let label: CheckBox = new CheckBox(
            {
                checked: false,
                change: (args: CheckBoxChangeEvents) => {
                    let showLastLabel: boolean = args.checked;
                    this.circulargauge.axes[0].showLastLabel = showLastLabel;
                    this.circulargauge.refresh();
                }
            }, '#enable');

        this.ticks = new DropDownList({
            index: 0, width: '100%',
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
                document.getElementById('offset').innerHTML = tick.offset.toString();
                document.getElementById('height').innerHTML = tick.height.toString();
            }
        });
        this.ticks.appendTo('#Ticks');

        this.tickPosition = new DropDownList({
            index: 0, width: '100%',
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
            index: 0, width: '100%',
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
                document.getElementById('offset').innerHTML = value.toString();
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
                document.getElementById('height').innerHTML = value.toString();
                this.circulargauge.refresh();
            };

        document.getElementById('labelOffset').onpointermove = document.getElementById('labelOffset').ontouchmove =
            document.getElementById('labelOffset').onchange = () => {
                let value: number = parseInt((<HTMLInputElement>document.getElementById('labelOffset')).value, 10);
                this.circulargauge.axes[0].labelStyle.offset = value;
                document.getElementById('labelOffsetValue').innerHTML = value.toString();
                this.circulargauge.refresh();
            };
    }

    constructor() {
        // code
    };
}



