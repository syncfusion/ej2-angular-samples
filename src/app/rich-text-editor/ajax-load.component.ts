/**
 * Rich Text Editor Ajax Content Sample
 */
import { Component, ViewChild } from '@angular/core';
import { Fetch } from '@syncfusion/ej2-base';
import { RichTextEditorComponent, ToolbarService, LinkService, ImageService, HtmlEditorService } from '@syncfusion/ej2-angular-richtexteditor';
@Component({
    selector: 'control-content',
    templateUrl: 'ajax-load.html',
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService]
})
export class AjaxLoadComponent {
    @ViewChild('ajaxLoad')
    public rteObj: RichTextEditorComponent;
    public onCreate(): void {
        const fetch: Fetch = new Fetch('./assets/rich-text-editor/ajax-content.html', 'GET');
        const rte: RichTextEditorComponent = this.rteObj;
        fetch.send().then((data: any): void => {
            rte.value = data;
        });
    }
}