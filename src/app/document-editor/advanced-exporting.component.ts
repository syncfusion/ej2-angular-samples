import { ListView, ListViewAllModule, ListViewComponent,SelectEventArgs } from '@syncfusion/ej2-angular-lists';
import { SliderModule, NumericTextBoxModule, ColorPickerModule } from '@syncfusion/ej2-angular-inputs';
import { CheckBoxModule, ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { DropDownButton, DropDownButtonComponent, DropDownButtonModule, SplitButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ToolbarService, DocumentEditorContainerComponent, DocumentEditorContainerModule } from '@syncfusion/ej2-angular-documenteditor';
import { TitleBar } from './title-bar';
import { defaultDocument, WEB_API_ACTION } from './data';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-angular-popups';
/**
 * Document Editor Component
 */
@Component({
    selector: 'control-content',
    templateUrl: 'advanced-exporting.html',
    encapsulation: ViewEncapsulation.None,
    providers: [ToolbarService],
    standalone: true,
    imports: [DocumentEditorContainerModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class ExportComponent {
    public hostUrl: string = 'https://services.syncfusion.com/angular/production/api/documenteditor/';
    @ViewChild('documenteditor_default')
    public container: DocumentEditorContainerComponent;
    
    public culture: string = 'en-US';
    titleBar: TitleBar;
    public toolItem: any = {
        tooltipText: "Disable Image",
        template: '<button title="Export" class="e-tbar-btn e-tbtn-txt e-control e-btn e-lib e-dropdown-btn e-caret-hide" type="button" id="dropdownbtn"><span class="e-btn-icon e-icons e-export e-icon-left"></span><span class="e-tbar-btn-text">' + "Export" + '</span><span class="e-btn-icon e-icons e-icon-right e-caret"></span></button><div id="listview"></div>',
        text: "Export",
        id: "dropdown"
  };
  data: any = {
    target: '#listview',
    cssClass: 'e-caret-hide'
  };
  public dropdown: DropDownButton = new DropDownButton(this.data);
  
  dataSource: { [key: string]: Object }[] = [
    { class: 'data', text: 'Syncfusion® Document Text (*.sfdt)', id: 'sfdt', category: 'Client side exporting' },
    { class: 'data', text: 'Word Document (*.docx)', id: 'docx', category: 'Client side exporting' },
    { class: 'data', text: 'Word Template (*.dotx)', id: 'dotx', category: 'Client side exporting' },
    { class: 'data', text: 'Plain Text (*.txt)', id: 'text', category: 'Client side exporting' },
    { class: 'data', text: 'PDF (*.pdf)', id: 'pdf', category: 'Server side exporting' },
    { class: 'data', text: 'HyperText Markup Language (*.html)', id: 'html', category: 'Server side exporting' },
    { class: 'data', text: 'Rich Text Format (*.rtf)', id: 'rtf', category: 'Server side exporting' },
    { class: 'data', text: 'Markdown (*.md)', id: 'md', category: 'Server side exporting' },
    { class: 'data', text: 'OpenDocument Text (*.odt)', id: 'odt', category: 'Server side exporting' },
  ];

  public listviewInstance: ListView = new ListView({
    dataSource: this.dataSource,
    // Map the appropriate columns to fields property
    fields: { text: 'text', groupBy: 'category' },
    select: this.change.bind(this)
});

public change(args: SelectEventArgs) {
    let value: string = (args.data as any).id;
    switch (value) {
        case 'docx':
            this.container.documentEditor.save("Sample", 'Docx');
            break;
        case 'sfdt':
            this.container.documentEditor.save("Sample", 'Sfdt');
            break;
        case 'text':
            this.container.documentEditor.save("Sample", 'Txt');
            break;
        case 'dotx':
            this.container.documentEditor.save("Sample", 'Dotx');
            break;
        case 'pdf':
            this.formatSave('Pdf');
            break;
        case 'html':
            this.formatSave('Html');
            break;
        case 'odt':
            this.formatSave('Odt');
            break;
        case 'md':
            this.formatSave('Md');
            break;
        case 'rtf':
            this.formatSave('Rtf');
            break;
        case 'wordml':
            this.formatSave('Xml');
            break;
    }
    args.item.classList.remove('e-active');
}
  public items = ['New',
  'Open',
  this.toolItem,
  'Separator',
  'Undo',
  'Redo',
  'Separator',
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
  'Separator',
  'FormFields',
  'UpdateFields'];
  
    
  public formatSave(type: string) {
    createSpinner({
        target: document.getElementById('documenteditor_default') as any
    });
    showSpinner((document as any).getElementById('documenteditor_default'));
    let format: string = type;
    let fileName : string = this.container.documentEditor.documentName;
    let url = this.container.documentEditor.serviceUrl + 'Export';
    let http = new XMLHttpRequest();
    http.open('POST', url);
    http.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    http.responseType = 'blob'; // Set the responseType to 'blob' to handle binary data

    // Prepare data to send
    let sfdt = {
        Content: this.container.documentEditor.serialize(),
        Filename: fileName,
        Format: '.' + format
    };
    // Set up event listener for the response
    http.onload = function () {
        if (http.status === 200) {
            // Handle the response blob here
            let responseData = http.response;

            // Create a Blob URL for the response data
            let blobUrl = URL.createObjectURL(responseData);
            // Create a link element and trigger the download
            let downloadLink = document.createElement('a');
            downloadLink.href = blobUrl;
            downloadLink.download = fileName + '.' + (format).toLowerCase();;
            document.body.appendChild(downloadLink);
            hideSpinner((document as any).getElementById('documenteditor_default'));
            downloadLink.click();

            // Cleanup: Remove the link and revoke the Blob URL
            document.body.removeChild(downloadLink);
            URL.revokeObjectURL(blobUrl);
        } else {
            // Handle errors
            console.error('Request failed with status:', http.status);
            hideSpinner((document as any).getElementById('documenteditor_default'));
        }
    };

    // Send the request with JSON.stringify(sfdt) as the request body
    http.send(JSON.stringify(sfdt));
}

    onCreate(): void {
        
        let titleBarElement: HTMLElement = document.getElementById('default_title_bar');
        this.titleBar = new TitleBar(titleBarElement, this.container.documentEditor, true);
        this.container.documentEditor.open(JSON.stringify(defaultDocument));
        this.container.documentEditor.documentName = 'Getting Started';
        this.container.documentEditorSettings.showRuler = true;
        this.titleBar.updateDocumentTitle();
        this.dropdown.appendTo('#dropdownbtn');
        this.listviewInstance.appendTo("#listview");
    }
    onDocumentChange(): void {
        if (!isNullOrUndefined(this.titleBar)) {
            this.titleBar.updateDocumentTitle();
        }
        this.container.documentEditor.focusIn();
    }

    
}
