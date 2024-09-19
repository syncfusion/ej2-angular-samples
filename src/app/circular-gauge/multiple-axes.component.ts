import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { CircularGaugeComponent, ILoadedEventArgs, GaugeTheme, CircularGaugeModule } from '@syncfusion/ej2-angular-circulargauge';
import { GaugeDirection, isCompleteAngle } from '@syncfusion/ej2-circulargauge';
import { DropDownList } from '@syncfusion/ej2-dropdowns';

@Component({
    selector: 'control-content',
    templateUrl: 'multiple-axes.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [CircularGaugeModule]
})

export class MultipleAxisComponent {

    @ViewChild('axes')
    public circulargauge: CircularGaugeComponent;

    public axisIndex: number = 0;
    public axis: DropDownList;
    public direction: DropDownList;
    public markerHeight: number = 15;
    public markerWidth: number = 15;

    public lineStyleAxisOne: Object = {
        width: 1.5
    };

    public majorTickAxisOne: Object = {
        position: 'Inside',
        width: 2,
        height: 10
    };

    public minorTickAxisOne: Object = {
        position: 'Inside',
        width: 2,
        height: 5
    };

    public labelStyleAxisOne: Object = {
        position: 'Inside',
        autoAngle: true,
        font: {
            fontFamily: 'inherit'
        }
    };

    public cap: Object = {
        color: 'white',
        radius: 0,
        border: { width: 0 }
    };

    public lineStyleAxisTwo: Object = {
        width: 1.5,
        color: '#E84011'
    };

    public labelStyleAxisTwo: Object = {
        position: 'Outside',
        autoAngle: true,
        offset: 5,
        font: { fontFamily: 'inherit' }
    };

    public majorTickAxisTwo: Object = {
        position: 'Outside',
        width: 2,
        height: 10,
        color: '#E84011'
    };

    public minorTickAxisTwo: Object = {
        position: 'Outside',
        width: 2,
        height: 5,
        color: '#E84011'
    };

    public load(args: ILoadedEventArgs): void {
        /* custom code start */
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = <GaugeTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-high/i, 'High').replace(/5.3/i, '5');
        /* custom code end */
    }

    ngOnInit(): void {
        this.axis = new DropDownList({
            index: 0, width: '110%',
            change: () => {
                this.axisIndex = +this.axis.value;
                this.direction.value = this.circulargauge.axes[this.axisIndex].direction;
                let startAngle: number = this.circulargauge.axes[this.axisIndex].startAngle;
                let endAngle: number = this.circulargauge.axes[this.axisIndex].endAngle;
                document.getElementById('start').innerHTML = '' + startAngle;
                document.getElementById('end').innerHTML = '' + endAngle;
                (<HTMLInputElement>document.getElementById('startAngle')).value = startAngle.toString();
                (<HTMLInputElement>document.getElementById('endAngle')).value = endAngle.toString();
            }
        });
        this.axis.appendTo('#axisIndex');

        this.direction = new DropDownList({
            index: 0, width: '110%',
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
            document.getElementById('start').innerHTML = '' + startAngle;
            document.getElementById('end').innerHTML = '' + endAngle;
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

        document.getElementById('startAngle').onchange = () => {
            let value: number = parseInt((<HTMLInputElement>document.getElementById('startAngle')).value, 10);
            this.circulargauge.axes[0].pointers[0].animation.enable = false;
            this.circulargauge.axes[1].pointers[0].animation.enable = false;
            this.circulargauge.axes[this.axisIndex].startAngle = value;
            this.circulargauge.axes[this.axisIndex].labelStyle.hiddenLabel =
                isCompleteAngle(this.circulargauge.axes[this.axisIndex].startAngle, this.circulargauge.axes[this.axisIndex].endAngle) ?
                    'First' : 'None';
            document.getElementById('start').innerHTML = '' + value;
            this.circulargauge.refresh();
        };

        document.getElementById('endAngle').onchange = () => {
            let value: number = parseInt((<HTMLInputElement>document.getElementById('endAngle')).value, 10);
            this.circulargauge.axes[0].pointers[0].animation.enable = false;
            this.circulargauge.axes[1].pointers[0].animation.enable = false;
            this.circulargauge.axes[this.axisIndex].endAngle = value;
            this.circulargauge.axes[this.axisIndex].labelStyle.hiddenLabel =
                isCompleteAngle(this.circulargauge.axes[this.axisIndex].startAngle, this.circulargauge.axes[this.axisIndex].endAngle) ?
                    'First' : 'None';
            document.getElementById('end').innerHTML = '' + value;
            this.circulargauge.refresh();
        };
    }

    constructor() {
        // code
    };
}

