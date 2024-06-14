/**
 * Rich Text Editor - Online HTML Editor Sample
 */
import { Component, ViewChild, ViewEncapsulation, OnInit, Inject } from '@angular/core';
import { createElement, KeyboardEventArgs, Browser } from '@syncfusion/ej2-base';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { ToolbarService, LinkService, ImageService, TableService, HtmlEditorService, RichTextEditorModule, QuickToolbarService, PasteCleanupService, CountService, VideoService, AudioService, FormatPainterService, EmojiPickerService } from '@syncfusion/ej2-angular-richtexteditor';
import { RichTextEditorComponent, ToolbarType } from '@syncfusion/ej2-angular-richtexteditor';
import { SplitterComponent, SplitterModule } from '@syncfusion/ej2-angular-layouts';
import * as CodeMirror from 'codemirror';
import { SBActionDescriptionComponent } from '../common/adp.component';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css.js';
import 'codemirror/mode/htmlmixed/htmlmixed.js';

@Component({
    selector: 'control-content',
    encapsulation: ViewEncapsulation.None,
    templateUrl: 'online-html-editor.html',
    styleUrls: ['online-html-editor.css'],
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, TableService, QuickToolbarService, PasteCleanupService, CountService, VideoService, AudioService, FormatPainterService, EmojiPickerService],
    standalone: true,
    imports: [SBActionDescriptionComponent, SplitterModule, RichTextEditorModule]
})
export class OnlineHtmlEditorComponent {
    @ViewChild('defaultRTE', { static: false })
    public rteObj: RichTextEditorComponent;
    @ViewChild('splitterInstance') splitterObj: SplitterComponent;
    public myCodeMirror: any;
    public srcArea: HTMLElement;
    public textArea: HTMLElement;

    public tools: ToolbarModule = {
        type: ToolbarType.Expand,
        enableFloating :false,
        items: ['Bold', 'Italic', 'Underline', 'StrikeThrough',
            'FontName', 'FontSize', 'FontColor', 'BackgroundColor',
            'Formats', 'Alignments', 'Blockquote', 'OrderedList', 'UnorderedList',
            'Outdent', 'Indent',
            'CreateLink', 'Image', 'Video', 'Audio', 'CreateTable', '|', 'FormatPainter', 'ClearFormat',
            '|', 'EmojiPicker', 'SourceCode', '|', 'Undo', 'Redo'
        ]
    };

    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['online-html-editor.css'];
    }

    public updateHtmlValue(): void {
        this.rteObj.value = this.myCodeMirror.getValue();
        this.rteObj.dataBind();
    }

    public onResizing(): void {
        this.rteObj.refreshUI();
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
                this.srcArea.addEventListener('keyup', (e: KeyboardEventArgs) => {
                  this.updateHtmlValue();
                });
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
    public updateOrientation(): void {
        if (Browser.isDevice) {
            this.splitterObj.orientation = 'Vertical';
            (document.body.querySelector('.heading') as HTMLElement).style.width = 'auto';
        }
    }
}
