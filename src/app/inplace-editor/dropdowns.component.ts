import { Component, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { DropDownListComponent, ChangeEventArgs, AutoCompleteModel, DropDownListModel, ComboBoxModel, MultiSelectModel, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { InPlaceEditorComponent, MultiSelectService, RenderMode, InPlaceEditorModule } from '@syncfusion/ej2-angular-inplace-editor';
import { ComboBoxService, AutoCompleteService } from '@syncfusion/ej2-angular-inplace-editor';
import { PopupSettingsModel } from '@syncfusion/ej2-inplace-editor/src/inplace-editor/base/models-model';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

/**
 * In-place Editor dropdowns sample
 */
@Component({
    selector: 'control-content',
    templateUrl: 'dropdowns.html',
    styleUrls: ['dropdowns.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [AutoCompleteService, MultiSelectService, ComboBoxService],
    standalone: true,
    imports: [InPlaceEditorModule, DropDownListModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class DropdownsInplaceEditorComponent implements OnInit {

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

    public date: Date = new Date();
    public dropdownValue: string = 'Canada';
    public autoCompleteValue: string = 'Australia';
    public comboBoxValue: string = 'Finland';
    public multiSelectValue: string[] = ['Canada', 'Bermuda'];
    public editorModeData: string[] = ['Inline', 'Popup'];
    public autocompleteData: string[] = ['Australia', 'Bermuda', 'Canada', 'Cameroon', 'Denmark', 'Finland', 'Greenland', 'Poland'];;
    public autoCompleteModel: AutoCompleteModel = {
        placeholder: 'Choose the country',
        dataSource: this.autocompleteData
    };
    public dropDownListModel: DropDownListModel = {
        placeholder: 'Find a country',
        dataSource: this.autocompleteData
    };
    public comboBoxModel: ComboBoxModel = {
        placeholder: 'Find a country',
        dataSource: this.autocompleteData
    };
    public multiSelectModel: MultiSelectModel= {
        width: 150,
        dataSource: this.autocompleteData,
        placeholder: 'Choose the countries',
        mode: 'Box'
    };
    public settings: PopupSettingsModel = {
        model: { width: 200 }
    };    
    public scrollParent: HTMLElement = document.querySelector('.sb-right-pane') as HTMLElement;

    ngOnInit(): void {
        if(this.scrollParent){
            this.scrollParent.addEventListener('scroll', this.hidePopup.bind(this));
        }
    }

    changeMode(e: ChangeEventArgs): void {
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
