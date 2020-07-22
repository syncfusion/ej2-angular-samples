import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ToolbarService, DocumentEditorContainerComponent, LayoutType } from '@syncfusion/ej2-angular-documenteditor';
import { TitleBar } from './title-bar';
import { trackchanges, WEB_API_ACTION } from './data';
import { isNullOrUndefined } from '@syncfusion/ej2-base';

/**
 * Document Editor Component
 */
@Component({
    selector: 'control-content',
    templateUrl: 'track-changes.html',
    encapsulation: ViewEncapsulation.None,
    providers: [ToolbarService]
})
export class TrackChangesComponent {
    public hostUrl: string = 'https://ej2services.syncfusion.com/production/web-services/';
    @ViewChild('documenteditor_default')
    public container: DocumentEditorContainerComponent;
    public culture: string = 'en-US';
    titleBar: TitleBar;
    layoutType: LayoutType = "Continuous";
    onCreate(): void {
        let titleBarElement: HTMLElement = document.getElementById('default_title_bar');
        this.titleBar = new TitleBar(titleBarElement, this.container.documentEditor, true);
        this.container.serviceUrl = this.hostUrl + WEB_API_ACTION;
        this.container.documentEditor.open(JSON.stringify(trackchanges));
        this.container.documentEditor.documentName = 'Track Changes';        
        this.titleBar.updateDocumentTitle();
    }
    onDocumentChange(): void {
        if (!isNullOrUndefined(this.titleBar)) {
            this.titleBar.updateDocumentTitle();
        }
        this.container.documentEditor.focusIn();
    }
}
