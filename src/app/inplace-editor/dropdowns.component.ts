import { Component, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { InPlaceEditorComponent, MultiSelectService, RenderMode } from '@syncfusion/ej2-angular-inplace-editor';
import { ComboBoxService, AutoCompleteService } from '@syncfusion/ej2-angular-inplace-editor';

/**
 * In-place Editor dropdowns sample
 */
@Component({
    selector: 'control-content',
    templateUrl: 'dropdowns.html',
    encapsulation: ViewEncapsulation.None,
    providers: [AutoCompleteService, MultiSelectService, ComboBoxService]
})
export class DropdownsInplaceEditorComponent implements OnInit {
    public date: Object = new Date();
    @ViewChild('dropdownEle')
    public dropdownsObj: InPlaceEditorComponent;
    @ViewChild('autoCompleteEle')
    public autoCompleteEleObj: InPlaceEditorComponent;
    @ViewChild('comboBoxEle')
    public comboBoxEleObj: InPlaceEditorComponent;
    @ViewChild('multiSelectEle')
    public multiSelectObj: InPlaceEditorComponent;
    @ViewChild('editorMode')
    public editorModeObj: DropDownListComponent;

    public autoCompleteModel: object;
    public dropDownListModel: object;
    public comboBoxModel: object;
    public multiSelectModel: object;
    public settings: object;
    public dropdownValue: string = 'Canada';
    public autoCompleteValue: string = 'Australia';
    public comboBoxValue: string = 'Finland';
    public multiSelectValue: string[] = ['Canada', 'Bermuda'];
    public editorModeData: string[] = ['Inline', 'Popup'];
    public autocompleteData: string[] = ['Australia', 'Bermuda', 'Canada', 'Cameroon', 'Denmark', 'Finland', 'Greenland', 'Poland'];;
    public scrollParent: HTMLElement = <HTMLElement>document.querySelector('.sb-right-pane');

    ngOnInit(): void {
        this.autoCompleteModel = {
            placeholder: 'Choose the countries',
            dataSource: this.autocompleteData
        };
        this.dropDownListModel = {
            placeholder: 'Find a countries',
            dataSource: this.autocompleteData
        };
        this.comboBoxModel = {
            placeholder: 'Find a countries',
            dataSource: this.autocompleteData
        };
        this.multiSelectModel = {
            width: 150,
            dataSource: this.autocompleteData,
            placeholder: 'Choose the countries',
            mode: 'Box'
        };
        this.settings = {
            model: { width: 200 }
        };
        this.scrollParent.addEventListener('scroll', this.hidePopup.bind(this));
    }

    changeMode(e: ChangeEventArgs) {
        /*Apply selected mode to the component*/
        this.dropdownsObj.mode = e.value as RenderMode;
        this.autoCompleteEleObj.mode = e.value as RenderMode;
        this.comboBoxEleObj.mode = e.value as RenderMode;
        this.multiSelectObj.mode = e.value as RenderMode;
    }

    hidePopup(): void {
        if (this.editorModeObj.value === 'Inline') { return; }
        if (this.dropdownsObj && this.dropdownsObj.element.querySelectorAll('.e-editable-open').length > 0) {
            this.dropdownsObj.enableEditMode = false;
        }
        if (this.autoCompleteEleObj && this.autoCompleteEleObj.element.querySelectorAll('.e-editable-open').length > 0) {
            this.autoCompleteEleObj.enableEditMode = false;
        }
        if (this.comboBoxEleObj && this.comboBoxEleObj.element.querySelectorAll('.e-editable-open').length > 0) {
            this.comboBoxEleObj.enableEditMode = false;
        }
        if (this.multiSelectObj && this.multiSelectObj.element.querySelectorAll('.e-editable-open').length > 0) {
            this.multiSelectObj.enableEditMode = false;
        }
    }
}
