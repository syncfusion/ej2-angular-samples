/**
 * Rich Text Editor Markdown Custom Format Sample
 */

import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { RichTextEditorComponent, MarkdownFormatter, ToolbarService, EditorMode, RichTextEditorModule, TableService } from '@syncfusion/ej2-angular-richtexteditor';
import { LinkService, ImageService, MarkdownEditorService } from '@syncfusion/ej2-angular-richtexteditor';
import { createElement, KeyboardEventArgs } from '@syncfusion/ej2-base';
import * as Marked from 'marked';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'control-content',
    templateUrl: 'custom-format.html',
    styleUrls: ['markdown-preview.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [ToolbarService, LinkService, ImageService, MarkdownEditorService, TableService],
    standalone: true,
    imports: [SBActionDescriptionComponent, RichTextEditorModule, SBDescriptionComponent]
})
export class MarkdownCustomComponent {

    @ViewChild('mdCustom')
    public rteObj: RichTextEditorComponent;

    public textArea: HTMLTextAreaElement;
    public mdsource: HTMLElement;
    public placeholder: string = 'Enter the text here...';
    public tools: ToolbarModule = {
        items: ['Bold', 'Italic', 'StrikeThrough', '|',
            'Formats', 'Blockquote', 'OrderedList', 'UnorderedList', '|',
            'CreateLink', 'Image', '|',
            {
                tooltipText: 'Preview',
                command: 'Custom',
                subCommand: 'HTMLPreview',
                template:
                    '<button id="preview-code" class="e-tbar-btn e-control e-btn e-icon-btn" aria-label="Preview Code">' +
                    '<span class="e-btn-icon e-eye e-icons"></span></button>',
            },
            {
                tooltipText: 'CodeView',
                subCommand: 'MDCodeView',
                template:
                    '<button id="preview-code" class="e-tbar-btn e-control e-btn e-icon-btn" aria-label="Code View">' +
                    '<span class="e-btn-icon e-code-view e-icons"></span></button>',
            }, 'Undo', 'Redo']
    };
    public mode: EditorMode = 'Markdown';
    public formatter: MarkdownFormatter = new MarkdownFormatter({
        listTags: { 'OL': '2. ', 'UL': '+ ' },
        formatTags: {
            'Blockquote': '> '
        },
        selectionTags: { 'Bold': '__', 'Italic': '_' }

    });

    public toolbarClick(e) {
            this.mdsource = document.getElementById('preview-code');
            if (e.item.subCommand === 'HTMLPreview') {
                this.rteObj.toolbarModule.baseToolbar.toolbarObj.hideItem(12, true);
                this.rteObj.toolbarModule.baseToolbar.toolbarObj.hideItem(13, false);
                this.fullPreview();
            }
            if (e.item.subCommand === 'MDCodeView') {
                this.rteObj.toolbarModule.baseToolbar.toolbarObj.hideItem(12, false);
                this.rteObj.toolbarModule.baseToolbar.toolbarObj.hideItem(13, true);
                this.fullPreview();
            }
    }

    public onCreate(): void {
        this.textArea = this.rteObj.contentModule.getEditPanel() as HTMLTextAreaElement;
        this.textArea.addEventListener('keyup', (e: KeyboardEventArgs) => {
            this.markdownConversion();
            this.rteObj.toolbarModule.baseToolbar.toolbarObj.hideItem(13,true);
        });
        this.mdsource = document.getElementById('preview-code');
        this.mdsource.addEventListener('click', (e: MouseEvent) => {
            this.toolbarClick(e);
            if ((e.target as HTMLElement).parentElement.classList.contains('e-active')) {
                this.rteObj.disableToolbarItem(['Bold', 'Italic', 'StrikeThrough', 'Formats', 'Blockquote', 'OrderedList',
                    'UnorderedList', 'CreateLink', 'Image']);
            } else {
                this.rteObj.enableToolbarItem(['Bold', 'Italic', 'StrikeThrough', 'Formats', 'Blockquote', 'OrderedList',
                    'UnorderedList', 'CreateLink', 'Image']);
            }
        });
    }
    public markdownConversion(): void {
        if (this.mdsource.classList.contains('e-active')) {
            const id: string = this.rteObj.getID() + 'html-view';
            const htmlPreview: Element = this.rteObj.element.querySelector('#' + id);
            htmlPreview.innerHTML = Marked.parse((this.rteObj.contentModule.getEditPanel() as HTMLTextAreaElement).value);
        }
    }
    public fullPreview(): void {
        const id: string = this.rteObj.getID() + 'html-preview';
        let htmlPreview: HTMLElement = this.rteObj.element.querySelector('#' + id) as HTMLElement;
        if (this.mdsource.classList.contains('e-active')) {
            this.mdsource.classList.remove('e-active');
            this.textArea.style.display = 'block';
            htmlPreview.style.display = 'none';
        } else {
            this.mdsource.classList.add('e-active');
            if (!htmlPreview) {
                htmlPreview = createElement('div', { className: 'e-content e-pre-source' });
                htmlPreview.id = id;
                this.textArea.parentNode.appendChild(htmlPreview);
            }
            this.textArea.style.display = 'none';
            htmlPreview.style.display = 'block';
            htmlPreview.innerHTML = Marked.parse((this.rteObj.contentModule.getEditPanel() as HTMLTextAreaElement).value);
        }
    }
}
