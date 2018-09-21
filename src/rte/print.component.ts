/**
 * RTE Print Sample
 */
import { Component } from '@angular/core';
import { ToolbarService, LinkService, ImageService, HtmlEditorService } from '@syncfusion/ej2-angular-richtexteditor';
@Component({
    selector: 'control-content',
    templateUrl: 'print.html',
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService]
})
export class PrintComponent {
    public tools: object = {
       items: ['Bold',  'Italic',  'Underline',  '|',  'Formats',  'Alignments',
       'OrderedList',  'UnorderedList',  '|',  'CreateLink',  'Image',  '|',  'SourceCode',  'Undo',  'Redo', 'Print']
    };
}