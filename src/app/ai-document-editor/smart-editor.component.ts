import { Component, Inject, ViewChild } from '@angular/core';
import { DocumentEditorContainerAllModule, DocumentEditorContainerComponent } from '@syncfusion/ej2-angular-documenteditor';
import { CustomContentMenuEventArgs } from '@syncfusion/ej2/documenteditor';
import { getAzureChatAIRequest } from '../../azure-openai';
import { MenuItemModel } from '@syncfusion/ej2/navigations';
import { DialogAllModule, ButtonPropsModel, DialogComponent, showSpinner, hideSpinner,createSpinner } from '@syncfusion/ej2-angular-popups';
import { SplitterAllModule } from '@syncfusion/ej2-angular-layouts';
import { MultiSelectAllModule, ChangeEventArgs, ComboBoxAllModule, MultiSelectChangeEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { TitleBar } from './title-bar';
import { ToolbarAllModule, ToolbarComponent } from '@syncfusion/ej2-angular-navigations';

interface Message {
  role: string;
  content: string;
}

interface AzureAIRequestOptions {
  messages: Message[];
  model: string;
}
@Component({
  selector: 'app-smart-editor',
  standalone: true,
  imports: [DocumentEditorContainerAllModule,
    DialogAllModule, SplitterAllModule, ToolbarAllModule, ComboBoxAllModule, MultiSelectAllModule],
  templateUrl: './smart-editor.component.html',
  styleUrl: './smart-editor.component.css'
})
export class SmartEditorComponent  {
  constructor(@Inject('sourceFiles') private sourceFiles: any) {
    this.sourceFiles.files = [
      'ai-smart-editor.component.html',
      'smart-editor.component.css',
    ];
  }
  @ViewChild('container', { static: true }) container!: DocumentEditorContainerComponent;
  @ViewChild('dialog', { static: true }) dialog!: DialogComponent;
  @ViewChild('qdiv', { static: false }) questionDiv!: any;
  @ViewChild('editable', { static: false }) editableDiv!: any;
  @ViewChild('toolbar', { static: false }) toolbar!: ToolbarComponent;
  // Variable declateion
  titleBar!: TitleBar;
  outList: string[] = [];
  translateValue: string = 'French';
  grammerList: string[] = [];
  toneValue: string = 'Professional';
  formatValue: string = 'Paragraph';
  lengthValue: string = 'Medium';
  menuItems: MenuItemModel[] = [
    {
      text: 'Rewrite',
      id: 'rewrite',
      iconCss: 'e-icons e-edit'
    },
    {
      text: 'Translate',
      id: 'translate',
      iconCss: 'e-icons e-transform-right'
    },
    {
      text: 'Grammar',
      id: 'grammer',
      iconCss: 'e-icons e-redaction'
    },
  ];
  buttonSettings: ButtonPropsModel[] = [
    {
      'click': () => {
        this.onInsertContent();
      },
      buttonModel: {
        isPrimary: true,
        content: 'Replace'
      }
    },
    {
      'click': () => {
        this.clearContent();
        this.dialog.hide();
      },
      buttonModel: {
        content: 'Cancel',
        cssClass: 'e-flat'
      }
    }
  ];
  toneList: string[] = ['Professional', 'Friendly', 'Instructional', 'Marketing', 'Academic', 'Legal', 'Technical', 'Narrative', 'Direct'];
  formatValueList: string[] = ['Paragraph', 'Blog post', 'Technical Documentation', 'Report', 'Research Papers', 'Tutorial', 'Meeting Notes'];
  lengthList: string[] = ['Short', 'Medium', 'Long'];
  grammer: { [key: string]: Object }[] = [
    { id: 'SVA', name: 'Subject-Verb Agreement' },
    { id: 'TC', name: 'Tense Consistency' },
    { id: 'PA', name: 'Pronoun Agreement' },
    { id: 'CU', name: 'Comma Usage' },
    { id: 'PS', name: 'Parallel Structure' },
    { id: 'MM', name: 'Misplaced Modifiers' },
    { id: 'DM', name: 'Dangling Modifiers' },
    { id: 'WC', name: 'Word Choice' },
    { id: 'R', name: 'Redundancy' },
    { id: 'UA', name: 'Use of Articles' },
    { id: 'PM', name: 'Punctuation Marks' },
    { id: 'APC', name: 'Apostrophes for Possessives and Contractions' },
    { id: 'SE', name: 'Spelling Errors' }
  ];
  languageList: string[] = ['Simplified Chinese', 'Spanish', 'French', 'Arabic', 'Portuguese', 'Russian', 'Urdu', 'Indonesian', 'German', 'Japanese'];


  documenedContainercreated(): void {
    let sfdt: string = '{\"sfdt\":\"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\"}';
    this.container.documentEditor.open(sfdt);
    this.titleBar = new TitleBar(document.getElementById('documenteditor_titlebar')!, this.container.documentEditor, true);
    this.container.documentEditor.documentName = 'Getting Started';
    this.titleBar.updateDocumentTitle();
    this.container.documentEditor.contextMenu.addCustomMenu(this.menuItems, false);
    createSpinner({ target: document.getElementById('dialog') as HTMLElement });
  }
// Context menu AI click event triggers
  onRewrite() {
    this.dialog.header = 'AI Rephrase';
    this.dialog.show();
    this.questionDiv.nativeElement.innerText = this.container.documentEditor.selection.text;
    this.onChangeToolbarVisibility(true, false, false);
    this.onRewriteClick();
  }

  onTranslate() {
    this.dialog.header = 'AI Translate';
    this.dialog.show();
    this.questionDiv.nativeElement.innerText = this.container.documentEditor.selection.text;
    this.onChangeToolbarVisibility(false, true, false);
    this.onTranslateClick();
  }

  onGrammerCheck() {
    this.dialog.header = 'Grammer';
    this.dialog.show();
    this.questionDiv.nativeElement.innerText = this.container.documentEditor.selection.text;
    this.onChangeToolbarVisibility(false, false, true);
    this.onGrammerCheckClick();
  }

  onCustomContextMenuSelect(args: CustomContentMenuEventArgs): void {
    {
      let item: string = args.id;
      let id: string = this.container.element.id;
      switch (item) {
        case id + '_editorrewrite':
          this.onRewrite();
          break;
        case id + '_editortranslate':
          this.onTranslate();
          break;
        case id + '_editorgrammer':
          this.onGrammerCheck();
          break;
      }
    };
  }
  // Dialog events
  onBeforeOpen(): void {
    this.onChangeToolbarVisibility(true, false, false);
  }
  onclose(): void {
    this.clearContent();
  }
  onOpen(args: any): void {
    args.preventFocus = true;
  }
  // toolbar events 
  async onToolbarCreated(): Promise<void> {
    this.updateIndex();
  }
  updateIndex() {
    let element: HTMLInputElement = document.getElementById('numeric')! as HTMLInputElement;
    let text: string = this.editableDiv.nativeElement.innerHTML;
    if (this.outList.length > 0 && this.outList.indexOf(text) !== -1) {
      element.value = (this.outList.indexOf(text) + 1).toString();
    } else {
      element.value = '0';
    }
  }
// Toolbar selection

  onChangeToolbarVisibility(showPryItem: boolean, showTranslateItem: boolean, showGrammerItem: boolean) {
    let isPrimary: boolean = false;
    let isSecondary: boolean = true;
    let isTranslate: boolean = false;
    let isGrammer: boolean = false;
    if (showPryItem) {
      isPrimary = true;
      isSecondary = false;
      isTranslate = false;
      isGrammer = false;
    }
    if (showTranslateItem) {
      isPrimary = false;
      isSecondary = false;
      isTranslate = true;
      isGrammer = false;
    }
    if (showGrammerItem) {
      isPrimary = false;
      isSecondary = false;
      isTranslate = false;
      isGrammer = true;
    }
    for (let i = 0; i < 5; i++) {
      this.toolbar.items[i].visible = isPrimary;
      this.toolbar.items[i + 5].visible = isSecondary;
    }
    this.toolbar.items[10].visible = isTranslate;
    this.toolbar.items[11].visible = isTranslate;
    this.toolbar.items[12].visible = isGrammer;
    this.toolbar.items[13].visible = isGrammer;
  }
// Move to previous parameter 
  moveToPreviousPara() {
    this.editableDiv.nativeElement.innerHTML = '';
    this.container.documentEditor.selection.moveToParagraphEnd();
    this.container.documentEditor.selection.moveToNextLine();
    this.container.documentEditor.selection.selectParagraph();
    this.questionDiv.nativeElement.innerText = this.container.documentEditor.selection.text;
    if (this.dialog.header === 'AI Translate') {
      this.onTranslateClick();
    } else if (this.dialog.header === 'AI Rephrase') {
      this.onRewriteClick();
    } else {
      this.onGrammerCheckClick();
    }
  }
// Move to Next parameter 
  moveToNextPara() {
    this.editableDiv.nativeElement.innerHTML = '';
    this.container.documentEditor.selection.moveToParagraphEnd();
    this.container.documentEditor.selection.moveToNextLine();
    this.container.documentEditor.selection.selectParagraph();
    this.questionDiv.nativeElement.innerText = this.container.documentEditor.selection.text;
    if (this.dialog.header === 'AI Translate') {
      this.onTranslateClick();
    } else if (this.dialog.header === 'AI Rephrase') {
      this.onRewriteClick();
    } else {
      this.onGrammerCheckClick();
    }
  }
// Move to Next parameter 
  moveToNext() {
    let text: string = this.editableDiv.nativeElement.innerHTML;
    let index: number = this.outList.indexOf(text);
    if (index + 1 < this.outList.length) {
      this.editableDiv.nativeElement.innerHTML = this.outList[index + 1];
      this.updateIndex();
    }
  }
// Move to Next parameter 
  moveToPrevious() {
    let text: string = this.editableDiv.nativeElement.innerHTML;
    let index: number = this.outList.indexOf(text);
    if (index - 1 >= 0) {
      this.editableDiv.nativeElement.innerHTML = this.outList[index - 1];
      this.updateIndex();
    }
  }
  // Settings click event triggers
  onSettingsClick() {
    this.onChangeToolbarVisibility(false, false, false);
  }
  onCloseSecndaryToolbar() {
    this.onChangeToolbarVisibility(true, false, false);
  }

  onToneChange(args: ChangeEventArgs): void {
    this.toneValue = args.value as string;
  }
  onFormatChange(args: ChangeEventArgs): void {
    this.formatValue = args.value as string;
  }
  onLengthChange(args: ChangeEventArgs): void {
    this.lengthValue = args.value as string;
  }
  onLanguageChange(args: ChangeEventArgs): void {
    this.translateValue = args.value as string;
  }
  ValueChangeHandler(args: MultiSelectChangeEventArgs): void {
    this.grammerList = args.value as string[];
  }
// Rewrite the content
  async onRewriteClick() {
    debugger;
    showSpinner(document.getElementById('dialog') as HTMLElement);
    let text: string = this.questionDiv.nativeElement.innerText;
    const options: AzureAIRequestOptions = {
      messages: [
        { role: "system", content: `You are a helpful assistant. Your task is to analyze the provided text and rephrase it. Please adjust the text to reflect a tone of '${this.toneValue}', formatted in '${this.formatValue}' style, and maintain a length of '${this.lengthValue}'. Always respond in proper HTML format, excluding <html>, <head>, and <body> tags.` },
        { role: "user", content: text }
      ],
      model: "gpt-4",
    };
    await this.onGenerate(options);
    hideSpinner(document.getElementById('dialog') as HTMLElement);
  }
// Translate to other language
  async onTranslateClick() {
    showSpinner(document.getElementById('dialog') as HTMLElement);
    let text: string = this.questionDiv.nativeElement.innerText;
    const options: AzureAIRequestOptions = {
      messages: [
        { role: "system", content: `You are a helpful assistant. Your task is to translate the provided text into '${this.translateValue}'. Always respond in proper HTML format, excluding <html> and <head> tags.` },
        { role: "user", content: text }
      ],
      model: "gpt-4",
    };
    await this.reframeContent(options);
    hideSpinner(document.getElementById('dialog') as HTMLElement);
  }
// Grammer check
  async onGrammerCheckClick() {
    showSpinner(document.getElementById('dialog') as HTMLElement);
    let value: string = '';
    let systemPrompt: string = '';
    if (this.grammerList.length > 0) {
      this.grammerList.forEach((item) => {
        value += item + ', ';
      });
      systemPrompt = `You are a helpful assistant. Your task is to analyze the provided text and perform the following grammar checks: ${value}. Please ensure that the revised text reflects these corrections. Always respond in proper HTML format, but do not include <html>, <head>, or <body> tags.`;
    } else {
      systemPrompt = "You are a helpful assistant. Your task is to analyze the provided text, check for and correct any grammatical errors, and rephrase it. Always respond in proper HTML format, but do not include <html>, <head>, or <body> tags.";
    }
    let text: string = this.questionDiv.nativeElement.innerText;
    const options: AzureAIRequestOptions = {
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: text }
      ],
      model: "gpt-4",
    };
    await this.reframeContent(options);
    hideSpinner(document.getElementById('dialog') as HTMLElement);
  }
  //AI convertion

  async onInsertContent(): Promise<void> {
    let response: string = this.editableDiv.nativeElement.innerHTML;
    let http = new XMLHttpRequest();
    let url: string = this.container.serviceUrl + 'SystemClipboard';
    http.open('POST', url, true);
    http.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    http.onreadystatechange = () => {
      if (http.readyState === 4) {
        if (http.status === 200 || http.status === 304) {
          this.container.documentEditor.editor.paste(http.responseText);
          this.container.documentEditor.editor.onEnter();
          this.clearContent();
          this.dialog.hide();
        }
      }
    };
    let sfdt: any = {
      content: response,
      type: '.Html',
    };
    http.send(JSON.stringify(sfdt));
  }
  
  async onGenerate(options: AzureAIRequestOptions): Promise<void> {
    this.outList = [];
    for (let i = 0; i < 3; i++) {
      const response = await getAzureChatAIRequest(options);
      if (response && this.outList.indexOf(response) === -1) {
        this.outList.push(response);
      } else {
        i--;
      }
    }
    if (this.outList.length > 0) {
      this.editableDiv.nativeElement.innerHTML = this.outList[0];
      this.updateIndex();
    }
  }
// Generate refined text
  async reframeContent(options: AzureAIRequestOptions): Promise<void> {
    const response = await getAzureChatAIRequest(options);
    if (response) {
      this.editableDiv.nativeElement.innerHTML = response;
    }
  }
  clearContent(): void {
    this.editableDiv.nativeElement.innerHTML = '';
    this.questionDiv.innerText = '';
  }
}
