import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { CircularGaugeComponent, ILoadedEventArgs, GaugeTheme, CircularGaugeModule, GradientService } from '@syncfusion/ej2-angular-circulargauge';
import { IAxisLabelRenderEventArgs } from '@syncfusion/ej2-circulargauge';
import { DropDownList } from '@syncfusion/ej2-dropdowns';

@Component({
    selector: 'control-content',
    templateUrl: 'direction-compass.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [CircularGaugeModule],
    providers: [GradientService]
})

export class DirectionComponent {

    @ViewChild('direction')
    public circulargauge: CircularGaugeComponent;

    public pointerColor: DropDownList;
    public labelColor: DropDownList;

    public lineStyle: Object = {
        width: 20, color: '#E0E0E0'
    };

    public labelStyle: Object = {
        font: {
            fontFamily: 'inherit'
        },
        autoAngle: true,
        offset: 10,
        hiddenLabel: 'Last'
    };

    public majorTicks: Object = {
        height: 15,
        interval: 1
    };

    public minorTicks: Object = {
        height: 10,
        interval: 0.5
    };

    public pointers: Object[] = [{
        value: 7,
        radius: '50%',
        pointerWidth: 30,
        linearGradient: {
            startValue: '0%',
            endValue: '100%',
            colorStop: [
                { color: '#ff6b78', offset: '0%', opacity: 0.9 },
                { color: '#e20a22', offset: '70%', opacity: 0.9 }]
        },
        cap: {
            radius: 15,
            color: '#ffffff',
            border: {
                width: 0
            }
        }, animation: {
            enable: false
        }
    }, {
        value: 3,
        radius: '50%',
        color: '#f7f7f7',
        pointerWidth: 30,
        cap: {
            radius: 15, color: '#ffffff',
            border: {
                width: 0
            },
        },
        animation: { enable: false }
    }];

    public load(args: ILoadedEventArgs): void {
        /* custom code start */
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = <GaugeTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-high/i, 'High').replace(/5.3/i, '5');
        /* custom code end */
    }

    public onLabelRender(args: IAxisLabelRenderEventArgs): void {
        args.text = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', ''][args.value];
    }

    ngOnInit(): void {
        this.pointerColor = new DropDownList({
            index: 0,
            placeholder: 'Select Range Bar Color',
            width: '100%',
            change: () => {
                let rangeColor: string = this.pointerColor.value.toString();
                this.circulargauge.axes[0].pointers[0].color = rangeColor;
                this.circulargauge.refresh();
            }
        });
        this.pointerColor.appendTo('#poiterColor');

        this.labelColor = new DropDownList({
            index: 0,
            placeholder: 'Select Range Bar Color',
            width: '100%',
            change: () => {
                let rangeColor: string = this.labelColor.value.toString();
                this.circulargauge.axes[0].labelStyle.font.color = rangeColor;
                this.circulargauge.refresh();
            }
        });
        this.labelColor.appendTo('#labelColor');
    }

    constructor() {
        // code
    };
}



