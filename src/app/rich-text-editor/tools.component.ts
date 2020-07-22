/**
 * Rich Text Editor Overview Sample
 */
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { ToolbarService, LinkService, ImageService, HtmlEditorService, RichTextEditorComponent, TableService } from '@syncfusion/ej2-angular-richtexteditor';
import { createElement, addClass, removeClass, Browser } from '@syncfusion/ej2-base';
import * as CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css.js';
import 'codemirror/mode/htmlmixed/htmlmixed.js';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';

@Component({
    selector: 'control-content',
    templateUrl: 'tools.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['over-view.css'],
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, TableService]
})
export class FullFeatureComponent {

    @ViewChild('toolsRTE')
    public rteObj: RichTextEditorComponent;

    public tools: ToolbarModule = {
        items: ['Bold', 'Italic', 'Underline', 'StrikeThrough',
            'FontName', 'FontSize', 'FontColor', 'BackgroundColor',
            'LowerCase', 'UpperCase','SuperScript', 'SubScript', '|',
            'Formats', 'Alignments', 'OrderedList', 'UnorderedList',
            'Outdent', 'Indent', '|',
            'CreateTable', 'CreateLink', 'Image', '|', 'ClearFormat', 'Print',
            'SourceCode', 'FullScreen', '|', 'Undo', 'Redo']
    };

    public maxLength = 1000;
    public textArea: HTMLElement;
    public myCodeMirror: any;

    ngAfterViewInit(): void {
        const rteObj: RichTextEditorComponent = this.rteObj;
        setTimeout(() => { this.textArea = rteObj.contentModule.getEditPanel() as HTMLElement; }, 600);
    }
    public mirrorConversion(e?: any): void {
        const id: string = this.rteObj.getID() + 'mirror-view';
        let mirrorView: HTMLElement = this.rteObj.element.querySelector('#' + id) as HTMLElement;
        const charCount: HTMLElement = this.rteObj.element.querySelector('.e-rte-character-count') as HTMLElement;
        if (e.targetItem === 'Preview') {
            this.textArea.style.display = 'block';
            mirrorView.style.display = 'none';
            this.textArea.innerHTML = this.myCodeMirror.getValue();
            charCount.style.display = 'block';
        } else {
            if (!mirrorView) {
                mirrorView = createElement('div', { className: 'e-content' });
                mirrorView.id = id;
                this.textArea.parentNode.appendChild(mirrorView);
            } else {
                mirrorView.innerHTML = '';
            }
            this.textArea.style.display = 'none';
            mirrorView.style.display = 'block';
            this.renderCodeMirror(mirrorView, this.rteObj.value);
            charCount.style.display = 'none';
        }
    }

    public renderCodeMirror(mirrorView: HTMLElement, content: string): void {
        this.myCodeMirror = CodeMirror(mirrorView, {
            value: content,
            lineNumbers: true,
            mode: 'text/html',
            lineWrapping: true,

        });
    }
    public handleFullScreen(e: any): void {
        const sbCntEle: HTMLElement = document.querySelector('.sb-content.e-view');
        const sbHdrEle: HTMLElement = document.querySelector('.sb-header.e-view');
        const leftBar: HTMLElement = document.querySelector('#left-sidebar');
        if (e.targetItem === 'Maximize') {
            if (Browser.isDevice && Browser.isIos) {
                addClass([sbCntEle, sbHdrEle], ['hide-header']);
            }
            addClass([leftBar], ['e-close']);
            removeClass([leftBar], ['e-open']);
        } else if (e.targetItem === 'Minimize') {
            if (Browser.isDevice && Browser.isIos) {
                removeClass([sbCntEle, sbHdrEle], ['hide-header']);
            }
            removeClass([leftBar], ['e-close']);
            if (!Browser.isDevice) {
                addClass([leftBar], ['e-open']);
            }
        }
    }
    public actionCompleteHandler(e: any): void {
        if (e.targetItem && (e.targetItem === 'SourceCode' || e.targetItem === 'Preview')) {
            (this.rteObj.sourceCodeModule.getPanel() as HTMLTextAreaElement).style.display = 'none';
            this.mirrorConversion(e);
        } else {
            setTimeout(() => { this.rteObj.toolbarModule.refreshToolbarOverflow(); }, 400);
        }
    }
}
