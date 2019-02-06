import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ColorPickerComponent, ColorPickerMode, ColorPickerEventArgs } from '@syncfusion/ej2-angular-inputs';
import { ChangeEventArgs as DdlChangeEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { ChangeEventArgs } from '@syncfusion/ej2-buttons';

/**
 * API sample
 */
@Component({
    selector: 'control-content',
    templateUrl: 'api.html',
    styleUrls: ['api.css'],
    encapsulation: ViewEncapsulation.None

})
export class ApiColorPickerComponent {
    @ViewChild('colorpicker')
    public colorPicker: ColorPickerComponent;

    public ddlFields: Object = { text: 'type', value: 'type' };

    public type: Object[] = [{ type: 'Picker' }, { type: 'Palette' }];

    public colorValue: string = '#0db1e7';

    public typeChange(args: DdlChangeEventArgs): void {
        this.colorPicker.mode = args.value as ColorPickerMode;
        this.colorPicker.dataBind();
    }

    public button_onChange(args: ChangeEventArgs) {
        this.colorPicker.showButtons = args.checked;
        this.colorPicker.dataBind();
    }

    public mode_onChange(args: ChangeEventArgs) {
        this.colorPicker.modeSwitcher = args.checked;
        this.colorPicker.dataBind();
    }

    public disabled_onChange(args: ChangeEventArgs) {
        this.colorPicker.disabled = args.checked;
        this.colorPicker.dataBind();
    }

    // function to handle the ColorPicker change event
    public change(args: ColorPickerEventArgs): void {
        this.colorValue = args.currentValue.hex;
    }

    onValueChange(e: MouseEvent): void {
        const val: string = (e.target as HTMLInputElement).value;
        // Sets to color picker default color value if user enters the invalid hex code
        this.colorPicker.value = val && val.length > 2 ? (val[0] !== '#' ? `#${val}` : val) : '#008000';
        this.colorPicker.dataBind();
    }
}