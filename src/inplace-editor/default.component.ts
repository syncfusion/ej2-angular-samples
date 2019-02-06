import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ChangeEventArgs as ChangeArgs } from '@syncfusion/ej2-angular-buttons';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { InPlaceEditorComponent, RenderMode, EditableType } from '@syncfusion/ej2-angular-inplace-editor';

/**
 * Default component
 */
@Component({
    selector: 'control-content',
    templateUrl: 'default.html',
    encapsulation: ViewEncapsulation.None
})
export class DefaultComponent {
    @ViewChild('text') textObj: InPlaceEditorComponent;
    @ViewChild('mask') maskObj: InPlaceEditorComponent;
    @ViewChild('numeric') numericObj: InPlaceEditorComponent;
    @ViewChild('mode') modeObj: DropDownListComponent;

    public maskModel: object;
    public textModel: object;
    public numericModel: object;
    public popupSettingsModel: object;
    public modeData: string[] = ['Inline', 'Popup'];
    public editableData: string[] = ['Click', 'Double Click', 'Edit Icon Click'];
    public scrollParent: HTMLElement = <HTMLElement>document.querySelector('.sb-right-pane');

    ngOnInit(): void {
        this.numericModel = {
            format: 'c2',
            placeholder: 'Currency format'
        };
        this.maskModel = { mask: '000-000-0000' };
        this.textModel = { placeholder: 'Enter employee name' };
        this.popupSettingsModel = { title: 'Enter Employee Name' };
        this.scrollParent.addEventListener('scroll', this.hidePopup.bind(this));
    }

    changeMode(args: ChangeEventArgs): void {
        /*Apply selected mode to the component*/
        let mode: RenderMode = args.value as RenderMode;
        this.textObj.mode = mode;
        this.maskObj.mode = mode;
        this.numericObj.mode = mode;
    }

    changeEditable(args: ChangeEventArgs): void {
        /*Apply selected editableOn to the component*/
        let value: string = args.value as string;
        if (value === 'Double Click') {
            value = 'DblClick';
        }
        if (value === 'Edit Icon Click') {
            value = 'EditIconClick';
        }
        let editableOn: EditableType = value as EditableType;
        this.textObj.editableOn = editableOn;
        this.maskObj.editableOn = editableOn;
        this.numericObj.editableOn = editableOn;
    }

    enableButtons(args: ChangeArgs): void {
        this.textObj.showButtons = args.checked;
        this.maskObj.showButtons = args.checked;
        this.numericObj.showButtons = args.checked;
    }

    enableChange(args: ChangeArgs): void {
        this.textObj.disabled = args.checked;
        this.maskObj.disabled = args.checked;
        this.numericObj.disabled = args.checked;
    }

    hidePopup(): void {
        if (this.modeObj.value === 'Inline') { return; }
        if (this.textObj && this.textObj.element.querySelectorAll('.e-editable-open').length > 0) {
            this.textObj.enableEditMode = false;
        }
        if (this.maskObj && this.maskObj.element.querySelectorAll('.e-editable-open').length > 0) {
            this.maskObj.enableEditMode = false;
        }
        if (this.numericObj && this.numericObj.element.querySelectorAll('.e-editable-open').length > 0) {
            this.numericObj.enableEditMode = false;
        }
    }
}