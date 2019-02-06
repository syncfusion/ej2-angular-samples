import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-angular-dropdowns/src';
import { InPlaceEditorComponent, RenderMode } from '@syncfusion/ej2-angular-inplace-editor';
import { AutoCompleteService, ComboBoxService, MultiSelectService } from '@syncfusion/ej2-angular-inplace-editor';

/**
 * DropDowns component
 */
@Component({
    selector: 'control-content',
    templateUrl: 'dropdowns.html',
    encapsulation: ViewEncapsulation.None,
    providers: [AutoCompleteService, MultiSelectService, ComboBoxService]
})
export class DropDownsComponent {
    @ViewChild('comboBox') comboBoxObj: InPlaceEditorComponent;
    @ViewChild('dropDown') dropDownsObj: InPlaceEditorComponent;
    @ViewChild('multiSelect') multiSelectObj: InPlaceEditorComponent;
    @ViewChild('autoComplete') autoCompleteObj: InPlaceEditorComponent;
    @ViewChild('editorMode') modeObj: DropDownListComponent;

    public popSettings: object;
    public comboBoxModel: object;
    public multiSelectModel: object;
    public autoCompleteModel: object;
    public dropDownListModel: object;
    public modeData: string[] = ['Inline', 'Popup'];
    public multiSelectValue: string[] = ['Canada', 'Bermuda'];
    public dropDownData: string[] = ['Australia', 'Bermuda', 'Canada', 'Cameroon', 'Denmark', 'Finland', 'Greenland', 'Poland'];
    public scrollParent: HTMLElement = <HTMLElement>document.querySelector('.sb-right-pane');

    ngOnInit(): void {
        this.autoCompleteModel = {
            placeholder: 'Choose the countries',
            dataSource: this.dropDownData
        };
        this.dropDownListModel = {
            placeholder: 'Find a countries',
            dataSource: this.dropDownData
        };
        this.comboBoxModel = {
            placeholder: 'Find a countries',
            dataSource: this.dropDownData
        };
        this.multiSelectModel = {
            dataSource: this.dropDownData,
            placeholder: 'Choose the countries',
            mode: 'Box'
        };
        this.popSettings = {
            model: { width: 'auto' }
        };
        this.scrollParent.addEventListener('scroll', this.hidePopup.bind(this));
    }

    changeMode(args: ChangeEventArgs) {
        /*Apply selected mode to the component*/
        let mode: RenderMode = args.value as RenderMode;
        this.autoCompleteObj.mode = mode;
        this.dropDownsObj.mode = mode;
        this.comboBoxObj.mode = mode;
        this.multiSelectObj.mode = mode;
    }

    hidePopup(): void {
        if (this.modeObj.value === 'Inline') { return; }
        if (this.autoCompleteObj && this.autoCompleteObj.element.querySelectorAll('.e-editable-open').length > 0) {
            this.autoCompleteObj.enableEditMode = false;
        }
        if (this.dropDownsObj && this.dropDownsObj.element.querySelectorAll('.e-editable-open').length > 0) {
            this.dropDownsObj.enableEditMode = false;
        }
        if (this.comboBoxObj && this.comboBoxObj.element.querySelectorAll('.e-editable-open').length > 0) {
            this.comboBoxObj.enableEditMode = false;
        }
        if (this.multiSelectObj && this.multiSelectObj.element.querySelectorAll('.e-editable-open').length > 0) {
            this.multiSelectObj.enableEditMode = false;
        }
    }
}