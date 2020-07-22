import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ToolbarService, DocumentEditorContainerComponent } from '@syncfusion/ej2-angular-documenteditor';
import { TitleBar } from './title-bar';
import { comments, WEB_API_ACTION } from './data';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { DialogUtility } from '@syncfusion/ej2-popups';
import { DocumentEditorContainer, Toolbar, CommentDeleteEventArgs } from '@syncfusion/ej2-documenteditor';


/**
 * Document Editor Component
 */
@Component({
    selector: 'control-content',
    templateUrl: 'comments.html',
    encapsulation: ViewEncapsulation.None,
    providers: [ToolbarService]
})
export class CommentsComponent {
    public hostUrl: string = 'https://ej2services.syncfusion.com/production/web-services/';
    @ViewChild('documenteditor_default')
    public container: DocumentEditorContainerComponent;
    public culture: string = 'en-US';
    titleBar: TitleBar;
    onCreate(): void {
        let titleBarElement: HTMLElement = document.getElementById('default_title_bar');
        this.titleBar = new TitleBar(titleBarElement, this.container.documentEditor, true);
        this.container.serviceUrl = this.hostUrl + WEB_API_ACTION;
        this.container.documentEditor.open(JSON.stringify(comments));
        this.container.documentEditor.documentName = 'Comments';        
		this.container.documentEditor.showComments = true;
        this.titleBar.updateDocumentTitle();	
    }

    onDocumentChange(): void {
        if (!isNullOrUndefined(this.titleBar)) {
            this.titleBar.updateDocumentTitle();
        }
        this.container.documentEditor.focusIn();
    }
    commentDelete = function(args: CommentDeleteEventArgs): void {
        if (args.author !== this.container.documentEditor.currentUser) {
            args.cancel = true;
            DialogUtility.alert({
                title: 'Information',
                content: 'Delete restriction enabled. Only the author of the comment can delete it.',
                showCloseIcon: true,
                closeOnEscape: true,


    });
}
}
}
