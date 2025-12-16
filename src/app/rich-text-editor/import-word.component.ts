/**
 * Rich Text Editor Default Functionality Sample
 */
import { Component, ViewChild } from '@angular/core';
import { ToolbarService, LinkService, ImageService, HtmlEditorService, ImportExportService, RichTextEditorModule, QuickToolbarService, TableService, PasteCleanupService, ImportWordModel, ToolbarSettingsModel, ClipBoardCleanupService, AutoFormatService } from '@syncfusion/ej2-angular-richtexteditor';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'control-content',
    templateUrl: 'import-word.html',
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, QuickToolbarService, TableService, PasteCleanupService, ImportExportService, ClipBoardCleanupService, AutoFormatService],
    standalone: true,
    imports: [SBActionDescriptionComponent, RichTextEditorModule, SBDescriptionComponent]
})
export class ImportWordRTEComponent {

    private hostUrl: string = 'https://services.syncfusion.com/angular/production/';

    public importWord: ImportWordModel = {
        serviceUrl: this.hostUrl + 'api/RichTextEditor/ImportFromWord',
    };

    public tools: ToolbarSettingsModel = {
        items: [
            'Undo', 'Redo', '|', 'ImportWord', '|',
            'Bold', 'Italic', 'Underline', 'StrikeThrough', '|',
            'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
            'Formats', 'Alignments', 'Blockquote', '|', 'NumberFormatList', 'BulletFormatList',
            '|', 'CreateLink', 'Image', 'CreateTable', '|', 'ClearFormat', 'SourceCode']
    };

}
