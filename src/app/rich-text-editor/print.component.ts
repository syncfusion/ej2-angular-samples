/**
 * Rich Text Editor Print Sample
 */
import { Component } from '@angular/core';
import { ToolbarService, LinkService, ImageService, HtmlEditorService } from '@syncfusion/ej2-angular-richtexteditor';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
@Component({
    selector: 'control-content',
    templateUrl: 'print.html',
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService]
})
export class PrintComponent {
    public tools: ToolbarModule = {
        items: ['Bold', 'Italic', 'Underline', '|', 'Formats', 'Alignments',
            'OrderedList', 'UnorderedList', '|', 'CreateLink', 'Image', '|', 'SourceCode', 'Undo', 'Redo', 'Print']
    };
}
