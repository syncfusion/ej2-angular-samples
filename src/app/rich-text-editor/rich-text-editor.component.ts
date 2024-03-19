/**
 * Rich Text Editor Default Functionality Sample
 */
import { Component } from '@angular/core';
import { ToolbarService, LinkService, ImageService, HtmlEditorService, RichTextEditorModule, QuickToolbarService, VideoService, AudioService, TableService, PasteCleanupService } from '@syncfusion/ej2-angular-richtexteditor';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
@Component({
    selector: 'control-content',
    templateUrl: 'rich-text-editor.html',
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, QuickToolbarService, VideoService, AudioService, TableService, PasteCleanupService],
    standalone: true,
    imports: [SBActionDescriptionComponent, RichTextEditorModule, SBDescriptionComponent]
})
export class DefaultRTEComponent {
}
