/**
 * Customization Sample
 */
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { SmithchartTheme, ISmithchartLoadEventArgs, Smithchart} from '@syncfusion/ej2-angular-charts';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Slider, SliderChangeEventArgs } from '@syncfusion/ej2-inputs';
import { EmitType } from '@syncfusion/ej2-base';
import {  ChangeEventArgs as CheckBoxChangeEvents} from '@syncfusion/ej2-buttons';
import { SliderComponent } from '@syncfusion/ej2-angular-inputs';

@Component({
    selector: 'control-content',
    templateUrl: 'custom.html',
    encapsulation: ViewEncapsulation.None
})
export class SmithchartCustomComponent {
    @ViewChild('smithchart')
    @ViewChild('slide')
    //public slide : Slider;
    public smithchart: Smithchart;
    public horizontalAxis: Object = {
            minorGridLines: {
                visible: true
            }
        };
    public radialAxis: Object = {
            minorGridLines: {
                visible: true
            }
        };
    public data: Object[] = [
       { resistance: 10, reactance: 25 }, { resistance: 8, reactance: 6 },
                    { resistance: 6, reactance: 4.5 }, { resistance: 4.5, reactance: 4 },
                    { resistance: 3.5, reactance: 3 }, { resistance: 2.5, reactance: 2 },
                    { resistance: 2, reactance: 1.5 }, { resistance: 1.5, reactance: 1.25 },
                    { resistance: 1, reactance: 0.9 }, { resistance: 0.5, reactance: 0.6 },
                    { resistance: 0.3, reactance: 0.4 }, { resistance: 0, reactance: 0.15 }
    ];
    public data1: Object[] = [
      { resistance: 20, reactance: -50 }, { resistance: 10, reactance: -10 },
                    { resistance: 9, reactance: -4.5 }, { resistance: 8, reactance: -3.5 },
                    { resistance: 7, reactance: -2.5 }, { resistance: 6, reactance: -1.5 },
                    { resistance: 5, reactance: -1 }, { resistance: 4.5, reactance: -0.8 },
                    { resistance: 3.5, reactance: -0.8 }, { resistance: 2.5, reactance: -0.4 },
                    { resistance: 2, reactance: -0.2 }, { resistance: 1.5, reactance: 0 },
                    { resistance: 1, reactance: 0.1 }, { resistance: 0.5, reactance: 0.2 },
                    { resistance: 0.3, reactance: 0.15 }, { resistance: 0, reactance: 0.05 },
    ];
    // custom code start
     // tslint:disable
     // custom code end
    public radius: number = 1;
    public marker: Object = {
        shape: 'Rectangle',
        visible: true,
        border: {
            width: 2,
        }
    };
    public title: Object = {
     text: 'Impedance Transmission', enableTrim: true, maximumWidth: 200,
            visible: true
    };
    public legend: Object = {
         visible: true,
         position: 'Top',
         shape: 'Circle'
    };
    public tooltip: Object = {
        visible: true
    };
    public value: number = 1;
    public min: number = 0.1;
    public max: number = 1;
    // custom code start
    public load = (args: ISmithchartLoadEventArgs) => {
        let theme: string = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.smithchart.theme = <SmithchartTheme>(theme.charAt(0).toUpperCase() + theme.slice(1));
    }
    // custom code end
    public setRadius(e: SliderChangeEventArgs): void {
        let slider: Element = document.getElementById('radius');
        let slider1: SliderComponent = <SliderComponent>slider['ej2_instances'][0];
        let smith: Element = document.getElementById('smithchartcontainer');
        let smith1: Smithchart = <Smithchart>smith['ej2_instances'][0];
        smith1.radius = slider1.value as number;
        document.getElementById('radius1').innerHTML = 'Radius <span> ' + (slider1.value as number);
        smith1.refresh();
    }
    public setMarker(e: CheckBoxChangeEvents): void {
        let boolean: boolean = e.checked;
        let smith: Smithchart = <Smithchart>document.getElementById('smithchartcontainer')['ej2_instances'][0];
        if (boolean) {
            smith.series[0].marker.visible = true;
            smith.series[1].marker.visible = true;
        } else {
            smith.series[0].marker.visible = false;
            smith.series[1].marker.visible = false;
        }
        smith.refresh();
    }
    public setDataLabel(e: CheckBoxChangeEvents): void {
        let boolean: boolean = e.checked;
        let smith: Smithchart = <Smithchart>document.getElementById('smithchartcontainer')['ej2_instances'][0];
        if (boolean) {
            smith.series[0].marker.dataLabel.visible = true;
            smith.series[1].marker.dataLabel.visible = true;
        } else {
            smith.series[0].marker.dataLabel.visible = false;
            smith.series[1].marker.dataLabel.visible = false;
        }
        smith.refresh();
    }
    public setAnimation(e: CheckBoxChangeEvents): void {
        let boolean: boolean = e.checked;
        let smith: Smithchart = <Smithchart>document.getElementById('smithchartcontainer')['ej2_instances'][0];
        if (boolean) {
            smith.series[0].enableAnimation = true;
            smith.series[1].enableAnimation = true;
        } else {
            smith.series[0].enableAnimation = false;
            smith.series[1].enableAnimation = false;
        }
        smith.refresh();
    }

    public setTooltip(e: CheckBoxChangeEvents): void {
        let boolean: boolean = e.checked;
        let smith: Smithchart = <Smithchart>document.getElementById('smithchartcontainer')['ej2_instances'][0];
        if (boolean) {
            smith.series[0].tooltip.visible = true;
            smith.series[1].tooltip.visible = true;
        } else {
            smith.series[0].tooltip.visible = false;
            smith.series[1].tooltip.visible = false;
        }
        this.smithchart.refresh();
    }
    public setLegend(e: CheckBoxChangeEvents): void {
        let boolean: boolean = e.checked;
        let smith: Smithchart = <Smithchart>document.getElementById('smithchartcontainer')['ej2_instances'][0];
        if (boolean) {
            smith.legendSettings.visible = true;
        } else {
            smith.legendSettings.visible = false;
        }
        smith.refresh();
    }
    ngOnInit(): void {
        let mode: DropDownList = new DropDownList({
        index: 0,
        width: 90,
        change: () => {
            let element: string = mode.value.toString();
            let smith: Smithchart = <Smithchart>document.getElementById('smithchartcontainer')['ej2_instances'][0];
           smith.legendSettings.position = element;
            smith.refresh();
        }
    });
        mode.appendTo('#legend1');
    }
    constructor() {
        //code
    };
}