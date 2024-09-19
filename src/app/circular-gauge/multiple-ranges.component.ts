import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, GaugeTheme, CircularGaugeModule, AnnotationsService } from '@syncfusion/ej2-angular-circulargauge';

@Component({
    selector: 'control-content',
    templateUrl: 'multiple-ranges.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [CircularGaugeModule],
    providers: [AnnotationsService]
})

export class MultipleRangesComponent {

    public majorTicks: Object = {
        width: 0,
        interval:10
    };

    public minorTicks: Object = {
        width: 0
    };

    public lineStyle: Object = {
        width: 0
    };

    public annotaions: Object = [{
        content: '<div style="font-size:18px;margin-left: 5px;color:#9DD55A"> 22.5\u00b0C </div>',
        radius: '20%', angle: 180, zIndex:'1'
    }];
    
    public labelStyle: Object = {
        font: {
            fontFamily: 'inherit',
        },
        offset: 50,
        position:'Inside',
        autoAngle:true
    };

    public cap: Object = {
        radius: 10, color:'White',
        border: { width: 4, color:'#F7B194' }
    };

    public tail: Object = {
        length: '25%',
        color:'#F7B194'
    };

    public animation: Object = {
        enable: false
    };

    public load(args: ILoadedEventArgs): void {
        /* custom code start */
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = <GaugeTheme>(selectedTheme.charAt(0).toUpperCase() +
        selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-high/i, 'High').replace(/5.3/i, '5');
        /* custom code end */
    }

    constructor() {
        // code
    };
}