/**
 * Rich Text Editor Custom-Toolbar Sample
 */
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { Browser } from '@syncfusion/ej2-base';
import { ToolbarService, NodeSelection, LinkService, ImageService, RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor';
import { RichTextEditorComponent, HtmlEditorService, QuickToolbarService, PasteCleanupService, VideoService, AudioService, TableService } from '@syncfusion/ej2-angular-richtexteditor';
import { Dialog } from '@syncfusion/ej2-popups';
import { ToolbarSettingsModel } from '@syncfusion/ej2-dropdowns';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { ButtonComponent, ButtonModel } from '@syncfusion/ej2-angular-buttons';
import { SBDescriptionComponent } from '../common/dp.component';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'control-content',
    templateUrl: 'insert-special-characters.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['style.css'],
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, QuickToolbarService, PasteCleanupService, VideoService, AudioService, TableService],
    standalone: true,
    imports: [SBActionDescriptionComponent, RichTextEditorModule, DialogModule, SBDescriptionComponent]
})

export class InsertSpecialCharactersComponent {

    @ViewChild('customRTE')
    public rteObj: RichTextEditorComponent;

    @ViewChild('Dialog')
    public dialogObj: Dialog;

    public selection: NodeSelection = new NodeSelection();
    public range: Range;
    public customBtn: HTMLElement;
    public dialogCtn: HTMLElement;
    public saveSelection: NodeSelection;

    public tools: ToolbarModule = {
        items: ['Bold', 'Italic', 'Underline', '|', 'Formats', 'Alignments', 'Blockquote', 'OrderedList',
            'UnorderedList', '|', 'CreateLink', 'Image', '|', 'SourceCode',
            {
                tooltipText: 'Insert Symbol',
                template: '<button class="e-tbar-btn e-btn" tabindex="-1" id="custom_tbar"  style="width:100%">'
                    + '<div class="e-tbar-btn-text" style="font-weight: 400;"> Ω</div></button>'
            }, '|', 'Undo', 'Redo'
        ]
    };
    public dlgButtons: { [key: string]: ButtonModel }[] = [
        { buttonModel: { content: 'Insert', isPrimary: true }, click: this.onInsert.bind(this) },
        { buttonModel: { content: 'Cancel' }, click: this.dialogOverlay.bind(this) }
    ];
    public header = 'Special Characters';
    public target: HTMLElement = document.getElementById('rteSection');
    public height: string | number = '350px';
    public onCreate(): void {
        this.customBtn = document.getElementById('custom_tbar') as HTMLElement;
        this.dialogCtn = document.getElementById('rteSpecial_char') as HTMLElement;
        this.dialogObj.target = document.getElementById('rteSection');
        this.customBtn.onclick = (e: Event) => {
            (this.rteObj.contentModule.getEditPanel() as HTMLElement).focus();
            this.dialogObj.element.style.display = '';
            this.range = this.selection.getRange(document);
            this.saveSelection = this.selection.save(this.range, document);
            this.dialogObj.show();
        };
    }
    public dialogCreate(): void {
        this.dialogCtn = document.getElementById('rteSpecial_char');
        this.dialogCtn.onclick = (e: Event) => {
            const target: HTMLElement = e.target as HTMLElement;
            const activeEle: Element = this.dialogObj.element.querySelector('.char_block.e-active');
            if (target.classList.contains('char_block')) {
                target.classList.add('e-active');
                if (activeEle) {
                    activeEle.classList.remove('e-active');
                }
            }
        };
    }
    public onInsert(): void {
        const activeEle: Element = this.dialogObj.element.querySelector('.char_block.e-active');
        if (activeEle) {
            if (this.rteObj.formatter.getUndoRedoStack().length === 0) {
                this.rteObj.formatter.saveData();
            }
            if (Browser.isDevice && Browser.isIos) {
                this.saveSelection.restore();
            }
            this.rteObj.executeCommand('insertText', activeEle.textContent);
            this.rteObj.formatter.saveData();
            (this.rteObj as any).formatter.enableUndo(this.rteObj);
        }
        this.dialogOverlay();
    }

    public dialogOverlay(): void {
        const activeEle: Element = this.dialogObj.element.querySelector('.char_block.e-active');
        if (activeEle) {
            activeEle.classList.remove('e-active');
        }
        this.dialogObj.hide();
    }

    public actionCompleteHandler(e: any): void {
        if (e.requestType === 'SourceCode') {
        this.rteObj.getToolbar().querySelector('#custom_tbar').parentElement.classList.add('e-overlay');
        } else if (e.requestType === 'Preview') {
        this.rteObj.getToolbar().querySelector('#custom_tbar').parentElement.classList.remove('e-overlay');
        }
    }
}
