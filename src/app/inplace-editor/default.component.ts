import { Component, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { DropDownListComponent, ChangeEventArgs, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { InPlaceEditorComponent, RenderMode, EditableType, InPlaceEditorModule } from '@syncfusion/ej2-angular-inplace-editor';
import { NumericTextBoxModel, MaskedTextBoxModel, TextBoxModel } from '@syncfusion/ej2-inputs';
import { PopupSettingsModel } from '@syncfusion/ej2-inplace-editor/src/inplace-editor/base/models-model';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';

/**
 * In-place Editor default sample
 */
@Component({
    selector: 'control-content',
    templateUrl: 'default.html',
    styleUrls: ['default.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [InPlaceEditorModule, DropDownListModule, CheckBoxModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class DefaultInplaceEditorComponent implements OnInit {

    @ViewChild('inplace_editor')
    public inplaceObj: InPlaceEditorComponent;
  
    @ViewChild('numericTextBoxEle')
    public numericTextBoxObj: InPlaceEditorComponent;
  
    @ViewChild('maskedTextBoxEle')
    public maskedTextBoxObj: InPlaceEditorComponent;
  
    @ViewChild('editorMode')
    public editorModeObj: DropDownListComponent;
  
    @ViewChild('editable')
    public editableObj: DropDownListComponent;
  
    public date: Date = new Date();
    public numericTextBoxModel: NumericTextBoxModel = {
      format: 'c2',
      placeholder: 'Currency format'
    };
    public maskedTextBoxModel: MaskedTextBoxModel = {
      mask: '000-000-0000'
    };
    public overviewModel: TextBoxModel = {
      placeholder: 'Enter employee name'
    };
    public settings: PopupSettingsModel = {
      title: 'Enter Employee Name'
    };
    public numericValue: string = '$100.00';
    public maskValue: string = '012-345-6789';
    public editorModeData: string[] = ['Inline', 'Popup'];
    public editableData: string[] = ['Click', 'Double Click', 'Edit Icon Click'];
    public scrollParent: HTMLElement = document.querySelector('.sb-right-pane') as HTMLElement;
  
    ngOnInit(): void {
      if(this.scrollParent){
        this.scrollParent.addEventListener('scroll', this.hidePopup.bind(this));
      }
    }
  
    changeMode(e: ChangeEventArgs): void {
      /*Apply selected mode to the component*/
      this.inplaceObj.mode = e.value as RenderMode;
      this.numericTextBoxObj.mode = e.value as RenderMode;
      this.maskedTextBoxObj.mode = e.value as RenderMode;
    }
  
    changeEditable(e: ChangeEventArgs) {
      /* Apply selected editable mode to the component */
      let value: string = e.value as string;
      if (value === 'Double Click') {
        value = 'DblClick';
      }
      if (value === 'Edit Icon Click') {
        value = 'EditIconClick';
      }
      const editableOn: EditableType = value as EditableType;
      this.inplaceObj.editableOn = editableOn;
      this.numericTextBoxObj.editableOn = editableOn;
      this.maskedTextBoxObj.editableOn = editableOn;
    }
  
    showButtonsChange(args) {
      this.inplaceObj.showButtons = args.checked;
      this.numericTextBoxObj.showButtons = args.checked;
      this.maskedTextBoxObj.showButtons = args.checked;
    }
  
    enableChange(args) {
      this.inplaceObj.disabled = !args.checked;
      this.numericTextBoxObj.disabled = !args.checked;
      this.maskedTextBoxObj.disabled = !args.checked;
    }
  
    hidePopup(): void {
      if (this.editorModeObj.value === 'Inline') { return; }
      if (this.inplaceObj && this.inplaceObj.element.querySelectorAll('.e-editable-open').length > 0) {
        this.inplaceObj.enableEditMode = false;
      }
      if (this.numericTextBoxObj && this.numericTextBoxObj.element.querySelectorAll('.e-editable-open').length > 0) {
        this.numericTextBoxObj.enableEditMode = false;
      }
      if (this.maskedTextBoxObj && this.maskedTextBoxObj.element.querySelectorAll('.e-editable-open').length > 0) {
        this.maskedTextBoxObj.enableEditMode = false;
      }
    }
}
