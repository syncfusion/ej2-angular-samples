import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ITooltipRenderEventArgs } from '@syncfusion/ej2-circulargauge';
import { CircularGaugeComponent } from '@syncfusion/ej2-ng-circulargauge';

/**
 * tooltip for circular gauge
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
    public titleStyle: Object = { size: '15px', color: 'grey' };
    public majorTicks: Object = { color: 'white', offset: -5, height: 12 };
    public minorTicks: Object = { width: 0 };
    public labelStyle: Object = { useRangeColor: true, font: { color: '#424242', size: '13px', fontFamily: 'Roboto' } };
    public lineStyle: Object = { width: 0 };


    public tooltip: Object = {
        enable: true,
        template: '<div id="templateWrap">'
        + '<img src="src/circulargauge/images/range1.png"/>'
        + '<img src="src/circulargauge/images/range3.png" />'
        + '<div class="des" style="float: right;padding-left: 10px;line-height: 30px;"><span>140 KM</span></div></div>',
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
        content.children[1].children[0].innerHTML = '<span>' + value + ' KM</span>';
        this.circulargauge.axes[0].pointers[0].animation.enable = false;
        this.circulargauge.axes[0].pointers[0].color = color;
        this.circulargauge.axes[0].pointers[0].cap.border.color = color;
        this.circulargauge.setPointerValue(0, 0, value);
    }
    constructor() {
        // code
    };
}
