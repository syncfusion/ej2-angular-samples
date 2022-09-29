/**
 * Rich Text Editor Insert Media Sample
 */
import { ToolbarSettingsModel } from '@syncfusion/ej2-angular-richtexteditor';
import { Component } from '@angular/core';
import { ToolbarService, LinkService, ImageService, HtmlEditorService ,AudioService ,VideoService} from '@syncfusion/ej2-angular-richtexteditor';
import { RichTextEditorComponent, IFrameSettingsModel, FileManagerService } from '@syncfusion/ej2-angular-richtexteditor';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';

@Component({
    selector: 'control-content',
    templateUrl: 'insert-media.html',
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService ,AudioService ,VideoService]
})
export class InsertMediaComponent{
    public tools: ToolbarModule = {
        items: ['Bold', 'Italic', 'Underline', '|', 'Formats', 'Alignments', 'OrderedList', 'UnorderedList', '|', 'CreateLink', 'Image', 'Audio', 'Video', '|', 'SourceCode', 'Undo', 'Redo']
    };
}
