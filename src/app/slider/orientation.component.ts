import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { SliderModule, SliderComponent } from '@syncfusion/ej2-angular-inputs';
import { TicksDataModel, TooltipDataModel, Placement } from '@syncfusion/ej2-inputs';
import { CheckBoxComponent, ChangeEventArgs } from '@syncfusion/ej2-angular-buttons';

/**
 * Orientation sample
 */

@Component({
    selector: 'control-content',
    templateUrl: 'orientation.html',
    styleUrls: ['orientation.css'],
    encapsulation: ViewEncapsulation.None
})
export class OrientationSliderComponent {
    @ViewChild('default')
    public defaultObj: SliderComponent;
    @ViewChild('minrange')
    public minRangeObj: SliderComponent;
    @ViewChild('range')
    public rangeObj: any;
    public value: number = 30;
    public rangevalue: Number[] = [30, 70];
    public mintype: string = 'MinRange';
    public rangetype: string = 'Range';
    public orientation: string = 'Vertical';
    enableDisableTicks(args: ChangeEventArgs): void {
        let ticks: TicksDataModel = { placement: args.checked ? 'Before' : 'None', largeStep: 20, smallStep: 5, showSmallTicks: true };
        this.defaultObj.ticks = ticks;
        this.minRangeObj.ticks = ticks;
        this.rangeObj.ticks = ticks;
    }
    enableDisableTooltip(args: ChangeEventArgs): void {
        let tooltip: TooltipDataModel = { isVisible: args.checked, placement: 'Before' };
        this.defaultObj.tooltip = tooltip;
        this.minRangeObj.tooltip = tooltip;
        this.rangeObj.tooltip = tooltip;
        this.rangeObj.dataBind();
        this.rangeObj.tooltipObj.dataBind();
    }
    ngOnInit() {
        document.getElementById('right-pane').addEventListener('scroll', this.onScroll.bind(this));
    }
    // Handler used to reposition the tooltip on page scroll
    onScroll(): void {
        let slider: any = [this.defaultObj, this.minRangeObj, this.rangeObj];
        slider.forEach((slider: any) => {
            slider.refreshTooltip(slider.tooltipTarget);
        });
    }
}
