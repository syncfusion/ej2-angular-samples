import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { LinearGaugeComponent } from '@syncfusion/ej2-ng-lineargauge';
import { ContainerType, Orientation } from '@syncfusion/ej2-lineargauge';

/**
 * Container linear gauge
 */
@Component({
    selector: 'control-content',
    templateUrl: 'container.html',
    encapsulation: ViewEncapsulation.None
})
export class ContainerComponent {
    @ViewChild('gauge')
    public gauge: LinearGaugeComponent;
    public Axes: Object[] = [{
        minimum: 0,
        maximum: 180,
        line: {
            width: 0
        },
        labelStyle: {
            font: {
                color: '#000000'
            }
        },
        majorTicks: {
            interval: 20,
            color: '#9e9e9e'
        },
        minorTicks: {
            color: '#9e9e9e'
        },
        pointers: [
            {
                value: 90,
                height: 13,
                width: 13,
                roundedCornerRadius: 5,
                type: 'Bar',
                color: '#f02828'
            }
        ]
    },
    {
        minimum: 0,
        maximum: 180,
        line: {
            width: 0
        },
        labelStyle: {
            font: {
                color: '#000000'
            }
        },
        majorTicks: {
            interval: 20
        },
        opposedPosition: true,
        pointers: [
            {
                width: 0
            }
        ]
    }];

    public Container: Object = {
        width: 13,
        roundedCornerRadius: 5,
        type: 'Thermometer'
    };
    constructor() {
        //code
    };

    ngAfterViewInit(): void {
        document.getElementById('containerMode').onchange = () => {
            let ele: HTMLSelectElement = <HTMLSelectElement>document.getElementById('containerMode');
            this.gauge.container.type = <ContainerType>ele.value;
            this.gauge.refresh();
        };
        document.getElementById('orientationMode').onchange = () => {
            let ele: HTMLSelectElement = <HTMLSelectElement>document.getElementById('orientationMode');
            this.gauge.orientation = <Orientation>ele.value;
            this.gauge.refresh();
        };
    }
}

