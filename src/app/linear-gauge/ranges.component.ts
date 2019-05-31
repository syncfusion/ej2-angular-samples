/**
 * Sample for Ranges
 */
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { LinearGaugeComponent } from '@syncfusion/ej2-angular-lineargauge';
import { ILoadedEventArgs, LinearGaugeTheme } from '@syncfusion/ej2-lineargauge';
import { DropDownList } from '@syncfusion/ej2-dropdowns';

@Component({
    selector: 'control-content',
    templateUrl: 'ranges.html',
    encapsulation: ViewEncapsulation.None
})
export class RangesComponent {
    @ViewChild('gauge')
    public gauge: LinearGaugeComponent;
    @ViewChild('rangeIndex')
    public rangeIndex: DropDownList;
    @ViewChild('useRangeColor')
    public rangeFontColor: DropDownList;
    // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = <LinearGaugeTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    }
    // custom code end
    public rangePalette: Object[] = ['#9ef47a', '#f4f47a', '#ed5e5e'];
    //Initializing Axes
    public Axes: Object[] = [{
        labelStyle: {
            format: '{value}%',
            offset: 30
        },
        line: {
            width: 0
        },
        pointers: [
            {
                value: 35,
                height: 10,
                width: 10,
                markerType: 'Triangle',
                placement: 'Near',
                offset: -40,
            }
        ],
        majorTicks: {
            height: 0
        },
        minorTicks: {
            height: 0
        },
        ranges: [{
            start: 0,
            end: 32,
            color: '#30B32D',
            startWidth: 15,
            endWidth: 15
        },
        {
            start: 32,
            end: 68,
            startWidth: 15,
            endWidth: 15,
            color: '#FFDF00'
        },
        {
            start: 68,
            end: 100,
            startWidth: 15,
            endWidth: 15,
            color: '#F03E3E'
        }]
    }];
    public Annotation: Object[] = [{
        content: '<div id="pointer" style="width:20px"><h1 style="font-size:18px;">35</h1></div>',
        axisIndex: 0,
        axisValue: 35,
        y: -50, zIndex: '1'
    }];
    constructor() {
        // code
    };

    ngOnInit(): void {
        this.rangeIndex = new DropDownList({
            index: 0, width: 100,
            change: () => {
                let start: HTMLInputElement = <HTMLInputElement>document.getElementById('start');
                let end: HTMLInputElement = <HTMLInputElement>document.getElementById('end');
                let rangeColor: HTMLSelectElement = <HTMLSelectElement>document.getElementById('color');
                let startWidth: HTMLInputElement = <HTMLInputElement>document.getElementById('startWidth');
                let endWidth: HTMLInputElement = <HTMLInputElement>document.getElementById('endWidth');
                start.value = this.gauge.axes[0].ranges[parseInt(this.rangeIndex.value.toString(), 10)].start.toString();
                end.value = this.gauge.axes[0].ranges[parseInt(this.rangeIndex.value.toString(), 10)].end.toString();
                startWidth.value = this.gauge.axes[0].ranges[parseInt(this.rangeIndex.value.toString(), 10)].startWidth.toString();
                endWidth.value = this.gauge.axes[0].ranges[parseInt(this.rangeIndex.value.toString(), 10)].endWidth.toString();
                rangeColor.value = this.gauge.axes[0].ranges[parseInt(this.rangeIndex.value.toString(), 10)].color.toString();
                document.getElementById('startWidthValue').innerHTML = 'Range Start Width<span>&nbsp;&nbsp;&nbsp;' + startWidth.value;
                document.getElementById('endWidthValue').innerHTML = 'Range End Width<span>&nbsp;&nbsp;&nbsp;' + endWidth.value;
                document.getElementById('startRangeValue').innerHTML = 'Range Start <span>&nbsp;&nbsp;&nbsp;' + start.value;
                document.getElementById('endRangeValue').innerHTML = 'Range End <span>&nbsp;&nbsp;&nbsp;' + end.value;
                this.gauge.refresh();
            }
        });
        this.rangeIndex.appendTo('#rangeIndex');

        this.rangeFontColor = new DropDownList({
            index: 0, width: 100,
            change: () => {
                this.gauge.axes[0].labelStyle.useRangeColor = (this.rangeFontColor.value === 'range') ? true : false;
                this.gauge.refresh();
            }
        });
        this.rangeFontColor.appendTo('#useRangeColor');
    }

    ngAfterViewInit(): void {

        document.getElementById('color').onchange = () => {
            let rangeIndex: HTMLSelectElement = <HTMLSelectElement>document.getElementById('rangeIndex');
            let ele: HTMLInputElement = <HTMLInputElement>document.getElementById('color');
            this.gauge.axes[0].ranges[parseInt(rangeIndex.value, 10)].color = ele.value;
            this.gauge.refresh();
        };

        document.getElementById('startWidth').ontouchmove = document.getElementById('startWidth').onpointermove =
            document.getElementById('startWidth').onchange = (): void => {
                let ele: HTMLInputElement = <HTMLInputElement>document.getElementById('startWidth');
                this.gauge.axes[0].ranges[parseInt(this.rangeIndex.value.toString(), 10)].startWidth = parseInt(ele.value, 10);
                document.getElementById('startWidthValue').innerHTML = 'Range Start Width<span>&nbsp;&nbsp;&nbsp;' + ele.value;
                this.gauge.refresh();
            };

        document.getElementById('endWidth').ontouchmove = document.getElementById('endWidth').onpointermove =
            document.getElementById('endWidth').onchange = (): void => {
                let ele: HTMLInputElement = <HTMLInputElement>document.getElementById('endWidth');
                this.gauge.axes[0].ranges[parseInt(this.rangeIndex.value.toString(), 10)].endWidth = parseInt(ele.value, 10);
                document.getElementById('endWidthValue').innerHTML = 'Range End Width<span>&nbsp;&nbsp;&nbsp;' + ele.value;
                this.gauge.refresh();
            };

        document.getElementById('start').ontouchmove = document.getElementById('start').onpointermove =
            document.getElementById('start').onchange = (): void => {
                let start: HTMLInputElement = <HTMLInputElement>document.getElementById('start');
                let end: HTMLInputElement = <HTMLInputElement>document.getElementById('end');
                this.gauge.axes[0].ranges[parseInt(this.rangeIndex.value.toString(), 10)].start = parseInt(start.value, 10);
                this.gauge.axes[0].ranges[parseInt(this.rangeIndex.value.toString(), 10)].end = parseInt(end.value, 10);
                document.getElementById('startRangeValue').innerHTML = 'Range Start <span>&nbsp;&nbsp;&nbsp;' + start.value;
                this.gauge.refresh();
            };

        document.getElementById('end').ontouchmove = document.getElementById('end').onpointermove =
            document.getElementById('end').onchange = (): void => {
                let start: HTMLInputElement = <HTMLInputElement>document.getElementById('start');
                let end: HTMLInputElement = <HTMLInputElement>document.getElementById('end');
                this.gauge.axes[0].ranges[parseInt(this.rangeIndex.value.toString(), 10)].start = parseInt(start.value, 10);
                this.gauge.axes[0].ranges[parseInt(this.rangeIndex.value.toString(), 10)].end = parseInt(end.value, 10);
                document.getElementById('endRangeValue').innerHTML = 'Range End <span>&nbsp;&nbsp;&nbsp;' + end.value;
                this.gauge.refresh();
            };
    }
}