/**
 * Rich Text Editor Resizable Sample
 */
import { Component } from '@angular/core';
import { ToolbarService, LinkService, ImageService, ResizeService, HtmlEditorService } from '@syncfusion/ej2-angular-richtexteditor';
@Component({
    selector: 'control-content',
    templateUrl: 'resize-editor.html',
    styleUrls: ['resizable.css'],
    providers: [ToolbarService, LinkService, ImageService, ResizeService, HtmlEditorService]
})
export class ResizeComponent {
}