import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ToolbarService, DocumentEditorContainerComponent } from '@syncfusion/ej2-angular-documenteditor';
import { TitleBar } from './title-bar';
import { links, WEB_API_ACTION } from './data';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
/**
 * Document Editor Component
 */
@Component({
    selector: 'control-content',
    templateUrl: 'links-bookmarks.html',
    encapsulation: ViewEncapsulation.None,
    providers: [ToolbarService]
})
export class HyperlinksBookmarksComponent {
    public hostUrl: string = 'https://services.syncfusion.com/angular/production/api/documenteditor/';
    @ViewChild('documenteditor_default')
    public container: DocumentEditorContainerComponent;
    public culture: string = 'en-US';
    titleBar: TitleBar;

    onCreate(): void {
        let titleBarElement: HTMLElement = document.getElementById('default_title_bar');
        this.titleBar = new TitleBar(titleBarElement, this.container.documentEditor, true);
        this.container.documentEditor.open(JSON.stringify(links));
        this.container.documentEditor.documentName = 'Hyperlinks and Bookmarks';
        this.container.documentEditorSettings.showBookmarks = true;
        this.titleBar.updateDocumentTitle();
    }

    onDocumentChange(): void {
        if (!isNullOrUndefined(this.titleBar)) {
            this.titleBar.updateDocumentTitle();
        }
        this.container.documentEditor.focusIn();
    }
}