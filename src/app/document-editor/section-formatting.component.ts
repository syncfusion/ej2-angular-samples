import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ToolbarService, RibbonService, DocumentEditorContainerComponent, DocumentEditorContainerModule } from '@syncfusion/ej2-angular-documenteditor';
import { TitleBar } from './title-bar';
import { sectionFormat, WEB_API_ACTION } from './data';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';

import { SBActionDescriptionComponent } from '../common/adp.component';
import { ButtonModule, SwitchModule, SwitchComponent } from '@syncfusion/ej2-angular-buttons';
/**
 * Document Editor Component
 */
@Component({
    selector: 'control-content',
    templateUrl: 'section-formatting.html',
    encapsulation: ViewEncapsulation.None,
    providers: [ToolbarService, RibbonService],
    standalone: true,
    imports: [DocumentEditorContainerModule, SwitchModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class SectionFormattingComponent {
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
        this.container.documentEditor.open(JSON.stringify(sectionFormat));
        this.container.documentEditor.documentName = 'Section Formatting';
        this.container.documentEditorSettings.showRuler = true;
        this.titleBar.updateDocumentTitle();
        this.titleBar.showButtons(false);
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