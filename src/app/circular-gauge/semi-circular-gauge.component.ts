import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { CircularGaugeComponent, ILoadedEventArgs, GaugeTheme, CircularGaugeModule } from '@syncfusion/ej2-angular-circulargauge';
import { CheckBox, ChangeEventArgs as CheckBoxChangeEvents } from '@syncfusion/ej2-buttons';
import { EmitType } from '@syncfusion/ej2-base';

/* custom code start */
// tslint:disable
/* custom code end */

@Component({
    selector: 'control-content',
    templateUrl: 'semi-circular-gauge.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [CircularGaugeModule]
})

export class SemiCircleComponent {

    @ViewChild('circulargauge')
    public circulargauge: CircularGaugeComponent;

    public lineStyle: Object = {
        width: 3
    };

    public labelStyle: Object = {
        position: 'Outside', autoAngle: true,
        font: { fontWeight: 'normal', fontFamily: 'inherit' },
        format: '{value}%'
    };

    public majorTicks: Object = {
        position: 'Inside', width: 2, height: 15, interval: 10
    };

    public minorTicks: Object = {
        position: 'Inside', height: 8, width: 1, interval: 2
    };

    public tail: Object = {
        length: '13%'
    };

    public pointerCap: Object = {
        radius: 8, border: { width: 0 }
    };

    public animation: Object = {
        enable: false
    };

    public load(args: ILoadedEventArgs): void {
        /* custom code start */
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = <GaugeTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-high/i, 'High').replace(/5.3/i, '5');
        /* custom code end */
    }

    ngAfterViewInit(): void {

        let removeIntersectLable: EmitType<CheckBoxChangeEvents>;
        let opacity: EmitType<CheckBoxChangeEvents>;

        let highlightCheckBox: CheckBox = new CheckBox(
            {
                change: opacity, checked: false,
            }, '#angle');

        let labelRemoveCheckbox: CheckBox = new CheckBox(
            {
                change: removeIntersectLable, checked: true
            }, '#hidelabel');

        document.getElementById('start').onchange = () => {
            let min: number = parseInt((<HTMLInputElement>document.getElementById('start')).value, 10);
            document.getElementById('rangeStart').innerHTML = min + '°';
            this.circulargauge.axes[0].startAngle = min;
            this.circulargauge.refresh();
        };

        document.getElementById('end').onpointermove = document.getElementById('end').ontouchmove =
            document.getElementById('end').onchange = () => {
                let max: number = parseInt((<HTMLInputElement>document.getElementById('end')).value, 10);
                document.getElementById('rangeEnd').innerHTML = max + '°';
                this.circulargauge.axes[0].endAngle = max;
                this.circulargauge.refresh();
            };

        document.getElementById('radius').onpointermove = document.getElementById('radius').ontouchmove =
            document.getElementById('radius').onchange = () => {
                let max: number = parseInt((<HTMLInputElement>document.getElementById('radius')).value, 10);
                document.getElementById('radius1').innerHTML = max + '%';
                this.circulargauge.axes[0].radius = '' + max + '%';
                this.circulargauge.refresh();
            };

        document.getElementById('centerX').onpointermove = document.getElementById('centerX').ontouchmove =
            document.getElementById('centerX').onchange = () => {
                if (!highlightCheckBox.checked) {
                    let max: number = parseInt((<HTMLInputElement>document.getElementById('centerX')).value, 10);
                    document.getElementById('centerx').innerHTML = max + '%';
                    this.circulargauge.centerX = '' + max + '%';
                    this.circulargauge.refresh();
                }
            };

        document.getElementById('centerY').onpointermove = document.getElementById('centerY').ontouchmove =
            document.getElementById('centerY').onchange = () => {
                if (!highlightCheckBox.checked) {
                    let max: number = parseInt((<HTMLInputElement>document.getElementById('centerY')).value, 10);
                    document.getElementById('centery').innerHTML = max + '%';
                    this.circulargauge.centerY = '' + max + '%';
                    this.circulargauge.refresh();
                }
            };

        highlightCheckBox.change = opacity = (e: CheckBoxChangeEvents) => {
            let centerX: HTMLInputElement = document.getElementById('centerX') as HTMLInputElement;
            let centerY: HTMLInputElement = document.getElementById('centerY') as HTMLInputElement;
            if (e.checked) {
                this.circulargauge.centerX = null;
                this.circulargauge.centerY = null;
                this.circulargauge.moveToCenter = true;
                centerX.disabled = true;
                centerY.disabled = true;
            } else {
                this.circulargauge.centerX = centerX.value + '%';
                this.circulargauge.centerY = centerY.value + '%';
                centerX.disabled = false;
                centerY.disabled = false;
                this.circulargauge.moveToCenter = false;
            }
            this.circulargauge.refresh();
        };

        labelRemoveCheckbox.change = removeIntersectLable = (e: CheckBoxChangeEvents) => {
            this.circulargauge.axes[0].hideIntersectingLabel = e.checked;
            this.circulargauge.refresh();
        }
    }

    constructor() {
        // code
    };
}