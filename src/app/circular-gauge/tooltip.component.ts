/**
 * Sample for tooltip
 */
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ILoadedEventArgs, GaugeTheme } from '@syncfusion/ej2-circulargauge';
import { CircularGaugeComponent } from '@syncfusion/ej2-angular-circulargauge';

@Component({
    selector: 'control-content',
    templateUrl: 'tooltip.html',
    encapsulation: ViewEncapsulation.None
})

export class TooltipComponent {
    @ViewChild('tooltipContainer')
    public circulargauge: CircularGaugeComponent;
    public cap: Object = { radius: 10, border: { color: '#33BCBD', width: 5 } };
    public animation: Object = { enable: true, duration: 1500 };
    public title: string = 'Tooltip Customization';
    //Initializing titleStyle
    public titleStyle: Object = { size: '15px', color: 'grey' };
    public majorTicks: Object = { color: 'white', offset: -5, height: 12 };
    public minorTicks: Object = { width: 0 };
    public labelStyle: Object = { useRangeColor: true, font: { color: '#424242', size: '13px', fontFamily: 'Roboto' } };
    public lineStyle: Object = { width: 0 };


    //Initializing Tooltip
    public tooltip: Object = {
        enable: true,
        enableAnimation: false
    };
    public rangeWidth: number = 10;
    // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = <GaugeTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    }
    // custom code end
    constructor() {
        // code
    };
}
