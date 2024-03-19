import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { SliderModule, SliderComponent } from '@syncfusion/ej2-angular-inputs';
import { TicksDataModel, TooltipDataModel, Placement } from '@syncfusion/ej2-inputs';
import { CheckBoxComponent, ChangeEventArgs, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

/**
 * Orientation sample
 */

@Component({
    selector: 'control-content',
    templateUrl: 'orientation.html',
    styleUrls: ['orientation.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, SliderModule, CheckBoxModule, SBDescriptionComponent]
})
export class OrientationSliderComponent {
    @ViewChild('default')
    public defaultObj: SliderComponent;
    @ViewChild('minrange')
    public minRangeObj: SliderComponent;
    @ViewChild('range')
    public rangeObj: any;
    @ViewChild('reverse')
    public reverseObj: any;
    public value: number = 30;
    public rangevalue: Number[] = [30, 70];
    public reversevalue: Number[] = [30, 70];
    public mintype: string = 'MinRange';
    public rangetype: string = 'Range';
    public orientation: string = 'Vertical';
    public ticks: TicksDataModel = { placement: 'Before', largeStep: 20, smallStep: 5, showSmallTicks: true };
    public tooltipData: TooltipDataModel = { isVisible: true, placement: 'Before' };
    enableDisableTicks(args: ChangeEventArgs): void {
        this.defaultObj.ticks.placement = args.checked ? 'Before' : 'None';
        this.minRangeObj.ticks.placement = args.checked ? 'Before' : 'None';
        this.rangeObj.ticks.placement = args.checked ? 'Before' : 'None';
        this.reverseObj.ticks.placement = args.checked ? 'Before' : 'None';
    }
    enableDisableTooltip(args: ChangeEventArgs): void {
        this.defaultObj.tooltip.isVisible = args.checked;
        this.minRangeObj.tooltip.isVisible = args.checked;
        this.rangeObj.tooltip.isVisible = args.checked;
        this.rangeObj.dataBind();
        this.rangeObj.tooltipObj.dataBind();
        this.reverseObj.tooltip.isVisible = args.checked;
        this.reverseObj.dataBind();
        this.reverseObj.tooltipObj.dataBind();
    }
    ngOnInit() {
        document.getElementById('right-pane').addEventListener('scroll', this.onScroll.bind(this));
    }
    // Handler used to reposition the tooltip on page scroll
    onScroll(): void {
        let slider: any = [this.defaultObj, this.minRangeObj, this.rangeObj, this.reverseObj];
        slider.forEach((slider: any) => {
            slider.refreshTooltip(slider.tooltipTarget);
        });
    }
}
