import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ToolbarService, DocumentEditorContainerComponent } from '@syncfusion/ej2-angular-documenteditor';
import { MenuItemModel } from '@syncfusion/ej2-navigations';
import { TitleBar } from './title-bar';
import { defaultDocument, WEB_API_ACTION } from './data';

/**
 * Document Editor Component
 */
@Component({
    selector: 'control-content',
    templateUrl: 'custom-context-menu.html',
    encapsulation: ViewEncapsulation.None,
    providers: [ToolbarService]
})
export class CustomContextMenuComponent {
    public hostUrl: string = 'https://ej2services.syncfusion.com/production/web-services/';
    @ViewChild('documenteditor_default')
    public container: DocumentEditorContainerComponent;
    titleBar: TitleBar;

    onCreate(): void {
        let titleBarElement: HTMLElement = document.getElementById('default_title_bar');
        this.titleBar = new TitleBar(titleBarElement, this.container.documentEditor, true);
        this.container.locale = 'en-US';
        this.container.serviceUrl = this.hostUrl + WEB_API_ACTION;
        this.container.documentEditor.open(JSON.stringify(defaultDocument));
        this.container.documentEditor.documentName = 'Custom Context Menu';
        this.titleBar.updateDocumentTitle();
        this.container.documentEditor.documentChange = (): void => {
            this.titleBar.updateDocumentTitle();
            this.container.documentEditor.focusIn();
        };
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
}
