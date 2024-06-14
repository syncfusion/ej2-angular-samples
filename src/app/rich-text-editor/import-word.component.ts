/**
 * Rich Text Editor Default Functionality Sample
 */
import { Component, ViewChild } from '@angular/core';
import { ToolbarService, LinkService, ImageService, HtmlEditorService, RichTextEditorModule, QuickToolbarService, VideoService, AudioService, TableService, PasteCleanupService, RichTextEditorComponent, ToolbarSettingsModel } from '@syncfusion/ej2-angular-richtexteditor';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { AsyncSettingsModel, UploaderComponent, UploaderModule } from '@syncfusion/ej2-angular-inputs';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
@Component({
    selector: 'control-content',
    templateUrl: 'import-word.html',
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, QuickToolbarService, TableService, PasteCleanupService],
    standalone: true,
    imports: [SBActionDescriptionComponent, RichTextEditorModule, SBDescriptionComponent, UploaderModule]
})
export class ImportWordRTEComponent {

    @ViewChild('importRTE')
    public rteObj: RichTextEditorComponent;

    @ViewChild('uploadObj')
    public uploadObj: UploaderComponent;

    private hostUrl: string = 'https://services.syncfusion.com/angular/production/';

    public asyncSettings: AsyncSettingsModel = {
        saveUrl: this.hostUrl + 'api/RichTextEditor/ImportFromWord'
    };

    public tools: ToolbarSettingsModel =  {
        items: [
            'Undo', 'Redo', '|',
            {
                tooltipText: "Import from Word",
                template:
                    `<button class="e-tbar-btn e-control e-btn e-lib e-icon-btn" tabindex="-1" id="custom_tbarbtn_1" style="width:100%">
                  <span class="e-icons e-rte-import-doc e-btn-icon"></span></button>`,
                click: this.importContentFromWord.bind(this)
            }, '|',
            'Bold', 'Italic', 'Underline', 'StrikeThrough', 'SuperScript', 'SubScript', '|',
            'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
            'LowerCase', 'UpperCase', '|',
            'Formats', 'Alignments', 'Blockquote', '|', 'NumberFormatList', 'BulletFormatList', '|',
            'Outdent', 'Indent', '|', 'CreateLink', 'Image', 'FileManager', 'Video', 'Audio', 'CreateTable', '|', 'FormatPainter', 'ClearFormat',
            '|', 'EmojiPicker', 'Print', '|',
            'SourceCode', 'FullScreen']
    };

    public actionCompleteHandler(e: any): void {
        if (e.requestType === 'SourceCode') {
            this.rteObj.getToolbar().querySelector('#custom_tbarbtn_1').parentElement.classList.add('e-overlay');
        } else if (e.requestType === 'Preview') {
            this.rteObj.getToolbar().querySelector('#custom_tbarbtn_1').parentElement.classList.remove('e-overlay');
        }
    }

    public onUploadSuccess(args: any): void {
        this.rteObj.executeCommand('insertHTML', args.e.currentTarget.response, { undo: true });
    }

    public importContentFromWord(): void {
        this.uploadObj.element.click();
    }
    public quickToolbarOpenHandler(args: any): void {
        if (!isNullOrUndefined(args.targetElement) && args.targetElement.nodeName === 'IMG') {
            this.rteObj.getToolbar().querySelector('#custom_tbarbtn_1').parentElement.classList.add('e-overlay');
        }
    }

    public quickToolbarCloseHandler(args: any): void {
        if (!isNullOrUndefined(args.element) && args.element.classList.contains('e-rte-image-popup')) {
            this.rteObj.getToolbar().querySelector('#custom_tbarbtn_1').parentElement.classList.remove('e-overlay');
        }
    }
}
