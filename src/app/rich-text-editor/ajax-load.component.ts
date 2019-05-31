/**
 * RTE Ajax Content Sample
 */
import { Component, ViewChild } from '@angular/core';
import { Ajax } from '@syncfusion/ej2-base';
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
        let ajax: Ajax = new Ajax('./assets/rich-text-editor/ajax-content.html', 'GET', false);
        let rte: RichTextEditorComponent = this.rteObj;
        ajax.send().then((data: any): void => {
            rte.value = data;
            rte.dataBind();
        });
    }
}