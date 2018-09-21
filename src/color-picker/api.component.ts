import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { ColorPickerComponent, ColorPickerMode, ColorPickerEventArgs } from '@syncfusion/ej2-angular-inputs';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
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

    @ViewChild('sample')
    public ddlObj: DropDownListComponent;

    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['api.css'];
    }

    public ddlFields: Object = { text: 'type', value: 'type' };

    public type: Object[] = [
        { type: 'Picker' },
        { type: 'Palette' }
    ];

    public modeType: string = 'Picker';

    public colorValue: string = '#0db1e7';

    public typeChange(args: any): void {
        this.colorPicker.mode = this.ddlObj.text as ColorPickerMode;
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
        (document.getElementById('value') as HTMLInputElement).value = args.currentValue.hex;
    }

    ngOnInit(): void {
        let ele: HTMLInputElement = document.getElementById('value') as HTMLInputElement;
        ele.addEventListener('change', (e: Event) => {
            this.colorPicker.value = (e.target as HTMLInputElement).value;
            this.colorPicker.dataBind();
        });
    }
}