import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ToolbarService, DocumentEditorContainerComponent } from '@syncfusion/ej2-angular-documenteditor';
import { GridComponent, CommandColumnService, CommandModel, CommandClickEventArgs } from '@syncfusion/ej2-angular-grids';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { TitleBar } from './title-bar';
import { defaultDocument, characterFormat, paragraphFormat, styles, weblayout, WEB_API_ACTION } from './data';
import { isNullOrUndefined } from '@syncfusion/ej2-base';

/**
 * Document Editor Component
 */
@Component({
    selector: 'control-content',
    templateUrl: 'document-list.html',
    encapsulation: ViewEncapsulation.None,
    providers: [ToolbarService,CommandColumnService]
})
export class DocumentListComponent {
    public hostUrl: string = 'https://services.syncfusion.com/angular/production/api/documenteditor/';
    @ViewChild('documenteditor_default')
    public container: DocumentEditorContainerComponent;
    @ViewChild('Dialog')
    public dialog: DialogComponent;
 
    public data: any = [];
    @ViewChild('grid') public grid?: GridComponent;
    public commands: CommandModel[];

    public culture: string = 'en-US';
    public position: any = { X: 'center', Y: 'center' };
    titleBar: TitleBar;

    ngOnInit(): void {
        // ngOnInit function
        this.data = [{
            'FileName': 'Getting Started.docx',
            'Author': 'Ryan Hodson'
        },
        {
            'FileName': 'Character Formatting.docx',
            'Author': 'Elton Stoneman',
        },
        {
            'FileName': 'Paragraph Formatting.docx',
            'Author': 'Peter Shaw',
        },
        {
            'FileName': 'Styles.docx',
            'Author': 'Cody Lindley',
        },
        {
            'FileName': 'Web layout.docx',
            'Author': 'Scott Allen',
        }];
        this.commands = [{ buttonOption: { cssClass: 'e-icons e-eye e-flat' }, title: 'View'}, { buttonOption: { cssClass: 'e-icons e-edit e-flat' } , title: 'Edit'}];
    }

    onDialogCreate(): void {
        let dialogElement: HTMLElement = document.getElementById('component-dialog');
    }

    onCreate(): void {
        let titleBarElement: HTMLElement = document.getElementById('default_title_bar');
        this.titleBar = new TitleBar(titleBarElement, this.container.documentEditor, true, false, this.dialog);
    }

    onDocumentChange(): void {
        if (!isNullOrUndefined(this.titleBar)) {
            this.titleBar.updateDocumentTitle();
        }
        this.container.documentEditor.focusIn();
    }

    public openEditor(args: CommandClickEventArgs): void {
        let mode = args.target.title;
        let currentDocument = args.rowData['FileName'];
        this.container.documentEditor.documentName = currentDocument.replace(".docx", "");
        this.titleBar.updateDocumentTitle();
        switch (currentDocument) {
            case "Getting Started.docx":
            this.container.documentEditor.open(JSON.stringify((<any>defaultDocument))); break;
            case "Character Formatting.docx":
            this.container.documentEditor.open(JSON.stringify((<any>characterFormat))); break;
            case "Paragraph Formatting.docx":
            this.container.documentEditor.open(JSON.stringify((<any>paragraphFormat))); break;
            case "Styles.docx":
            this.container.documentEditor.open(JSON.stringify((<any>styles))); break;
            case "Web layout.docx":
            this.container.documentEditor.open(JSON.stringify((<any>weblayout))); break;
        }
        if(mode === 'View'){
            this.container.documentEditor.isReadOnly = true;
            this.container.documentEditor.enableContextMenu = false;
            this.container.showPropertiesPane = false;
            document.getElementById('documenteditor-share').style.display ='none';
            this.container.toolbarItems = ['Open', 'Separator', 'Find'];
        } else {
            this.container.documentEditor.isReadOnly = false;
            this.container.documentEditor.enableContextMenu = true;
            this.container.showPropertiesPane = true;
            document.getElementById('documenteditor-share').style.display ='block';
            this.container.toolbarItems = ['New', 'Open', 'Separator', 'Undo', 'Redo', 'Separator', 'Image', 'Table', 'Hyperlink', 'Bookmark', 'TableOfContents', 'Separator', 'Header', 'Footer', 'PageSetup', 'PageNumber', 'Break', 'InsertFootnote', 'InsertEndnote', 'Separator', 'Find', 'Separator', 'Comments', 'TrackChanges', 'Separator', 'LocalClipboard', 'RestrictEditing', 'Separator', 'FormFields', 'UpdateFields'];
        }
        this.dialog.show();
    }
}
