import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { SliderModule, SliderComponent, LimitDataModel, SliderType, TicksDataModel, TooltipDataModel } from '@syncfusion/ej2-angular-inputs';
import { SliderTooltipEventArgs, SliderTickEventArgs } from '@syncfusion/ej2-inputs';
import { CheckBoxComponent } from '@syncfusion/ej2-angular-buttons';
/**
 * Limits samples
 */

@Component({
    selector: 'control-content',
    templateUrl: 'limits.html',
    styleUrls: ['slider.css']
})
export class LimitsSliderComponent {
    @ViewChild('minrange')
    public minrangeObj: SliderComponent;
    @ViewChild('range')
    public rangeObj: SliderComponent;

    public min: number = 0;
    public max: number = 100;

    public minValue: number = 25;
    public rangeValue: number[] = [25, 75];

    public tooltip: TooltipDataModel = {
        placement: 'Before',
        isVisible: true
    };
    public ticks: TicksDataModel = {
        placement: 'After',
        largeStep: 20,
        smallStep: 5,
        showSmallTicks: true
    };

    public minType: SliderType = 'MinRange';
    public rangetype: SliderType = 'Range';

    public minRangeLimits: LimitDataModel = { enabled: true, minStart: 10, minEnd: 40 };
    public rangeLimits: LimitDataModel = { enabled: true, minStart: 10, minEnd: 40, maxStart: 60, maxEnd: 90 };

    // Eventlisteners to lock first handle of the both sliders
    public fixOne(args: any): void {
        this.minrangeObj.limits.startHandleFixed = args.checked;
        this.rangeObj.limits.startHandleFixed = args.checked;
    }

    // Eventlisteners to lock second handle of the both sliders
    public fixSecond(args: any): void {
        this.minrangeObj.limits.endHandleFixed = args.checked;
        this.rangeObj.limits.endHandleFixed = args.checked;
    }

    // Eventlisteners to change limit values for both sliders
    public minStartChange(args: any): void {
        this.minrangeObj.limits.minStart = args.value;
        this.rangeObj.limits.minStart = args.value;
    }

    public minEndChange(args: any): void {
        this.minrangeObj.limits.minEnd = args.value;
        this.rangeObj.limits.minEnd = args.value;
    }

    public maxStartChange(args: any): void {
        this.minrangeObj.limits.maxStart = args.value;
        this.rangeObj.limits.maxStart = args.value;
    }

    public maxEndChange(args: any): void {
        this.minrangeObj.limits.maxEnd = args.value;
        this.rangeObj.limits.maxEnd = args.value;
    }

    ngOnInit() {
        document.getElementById('right-pane').addEventListener('scroll', this.onScroll.bind(this));
    }

    // Handler used to reposition the tooltip on page scroll
    onScroll(): void {
        let slider: any = [this.minrangeObj, this.rangeObj];
        slider.forEach((slider: any) => {
            slider.refreshTooltip(slider.tooltipTarget);
        });
    }
}
