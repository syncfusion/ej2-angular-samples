/**
 * Rich Text Editor Custom-Toolbar Sample
 */
import { Component, ViewChild, ViewEncapsulation, ElementRef } from '@angular/core';
import { ToolbarService, NodeSelection, LinkService, ImageService, ToolbarSettingsModel, EmojiPickerService } from '@syncfusion/ej2-angular-richtexteditor';
import { RichTextEditorComponent, HtmlEditorService, QuickToolbarService } from '@syncfusion/ej2-angular-richtexteditor';

@Component({
    selector: 'control-content',
    templateUrl: 'insert-emoticons.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['style.css'],
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, QuickToolbarService, EmojiPickerService]
})

export class InsertEmoticonsComponent {

    @ViewChild('emojiPickerRTE')
    public emojiPickerRTE: RichTextEditorComponent;

    public toolbarSettings: ToolbarSettingsModel = {
        items: ['Bold', 'Italic', 'Underline', '|', 'Formats', 'Alignments', 'OrderedList',
        'UnorderedList', '|', 'CreateLink', 'Image', '|', 'SourceCode', 'EmojiPicker', '|', 'Undo', 'Redo'
    ]
    };
}
