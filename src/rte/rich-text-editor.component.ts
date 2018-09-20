/**
 * RTE Default Functionality Sample
 */
import { Component } from '@angular/core';
import { ToolbarService, LinkService, ImageService, HtmlEditorService } from '@syncfusion/ej2-angular-richtexteditor';
@Component({
    selector: 'control-content',
    templateUrl: 'rich-text-editor.html',
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService]
})
export class DefaultRTEComponent {
}