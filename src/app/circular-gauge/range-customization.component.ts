import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { CircularGaugeComponent, ILoadedEventArgs, GaugeTheme, CircularGaugeModule, AnnotationsService } from '@syncfusion/ej2-angular-circulargauge';
import { DropDownList } from '@syncfusion/ej2-dropdowns';

@Component({
    selector: 'control-content',
    templateUrl: 'range-customization.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [CircularGaugeModule],
    providers: [AnnotationsService]
})
export class RangeComponent {

    @ViewChild('range')
    public circulargauge: CircularGaugeComponent;

    public listObj: DropDownList;
    public greenRangeStart: number = 0;
    public yellowRangeStart: number = 40;
    public redRangeStart: number = 80;

    public lineStyle: Object = {
        width: 10, color: 'transparent'
    };

    public labelStyle: Object = {
        font: { fontFamily: 'inherit' }
    };

    public animation: Object = {
        enable: true
    };

    public majorTicks: Object = {
        height: 10, offset: 5
    };

    public minorTicks: Object = {
        height: 0, width: 0
    };

    public tail: Object = {
        length: '18%'
    };

    public pointerCap: Object = {
        radius: 7
    };

    public annotaions: Object = [{
        description: 'Speedometer',
        content: '<div><span style="font-size:14px;">Speedometer</span></div>',
        radius: '30%', angle: 0, zIndex: '1'
    }, {
        description: '65 MPH',
        content: '<div><span style="font-size:20px;">65 MPH</span></div>',
        radius: '40%', angle: 180, zIndex: '1'
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
        this.listObj = new DropDownList({
            index: 0, width: '100%',
            change: () => {
                let index: number = +this.listObj.value;
                (<HTMLInputElement>document.getElementById('endWidth')).value = this.circulargauge.axes[0].ranges[index].endWidth.toString();
                document.getElementById('rangeEndWidth').innerHTML = this.circulargauge.axes[0].ranges[index].endWidth.toString();
                (<HTMLInputElement>document.getElementById('startWidth')).value = this.circulargauge.axes[0].ranges[index].startWidth.toString();
                document.getElementById('rangeStartWidth').innerHTML = this.circulargauge.axes[0].ranges[index].startWidth.toString();
                document.getElementById('rangeEnd').innerHTML = this.circulargauge.axes[0].ranges[index].end.toString();
                if (index == 0) {
                    (<HTMLInputElement>document.getElementById('greenRangeStart')).min = "0";
                    (<HTMLInputElement>document.getElementById('greenRangeStart')).max = "40";
                    (<HTMLInputElement>document.getElementById('greenRangeEnd')).min = "0";
                    (<HTMLInputElement>document.getElementById('greenRangeEnd')).max = "40";
                } else if (index == 1) {
                    (<HTMLInputElement>document.getElementById('greenRangeStart')).min = "40";
                    (<HTMLInputElement>document.getElementById('greenRangeStart')).max = "80";
                    (<HTMLInputElement>document.getElementById('greenRangeEnd')).min = "40";
                    (<HTMLInputElement>document.getElementById('greenRangeEnd')).max = "80";
                } else {
                    (<HTMLInputElement>document.getElementById('greenRangeStart')).min = "80";
                    (<HTMLInputElement>document.getElementById('greenRangeStart')).max = "120";
                    (<HTMLInputElement>document.getElementById('greenRangeEnd')).min = "80";
                    (<HTMLInputElement>document.getElementById('greenRangeEnd')).max = "120";
                }
                (<HTMLInputElement>document.getElementById('greenRangeStart')).value = this.circulargauge.axes[0].ranges[index].start.toString();
                (<HTMLInputElement>document.getElementById('greenRangeEnd')).value = this.circulargauge.axes[0].ranges[index].end.toString();
                document.getElementById('rangeStart').innerHTML = this.circulargauge.axes[0].ranges[index].start.toString();
                (<HTMLInputElement>document.getElementById('radius')).value = this.circulargauge.axes[0].ranges[index].roundedCornerRadius.toString();
                document.getElementById('roundedRadius').innerHTML = this.circulargauge.axes[0].ranges[index].roundedCornerRadius.toString();
            }
        });
        this.listObj.appendTo('#rangeSelect');
    }

    ngAfterViewInit(): void {
        document.getElementById('greenRangeStart').onpointermove = document.getElementById('greenRangeStart').ontouchmove =
            document.getElementById('greenRangeStart').onchange = () => {
                let index: number = +this.listObj.value;
                let start: number = parseInt((<HTMLInputElement>document.getElementById('greenRangeStart')).value, 10);
                document.getElementById('rangeStart').innerHTML = start.toString();
                this.circulargauge.axes[0].ranges[index].start = start;
                this.circulargauge.axes[0].pointers[0].animation.enable = false; this.circulargauge.refresh();
            };

        document.getElementById('greenRangeEnd').onpointermove = document.getElementById('greenRangeEnd').ontouchmove =
            document.getElementById('greenRangeEnd').onchange = () => {
                let index: number = +this.listObj.value;
                let end: number = parseInt((<HTMLInputElement>document.getElementById('greenRangeEnd')).value, 10);
                document.getElementById('rangeEnd').innerHTML = end.toString();
                this.circulargauge.axes[0].ranges[index].end = end;
                this.circulargauge.axes[0].pointers[0].animation.enable = false; this.circulargauge.refresh();
            };

        document.getElementById('startWidth').onpointermove = document.getElementById('startWidth').ontouchmove =
            document.getElementById('startWidth').onchange = () => {
                let index: number = +this.listObj.value;
                let startWidth: number = parseInt((<HTMLInputElement>document.getElementById('startWidth')).value, 10);
                document.getElementById('rangeStartWidth').innerHTML = startWidth.toString();
                this.circulargauge.axes[0].ranges[index].startWidth = startWidth;
                this.circulargauge.axes[0].pointers[0].animation.enable = false; this.circulargauge.refresh();
            };

        document.getElementById('endWidth').onpointermove = document.getElementById('endWidth').ontouchmove =
            document.getElementById('endWidth').onchange = () => {
                let index: number = +this.listObj.value;
                let endWidth: number = parseInt((<HTMLInputElement>document.getElementById('endWidth')).value, 10);
                document.getElementById('rangeEndWidth').innerHTML = endWidth.toString();
                this.circulargauge.axes[0].ranges[index].endWidth = endWidth;
                this.circulargauge.axes[0].pointers[0].animation.enable = false; this.circulargauge.refresh();
            };

        document.getElementById('radius').onpointermove = document.getElementById('radius').ontouchmove =
            document.getElementById('radius').onchange = () => {
                let index: number = +this.listObj.value;
                let radius: number = parseInt((<HTMLInputElement>document.getElementById('radius')).value, 10);
                document.getElementById('roundedRadius').innerHTML = radius.toString();
                this.circulargauge.axes[0].ranges[index].roundedCornerRadius = radius;
                this.circulargauge.axes[0].pointers[0].animation.enable = false; this.circulargauge.refresh();
            };
    }

    constructor() {
        // code
    };
}