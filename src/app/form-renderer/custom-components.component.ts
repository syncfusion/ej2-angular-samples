import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgFor } from '@angular/common';
import {
    FormRendererComponent,
    FormRendererModule,
    CustomWidgetSettingDirective,
    CustomWidgetSettingsDirective,
    Schema
} from '@syncfusion/ej2-angular-form-renderer';
import { contactForm } from './datasource';

@Component({
    selector: 'control-content',
    templateUrl: 'custom-components.html',
    styleUrls: ['form-renderer.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [FormRendererModule, CustomWidgetSettingDirective, CustomWidgetSettingsDirective, NgFor]
})
export class CustomComponentsFormRendererController {

    @ViewChild('formObj') public formObj!: FormRendererComponent;

    public formSchema: Schema = contactForm;

    public onInputChange(event: Event, data: any, formObj: FormRendererComponent): void {
        const value = (event.target as HTMLInputElement).value;
        if (this.formObj) {
            this.formObj.setFieldValue(data.fieldData?.id ?? data.id, value);
        }
    }

    public onTextareaChange(event: Event, data: any, formObj: FormRendererComponent): void {
        const value = (event.target as HTMLTextAreaElement).value;
        if (this.formObj) {
            this.formObj.setFieldValue(data.fieldData?.id ?? data.id, value);
        }
    }

    public onCheckboxChange(event: Event, data: any, formObj: FormRendererComponent): void {
        const checked = (event.target as HTMLInputElement).checked;
        if (this.formObj) {
            this.formObj.setFieldValue(data.fieldData?.id ?? data.id, checked);
        }
    }

    public onSelectChange(event: Event, data: any, formObj: FormRendererComponent): void {
        const value = (event.target as HTMLSelectElement).value;
        if (this.formObj) {
            this.formObj.setFieldValue(data.fieldData?.id ?? data.id, value);
        }
    }
}