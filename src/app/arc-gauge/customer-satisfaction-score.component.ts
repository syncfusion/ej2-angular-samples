/**
 * Sample for Circular Gauge default functionalities
 */
import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, GaugeTheme, Legend, CircularGaugeModule, AnnotationsService, LegendService, GaugeTooltipService } from '@syncfusion/ej2-angular-circulargauge';

@Component({
    selector: 'control-content',
    templateUrl: 'customer-satisfaction-score.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [CircularGaugeModule],
    providers: [AnnotationsService, LegendService, GaugeTooltipService]
})

export class CustomerSatisfactionComponent {

    public height: string = "400px";
    public allowMargin: boolean = false;
    public pointerWidth: number = 5;
    public needleEndWidth: number = 2;

    public titleStyle: Object = {
        fontFamily: 'inherit',
        size: '18px'
    };

    public animation: Object = {
        enable: false
    };    

    public legendSettings: Object = {
        visible: true,
        position: 'Bottom',
        width:'55%',
        textStyle: {
            fontFamily: 'inherit',
            size: '12px'
        }
    };

    public tooltip: Object = {
        enable: true,
        template: '<div style="font-size:18px;background:white;width:180px;color:#595959;border:1px solid #e8e8e8">Current Score: 7.5 </div>'
    };

    public annotations: Object = [
        {
            content:
                '<div style="font-size:16px;margin-top: 15px;font-family: inherit;">7.5</div>',
            angle: 0,
            zIndex: '1',
            radius: '-10%',
        }
    ];

    public majorTicks: Object = {
        height: 12,
        width: 1.5,
        interval: 2.0,
        offset: 35
    };

    public minorTicks: Object = {
        height: 0
    };

    public lineStyle: Object = {
        width: 0
    };

    public labelStyle: Object = {
        font: {
            size: '12px',
            fontFamily: 'inherit'
        },
        position: 'Outside',
        offset: -40,
    };

    public cap: Object = {
        radius: 8,
        border: { width: 2 },
    };

    public load(args: ILoadedEventArgs): void {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = <GaugeTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-high/i, 'High').replace(/5.3/i, '5');
        if (selectedTheme.indexOf('dark') > -1 || selectedTheme.indexOf('contrast') > -1) {
            args.gauge.axes[0].annotations[0].content = '<div style="font-size:16px;font-family:inherit;margin-top:15px;color:white">7.5</div>';
        }
        else {
            args.gauge.axes[0].annotations[0].content = '<div style="font-size:16px;font-family:inherit;margin-top:15px;color:black">7.5</div>';
        }
        // custom code end
    }

    constructor() {
        // code
    };
}