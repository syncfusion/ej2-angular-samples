/**
 * Sample for tooltip
 */
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ILoadedEventArgs, IPointerDragEventArgs, ITooltipRenderEventArgs, GaugeTheme } from '@syncfusion/ej2-circulargauge';
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
        type: ['Pointer', 'Range'],
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
    public tooltipRender(args: ITooltipRenderEventArgs): void {
        let imageName: string; let borderColor: string; let textColor: string;
        if (args.pointer) {
            imageName = ((args.pointer.currentValue >= 0 && args.pointer.currentValue <= 50) ? 'min' : 'max');
            borderColor = ((args.pointer.currentValue >= 0 && args.pointer.currentValue <= 50) ? '#3A5DC8' : '#33BCBD');
            textColor = this.circulargauge.theme.toLowerCase() === 'highcontrast' ? 'White' : borderColor;
            if (this.circulargauge.theme.toLowerCase() === 'highcontrast') {
                args.tooltip.template = '<div id="templateWrap" style="padding:5px;border:2px solid '
                    + borderColor + ';color: ' + textColor + '"><img src="./assets/circular-gauge/images/'
                    + imageName + '.png"/> <span> ${value} MPH</span></div>';
            } else {
                args.tooltip.template = '<div id="templateWrap" style="padding:5px;border:2px solid '
                    + borderColor + ';color: ' + borderColor + '"><img src="./assets/circular-gauge/images/'
                    + imageName + '.png"/> <span> ${value} MPH</span></div>';
            }
        }
        else if (args.range) {
            imageName = ((args.range.start >= 0 && args.range.end <= 50)) ? 'min' : 'max';
            borderColor = ((args.range.start >= 0 && args.range.end <= 50)) ? '#3A5DC8' : '#33BCBD';
            textColor = this.circulargauge.theme.toLowerCase() === 'highcontrast' ? 'White' : borderColor;
            let start: number = args.range.start; let end: number = args.range.end;
            if (this.circulargauge.theme.toLowerCase() === 'highcontrast') {
                args.tooltip.rangeSettings.template = '<div id=templateWrap style="padding:5px;border:2px solid'
                    + borderColor + ';color: ' + textColor + '"><img src="./assets/circular-gauge/images/'
                    + imageName + '.png"/> <span>' + start + ' - ' + end + ' MPH  </span> </div>';
            } else {
                args.tooltip.rangeSettings.template = '<div id=templateWrap style="padding:5px;border:2px solid'
                    + borderColor + ';color: ' + borderColor + '"><img src="./assets/circular-gauge/images/'
                    + imageName + '.png"/> <span>' + start + ' - ' + end + ' MPH  </span> </div>';
            }
        }
    }
    public dragEnd(args: IPointerDragEventArgs): void {
        if (args.currentValue >= 0 && args.currentValue <= 50) {
            args.pointer.color = '#3A5DC8';
            args.pointer.cap.border.color = '#3A5DC8';
        } else {
            args.pointer.color = '#33BCBD';
            args.pointer.cap.border.color = '#33BCBD';
        }
        args.pointer.value = args.currentValue;
        args.pointer.animation.enable = false;
        this.circulargauge.refresh();
    }
    // custom code end
    constructor() {
        // code
    };
}
