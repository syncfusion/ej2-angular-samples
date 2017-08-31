import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { LinearGaugeComponent } from '@syncfusion/ej2-ng-lineargauge';
import { IMouseEventArgs } from '@syncfusion/ej2-lineargauge';

/**
 * Tooltip linear gauge
 */
@Component({
    selector: 'control-content',
    templateUrl: 'style.html',
    encapsulation: ViewEncapsulation.None
})
export class StyleComponent {
    private mouse: boolean = false;
    @ViewChild('linear')
    public linear: LinearGaugeComponent;

    public Axes1: Object[] = [{
        line: {
            color: '#9E9E9E'
        },
        pointers: [{
            value: 80,
            offset: 10,
            height: 13,
            width: 13,
            color: '#424242',
        }],
        majorTicks: {
            interval: 10,
            color: '#9E9E9E',
        },
        minorTicks: {
            color: '#9E9E9E'
        },
        labelStyle: {
            font: {
                color: '#424242'
            }
        }
    }];

    public Axes2: Object[] = [{
        line: {
            offset: 30
        },
        majorTicks: {
            interval: 10,
        },
        labelStyle: {
            font: {
                color: '#424242',
            },
            offset: 50
        },
        pointers: [{
            value: 10,
            placement: 'Near',
            offset: -50,
            height: 15,
            width: 15,
            color: '#424242',
            markerType: 'Triangle'
        }],
        ranges: [
            {
                start: 0,
                end: 10,
                startWidth: 30,
                endWidth: 30,
                color: '#30b32d'
            }
        ]
    }];

    public Axes3: Object[] = [{
        line: {
            offset: -20,
            color: '#9E9E9E'
        },
        pointers: [
            {
                value: 70,
                offset: 20,
                height: 13,
                width: 13,
                color: '#424242',
            },
            {
                value: 70,
                type: 'Bar',
                height: 10,
                color: 'red'
            }
        ],
        majorTicks: {
            interval: 10,
            color: '#9E9E9E'
        },
        minorTicks: {
            color: '#9E9E9E'
        },
        labelStyle: {
            font: {
                color: '#424242'
            }
        }
    }];

    public Axes4: Object = [{
        line: {
            width: 0
        },
        majorTicks: {
            interval: 10,
            height: 0
        },
        minorTicks: {
            height: 0
        },
        labelStyle: {
            font: {
                color: '#424242',
            },
            offset: 55
        },
        pointers: [
            {
                value: 60,
                height: 15,
                width: 15,
                color: '#424242',
                placement: 'Near',
                offset: -50,
                markerType: 'Triangle'
            },
            {
                type: 'Bar',
                color: '#ff9200',
                value: 60,
                height: 30
            }
        ]
    }];



    public Container2: Object = {
        width: 30,
        backgroundColor: '#e0e0e0',
        border: {
            width: 0
        },
        offset: -20
    };

    public Container4: Object = {
        width: 30,
        offset: 0,
        backgroundColor: '#e0e0e0'
    };
    constructor() {
        //code
    };


}