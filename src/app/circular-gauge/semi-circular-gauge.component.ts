/**
 * Sample for semi circle
 */
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { CircularGaugeComponent, ILoadedEventArgs, GaugeTheme } from '@syncfusion/ej2-angular-circulargauge';
import { CheckBox, ChangeEventArgs as CheckBoxChangeEvents } from '@syncfusion/ej2-buttons';
import { EmitType } from '@syncfusion/ej2-base';
// custom code start
//tslint:disable
// custom code end
@Component({
    selector: 'control-content',
    templateUrl: 'semi-circular-gauge.html',
    encapsulation: ViewEncapsulation.None
})
export class SemiCircleComponent {
    @ViewChild('circulargauge')
    public circulargauge: CircularGaugeComponent;

    public lineStyle: Object = {
        width: 0, color: '#0450C2' 
    };
    //Initializing LabelStyle
    public labelStyle: Object = {
        position: 'Outside', autoAngle: true,
        font: { fontWeight: 'normal' }
    };
    // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = <GaugeTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    }
    // custom code end
    public majorTicks: Object = {
        position: 'Inside', width: 2, height: 12, interval: 20
    };
    public minorTicks: Object = {
        position: 'Inside', height: 5, width: 1, interval: 2
    };
    public tail: Object = {
       length: '13%', color: '#FF9200'
    };
    public pointerCap: Object = {
        radius: 8, color: '#565656', border: { width: 0 }
    };
    public animation: Object ={
        enable: false
    }  
    ngAfterViewInit(): void {
        let opacity: EmitType<CheckBoxChangeEvents>;
        let highlightCheckBox: CheckBox = new CheckBox(
            {
                change: opacity, checked: false,
            },
            '#angle');
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
            document.getElementById('start').onpointermove = document.getElementById('start').ontouchmove =
            document.getElementById('start').onchange = () => {
                let min: number = parseInt((<HTMLInputElement>document.getElementById('start')).value, 10);
                document.getElementById('rangeStart').innerHTML = 'Start Angle <span> &nbsp;&nbsp;&nbsp;' + min + '°';
                debugger;
                this.circulargauge.axes[0].startAngle = min;
                
                this.circulargauge.refresh();
            };
            document.getElementById('end').onpointermove = document.getElementById('end').ontouchmove =
            document.getElementById('end').onchange = () => {
                let max: number = parseInt((<HTMLInputElement>document.getElementById('end')).value, 10);
                document.getElementById('rangeEnd').innerHTML = 'End Angle <span> &nbsp;&nbsp;&nbsp;' + max + '°';
                this.circulargauge.axes[0].endAngle = max;
                this.circulargauge.refresh();
            };
            document.getElementById('radius').onpointermove = document.getElementById('radius').ontouchmove =
            document.getElementById('radius').onchange = () => {
                let max: number = parseInt((<HTMLInputElement>document.getElementById('radius')).value, 10);
                document.getElementById('radius1').innerHTML = 'Radius <span> &nbsp;&nbsp;&nbsp;' + max + '%';
                this.circulargauge.axes[0].radius = '' + max + '%';
                this.circulargauge.refresh();
            };
            document.getElementById('centerX').onpointermove = document.getElementById('centerX').ontouchmove =
            document.getElementById('centerX').onchange = () => {
                if (!highlightCheckBox.checked) {
                    let max: number = parseInt((<HTMLInputElement>document.getElementById('centerX')).value, 10);
                    document.getElementById('center1').innerHTML = 'Center X <span> &nbsp;&nbsp;&nbsp;' + max + '%';
                    this.circulargauge.centerX = '' + max + '%';
                    this.circulargauge.refresh();
                }
            };
            document.getElementById('centerY').onpointermove = document.getElementById('centerY').ontouchmove =
            document.getElementById('centerY').onchange = () => {
                if (!highlightCheckBox.checked) {
                    let max: number = parseInt((<HTMLInputElement>document.getElementById('centerY')).value, 10);
                    document.getElementById('center2').innerHTML = 'Center Y <span> &nbsp;&nbsp;&nbsp;' + max + '%';
                    this.circulargauge.centerY = '' + max + '%';
                    this.circulargauge.refresh();
                }
            };        
    }
    constructor() {
        //
    };
}