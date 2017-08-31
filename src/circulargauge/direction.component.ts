import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { CircularGaugeComponent } from '@syncfusion/ej2-ng-circulargauge';
import { IAxisLabelRenderEventArgs } from '@syncfusion/ej2-circulargauge';

/**
 * multiple axis in gauge
 */

@Component({
    selector: 'control-content',
    templateUrl: 'direction.html',
    encapsulation: ViewEncapsulation.None
})

export class DirectionComponent {
    @ViewChild('direction')
    public circulargauge: CircularGaugeComponent;
   
    public lineStyle: Object = {
        width: 10, color: '#E0E0E0'
    };
    public onLabelRender(args: IAxisLabelRenderEventArgs): void {
        args.text = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', ''][args.value];
    }
    public labelStyle: Object = {
        font: {
            size: '12px', color: '#333333', fontFamily: 'Roboto'
        },
        useRangeColor: true,
        autoAngle: true,
        hiddenLabel: 'Last'
    };
    public majorTicks: Object = {
        height: 15,
        interval: 1,
        color: '#9E9E9E'
    };
    public minorTicks: Object = {
        height: 10,
        interval: 0.5,
        color: '#9E9E9E'
    };

    public ranges: Object[] = [{
        start: 7,
        end: 7,
        color: '#f03e3e'
    }];
    public pointers: Object[] = [{
        value: 7,
        radius: '50%',
        color: '#f03e3e',
        pointerWidth: 20,
        cap: {
            radius: 0
        },
        animation: { enable: false }
    }, {
        value: 3,
        radius: '50%',
        color: '#9E9E9E',
        pointerWidth: 20,
        cap: {
            radius: 0
        },
        animation: { enable: false }
    }];
    ngAfterViewInit(): void {
        document.getElementById('poiterColor').onchange = () => {
            let rangeColor: string = (<HTMLInputElement>document.getElementById('poiterColor')).value;
            this.circulargauge.axes[0].pointers[0].color = rangeColor;
            this.circulargauge.refresh();
        };
    
        document.getElementById('labelColor').onchange = () => {
            let rangeColor: string = (<HTMLInputElement>document.getElementById('labelColor')).value;
            this.circulargauge.axes[0].ranges[0].color = rangeColor;
            this.circulargauge.refresh();
        };

    }
    constructor() {
        // code
    };
}



