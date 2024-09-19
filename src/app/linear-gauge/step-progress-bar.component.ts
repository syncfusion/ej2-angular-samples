import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, LinearGaugeTheme, IAxisLabelRenderEventArgs } from '@syncfusion/ej2-lineargauge';
import { LinearGaugeModule } from '@syncfusion/ej2-angular-lineargauge';

@Component({
    selector: 'control-content',
    templateUrl: 'step-progress-bar.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [LinearGaugeModule]
})

export class StepProgressBarComponent {

    public axes: Object[] = [{
        minimum: 5,
        maximum: 20,
        opposedPosition: true,
        line: {
            width: 5
        },
        pointers: [{
            value: 5,
            height: 25,
            width: 25,
            placement: 'Near',
            markerType: 'Image',
            imageUrl: 'https://ej2.syncfusion.com/angular/demos/assets/linear-gauge/images/tick-icon.png'
        }, {
            value: 10,
            height: 25,
            width: 25,
            placement: 'Near',
            markerType: 'Image',
            imageUrl: 'https://ej2.syncfusion.com/angular/demos/assets/linear-gauge/images/tick-icon.png'
        }, {
            value: 15,
            height: 25,
            width: 25,
            placement: 'Near',
            markerType: 'Image',
            imageUrl: 'https://ej2.syncfusion.com/angular/demos/assets/linear-gauge/images/tick-icon.png'
        }, {
            value: 20,
            height: 25,
            width: 15,
            placement: 'Center',
            position: 'Cross',
            color: '#D1D9DD',
            offset: -2,
            markerType: 'Circle'
        }],
        ranges: [
            {
                start: 5,
                end: 10,
                startWidth: 5,
                endWidth: 5,
                color: '#1FAC8A'
            }, {
                start: 10,
                end: 15,
                startWidth: 5,
                endWidth: 5,
                color: '#1FAC8A'
            }, {
                start: 15,
                end: 20,
                startWidth: 5,
                endWidth: 5,
                color: '#D1D9DD'
            }
        ],
        majorTicks: {
            height: 0,
            interval: 5
        },
        minorTicks: {
            height: 0
        },
        labelStyle: {
            offset: 20,
            font: { size: '16px', fontFamily: 'inherit' }
        }
    }];

    public axisLabelRender(args: IAxisLabelRenderEventArgs): void {
        if (args.text == "5")
            args.text = "Ordered";
        else if (args.text == "10")
            args.text = "Packed";
        else if (args.text == "15")
            args.text = "Shipped";
        else if (args.text == "20")
            args.text = "Delivered";
        else
            args.text = " ";
    }

    public load(args: ILoadedEventArgs): void {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = <LinearGaugeTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-high/i, 'High').replace(/5.3/i, '5');
        // custom code end
    }

    constructor() {
        // code
    };
}