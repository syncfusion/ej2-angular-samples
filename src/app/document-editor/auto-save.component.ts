import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ToolbarService, DocumentEditorContainerComponent } from '@syncfusion/ej2-angular-documenteditor';
import { TitleBar } from './title-bar';
import { defaultDocument, WEB_API_ACTION } from './data';
import { isNullOrUndefined } from '@syncfusion/ej2-base';

/**
 * Document Editor Component
 */
@Component({
    selector: 'control-content',
    templateUrl: 'auto-save.html',
    encapsulation: ViewEncapsulation.None,
    providers: [ToolbarService]
})
export class AutoSaveComponent {
    public hostUrl: string = 'https://ej2services.syncfusion.com/production/web-services/';
    @ViewChild('documenteditor_default')
    public container: DocumentEditorContainerComponent;
    titleBar: TitleBar;

    contentChanged: boolean;

    onCreate(): void {
        let titleBarElement: HTMLElement = document.getElementById('default_title_bar');
        this.titleBar = new TitleBar(titleBarElement, this.container.documentEditor, true);
        this.container.locale = 'en-US';
        this.container.serviceUrl = this.hostUrl + WEB_API_ACTION;
        this.container.documentEditor.open(JSON.stringify(defaultDocument));
        this.container.documentEditor.documentName = 'Getting Started';
        this.titleBar.updateDocumentTitle();

        setInterval(() => {
            if (this.contentChanged) {
                //You can save the document as below
                this.container.documentEditor.saveAsBlob('Docx').then((blob: Blob) => {
                    let exportedDocumment: Blob = blob;
                    //Now, save the document where ever you want.
                    /* tslint:disable */
                    let span: HTMLElement = document.createElement('span');
                    let date: Date = new Date();
                    let time: string = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
                    span.innerHTML = 'Auto saved at <b>' + time + '</b><hr>';
                    let log: HTMLElement = document.getElementById('AutosaveLog');
                    log.insertBefore(span, log.firstChild);
                });
                this.contentChanged = false;
            }
        }, 15000);
    }

    onContentChange(): void {
        this.contentChanged = true;
    }

    onDocumentChange(): void {
        if (!isNullOrUndefined(this.titleBar)) {
            this.titleBar.updateDocumentTitle();
        }
        this.container.documentEditor.focusIn();
    }

    public clearLog(): void {
        document.getElementById('AutosaveLog').innerHTML = '';
    }
}
