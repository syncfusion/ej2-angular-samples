import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { SliderModule, SliderComponent, Placement } from '@syncfusion/ej2-angular-inputs';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { CheckBoxComponent, ChangeEventArgs } from '@syncfusion/ej2-angular-buttons';
/**
 * Ticks sample
 */

@Component({
    selector: 'control-content',
    templateUrl: 'ticks.html',
    styleUrls: ['slider.css'],
    encapsulation: ViewEncapsulation.None
})

export class TicksSliderComponent {
    @ViewChild('slider')
    public defaultObj: SliderComponent;
    @ViewChild('rangeslider')
    public rangeObj: SliderComponent;
    @ViewChild('dropdownlist')
    public listObj: DropDownListComponent;
    public value: number = 30;
    public min: number = 10;
    public max: number = 90;
    public step: number = 5;
    public rangevalue: Number[] = [30, 70];
    public rangetype: string = 'Range';
    public ticks: Object = {
        placement: 'Before',
        largeStep: 20,
        smallStep: 5,
        showSmallTicks: true
    };
    public rangeticks: Object = {
        placement: 'Before',
        largeStep: 20,
        smallStep: 5,
        showSmallTicks: true
    };
    public datasource: Object[] = [{ value: 'Before', text: 'Before' }, { value: 'After', text: 'After' }, { value: 'Both', text: 'Both' },
                                  { value: 'None', text: 'None' }];
    public fields: Object = { text: 'text', value: 'value' };
    public onChange(): void {
        this.defaultObj.ticks = { placement: this.listObj.value as Placement };
        this.defaultObj.dataBind();
        this.rangeObj.ticks = { placement: this.listObj.value as Placement };
        this.rangeObj.dataBind();
    }
    public checkbox_onChange(args: ChangeEventArgs): void {
        this.defaultObj.enabled = !args.checked;
        this.defaultObj.dataBind();
        this.rangeObj.enabled = !args.checked;
        this.rangeObj.dataBind();
    }
}