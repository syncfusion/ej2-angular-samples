import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { RichTextEditorComponent, HtmlEditorService, ToolbarService, FormatPainterService, QuickToolbarService, ImageService, LinkService, TableService, ToolbarSettingsModel } from '@syncfusion/ej2-angular-richtexteditor';
import { TextBoxComponent, FocusOutEventArgs } from '@syncfusion/ej2-angular-inputs';

@Component({
    selector: 'control-content',
    templateUrl: 'format-painter.html',
    styleUrls: ['style.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [HtmlEditorService, ToolbarService, FormatPainterService, QuickToolbarService, ImageService, LinkService, TableService]
})

export class FormatPainterComponent {

    @ViewChild('formatPainterRTE')
    public formatPainterRTE: RichTextEditorComponent;

    public toolbarSettings: ToolbarSettingsModel = {
        items : ['FormatPainter','Bold', 'Italic', 'Underline', 'StrikeThrough',
            'FontName', 'FontSize', 'FontColor', 'BackgroundColor', 'SuperScript', 'SubScript', '|',
            'Formats', 'Alignments', 'NumberFormatList', 'BulletFormatList',
            'Outdent', 'Indent', '|', 'CreateTable', 'CreateLink', 'Image', '|', 'Undo', 'Redo','SourceCode', 'FullScreen'] 
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