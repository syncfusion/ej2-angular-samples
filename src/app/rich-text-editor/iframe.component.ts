/**
 * Rich Text Editor Iframe Sample
 */
import { Component, ViewChild } from '@angular/core';
import { addClass, removeClass, Browser } from '@syncfusion/ej2-base';
import { ToolbarService, LinkService, ImageService, HtmlEditorService, RichTextEditorModule, QuickToolbarService, PasteCleanupService, VideoService, AudioService, EmojiPickerService, TableService, CodeBlockService, ImportExportService, ClipBoardCleanupService,AutoFormatService, FormatPainterService } from '@syncfusion/ej2-angular-richtexteditor';
import { ExportWordModel, ExportPdfModel, ImportWordModel, QuickToolbarSettingsModel } from '@syncfusion/ej2-angular-richtexteditor';
import { RichTextEditorComponent, IFrameSettingsModel, FileManagerService } from '@syncfusion/ej2-angular-richtexteditor';
import { FileManagerSettingsModel } from '@syncfusion/ej2-angular-richtexteditor';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
@Component({
    selector: 'control-content',
    templateUrl: 'iframe.html',
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, FileManagerService, QuickToolbarService, PasteCleanupService, VideoService, AudioService, EmojiPickerService, TableService, CodeBlockService, ImportExportService, ClipBoardCleanupService, AutoFormatService, FormatPainterService],
    standalone: true,
    imports: [SBActionDescriptionComponent, RichTextEditorModule, SBDescriptionComponent]
})
export class IFrameComponent {

    @ViewChild('iframeRTE')
    private iframeRTE: RichTextEditorComponent;

    private hostUrl: string = 'https://services.syncfusion.com/angular/production/';

    public tools: ToolbarModule = {
        items: ['Undo', 'Redo', '|', 'ImportWord', 'ExportWord', 'ExportPdf', '|',
            'Bold', 'Italic', 'Underline', 'StrikeThrough', 'InlineCode', '|', 'CreateLink', 'Image', 'CreateTable', 'CodeBlock',
            'HorizontalLine', 'Blockquote', '|', 'LineHeight', 'Formats', 'Alignments', '|', 'BulletFormatList', 'NumberFormatList', 'Checklist', '|', 'Outdent', 'Indent', '|',
            'FontColor', 'BackgroundColor', 'FontName', 'FontSize', '|', 'LowerCase', 'UpperCase', '|', 'SuperScript', 'SubScript', '|',
            'EmojiPicker', 'FileManager', 'Video', 'Audio', '|', 'FormatPainter', 'ClearFormat',
            '|', 'Print', 'FullScreen', '|', 'SourceCode']
    };

    public fileManagerSettings: FileManagerSettingsModel = {
        enable: true,
        ajaxSettings: {
            url: this.hostUrl + 'api/RichTextEditor/FileOperations',
            getImageUrl: this.hostUrl + 'api/RichTextEditor/GetImage',
            uploadUrl: this.hostUrl + 'api/RichTextEditor/Upload',
            downloadUrl: this.hostUrl + 'api/RichTextEditor/Download'
        }
    };

    public exportWord: ExportWordModel = {
        serviceUrl: 'https://services.syncfusion.com/angular/production/api/RichTextEditor/ExportToDocx',
        fileName: 'RichTextEditor.docx',
        stylesheet: `
        .e-rte-content {
            font-size: 1em;
            font-weight: 400;
            margin: 0;
        }`
    };

    public importWord: ImportWordModel = {
        serviceUrl: 'https://services.syncfusion.com/angular/production/api/RichTextEditor/ImportFromWord',
    };

    public exportPdf: ExportPdfModel = {
        serviceUrl: 'https://services.syncfusion.com/angular/production/api/RichTextEditor/ExportToPdf',
        fileName: 'RichTextEditor.pdf',
        stylesheet: `
        .e-rte-content{
            font-size: 1em;
            font-weight: 400;
            margin: 0;
        }
    `
    };

    public quickToolbarSettings: QuickToolbarSettingsModel = {
        table: ['Tableheader', 'TableRemove', '|', 'TableRows', 'TableColumns', 'TableCell', '|', 'TableEditProperties', 'TableCellProperties', 'Styles', 'BackgroundColor', 'Alignments', 'TableCellVerticalAlign'],
        text: ['Formats', '|', 'Bold', 'Italic', 'Fontcolor', 'BackgroundColor', '|', 'CreateLink', 'Image', 'CreateTable', 'Blockquote', '|' , 'Unorderedlist', 'Orderedlist', 'Indent', 'Outdent'],
        showOnRightClick: true,
    };

    public iframe: IFrameSettingsModel = { enable: true };
    public enableTabKey: boolean = true;

    public handleFullScreen(e: any) {
        const sbCntEle: HTMLElement = document.querySelector('.sb-content.e-view');
        const sbHdrEle: HTMLElement = document.querySelector('.sb-header.e-view');
        const leftBar: HTMLElement = document.querySelector('#left-sidebar');
        if (e.targetItem === 'Maximize') {
            if (Browser.isDevice && Browser.isIos) {
                addClass([sbCntEle, sbHdrEle], ['hide-header']);
            }
            addClass([leftBar], ['e-close']);
            removeClass([leftBar], ['e-open']);
        } else if (e.targetItem === 'Minimize') {
            if (Browser.isDevice && Browser.isIos) {
                removeClass([sbCntEle, sbHdrEle], ['hide-header']);
            }
            removeClass([leftBar], ['e-close']);
            if (!Browser.isDevice) {
                addClass([leftBar], ['e-open']);
            }
        }
    }

    public actionCompleteHandler(e: any) {
        setTimeout(() => { this.iframeRTE.toolbarModule.refreshToolbarOverflow(); }, 400);
    }
}
