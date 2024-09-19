import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, LinearGaugeTheme } from '@syncfusion/ej2-lineargauge';
import { LinearGaugeModule, AnnotationsService } from '@syncfusion/ej2-angular-lineargauge';

@Component({
    selector: 'control-content',
    templateUrl: 'default-functionalities.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [LinearGaugeModule],
    providers: [AnnotationsService]
})

export class DefaultComponent {
    public axes: Object[] = [{
        pointers: [{
            value: 10,
            height: 15,
            width: 15,
            placement: 'Near',
            offset: -40,
            markerType: 'Triangle'
        }],
        majorTicks: {
            interval: 10, height: 20, color:'#9E9E9E'
        },
        minorTicks: {
            interval: 2, height: 10, color:'#9E9E9E' 
        },
        labelStyle: {
            offset: 48,
            font:{ fontFamily: 'inherit' }
        }
    }];

    public annotation: Object = [{
        content: '<div style="width: 70px;margin-left:-3%;margin-top: 42%;font-size: 16px;">10 MPH</div>',
        axisIndex: 0,
        axisValue: 10,
        x: 10,
        y: -70, zIndex: '1',
    }];

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