import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ToolbarService, DocumentEditorContainerComponent } from '@syncfusion/ej2-angular-documenteditor';
import { TitleBar } from './title-bar';
import { bulletAndNumbering, WEB_API_ACTION } from './data';
import { isNullOrUndefined } from '@syncfusion/ej2-base';

/**
 * Document Editor Component
 */
@Component({
    selector: 'control-content',
    templateUrl: 'bullets-numbering.html',
    encapsulation: ViewEncapsulation.None,
    providers: [ToolbarService]
})
export class BulletsNumberingComponent {
    public hostUrl: string = 'https://ej2services.syncfusion.com/production/web-services/';
    @ViewChild('documenteditor_default')
    public container: DocumentEditorContainerComponent;
    public culture: string = 'en-US';
    titleBar: TitleBar;

    onCreate(): void {
        let titleBarElement: HTMLElement = document.getElementById('default_title_bar');
        this.titleBar = new TitleBar(titleBarElement, this.container.documentEditor, true);
        this.container.serviceUrl = this.hostUrl + WEB_API_ACTION;
        this.container.documentEditor.open(JSON.stringify(bulletAndNumbering));
        this.container.documentEditor.documentName = 'Bullets and Numbering';
        this.titleBar.updateDocumentTitle();
    }

    onDocumentChange(): void {
        if (!isNullOrUndefined(this.titleBar)) {
            this.titleBar.updateDocumentTitle();
        }
        this.container.documentEditor.focusIn();
    }
}