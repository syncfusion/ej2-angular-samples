/**
 * RTE Custom-Toolbar Sample
 */
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { ToolbarService, NodeSelection, LinkService, ImageService } from '@syncfusion/ej2-angular-richtexteditor';
import { RichTextEditorComponent, HtmlEditorService, QuickToolbarService } from '@syncfusion/ej2-angular-richtexteditor';
import { Dialog } from '@syncfusion/ej2-popups';

@Component({
    selector: 'control-content',
    templateUrl: 'custom-toolbar.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['style.css'],
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, QuickToolbarService]
})

export class CustomToolsComponent {
    @ViewChild('customRTE')
    public rteObj: RichTextEditorComponent;
    @ViewChild('Dialog')
    public dialogObj: Dialog;
    public selection: NodeSelection = new NodeSelection();
    public ranges: Range;
    public tools: object = {
        items: ['Bold', 'Italic', 'Underline', '|', 'Formats', 'Alignments', 'OrderedList',
        'UnorderedList', '|', 'CreateLink', 'Image', '|', 'SourceCode',
        {
            tooltipText: 'Insert Symbol',
            template: '<button class="e-tbar-btn e-btn" tabindex="-1" id="custom_tbar"  style="width:100%">'
                      + '<div class="e-tbar-btn-text" style="font-weight: 500;"> Ω</div></button>'
        }, '|', 'Undo', 'Redo'
        ]
    };
    public dlgButtons: any = [{ buttonModel: { content: "Insert", isPrimary: true }, click: this.onInsert.bind(this) },
    { buttonModel: { content: 'Cancel' }, click: this.dialogOverlay.bind(this) }];
    public header: string = 'Special Characters';
    public target: HTMLElement = document.getElementById('rteSection');
    public height: any = '350px';
    public onCreate(): void {
        let customBtn: HTMLElement = document.getElementById('custom_tbar') as HTMLElement;
        this.dialogObj.target = document.getElementById('rteSection');
        customBtn.onclick = (e: Event) => {
            this.rteObj.focusIn();
            this.ranges = this.selection.getRange(document);
            this.dialogObj.width = this.rteObj.element.offsetWidth * 0.5;
            this.dialogObj.dataBind();
            this.dialogObj.show();
        };
    }
    public dialogCreate(): void {
        let dialogCtn: HTMLElement = document.getElementById('rteSpecial_char');
        dialogCtn.onclick = (e: Event) => {
            let target: HTMLElement = e.target as HTMLElement;
            let activeEle: Element = this.dialogObj.element.querySelector('.char_block.e-active');
            if (target.classList.contains('char_block')) {
                target.classList.add('e-active');
                if (activeEle) {
                    activeEle.classList.remove('e-active');
                }
            }
        };
    }
    public onInsert(): void {
        let activeEle: Element = this.dialogObj.element.querySelector('.char_block.e-active');
        if (activeEle) {
            if (this.rteObj.formatter.getUndoRedoStack().length === 0) {
                this.rteObj.formatter.saveData();
            }
            this.rteObj.executeCommand('insertText', activeEle.textContent);
            this.rteObj.formatter.saveData();
            (this.rteObj as any).formatter.enableUndo(this.rteObj);
        }
        this.dialogOverlay();
    }

    public dialogOverlay(): void {
        let activeEle: Element = this.dialogObj.element.querySelector('.char_block.e-active');
        if (activeEle) {
            activeEle.classList.remove('e-active');
        }
        this.dialogObj.hide();
    }
}