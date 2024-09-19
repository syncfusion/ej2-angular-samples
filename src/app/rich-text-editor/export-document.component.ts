/**
 * Rich Text Editor Default Functionality Sample
 */
import { Component } from '@angular/core';
import { ToolbarService, LinkService, ImageService, HtmlEditorService, RichTextEditorModule, QuickToolbarService, ImportExportService, TableService, PasteCleanupService, ToolbarSettingsModel, ImageSettingsModel } from '@syncfusion/ej2-angular-richtexteditor';
import { ExportWordModel, ExportPdfModel } from '@syncfusion/ej2-angular-richtexteditor';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
@Component({
    selector: 'control-content',
    templateUrl: 'export-document.html',
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, QuickToolbarService, TableService, PasteCleanupService, ImportExportService],
    standalone: true,
    imports: [SBActionDescriptionComponent, RichTextEditorModule, SBDescriptionComponent]
})
export class ExportDocumentComponent {

    private hostUrl: string = 'https://services.syncfusion.com/angular/production/';

    public tools: ToolbarSettingsModel = {
        items: [
            'Undo', 'Redo', '|', 'ExportWord', 'ExportPdf', '|', 'Bold', 'Italic', 'Underline', 'StrikeThrough', '|',
            'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
            'Formats', 'Alignments', 'Blockquote', '|', 'NumberFormatList',
            'BulletFormatList', '|', 'CreateLink', 'Image', 'CreateTable', '|', 'ClearFormat', 'SourceCode']
    };

    public insertImageSettings: ImageSettingsModel = {
        saveUrl: this.hostUrl + 'api/RichTextEditor/SaveFile',
        removeUrl: this.hostUrl + 'api/RichTextEditor/DeleteFile',
        path: this.hostUrl + 'RichTextEditor/'
    }

    public exportWord: ExportWordModel = {
        serviceUrl: this.hostUrl + 'api/RichTextEditor/ExportToDocx',
        fileName: 'RichTextEditor.docx',
        stylesheet: `
        .e-rte-content {
            font-size: 1em;
            font-weight: 400;
            margin: 0;
        }`
    };

    public exportPdf: ExportPdfModel = {
        serviceUrl: this.hostUrl + 'api/RichTextEditor/ExportToPdf',
        fileName: 'RichTextEditor.pdf',
        stylesheet: `
        .e-rte-content{
            font-size: 1em;
            font-weight: 400;
            margin: 0;
        }
    `
    };
}
