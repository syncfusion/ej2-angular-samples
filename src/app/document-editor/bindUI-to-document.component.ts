import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ToolbarService, DocumentEditorContainerComponent, DocumentEditorContainerModule, DocumentEditorSettingsModel } from '@syncfusion/ej2-angular-documenteditor';
import { TitleBar } from './title-bar';
import { bindUIDocument, WEB_API_ACTION } from './data';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { Button } from '@syncfusion/ej2-angular-buttons';
import { TextBox } from '@syncfusion/ej2-angular-inputs';

/**
 * Document Editor Component
 */
@Component({
  selector: 'control-content',
  templateUrl: 'bindUI-to-document.html',
  encapsulation: ViewEncapsulation.None,
  providers: [ToolbarService],
  standalone: true,
  imports: [DocumentEditorContainerModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class BindUIDocumentComponent {
  public hostUrl: string =
    'https://services.syncfusion.com/angular/production/api/documenteditor/';
  @ViewChild('documenteditor_default')
  public container: DocumentEditorContainerComponent;
  public culture: string = 'en-US';
  titleBar: TitleBar;
  public editArea: HTMLElement;
  public bindToDocumentBtn: Button;
  public bindToFormBtn: Button;
  public placeHolderPrefix = 'placeHolder_';
  public baseStart = '0;0;0';
  public deletestart;
  public deleteend;
  firstNameTextBox: TextBox;
  birthdateTextBox: TextBox;
  addressTextBox: TextBox;
  phoneTextBox: TextBox;
  emailTextBox: TextBox;

  public target = document.getElementById('target');
  ngOnInit(): void {
    // ngOnInit function
    this.initializeTextBoxes();
    this.initializeDialog();
  }
  initializeTextBoxes(): void {
    this.firstNameTextBox = new TextBox({
      placeholder: 'Name',
      cssClass: 'e-outline',
      floatLabelType: 'Auto',
    });
    this.firstNameTextBox.appendTo('#FirstName');

    this.birthdateTextBox = new TextBox({
      placeholder: 'Date [DD/MM/YYYY]',
      cssClass: 'e-outline',
      floatLabelType: 'Auto',
    });
    this.birthdateTextBox.appendTo('#BirthDate');

    this.addressTextBox = new TextBox({
      placeholder: 'Address',
      cssClass: 'e-outline',
      floatLabelType: 'Auto',
    });
    this.addressTextBox.appendTo('#Address');

    this.phoneTextBox = new TextBox({
      placeholder: 'Phone',
      cssClass: 'e-outline',
      floatLabelType: 'Auto',
    });
    this.phoneTextBox.appendTo('#Phone');

    this.emailTextBox = new TextBox({
      placeholder: 'Email',
      cssClass: 'e-outline',
      floatLabelType: 'Auto',
    });
    this.emailTextBox.appendTo('#Email');
  }
  initializeDialog(): void {
    //this.dialogBox.appendTo('#defaultDialog');

    this.bindToDocumentBtn = new Button();
    this.bindToDocumentBtn.appendTo('#BindToDocument');
    this.bindToFormBtn = new Button();
    this.bindToFormBtn.appendTo('#BindToForm');
  }
  public item = [
    'New',
    'Open',
    'Separator',
    'Undo',
    'Redo',
    'Separator',
    'ContentControl',
    'Separator',
    'Image',
    'Table',
    'Hyperlink',
    'Bookmark',
    'TableOfContents',
    'Separator',
    'Header',
    'Footer',
    'PageSetup',
    'PageNumber',
    'Break',
    'Separator',
    'Find',
    'Separator',
    'Comments',
    'TrackChanges',
    'Separator',
    'LocalClipboard',
    'RestrictEditing',
    'Separator',
    'FormFields',
    'UpdateFields',
  ];

  onCreate(): void {
    let titleBarElement: HTMLElement =
      document.getElementById('default_title_bar');
    this.titleBar = new TitleBar(
      titleBarElement,
      this.container.documentEditor,
      true
    );
    this.container.documentEditor.open(JSON.stringify(bindUIDocument));
    this.container.documentEditor.documentName = 'Bind Content Control Data';
    this.titleBar.updateDocumentTitle();
    this.bindDataToFormUI();
    let toolbaritems: any = this.item;
    this.container.toolbarItems = toolbaritems;
  }

  onDocumentChange(): void {
    if (!isNullOrUndefined(this.titleBar)) {
      this.titleBar.updateDocumentTitle();
    }
    this.bindDataToFormUI();
    this.container.documentEditor.focusIn();
  }

  public BindToDocument() {
    let bookmarkobj = {};
    const data = [];
    bookmarkobj['Name'] = this.firstNameTextBox.value;
    bookmarkobj['DOB'] = this.birthdateTextBox.value;
    bookmarkobj['Address'] = this.addressTextBox.value;
    bookmarkobj['Phone'] = this.phoneTextBox.value;
    bookmarkobj['Email'] = this.emailTextBox.value;
    if (!isNullOrUndefined(bookmarkobj['Name'])) {
      const contentControlData = {
        title: this.placeHolderPrefix + 'Name',
        tag: '',
        value: bookmarkobj['Name'],
        canDelete: false,
        canEdit: false,
        type: 'RichText',
      };
      data.push(contentControlData);
    }
    if (!isNullOrUndefined(bookmarkobj['DOB'])) {
      const contentControlData = {
        title: this.placeHolderPrefix + 'DOB',
        tag: '',
        value: bookmarkobj['DOB'],
        canDelete: false,
        canEdit: false,
        type: 'Date',
      };
      data.push(contentControlData);
    }
    if (!isNullOrUndefined(bookmarkobj['Address'])) {
      const contentControlData = {
        title: this.placeHolderPrefix + 'Address',
        tag: '',
        value: bookmarkobj['Address'],
        canDelete: false,
        canEdit: false,
        type: 'RichText',
      };
      data.push(contentControlData);
    }
    if (!isNullOrUndefined(bookmarkobj['Phone'])) {
      const contentControlData = {
        title: this.placeHolderPrefix + 'Phone',
        tag: '',
        value: bookmarkobj['Phone'],
        canDelete: false,
        canEdit: false,
        type: 'RichText',
      };
      data.push(contentControlData);
    }
    if (!isNullOrUndefined(bookmarkobj['Email'])) {
      const contentControlData = {
        title: this.placeHolderPrefix + 'Email',
        tag: '',
        value: bookmarkobj['Email'],
        canDelete: false,
        canEdit: false,
        type: 'RichText',
      };
      data.push(contentControlData);
    }
    this.container.documentEditor.importContentControlData(data);

    function isNullOrUndefined(value) {
      return value === null || value === undefined;
    }
  }
  public BindToForm() {
    this.bindDataToFormUI();
  }
  public bindDataToFormUI() {
    let contentControlInfos =
      this.container.documentEditor.exportContentControlData();
    if(contentControlInfos.length > 0) {
    for (let i = 0; i < contentControlInfos.length; i++) {
      if (!isNullOrUndefined(contentControlInfos[i].title) && contentControlInfos[i].title.indexOf('Name') > -1) {
        this.firstNameTextBox.value = contentControlInfos[i].value;
      }
      if (!isNullOrUndefined(contentControlInfos[i].title) && contentControlInfos[i].title.indexOf('DOB') > -1) {
        this.birthdateTextBox.value = contentControlInfos[i].value;
      }
      if (!isNullOrUndefined(contentControlInfos[i].title) && contentControlInfos[i].title.indexOf('Address') > -1) {
        this.addressTextBox.value = contentControlInfos[i].value;
      }
      if (!isNullOrUndefined(contentControlInfos[i].title) && contentControlInfos[i].title.indexOf('Phone') > -1) {
        this.phoneTextBox.value = contentControlInfos[i].value;
      }
      if (!isNullOrUndefined(contentControlInfos[i].title) && contentControlInfos[i].title.indexOf('Email') > -1) {
        this.emailTextBox.value = contentControlInfos[i].value;
      }
    }
  }
  }
}
