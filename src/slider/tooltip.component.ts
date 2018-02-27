import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { SliderModule, SliderComponent, TooltipPlacement, TooltipShowOn } from '@syncfusion/ej2-ng-inputs';
import { DropDownListComponent } from '@syncfusion/ej2-ng-dropdowns';

/**
 * Tooltip sample
 */

@Component({
    selector: 'control-content',
    templateUrl: 'tooltip.html',
    styleUrls: ['slider.css'],
    encapsulation: ViewEncapsulation.None
})

export class TooltipSliderComponent {
    @ViewChild('slider')
    public defaultObj: SliderComponent;
    @ViewChild('rangeslider')
    public rangeObj: SliderComponent;
    @ViewChild('placementdropdownlist')
    public listObj: DropDownListComponent;
    @ViewChild('showondropdownlist')
    public showonlistObj: DropDownListComponent;
    public value: number = 30;
    public showButtons: boolean = true;
    public rangevalue: Number[] = [30, 70];
    public rangetype: string = 'Range';
    public tooltip: Object = {
        placement: 'Before',
        isVisible:true,
        showOn: 'Focus'
    };
    public datasource: Object[] = [{ value: 'Before', text: 'Before' }, { value: 'After', text: 'After' }];
    public fields: Object = { text: 'text', value: 'value' };
    public datasource1: Object[] = [{ value: 'Focus', text: 'Focus' }, { value: 'Hover', text: 'Hover' }, { value: 'Auto', text: 'Auto' },
    { value: 'Always', text: 'Always' }];
    public fields1: Object = { text: 'text', value: 'value' };
    public changeTooltip(): void {
        this.defaultObj.tooltip = { placement: this.listObj.value as TooltipPlacement };
        this.rangeObj.tooltip = { placement: this.listObj.value as TooltipPlacement };
    }
    public changeShowon(): void {
        this.defaultObj.tooltip = { showOn: this.showonlistObj.value as TooltipShowOn };
        this.rangeObj.tooltip = { showOn: this.showonlistObj.value as TooltipShowOn };
    }
    ngOnInit() {
        document.getElementById('right-pane').addEventListener('scroll', this.onScroll.bind(this));
    }
    // Handler used to reposition the tooltip on page scroll
    onScroll(): void {
        let slider: any = [this.defaultObj, this.rangeObj];
        slider.forEach((slider: any) => {
            slider.refreshTooltip();
        });
    }
}