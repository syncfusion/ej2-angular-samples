import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, LinearGaugeTheme } from '@syncfusion/ej2-lineargauge';
import { LinearGaugeModule, AnnotationsService } from '@syncfusion/ej2-angular-lineargauge';

@Component({
    selector: 'control-content',
    templateUrl: 'battery-indicator.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [LinearGaugeModule],
    providers: [AnnotationsService]
})

export class BatteryIndicatorComponent {
    public borderColor: string = '#E5E7EB';
    public textColor: string = '#000000';
    public axes: Object[] = [{
        minimum: 0,
        maximum: 60,
        line: { width: 0 },
        pointers: [{
            width: 0
        }],
        ranges: [
            {
                start: 3,
                end: 14,
                startWidth: 45,
                endWidth: 45,
                color: '#66BB6A',
                offset: 52
            },
            {
                start: 16,
                end: 29,
                startWidth: 45,
                endWidth: 45,
                color: '#66BB6A',
                offset: 52
            },
            {
                start: 31,
                end: 44,
                startWidth: 45,
                endWidth: 45,
                color: '#66BB6A',
                offset: 52
            }
        ],
        majorTicks: {
            interval: 15, height: 0
        },
        minorTicks: {
            interval: 5, height: 0
        },
        labelStyle: {
            font: { size: '0px' }
        }
    }];

    public annotation: Object = [{
        axisIndex: 0,
        axisValue: 60,
        x: 0,
        y: 0, zIndex: '1',
    }, {
        axisIndex: 0,
        axisValue: 0,
        x: 0,
        y: 0, zIndex: '1',
    }];

    public container: Object = {
        width: 58, type: 'RoundedRectangle', border: { width: 5 }
    };

    public load(args: ILoadedEventArgs): void {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = <LinearGaugeTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-high/i, 'High').replace(/5.3/i, '5');
        // custom code end
        this.borderColor = args.gauge.theme.indexOf('Dark') > -1 ? 'white' : '#bfbfbf';
        this.textColor = args.gauge.theme.indexOf('Dark') > -1 || args.gauge.theme.indexOf('HighContrast') > -1 ? '#FFFFFF' : '#000000';
        if (args.gauge.theme == 'Bootstrap5Dark' || args.gauge.theme == 'Tailwind3Dark') {
            this.borderColor = "#4b5563";
        }
        if (args.gauge.theme == 'FabricDark' || args.gauge.theme == 'BootstrapDark' || args.gauge.theme == 'MaterialDark' || args.gauge.theme == 'HighContrast' || args.gauge.theme == 'Material' || args.gauge.theme == 'Fabric' || args.gauge.theme == 'Bootstrap') {
            this.borderColor = "#bfbfbf";
        }
        if (args.gauge.theme == 'Fluent' || args.gauge.theme == 'Fluent2') {
            this.borderColor = "#EDEBE9";
        }
        if (args.gauge.theme == 'FluentDark' || args.gauge.theme == 'Fluent2Dark' || args.gauge.theme == 'Fluent2HighContrast') {
            this.borderColor = "#292827";
        }
        if (args.gauge.theme == 'Bootstrap5' || args.gauge.theme == 'Tailwind3') {
            this.borderColor = "#E5E7EB";
        }
        args.gauge.annotations[0].content = `<div style="width: 16px;height: 37px;border: 5px solid ${this.borderColor};margin-left:26px;margin-top:57px;border-radius: 6px;" />`;
        args.gauge.annotations[1].content = `<div style="width: 137px;font-size: 20px;margin-top:-47px;margin-left:147px;color:${this.textColor};">Charged: 75%</div>`;        
    }

    constructor() {
        // code
    };
}