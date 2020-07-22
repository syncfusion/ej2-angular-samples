/**
 * Sample for tooltip
 */
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { LinearGaugeComponent, LinearGaugeTheme } from '@syncfusion/ej2-angular-lineargauge';
import { ITooltipRenderEventArgs, IAxisLabelRenderEventArgs, ILoadedEventArgs, ILoadEventArgs, IResizeEventArgs } from '@syncfusion/ej2-lineargauge';

@Component({
    selector: 'control-content',
    templateUrl: 'tooltip.html',
    encapsulation: ViewEncapsulation.None
})
export class TooltipComponent {
    @ViewChild('gauge')
    public gauge: LinearGaugeComponent;
    // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = <LinearGaugeTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
        if (args.gauge.theme.toLowerCase().indexOf('dark') > 1 || args.gauge.theme.toLowerCase() === 'highcontrast') {
            args.gauge.annotations[0].content = '<div id="first"><h1 style="font-size:15px; color: #DADADA">Inches</h1></div>';
            args.gauge.annotations[1].content = '<div id="second"><h1 style="font-size:15px; color: #DADADA">Centimeters</h1></div>';
        }
    
    }
    // custom code end
    public Container: Object = {
        width: 140,
        border: {
            width: 2,
            color: '#a6a6a6'
        }
    };
    public Tooltip: Object = {
        enable: true
    };

    public Axes: Object = [
        {
            minimum: 0,
            maximum: 10,
            line: {
                offset: 140
            },
            majorTicks: {
                interval: 1
            },
            minorTicks: {
                interval: 0.2
            },
            labelStyle: {
                font: {
                    color: '#000000'
                }
            },
            pointers: [{
                type: 'Bar',
                value: 5.4,
                offset: 15,
                color: '#ff66b3'
            }],
        },
        {
            opposedPosition: true,
            minimum: 0,
            maximum: 25,
            line: {
                offset: -140,
            },
            labelStyle: {
                font: {
                    color: '#000000'
                }
            },
            majorTicks: {
                interval: 1
            },
            minorTicks: {
                interval: 0.2
            },
            pointers: [{
                type: 'Bar',
                offset: -15,
                value: 16.5,
                color: '#4d94ff'
            }]
        }
    ];

    constructor() {
        //code
    };
    public labelRender(args: IAxisLabelRenderEventArgs): void {
        if (args.axis.visibleRange.min === args.value || args.axis.visibleRange.max === args.value) {
            args.text = '';
        }
    }
    public renderTooltip(args: ITooltipRenderEventArgs): void {
        args.content = (args.axis.visibleRange.max === 25) ? Number(args.content).toFixed(1) + ' cm' : Number(args.content).toFixed(1) + ' in';
    }
}