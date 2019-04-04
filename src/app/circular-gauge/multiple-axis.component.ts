/**
 * Sample for multiple axis
 */
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { CircularGaugeComponent, ILoadedEventArgs, GaugeTheme } from '@syncfusion/ej2-angular-circulargauge';
import { GaugeDirection, isCompleteAngle } from '@syncfusion/ej2-circulargauge';
import { DropDownList } from '@syncfusion/ej2-dropdowns';

@Component({
    selector: 'control-content',
    templateUrl: 'multiple-axis.html',
    encapsulation: ViewEncapsulation.None
})
export class MultipleAxisComponent {

    @ViewChild('axes')
    public circulargauge: CircularGaugeComponent;
    public axisIndex: number = 0;
    public lineStyle1: Object = {
        width: 1.5, color: '#9E9E9E'
    };
    // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = <GaugeTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    }
    // custom code end
    //Initializing MajorTicks
    public majorTicks1: Object = {
        position: 'Inside',
        width: 2,
        height: 10,
        color: '#757575'

    };
    public title: string = 'Gauge with Multiple Axes';
    //Initializing TitleStyle
    public titleStyle: Object = {
        color: 'gray',
        size: '16px'
    };
    public minorTicks1: Object = {
        position: 'Inside',
        width: 2,
        height: 5,
        color: '#757575'

    };
    public markerHeight: number = 15;
    public markerWidth: number = 15;
    public labelStyle1: Object = {
        position: 'Inside',
        autoAngle: true,
        hiddenLabel: 'None'
    };
    public cap: Object = { color: 'white', radius: 0, border: { width: 0 } };

    public lineStyle2: Object = { width: 1.5, color: '#E84011' };

    public labelStyle2: Object = {
        position: 'Outside',
        autoAngle: true,
        hiddenLabel: 'None',
        font: { color: '#E84011' }
    };
    public majorTicks2: Object = {
        position: 'Outside',
        width: 2,
        height: 10,
        color: '#E84011'
    };
    public minorTicks2: Object = {
        position: 'Outside',
        width: 2,
        height: 5,
        color: '#E84011'
    };
    public axis: DropDownList; public direction: DropDownList;

    ngOnInit(): void {
        this.axis = new DropDownList({
            index: 0, width: 110,
            change: () => {
                this.axisIndex = +this.axis.value;
                this.direction.value = this.circulargauge.axes[this.axisIndex].direction;
                let startAngle: number = this.circulargauge.axes[this.axisIndex].startAngle;
                let endAngle: number = this.circulargauge.axes[this.axisIndex].endAngle;
                document.getElementById('start').innerHTML = 'Start Angle <span> &nbsp;&nbsp;&nbsp;' + startAngle;
                document.getElementById('end').innerHTML = 'End Angle <span> &nbsp;&nbsp;&nbsp;' + endAngle;
                (<HTMLInputElement>document.getElementById('startAngle')).value = startAngle.toString();
                (<HTMLInputElement>document.getElementById('endAngle')).value = endAngle.toString();
            }
        });
        this.axis.appendTo('#axisIndex');
    
        this.direction = new DropDownList({
            index: 0, width: 110,
            change: () => {
                this.circulargauge.axes[this.axisIndex].direction = <GaugeDirection>this.direction.value.toString();
                this.circulargauge.axes[0].pointers[0].animation.enable = false;
                this.circulargauge.axes[1].pointers[0].animation.enable = false;
                this.circulargauge.refresh();
            }
        });
        this.direction.appendTo('#axisDirection');
    }
    ngAfterViewInit(): void {
        document.getElementById('axisIndex').onchange = () => {
            this.axisIndex = parseInt((<HTMLInputElement>document.getElementById('axisIndex')).value, 10);
            let startAngle: number = this.circulargauge.axes[this.axisIndex].startAngle;
            let endAngle: number = this.circulargauge.axes[this.axisIndex].endAngle;
            document.getElementById('start').innerHTML = 'Start Angle <span> &nbsp;&nbsp;&nbsp;' + startAngle;
            document.getElementById('end').innerHTML = 'End Angle <span> &nbsp;&nbsp;&nbsp;' + endAngle;
            (<HTMLInputElement>document.getElementById('axisDirection')).value = this.circulargauge.axes[this.axisIndex].direction;
            (<HTMLInputElement>document.getElementById('startAngle')).value = startAngle.toString();
            (<HTMLInputElement>document.getElementById('endAngle')).value = endAngle.toString();
        };
        document.getElementById('axisDirection').onchange = () => {
            this.circulargauge.axes[this.axisIndex].direction = <GaugeDirection>(<HTMLInputElement>document.getElementById('axisDirection')).value;
            this.circulargauge.axes[0].pointers[0].animation.enable = false;
            this.circulargauge.axes[1].pointers[0].animation.enable = false;
            this.circulargauge.refresh();
        };
        document.getElementById('startAngle').onpointermove = document.getElementById('startAngle').ontouchmove =
            document.getElementById('startAngle').onchange = () => {
                let value: number = parseInt((<HTMLInputElement>document.getElementById('startAngle')).value, 10);
                this.circulargauge.axes[0].pointers[0].animation.enable = false;
                this.circulargauge.axes[1].pointers[0].animation.enable = false;
                this.circulargauge.axes[this.axisIndex].startAngle = value;
                this.circulargauge.axes[this.axisIndex].labelStyle.hiddenLabel =
                    isCompleteAngle(this.circulargauge.axes[this.axisIndex].startAngle, this.circulargauge.axes[this.axisIndex].endAngle) ?
                        'First' : 'None';
                document.getElementById('start').innerHTML = 'Start Angle <span> &nbsp;&nbsp;&nbsp;' + value;
                this.circulargauge.refresh();
            };

        document.getElementById('endAngle').onpointermove = document.getElementById('endAngle').ontouchmove =
            document.getElementById('endAngle').onchange = () => {
                let value: number = parseInt((<HTMLInputElement>document.getElementById('endAngle')).value, 10);
                this.circulargauge.axes[0].pointers[0].animation.enable = false;
                this.circulargauge.axes[1].pointers[0].animation.enable = false;
                this.circulargauge.axes[this.axisIndex].endAngle = value;
                this.circulargauge.axes[this.axisIndex].labelStyle.hiddenLabel =
                    isCompleteAngle(this.circulargauge.axes[this.axisIndex].startAngle, this.circulargauge.axes[this.axisIndex].endAngle) ?
                        'First' : 'None';
                document.getElementById('end').innerHTML = 'End Angle <span> &nbsp;&nbsp;&nbsp;' + value;
                this.circulargauge.refresh();
            };
    }

    constructor() {
        //
    };
}

