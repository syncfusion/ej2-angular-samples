/**
 * Samples for labels
 */
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { CircularGaugeComponent, ILoadedEventArgs, GaugeTheme, GaugeShape } from '@syncfusion/ej2-angular-circulargauge';
import { Position, TickModel, LegendPosition, Legend, Alignment } from '@syncfusion/ej2-circulargauge';
import { CheckBox, ChangeEventArgs as CheckBoxChangeEvents } from '@syncfusion/ej2-buttons';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { EmitType } from '@syncfusion/ej2-base';
// custom code start
//tslint:disable
// custom code end
@Component({
    selector: 'control-content',
    templateUrl: 'legend.html',
    encapsulation: ViewEncapsulation.None
})
export class LegendComponent{
    @ViewChild('Legend')
    public circulargauge: CircularGaugeComponent;
     // custom code start
     public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = <GaugeTheme>(selectedTheme.charAt(0).toUpperCase() +
        selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i,  'Contrast');
    }
    // custom code end
    public title: string = 'Measure of wind speed in Km/h';
    public legendSettings: object = {
        visible: true,
        position: 'Bottom'
    }
    public lineStyle1: Object = {
        width: 2, color: '#9E9E9E'
    };
    public labelStyle1: Object = {
        position: 'Inside'
    };
    public majorTicks1: Object = {
        color: '#757575', height: 16, interval: 20
    };
    public minorTicks1: Object = {
        height: 8, interval: 10
    };
    public pointers: Object[] = [{
        value: 70, animation:{enable:true},
        pointerWidth: 8, radius: '60%',
        cap: { radius: 7 }, needleTail: { length: '18%' }
    }];
    public alignment: DropDownList; public shape: DropDownList; public position: DropDownList;
    ngOnInit(): void {
        this.alignment = new DropDownList({
            index: 0, width: '100%',
            change: () => {
                let alignment: string = this.alignment.value.toString();
                this.circulargauge.legendSettings.alignment = alignment as Alignment;
            }
        });
        this.alignment.appendTo('#alignment');
        this.shape = new DropDownList({
            index: 0, width: '100%',
            change: () => {
                let shape: string = this.shape.value.toString();
                this.circulargauge.legendSettings.shape = shape as GaugeShape;
            }
        });
        this.shape.appendTo('#shape');
        this.position = new DropDownList({
            index: 0, width: '100%',
            change: () => {
                let position: string = this.position.value.toString();
                this.circulargauge.legendSettings.position = position as LegendPosition;
            }
        });
        this.position.appendTo('#position');
    }
    ngAfterViewInit(): void {
        let legend: CheckBox = new CheckBox({
            checked: true,
            change: () => {
                this.circulargauge.legendSettings.visible = legend.checked;
            }
        }, '#enable');
        let toggle: CheckBox = new CheckBox({
            checked: true,
            change: () => {
                this.circulargauge.legendSettings.toggleVisibility = toggle.checked;
            }
        }, '#toggle');
    }

}
