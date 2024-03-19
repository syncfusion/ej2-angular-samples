import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ToolbarService, DocumentEditorContainerComponent, DocumentEditorContainerModule } from '@syncfusion/ej2-angular-documenteditor';
import { TitleBar } from './title-bar';
import { defaultDocument, WEB_API_ACTION } from './data';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { MultiSelectComponent, MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';

/**
 * Document Editor Component
 */
@Component({
    selector: 'control-content',
    templateUrl: 'toolbar-customization.html',
    encapsulation: ViewEncapsulation.None,
    providers: [ToolbarService],
    standalone: true,
    imports: [DocumentEditorContainerModule, MultiSelectModule, ButtonModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class ToolbarCustomizationComponent {
    public hostUrl: string = 'https://services.syncfusion.com/angular/production/api/documenteditor/';
    @ViewChild('documenteditor_default')
    public container: DocumentEditorContainerComponent;
    public culture: string = 'en-US';
    titleBar: TitleBar;
    @ViewChild('checkbox')
    public mulObj: MultiSelectComponent;
    public mode: string;
    public filterPlaceholder: string;
    public Selecttoolbaritems: string = 'Select toolbar items';
    // set the MultiSelect popup height
    public popHeight: string = '350px';
    ngOnInit(): void {
        this.mode = 'CheckBox';
        this.filterPlaceholder = 'Search toolbar items';
    }
    public items = ['New', 'Open', 'Undo',
    'Redo',
    'Comments',
    'Image',
    'Table',
    'Hyperlink',
    'Bookmark',
    'TableOfContents',
    'Header',
    'Footer',
    'PageSetup',
    'PageNumber',
    'Break',
    'Find',
    'LocalClipboard',
    'RestrictEditing'];

    onCreate(): void {
        let titleBarElement: HTMLElement = document.getElementById('default_title_bar');
        this.titleBar = new TitleBar(titleBarElement, this.container.documentEditor, true);
        this.container.documentEditor.open(JSON.stringify(defaultDocument));
        this.container.documentEditor.documentName = 'Toolbar Customization';
        this.container.documentEditorSettings.showRuler = true;
        this.titleBar.updateDocumentTitle();
    }

    onDocumentChange(): void {
        if (!isNullOrUndefined(this.titleBar)) {
            this.titleBar.updateDocumentTitle();
        }
        this.container.documentEditor.focusIn();
    }
    public customize(): void {
        let toolbarItem: any = this.mulObj.value;
        this.container.toolbarItems = toolbarItem;
    }
}