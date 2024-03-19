/**
 * Rich Text Editor Ajax Content Sample
 */
import { Component, ViewChild } from '@angular/core';
import { Fetch } from '@syncfusion/ej2-base';
import { RichTextEditorComponent, ToolbarService, LinkService, ImageService, HtmlEditorService, RichTextEditorModule, QuickToolbarService, PasteCleanupService, VideoService, AudioService, TableService } from '@syncfusion/ej2-angular-richtexteditor';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
@Component({
    selector: 'control-content',
    templateUrl: 'ajax-load.html',
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, QuickToolbarService, PasteCleanupService, VideoService, AudioService, TableService],
    standalone: true,
    imports: [SBActionDescriptionComponent, RichTextEditorModule, SBDescriptionComponent]
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