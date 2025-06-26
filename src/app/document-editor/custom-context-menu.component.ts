import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ToolbarService, RibbonService, DocumentEditorContainerComponent, DocumentEditorContainerModule } from '@syncfusion/ej2-angular-documenteditor';
import { MenuItemModel } from '@syncfusion/ej2-navigations';
import { TitleBar } from './title-bar';
import { defaultDocument, WEB_API_ACTION } from './data';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';

import { SBActionDescriptionComponent } from '../common/adp.component';
import { ButtonModule, SwitchModule, SwitchComponent} from '@syncfusion/ej2-angular-buttons';

/**
 * Document Editor Component
 */
@Component({
    selector: 'control-content',
    templateUrl: 'custom-context-menu.html',
    encapsulation: ViewEncapsulation.None,
    providers: [ToolbarService, RibbonService],
    standalone: true,
    imports: [DocumentEditorContainerModule, SwitchModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class CustomContextMenuComponent {
    public hostUrl: string = 'https://services.syncfusion.com/angular/production/api/documenteditor/';
    @ViewChild('documenteditor_default')
        public container: DocumentEditorContainerComponent;
    @ViewChild('switch')
    public switch: SwitchComponent;
    public culture: string = 'en-US';
    titleBar: TitleBar;


    onCreate(): void {
        this.switch.checked = true;
        let titleBarElement: HTMLElement = document.getElementById('default_title_bar');
        this.titleBar = new TitleBar(titleBarElement, this.container.documentEditor, true);
        this.container.documentEditor.open(JSON.stringify(defaultDocument));
        this.container.documentEditor.documentName = 'Custom Context Menu';
        this.container.documentEditorSettings.showRuler = true;
        this.titleBar.updateDocumentTitle();
this.titleBar.showButtons(false);
        // creating Custom Options
        let menuItems: MenuItemModel[] = [
            {
                text: 'Search In Google',
                id: 'search_in_google',
                iconCss: 'e-icons e-de-ctnr-find'
            }];
        // adding Custom Options
        this.container.documentEditor.contextMenu.addCustomMenu(menuItems, false);
        // custom Options Select Event
        this.container.documentEditor.customContextMenuSelect = (args: any): void => {
            // custom Options Functionality
            let id: string = this.container.documentEditor.element.id;
            switch (args.id) {
                case id + 'search_in_google':
                    let searchContent: string = this.container.documentEditor.selection.text;
                    if (!this.container.documentEditor.selection.isEmpty && /\S/.test(searchContent)) {
                        window.open('http://google.com/search?q=' + searchContent);
                    }
                    break;
            }
        };
        //  custom options hide/show functionality
        this.container.documentEditor.customContextMenuBeforeOpen = (args: any): void => {
            let search: any = document.getElementById(args.ids[0]);
            search.style.display = 'none';
            let searchContent: string = this.container.documentEditor.selection.text;
            if (!this.container.documentEditor.selection.isEmpty && /\S/.test(searchContent)) {
                search.style.display = 'block';
            }
        };
    }

    onDocumentChange(): void {
        if (!isNullOrUndefined(this.titleBar)) {
            this.titleBar.updateDocumentTitle();
        }
       this.container.documentEditor.focusIn();
    }
    public change(e: any): void {
        if (e.checked) {
            this.container.toolbarMode = "Ribbon";
        }
        else {
            this.container.toolbarMode = "Toolbar";
        }
        this.titleBar.showButtons(this.container.toolbarMode != "Ribbon");
    }
}
