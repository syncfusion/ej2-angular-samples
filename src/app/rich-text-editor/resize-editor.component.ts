/**
 * Rich Text Editor Resizable Sample
 */
import { Component } from '@angular/core';
import { ToolbarService, LinkService, ImageService, ResizeService, HtmlEditorService, RichTextEditorModule, QuickToolbarService, PasteCleanupService, VideoService, AudioService, TableService } from '@syncfusion/ej2-angular-richtexteditor';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
@Component({
    selector: 'control-content',
    templateUrl: 'resize-editor.html',
    styleUrls: ['resizable.css'],
    providers: [ToolbarService, LinkService, ImageService, ResizeService, HtmlEditorService,QuickToolbarService, PasteCleanupService, VideoService, AudioService, TableService],
    standalone: true,
    imports: [SBActionDescriptionComponent, RichTextEditorModule, SBDescriptionComponent]
})
export class ResizeComponent {
}