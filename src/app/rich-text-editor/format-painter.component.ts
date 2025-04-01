import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { RichTextEditorComponent, HtmlEditorService, ToolbarService, FormatPainterService, QuickToolbarService, ImageService, LinkService, TableService, ToolbarSettingsModel, RichTextEditorModule, PasteCleanupService, VideoService, AudioService } from '@syncfusion/ej2-angular-richtexteditor';
import { TextBoxComponent, FocusOutEventArgs, TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'control-content',
    templateUrl: 'format-painter.html',
    styleUrls: ['style.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [HtmlEditorService, ToolbarService, FormatPainterService, QuickToolbarService, ImageService, LinkService, TableService, PasteCleanupService, VideoService, AudioService],
    standalone: true,
    imports: [RichTextEditorModule, TextBoxModule, SBActionDescriptionComponent, SBDescriptionComponent]
})

export class FormatPainterComponent {

    @ViewChild('formatPainterRTE')
    public formatPainterRTE: RichTextEditorComponent;

    public toolbarSettings: ToolbarSettingsModel = {
        items: ['FormatPainter', 'Bold', 'Italic', 'Underline', 'StrikeThrough',
            'SuperScript', 'SubScript', '|', 'FontName', 'FontSize', 'FontColor', 'BackgroundColor', 'LowerCase', 'UpperCase', '|',
            'Formats', 'Alignments', 'Blockquote', 'OrderedList', 'UnorderedList', '|',
            'Outdent', 'Indent', '|', 'CreateLink', 'Image', 'Video', 'Audio', 'CreateTable', '|', 'SourceCode', 'Undo', 'Redo'] 
    };

    @ViewChild('allowedFormatInput')
    public allowedFormatInput: TextBoxComponent;

    @ViewChild('deniedFormatInput')
    public deniedFormatInput: TextBoxComponent;

    public setAllowedFormats (e: FocusOutEventArgs): void  {
        this.formatPainterRTE.formatPainterSettings.allowedFormats = e.value;
    };

    public setdeniedFormats (e: FocusOutEventArgs): void  {
        this.formatPainterRTE.formatPainterSettings.deniedFormats = e.value;
    };
    editorValue: string = `<h3>Format Painter in Rich Text Editor</h3><p>The <strong data-start="50" data-end="68">Format Painter</strong> allows you to quickly copy and apply text formatting within the editor, saving time and ensuring consistency.</p><h5>How to Use Format Painter?</h5><ul><li><strong>Select the text</strong> with the formatting you want to copy.</li><li>Click the <strong>Format Painter</strong> button (paintbrush icon) in the toolbar.</li><li>The cursor changes to a <strong>paintbrush</strong> icon.</li><li><strong>Click and drag</strong> over the text where you want to apply the copied format.</li><li>Release the mouse button, and the formatting will be applied.</li></ul><h5>Why Use Format Painter?</h5><ul><li><strong>Saves time</strong> when formatting large documents.</li><li><strong>Ensures consistency</strong> in text styles. </li><li><strong>Easy to use</strong> for writers, editors, and content creators.</li></ul>`;
}