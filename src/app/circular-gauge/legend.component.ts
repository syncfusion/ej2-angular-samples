import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { CircularGaugeComponent, ILoadedEventArgs, GaugeTheme, GaugeShape, CircularGaugeModule, LegendService } from '@syncfusion/ej2-angular-circulargauge';
import { LegendPosition, Alignment } from '@syncfusion/ej2-circulargauge';
import { CheckBox, ChangeEventArgs as CheckBoxChangeEvents } from '@syncfusion/ej2-buttons';
import { DropDownList } from '@syncfusion/ej2-dropdowns';

/* custom code start */
// tslint:disable
/* custom code end */

@Component({
    selector: 'control-content',
    templateUrl: 'legend.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [CircularGaugeModule],
    providers: [LegendService]
})

export class LegendComponent {

    @ViewChild('Legend')
    public circulargauge: CircularGaugeComponent;

    public alignment: DropDownList;
    public shape: DropDownList;
    public position: DropDownList;
    public title: string = 'Measure of wind speed in km/h';

    public titleStyle: Object = {
        fontFamily: 'inherit'
    };

    public legendSettings: Object = {
        visible: true,
        position: 'Bottom',
        textStyle: {
            fontFamily: 'inherit',
            size: '12px'
        }
    };

    public lineStyle1: Object = {
        width: 2
    };

    public labelStyle1: Object = {
        position: 'Inside', useRangeColor: false, font: { fontFamily: 'inherit' }
    };

    public majorTicks1: Object = {
        color: '#9E9E9E', height: 16, interval: 20
    };
    public minorTicks1: Object = {
        height: 8, interval: 10
    };

    public pointers: Object[] = [{
        value: 70, animation: { enable: true },
        pointerWidth: 8, radius: '60%',
        cap: { radius: 7 }, needleTail: { length: '18%' }
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
