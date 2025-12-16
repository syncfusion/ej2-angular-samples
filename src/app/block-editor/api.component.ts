import { Component, ViewEncapsulation, ViewChild, Inject, AfterViewInit } from '@angular/core';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { BlockModel, BlockEditorModule, BlockEditor, FocusEventArgs } from '@syncfusion/ej2-angular-blockeditor';
import { CheckBoxModule, ChangeEventArgs } from '@syncfusion/ej2-angular-buttons';
import blockData from './blockData.json';
import { DialogUtility } from '@syncfusion/ej2-popups'; // Predefined dialogs

@Component({
    selector: 'control-content',
    templateUrl: 'api.html',
    styleUrls: ['api.component.css'],   
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [BlockEditorModule, CheckBoxModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class BlockEditorAPIComponent implements AfterViewInit {
    @ViewChild('apiBlockEditor')
    public apiBlockEditor: BlockEditor;
    public blockDataAPI: BlockModel[] = blockData.blockDataAPI as BlockModel[];
    public id: string;

    ngAfterViewInit(): void {
       // Helper: escape HTML to display raw content safely inside dialog
        const escapeHtml = (html: string): string =>
          html
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');

        // Reusable predefined dialog helper (single place to show alerts)
        const openDialog = (title: string, content: string, isHtml?: boolean): void => {
          let updatedContent = isHtml ? escapeHtml(content) : content;
          let dlg = DialogUtility.alert({
            title,
            content: `<pre style="white-space: pre-wrap;">${updatedContent}</pre>`,
            okButton: { text: 'OK', click: () => dlg.close() },
            isModal: true,
            position: { X: 'center', Y: 'center' },
            height: "400px",
            width: "500px",
            closeOnEscape: true
          });
        };

        // Sample action: show editor data as JSON using the centralized dialog
        document.getElementById('getJson')?.addEventListener('click', () => {
            const jsonData = this.apiBlockEditor.getDataAsJson();
            openDialog('JSON Data', JSON.stringify(jsonData, null, 2));
        });

         // Sample action: show editor HTML as text (escaped) using the same dialog
        document.getElementById('getHtml')?.addEventListener('click', () => {
            const htmlData = this.apiBlockEditor.getDataAsHtml();
            openDialog('Editor HTML', htmlData, true);
        });

        // Sample action: show a compact dialog with the block count
        document.getElementById('getBlockCount')?.addEventListener('click', () => {
            let dialog = DialogUtility.alert({
                title:"Block Count",
              content: `<div>Total blocks: <b>${this.apiBlockEditor.getBlockCount()}</b></div>`,
              okButton: { text: 'OK', click: () => dialog.close() },
              isModal: true,
              position: { X: 'center', Y: 'center' },
              width: "250px",
              closeOnEscape: true
            });
        });

        // Sample action: invoke core editor API from the property panel
        document.getElementById('selectall')?.addEventListener('click', () => {
            this.apiBlockEditor.selectAllBlocks();
        });

        document.getElementById('print')?.addEventListener('click', () => {
            this.apiBlockEditor.print();
        });
    }

    // Toggle read-only mode from the sample panel
    public readOnlyChange(args: ChangeEventArgs): void {
        this.apiBlockEditor.readOnly = args.checked;
    }

    // Toggle drag-and-drop from the sample panel
    public enableDragDropChange(args: ChangeEventArgs): void {
        this.apiBlockEditor.enableDragAndDrop = args.checked;
    }

    // Track focused block id for JSON export
    public onFocus(event: FocusEventArgs): void {
        this.id = event.blockId;
    }
}