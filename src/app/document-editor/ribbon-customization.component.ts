// ribbon-customization.component.ts
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { DocumentEditorContainerComponent, DocumentEditorContainerModule, RibbonService } from '@syncfusion/ej2-angular-documenteditor';
import { TitleBar } from './title-bar';
import { defaultDocument } from './data';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { CheckBox, CheckBoxComponent, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { ChangeEventArgs } from '@syncfusion/ej2-buttons';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

/**
 * Document Editor Ribbon Customization Component
 */
@Component({
    selector: 'control-content',
    templateUrl: 'ribbon-customization.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    providers: [RibbonService],
    imports: [DocumentEditorContainerModule, CheckBoxModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class RibbonCustomizationComponent {
    public hostUrl: string = 'https://services.syncfusion.com/angular/production/api/documenteditor/';
    @ViewChild('documenteditor')
    public container: DocumentEditorContainerComponent;
    
    @ViewChild('showHomeTab')
    public showHomeTabCheckBox: CheckBoxComponent;
    
    @ViewChild('showClipboard')
    public showClipboardCheckBox: CheckBoxComponent;
    
    @ViewChild('showItem')
    public showItemCheckBox: CheckBoxComponent;
    
    @ViewChild('enableItem')
    public enableItemCheckBox: CheckBoxComponent;
    
    titleBar: TitleBar;

    onCreate(): void {
        let titleBarElement: HTMLElement = document.getElementById('documenteditor_titlebar');
        this.titleBar = new TitleBar(titleBarElement, this.container.documentEditor, true);
        this.container.documentEditor.open(JSON.stringify(defaultDocument));
        this.container.documentEditor.documentName = 'Ribbon Customization';
        this.titleBar.updateDocumentTitle();
        this.titleBar.showButtons(false);
    }

    onHomeTabChange(args: ChangeEventArgs): void {
        // Update checked state
        this.container.ribbon.showTab('Home', args.checked);
    }

    onClipboardGroupChange(args: ChangeEventArgs): void {
        // Update checked state
        this.container.ribbon.showGroup({ tabId: 'Home', index: 1 }, args.checked);
    }

    onItemsChange(args: ChangeEventArgs): void {
        // Update checked state
        this.container.ribbon.showItems({ tabId: 'Home', groupIndex: 2, itemIndexes: [5, 6] }, args.checked);
    }

    onEnableItemChange(args: ChangeEventArgs): void {
        // Update checked state
        this.container.ribbon.enableItems({ tabId: 'Home', groupIndex: 2, itemIndexes: [7] }, args.checked);
    }
}