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
}