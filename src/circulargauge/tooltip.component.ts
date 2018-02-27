import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ITooltipRenderEventArgs, ILoadedEventArgs, GaugeTheme } from '@syncfusion/ej2-circulargauge';
import { CircularGaugeComponent } from '@syncfusion/ej2-ng-circulargauge';

/**
 * Sample for tooltip
 */
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
    public title: string = 'Tooltip Customization'
    //Initializing titleStyle
    public titleStyle: Object = { size: '15px', color: 'grey' };
    public majorTicks: Object = { color: 'white', offset: -5, height: 12 };
    public minorTicks: Object = { width: 0 };
    public labelStyle: Object = { useRangeColor: true, font: { color: '#424242', size: '13px', fontFamily: 'Roboto' } };
    public lineStyle: Object = { width: 0 };


    //Initializing Tooltip
    public tooltip: Object = {
        enable: true,
        fill: 'transparent',
        template: '<div id="templateWrap">'
        + '<img src="src/circulargauge/images/range1.png"/>'
        + '<img src="src/circulargauge/images/range3.png" />'
        + '<div class="des" style="float: right;padding-left: 10px;line-height: 30px;"><span>140 MPH</span></div></div>',
        border: {
            color: '#33BCBD',
            width: 2
        }
    };
    public rangeWidth: number = 10;
    public onTooltipRender(args: ITooltipRenderEventArgs): void {
        let color: string;
        let value: number = Math.round(args.pointer.currentValue);
        let content: HTMLElement = <HTMLElement>args.content;
        if (value >= 0 && value <= 50) {
            color = '#3A5DC8';
            content.children[1].remove();
        } else {
            color = '#33BCBD';
            content.children[0].remove();
        }
        args.textStyle.color = color;
        args.border.color = color;
        content.children[1].children[0].innerHTML = '<span>' + value + ' MPH</span>';
        this.circulargauge.axes[0].pointers[0].animation.enable = false;
        this.circulargauge.axes[0].pointers[0].color = color;
        this.circulargauge.axes[0].pointers[0].cap.border.color = color;
        this.circulargauge.setPointerValue(0, 0, value);
    }
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = <GaugeTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    }
    constructor() {
        // code
    };
}
