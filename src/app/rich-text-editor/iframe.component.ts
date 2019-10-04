/**
 * RTE Iframe Sample
 */
import { Component, ViewChild } from '@angular/core';
import { addClass, removeClass, Browser } from '@syncfusion/ej2-base';
import { ToolbarService, LinkService, ImageService, HtmlEditorService, RichTextEditorComponent, IFrameSettingsModel } from '@syncfusion/ej2-angular-richtexteditor';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
@Component({
    selector: 'control-content',
    templateUrl: 'iframe.html',
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService]
})
export class IFrameComponent {

    @ViewChild('iframeRTE')
    private iframeRTE: RichTextEditorComponent;

    public tools: ToolbarModule = {
        items: ['Bold', 'Italic', 'Underline', 'StrikeThrough',
        'FontName', 'FontSize', 'FontColor', 'BackgroundColor',
        'LowerCase', 'UpperCase','SuperScript', 'SubScript', '|',
        'Formats', 'Alignments', 'OrderedList', 'UnorderedList',
        'Outdent', 'Indent', '|',
        'CreateTable', 'CreateLink', 'Image', '|', 'ClearFormat', 'Print',
        'SourceCode', 'FullScreen', '|', 'Undo', 'Redo'
    ]
    };

    public iframe: IFrameSettingsModel = { enable: true };
    public height: number = 500;

    public handleFullScreen(e: any) {
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

    public actionCompleteHandler(e: any) {
        setTimeout(() => { this.iframeRTE.toolbarModule.refreshToolbarOverflow(); }, 400);
    }
}
