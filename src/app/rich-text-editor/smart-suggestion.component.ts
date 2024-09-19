/**
 * Rich Text Editor Mention integration Functionality Sample
 */
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { SlashMenuItemSelectArgs, ToolbarService, SlashMenuService, LinkService, ImageService, RichTextEditorModule, PasteCleanupService, VideoService, AudioService, FormatPainterService, TableService, SlashMenuSettingsModel } from '@syncfusion/ej2-angular-richtexteditor';
import { RichTextEditorComponent, HtmlEditorService, QuickToolbarService, EmojiPickerService } from '@syncfusion/ej2-angular-richtexteditor';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'control-content',
    templateUrl: 'smart-suggestion.html',
    providers: [ToolbarService, LinkService, ImageService, QuickToolbarService, HtmlEditorService, EmojiPickerService, PasteCleanupService, VideoService, AudioService, FormatPainterService, TableService, SlashMenuService],
    standalone: true,
    imports: [SBActionDescriptionComponent, RichTextEditorModule, SBDescriptionComponent]
})
export class SmartSuggestionComponent {
    @ViewChild("slashMenuEditor")
    public slashMenuEditor: RichTextEditorComponent;
    private meetingNotes: string = '<p><strong>Meeting Notes</strong></p><table class="e-rte-table" style="width: 100%; min-width: 0px; height: 150px;"> <tbody> <tr style="height: 20%;"> <td style="width: 50%;"><strong>Attendees</strong></td> <td style="width: 50%;" class=""><br></td> </tr> <tr style="height: 20%;"> <td style="width: 50%;"><strong>Date &amp; Time</strong></td> <td style="width: 50%;"><br></td> </tr> <tr style="height: 20%;"> <td style="width: 50%;"><strong>Agenda</strong></td> <td style="width: 50%;"><br></td> </tr> <tr style="height: 20%;"> <td style="width: 50%;"><strong>Discussed Items</strong></td> <td style="width: 50%;"><br></td> </tr> <tr style="height: 20%;"> <td style="width: 50%;"><strong>Action Items</strong></td> <td style="width: 50%;"><br></td> </tr> </tbody> </table>';

    private signature: string = '<p><br></p><p>Warm regards,</p><p>John Doe<br>Event Coordinator<br>ABC Company</p>';
    public tools: ToolbarModule = {
        items: ['Bold', 'Italic', 'Underline', 'StrikeThrough', 'SuperScript', 'SubScript', '|',
            'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
            'LowerCase', 'UpperCase', '|',
            'Formats', 'Alignments', 'Blockquote', '|', 'NumberFormatList', 'BulletFormatList', '|',
            'Outdent', 'Indent', '|', 'CreateLink', 'Image', 'Video', 'Audio', 'CreateTable', '|', 'FormatPainter', 'ClearFormat',
            '|', 'EmojiPicker', '|',
            'SourceCode', '|', 'Undo', 'Redo']
    };
    public slashMenuSettings: SlashMenuSettingsModel = {
        enable: true,
        items: ['Paragraph', 'Heading 1', 'Heading 2', 'Heading 3', 'Heading 4', 'OrderedList', 'UnorderedList',
            'CodeBlock', 'Blockquote', 'Link', 'Image', 'Video', 'Audio', 'Table', 'Emojipicker',
            {
                text: 'Meeting notes',
                description: 'Insert a meeting note template.',
                iconCss: 'e-icons e-description',
                type: 'Custom',
                command: 'MeetingNotes'
            },
            {
                text: 'Signature',
                description: 'Insert a signature template.',
                iconCss: 'e-icons e-signature',
                type: 'Custom',
                command: 'Signature'
            }
        ]
    };
    public onSlashMenuItemSelect(args: SlashMenuItemSelectArgs) {
        if (args.itemData.command === 'MeetingNotes') {
            this.slashMenuEditor.executeCommand('insertHTML', this.meetingNotes, { undo: true });
        }
        if (args.itemData.command === 'Signature') {
            this.slashMenuEditor.executeCommand('insertHTML', this.signature, { undo: true });
        }
    }
}

