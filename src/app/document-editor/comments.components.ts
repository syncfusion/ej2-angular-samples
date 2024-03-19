import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ToolbarService, DocumentEditorContainerComponent, DocumentEditorContainerModule, DocumentEditorSettingsModel} from '@syncfusion/ej2-angular-documenteditor';
import { TitleBar } from './title-bar';
import { comments, WEB_API_ACTION } from './data';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { DialogUtility } from '@syncfusion/ej2-popups';
import { DocumentEditorContainer, Toolbar, CommentDeleteEventArgs } from '@syncfusion/ej2-documenteditor';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';


/**
 * Document Editor Component
 */
@Component({
    selector: 'control-content',
    templateUrl: 'comments.html',
    encapsulation: ViewEncapsulation.None,
    providers: [ToolbarService],
    standalone: true,
    imports: [DocumentEditorContainerModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class CommentsComponent {
    public hostUrl: string = 'https://services.syncfusion.com/angular/production/api/documenteditor/';
    public mentionData: any = [
        { "Name": "Selma Rose", "Eimg": "3", "EmailId": "selma@mycompany.com" },
        { "Name": "Russo Kay", "Eimg": "8", "EmailId": "russo@mycompany.com" },
        { "Name": "Camden Kate", "Eimg": "9", "EmailId": "camden@mycompany.com" },
        { "Name": "Mary Kate", "Eimg": "4", "EmailId": "marry@mycompany.com" },
        { "Name": "Ursula Ann", "Eimg": "2", "EmailId": "ursula@mycompany.com" },
        { "Name": "Margaret", "Eimg": "5", "EmailId": "margaret@mycompany.com" },
        { "Name": "Laura Grace", "Eimg": "6", "EmailId": "laura@mycompany.com" },
        { "Name": "Robert", "Eimg": "8", "EmailId": "robert@mycompany.com" },
        { "Name": "Albert", "Eimg": "9", "EmailId": "albert@mycompany.com" },
        { "Name": "Michale", "Eimg": "10", "EmailId": "michale@mycompany.com" },
        { "Name": "Andrew James", "Eimg": "7", "EmailId": "james@mycompany.com" },
        { "Name": "Rosalie", "Eimg": "4", "EmailId": "rosalie@mycompany.com" },
        { "Name": "Stella Ruth", "Eimg": "2", "EmailId": "stella@mycompany.com" },
        { "Name": "Richard Rose", "Eimg": "10", "EmailId": "richard@mycompany.com" },
        { "Name": "Gabrielle", "Eimg": "3", "EmailId": "gabrielle@mycompany.com" },
        { "Name": "Thomas", "Eimg": "7", "EmailId": "thomas@mycompany.com" },
        { "Name": "Charles Danny", "Eimg": "8", "EmailId": "charles@mycompany.com" },
        { "Name": "Daniel", "Eimg": "10", "EmailId": "daniel@mycompany.com" },
        { "Name": "Matthew", "Eimg": "7", "EmailId": "matthew@mycompany.com" },
        { "Name": "Donald Krish", "Eimg": "9", "EmailId": "donald@mycompany.com" },
        { "Name": "Yohana", "Eimg": "1", "EmailId": "yohana@mycompany.com" },
        { "Name": "Kevin Paul", "Eimg": "10", "EmailId": "kevin@mycompany.com" },
        { "Name": "Andrew Fuller", "Eimg": "3", "EmailId": "andrew@mycompany.com"}
    ];
    public settings: DocumentEditorSettingsModel = { showRuler:true , mentionSettings : { dataSource: this.mentionData, fields: { text: 'Name' }}  };
    @ViewChild('documenteditor_default')
    public container: DocumentEditorContainerComponent;
    public culture: string = 'en-US';
    titleBar: TitleBar;
    onCreate(): void {
        let titleBarElement: HTMLElement = document.getElementById('default_title_bar');
        this.titleBar = new TitleBar(titleBarElement, this.container.documentEditor, true);
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
