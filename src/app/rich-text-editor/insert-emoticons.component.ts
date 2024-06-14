/**
 * Rich Text Editor Custom-Toolbar Sample
 */
import { Component, ViewChild, ViewEncapsulation, ElementRef } from '@angular/core';
import { ToolbarService, NodeSelection, LinkService, ImageService, ToolbarSettingsModel, EmojiPickerService, RichTextEditorModule, PasteCleanupService, VideoService, AudioService, TableService } from '@syncfusion/ej2-angular-richtexteditor';
import { RichTextEditorComponent, HtmlEditorService, QuickToolbarService } from '@syncfusion/ej2-angular-richtexteditor';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'control-content',
    templateUrl: 'insert-emoticons.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['style.css'],
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, QuickToolbarService, EmojiPickerService, PasteCleanupService, VideoService, AudioService, TableService],
    standalone: true,
    imports: [SBActionDescriptionComponent, RichTextEditorModule, SBDescriptionComponent]
})

export class InsertEmoticonsComponent {

    @ViewChild('emojiPickerRTE')
    public emojiPickerRTE: RichTextEditorComponent;

    public toolbarSettings: ToolbarSettingsModel = {
        items: ['Bold', 'Italic', 'Underline', '|', 'Formats', 'Alignments', 'Blockquote', 'OrderedList',
        'UnorderedList', '|', 'CreateLink', 'Image', '|', 'SourceCode', 'EmojiPicker', '|', 'Undo', 'Redo'
    ]
    };
}
