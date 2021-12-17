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
export class OnlineHtmlEditorComponent implements OnInit {
    @ViewChild('defaultRTE', { static: false })
    public rteObj: RichTextEditorComponent;

    public myCodeMirror: any;
    public srcArea: HTMLElement;
    public textArea: HTMLElement;

    public tools: ToolbarModule = {
        type: ToolbarType.MultiRow,
        items: ['Bold', 'Italic', 'Underline', 'StrikeThrough',
            'FontName', 'FontSize', 'FontColor', 'BackgroundColor',
            'LowerCase', 'UpperCase','SuperScript', 'SubScript', '|',
            'Formats', 'Alignments', 'NumberFormatList', 'BulletFormatList',
            'Outdent', 'Indent', '|',
            'CreateTable', 'CreateLink', 'Image', 'FileManager', '|', 'ClearFormat', 'Print',
            'SourceCode', 'FullScreen', '|', 'Undo', 'Redo']
    };

    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['online-html-editor.css'];
    }

    ngOnInit() {
        // Add the styles and script referrence for code-mirror.
        let link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('type', 'text/css');
        link.setAttribute('href', 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.3.0/codemirror.min.css');
        document.head.appendChild(link);

        let elem1 = document.createElement('script');
        elem1.src = 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.3.0/codemirror.js';
        elem1.type = 'text/javascript';
        document.head.appendChild(elem1);

        let elem2 = document.createElement('script');
        elem2.src = 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.3.0/mode/xml/xml.js';
        elem2.type = 'text/javascript';
        document.head.appendChild(elem2);
        let URL = location.href.replace(location.search,'');
        document.getElementById('newTab').setAttribute('href', URL.split('#')[0] + 'rich-text-editor/online-html-editor');
    }

    public updateHtmlValue(): void {
        this.textArea.innerHTML = this.myCodeMirror.getValue();
    }

    public renderCodeMirror(mirrorView: HTMLElement, content: string): void {
        if (content) {
            this.myCodeMirror = CodeMirror(mirrorView, {
                value: content,
                lineNumbers: true,
                mode: 'text/html',
                lineWrapping: true,
            });
        }
    }

    public onCreate(): void {
        setTimeout(() => {
            this.rteObj.refreshUI();
            this.updateValue();
            this.textArea = this.rteObj.contentModule.getEditPanel() as HTMLElement;
            this.srcArea = document.querySelector('.source-code');
            if (this.srcArea) {
                this.srcArea.addEventListener('keyup', this.updateHtmlValue.bind(this));
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
        this.renderCodeMirror(srcViewEle, this.rteObj.value);
    }
}
