/**
 * Rich Text Editor - Online HTML Editor Sample
 */
import { Component, ViewChild, ViewEncapsulation, OnInit, Inject } from '@angular/core';
import { createElement } from '@syncfusion/ej2-base';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { ToolbarService, LinkService, ImageService, TableService, HtmlEditorService } from '@syncfusion/ej2-angular-richtexteditor';
import { RichTextEditorComponent, ToolbarType } from '@syncfusion/ej2-angular-richtexteditor';
import * as CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css.js';
import 'codemirror/mode/htmlmixed/htmlmixed.js';

@Component({
    selector: 'control-content',
    encapsulation: ViewEncapsulation.None,
    templateUrl: 'online-html-editor.html',
    styleUrls: ['online-html-editor.css'],
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, TableService]
})
export class OnlineHtmlEditorComponent {
    @ViewChild('defaultRTE', { static: false })
    public rteObj: RichTextEditorComponent;

    public myCodeMirror: any;
    public srcArea: HTMLElement;
    public textArea: HTMLElement;

    public tools: ToolbarModule = {
        type: ToolbarType.Expand,
        enableFloating :false,
        items: ['Bold', 'Italic', 'Underline', 'StrikeThrough',
            'FontName', 'FontSize', 'FontColor', 'BackgroundColor',
            'Formats', 'Alignments', 'NumberFormatList', 'BulletFormatList',
            'Outdent', 'Indent',
            'CreateTable', 'CreateLink', 'Image', 'FileManager', '|', 'ClearFormat', 'Print',
            'SourceCode', 'FullScreen', '|', 'Undo', 'Redo']
    };

    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['online-html-editor.css'];
    }

    public updateHtmlValue(): void {
        this.textArea.innerHTML = this.myCodeMirror.getValue();
    }

    public renderCodeMirror(mirrorView: HTMLElement, content: string): void {
        this.myCodeMirror = CodeMirror(mirrorView, {
            value: content,
            lineNumbers: true,
            mode: 'text/html',
            lineWrapping: true,
        });
    }

    public onCreate(): void {
        setTimeout(() => {
            this.rteObj.refreshUI();
            this.updateValue();
            this.textArea = this.rteObj.contentModule.getEditPanel() as HTMLElement;
            this.srcArea = document.querySelector('.source-code');
            if (this.srcArea) {
                this.srcArea.addEventListener('keyup', this.updateHtmlValue);
            }
        }, 400);
    }

    public onChange(): void {
        this.updateValue();
    }

    public updateValue(): void {
        let mirrorView: HTMLElement = document.querySelector('#src-view');
        if (!mirrorView) {
          mirrorView = createElement('div', {
            className: 'e-content'
          });
          mirrorView.id = 'src-view';
          let srcCodeElement: HTMLElement = document.querySelector('.source-code');
          if (srcCodeElement) {
            srcCodeElement.appendChild(mirrorView);
          }
          mirrorView.innerHTML = '';
          mirrorView.style.display = 'block';
        }
        let srcViewEle: HTMLElement = document.querySelector('#src-view');
        let codemirrorEle: HTMLElement = document.querySelector('.CodeMirror-wrap');
        if (codemirrorEle) {
          codemirrorEle.remove();
        }
        if(this.rteObj.value){
        this.renderCodeMirror(srcViewEle, this.rteObj.value);
        }
    }
}
