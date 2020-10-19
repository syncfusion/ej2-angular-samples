import { Component, ViewEncapsulation, ViewChild,  OnInit } from '@angular/core';
import { ToolbarService, DocumentEditorContainerComponent } from '@syncfusion/ej2-angular-documenteditor';
import { TitleBar } from './title-bar';
import { ClickEventArgs } from '@syncfusion/ej2-navigations/src/toolbar/toolbar';
import { mailmerge, WEB_API_ACTION } from './data';
import { ListView, SelectEventArgs } from '@syncfusion/ej2-lists';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { Dialog, DialogUtility } from '@syncfusion/ej2-popups';
/**
 * Document Editor Component
 */
@Component({
    selector: 'control-content',
    templateUrl: 'mail-merge.html',
    encapsulation: ViewEncapsulation.None,
    providers: [ToolbarService]
})
export class MailMergeComponent {
    public hostUrl: string = 'https://ej2services.syncfusion.com/production/web-services/';
    @ViewChild('documenteditor_default')
    public container: DocumentEditorContainerComponent;
    public culture: string = 'en-US';
    titleBar: TitleBar;
    public editArea: HTMLElement;
    public item =['New', 'Open', 'Separator', 'Undo',
            'Redo',
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
            'Separator',
            {
                prefixIcon: 'sf-icon-InsertMergeField',
                tooltipText: 'Insert Field',
                text: this.onWrapText('Insert Field'),
                id: 'InsertField'
            },
            {
                prefixIcon: 'sf-icon-FinishMerge',
                tooltipText: 'Merge Document',
                text: this.onWrapText('Merge Document'),
                id: 'MergeDocument'
            },];
     onWrapText(text: string): string {
        let content: string = '';
        let index: number = text.lastIndexOf(' ');
        content = text.slice(0, index);
        text.slice(index);
        content += '<div class="e-de-text-wrap">' + text.slice(index) + '</div>';
        return content;
    }
     

    onCreate(): void {
        let titleBarElement: HTMLElement = document.getElementById('default_title_bar');
        this.titleBar = new TitleBar(titleBarElement, this.container.documentEditor, true);
        this.container.serviceUrl = this.hostUrl + WEB_API_ACTION;
        this.container.documentEditor.open(JSON.stringify(mailmerge));
        this.container.documentEditor.documentName = 'Mail Merge';
        this.titleBar.updateDocumentTitle();
        let toolbaritems : any = this.item;
        this.container.toolbarItems = toolbaritems;
        document.getElementById("listview").addEventListener("dragstart", function (event) {
      event.dataTransfer.setData("Text", (event.target as any).innerText);
      (event.target as any).classList.add('de-drag-target');

    });

    // Prevent default drag over for document editor element
    this.container.documentEditor.element.addEventListener("dragover", function (event) {
      event.preventDefault();
    });

    // Drop Event for document editor element
    this.container.documentEditor.element.addEventListener("drop", (e) => {
      var text = e.dataTransfer.getData('Text');//.replace(/\n/g, '').replace(/\r/g, '').replace(/\r\n/g, '');
      this.container.documentEditor.selection.select({ x: e.offsetX, y: e.offsetY, extend: false });
      //this.container.documentEditor.editor.insertText(text);
      this.insertField(text);
    });

    document.addEventListener("dragend", (event) => {
      if ((event.target as any).classList.contains('de-drag-target')) {
        (event.target as any).classList.remove('de-drag-target');
      }
    });
       
    }
     toolbarClick = (args: ClickEventArgs): void => {
        switch (args.item.id) {
            case 'MergeDocument':
                this.mergeDocument();
                break;
            case 'InsertField':
                this.showInsertFielddialog();
                break;
        }
    };
     
    

    onDocumentChange(): void {
        if (!isNullOrUndefined(this.titleBar)) {
            this.titleBar.updateDocumentTitle();
        }
        this.container.documentEditor.focusIn();
    }
     mergeDocument(): void {
        this.container.documentEditor.saveAsBlob('Docx').then((blob: Blob) => {
            let exportedDocumment: Blob = blob;
            let fileReader: any = new FileReader();
            fileReader.onload = (): void => {
                let base64String: any = fileReader.result;
                let responseData: any = {
                    fileName: this.container.documentEditor.documentName + '.docx',
                    documentData: base64String
                };
               
                this.showHideWaitingIndicator(true);
                let baseUrl: string = this.hostUrl + 'api/documenteditor/MailMerge';
                let httpRequest: XMLHttpRequest = new XMLHttpRequest();
                httpRequest.open('POST', baseUrl, true);
                httpRequest.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
                httpRequest.onreadystatechange = () => {
                    if (httpRequest.readyState === 4) {
                        if (httpRequest.status === 200 || httpRequest.status === 304) {
                            this.container.documentEditor.open(httpRequest.responseText);
                        } else {
                            // Failed to merge document
                            DialogUtility.alert({
                                title: 'Information',
                                content: 'failure to merge document',
                                showCloseIcon: true,
                                closeOnEscape: true,
                            });
                        }
                        this.showHideWaitingIndicator(false);
                    }
                };
                httpRequest.send(JSON.stringify((<any>responseData)));
            };
            fileReader.readAsDataURL(blob);
        });
    }
   
     showHideWaitingIndicator(show: boolean): void {
        let waitingPopUp: HTMLElement = document.getElementById('waiting-popup');
        let inActiveDiv:HTMLElement = document.getElementById('popup-overlay');
        inActiveDiv.style.display = show ? 'block' : 'none';
        waitingPopUp.style.display = show ? 'block' : 'none';
    }
    showInsertFielddialog(): void {
        let instance: any = this;
        if (document.getElementById('insert_merge_field') === null || document.getElementById('insert_merge_field') === undefined) {
            let fieldcontainer: any = document.createElement('div');
            fieldcontainer.id = 'insert_merge_field';
            document.body.appendChild(fieldcontainer);
            this.insertFieldDialogObj.appendTo('#insert_merge_field');
            fieldcontainer.parentElement.style.position = 'fixed';
            fieldcontainer.style.width = 'auto';
            fieldcontainer.style.height = 'auto';
        }
        this.insertFieldDialogObj.close = (): void => { this.container.documentEditor.focusIn(); };
        this.insertFieldDialogObj.beforeOpen = (): void => { this.container.documentEditor.focusIn(); };
        this.insertFieldDialogObj.show();
        let fieldNameTextBox: any = document.getElementById('field_text');
        fieldNameTextBox.value = '';
    }
    closeFieldDialog(): void {
        this.insertFieldDialogObj.hide();
        this.container.documentEditor.focusIn();
    }
    insertFieldDialogObj: Dialog = new Dialog({
        header: 'Merge Field',
        content:
            '<div class="dialogContent">'
            // tslint:disable-next-line:max-line-length
            + '<label class="e-insert-field-label">Name:</label></br><input type="text" id="field_text" class="e-input" placeholder="Type a field to insert eg. FirstName">'
            + '</div>',
        showCloseIcon: true,
        isModal: true,
        width: 'auto',
        height: 'auto',
        close: this.closeFieldDialog,
        buttons: [
            {
                'click': (): void => {
                    let fieldNameTextBox: any = document.getElementById('field_text');
                    let fieldName: any = fieldNameTextBox.value;
                    if (fieldName !== '') {
                        this.container.documentEditor.editor.insertField('MERGEFIELD ' + fieldName + ' \\* MERGEFORMAT');
                    }
                    this.insertFieldDialogObj.hide();
                    this.container.documentEditor.focusIn();
                },
                buttonModel: {
                    content: 'Ok',
                    cssClass: 'e-flat',
                    isPrimary: true,
                },
            },
            {
                'click': (): void => {
                    this.insertFieldDialogObj.hide();
                    this.container.documentEditor.focusIn();
                },
                buttonModel: {
                    content: 'Cancel',
                    cssClass: 'e-flat',
                },
            },
        ],
    });
     public listData: { [key: string]: Object }[] = [
        {
            text: 'ProductName',
            category: 'Drag or click the field to insert.',
            htmlAttributes: { draggable: true }
        },
        {
            text: 'ShipName',
            category: 'Drag or click the field to insert.',
            htmlAttributes: { draggable: true }
        },
        {
            text: 'CustomerID',
            category: 'Drag or click the field to insert.',
            htmlAttributes: { draggable: true }
        },
        {
            text: 'Quantity',
            category: 'Drag or click the field to insert.',
            htmlAttributes: { draggable: true }
        },
        {
            text: 'UnitPrice',
            category: 'Drag or click the field to insert.',
            htmlAttributes: { draggable: true }
        },
        {
            text: 'Discount',
            category: 'Drag or click the field to insert.',
            htmlAttributes: { draggable: true }
        },
        {
            text: 'ShipAddress',
            category: 'Drag or click the field to insert.',
            htmlAttributes: { draggable: true }
        },
        {
            text: 'ShipCity',
            category: 'Drag or click the field to insert.',
            htmlAttributes: { draggable: true }
        },
        {
            text: 'ShipCountry',
            category: 'Drag or click the field to insert.',
            htmlAttributes: { draggable: true }
        },
        {
            text: 'OrderId',
            category: 'Drag or click the field to insert.',
            htmlAttributes: { draggable: true }
        },
        {
            text: 'OrderDate',
            category: 'Drag or click the field to insert.',
            htmlAttributes: { draggable: true }
        }
    ];
    public fields:object = { tooltip:"category"};
    onSelect(args: SelectEventArgs): void {
        let fieldName: any = args.text;
        this.insertField(fieldName);
    }
     insertField(fieldName: any): void {
        let fileName: any = fieldName.replace(/\n/g, '').replace(/\r/g, '').replace(/\r\n/g, '');
        let fieldCode: any = 'MERGEFIELD  ' + fileName + '  \\* MERGEFORMAT ';
        this.container.documentEditor.editor.insertField(fieldCode, '«' + fieldName + '»');
        this.container.documentEditor.focusIn();
    }
}