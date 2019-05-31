import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ToolbarService, DocumentEditorContainerComponent } from '@syncfusion/ej2-angular-documenteditor';
import { TitleBar } from './title-bar';
import { toc, WEB_API_ACTION } from './data';
/**
 * Document Editor Component
 */
@Component({
    selector: 'control-content',
    templateUrl: 'table-of-contents.html',
    encapsulation: ViewEncapsulation.None,
    providers: [ToolbarService]
})
export class TableOfContentsComponent {
    public hostUrl: string = 'https://ej2services.syncfusion.com/production/web-services/';
    @ViewChild('documenteditor_default')
    public container: DocumentEditorContainerComponent;
    titleBar: TitleBar;

    onCreate(): void {
        let titleBarElement: HTMLElement = document.getElementById('default_title_bar');
        this.titleBar = new TitleBar(titleBarElement, this.container.documentEditor, true);
        this.container.locale = 'en-US';
        this.container.serviceUrl = this.hostUrl + WEB_API_ACTION;
        this.container.documentEditor.open(JSON.stringify(toc));
        this.container.documentEditor.documentName = 'Table of Contents';
        this.titleBar.updateDocumentTitle();
        this.container.documentEditor.documentChange = (): void => {
            this.titleBar.updateDocumentTitle();
            this.container.documentEditor.focusIn();
        };
    }
}