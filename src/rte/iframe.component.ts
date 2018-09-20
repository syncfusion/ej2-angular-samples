/**
 * RTE Iframe Sample
 */
import { Component, ViewChild } from '@angular/core';
import { addClass, removeClass, Browser } from '@syncfusion/ej2-base';
import { ToolbarService, LinkService, ImageService, HtmlEditorService, RichTextEditorComponent } from '@syncfusion/ej2-angular-richtexteditor';
@Component({
    selector: 'control-content',
    templateUrl: 'iframe.html',
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService]
})
export class IFrameComponent {
    @ViewChild('iframeRTE') iframeRTE: RichTextEditorComponent;
    public tools: object = {
        items: ['Bold', 'Italic', 'Underline', 'StrikeThrough',
        'FontName', 'FontSize', 'FontColor', 'BackgroundColor',
        'LowerCase', 'UpperCase', '|',
        'Formats', 'Alignments', 'OrderedList', 'UnorderedList',
        'Outdent', 'Indent', '|',
        'CreateLink', 'Image', '|', 'ClearFormat', 'Print',
        'SourceCode', 'FullScreen', '|', 'Undo', 'Redo']
    };
    public iframe: object = { enable: true };
    public height: number = 500;
    public handleFullScreen(e: any) {
        let leftBar: HTMLElement = document.querySelector('#left-sidebar');
        let transformElement: HTMLElement = document.querySelector('.sample-browser.e-view');
        if (e.targetItem === 'Maximize') {
            addClass([leftBar], ['e-close']);
            removeClass([leftBar], ['e-open']);
            transformElement.style.transform = 'inherit';
        } else if (e.targetItem === 'Minimize') {
            removeClass([leftBar], ['e-close']);
            if (!Browser.isDevice) {
            addClass([leftBar], ['e-open']); }
            transformElement.style.transform = 'translateX(0px)';
        }
    };

    public actionCompleteHandler(e: any) {
        setTimeout(() => { this.iframeRTE.toolbarModule.refreshToolbarOverflow(); }, 400);
    }
}