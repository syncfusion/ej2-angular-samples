/**
 *  Sample for styles
 */
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { LinearGaugeComponent } from '@syncfusion/ej2-angular-lineargauge';
import { IMouseEventArgs, ILoadedEventArgs, LinearGaugeTheme } from '@syncfusion/ej2-lineargauge';

@Component({
    selector: 'control-content',
    templateUrl: 'style.html',
    encapsulation: ViewEncapsulation.None
})
export class StyleComponent {
    private mouse: boolean = false;
    @ViewChild('linear')
    public linear: LinearGaugeComponent;
    // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = <LinearGaugeTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    }
    // custom code start
    //Initializing Axes
    public Axes1: Object[] = [{
        line: {
            color: '#9E9E9E'
        },
        pointers: [{
            value: 80,
            offset: 10,
            height: 13,
            width: 13,
        }],
        majorTicks: {
            interval: 10,
            color: '#9E9E9E',
        },
        minorTicks: {
            color: '#9E9E9E'
        },
    }];

    public Axes2: Object[] = [{
        line: {
            offset: 30
        },
        majorTicks: {
            interval: 10,
        },
        labelStyle: {
            offset: 50
        },
        pointers: [{
            value: 10,
            placement: 'Near',
            offset: -50,
            height: 15,
            width: 15,
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
            offset: 55
        },
        pointers: [
            {
                value: 60,
                height: 15,
                width: 15,
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