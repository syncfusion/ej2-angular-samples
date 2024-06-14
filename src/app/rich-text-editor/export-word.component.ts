/**
 * Rich Text Editor Default Functionality Sample
 */
import { Component, ViewChild } from '@angular/core';
import { ToolbarService, LinkService, ImageService, HtmlEditorService, RichTextEditorModule, QuickToolbarService, VideoService, AudioService, TableService, PasteCleanupService, RichTextEditorComponent, ToolbarSettingsModel, ImageSettingsModel } from '@syncfusion/ej2-angular-richtexteditor';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { UploaderModule } from '@syncfusion/ej2-angular-inputs';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
@Component({
    selector: 'control-content',
    templateUrl: 'export-word.html',
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, QuickToolbarService, TableService, PasteCleanupService],
    standalone: true,
    imports: [SBActionDescriptionComponent, RichTextEditorModule, SBDescriptionComponent, UploaderModule]
})
export class ExportWordRTEComponent {
    
    @ViewChild('exportRTE')
    public rteObj: RichTextEditorComponent;

    private hostUrl: string = 'https://services.syncfusion.com/angular/production/';

    public tools: ToolbarSettingsModel =  {
        items: [
            'Undo', 'Redo', '|',
            {
                tooltipText: "Export to Word",
                template:
                    `<button class="e-tbar-btn e-control e-btn e-lib e-icon-btn" tabindex="-1" id="custom_tbarbtn_2" style="width:100%">
                  <span class="e-icons e-rte-export-doc e-btn-icon"></span></button>`,
                click: this.exportContentToWord.bind(this)
            },
            {
                tooltipText: "Export to PDF",
                template:
                    `<button class="e-tbar-btn e-control e-btn e-lib e-icon-btn" tabindex="-1" id="custom_tbarbtn_3" style="width:100%">
                  <span class="e-icons e-rte-export-pdf e-btn-icon"></span></button>`,
                click: this.exportContentToPDF.bind(this)
            }, '|',
            'Bold', 'Italic', 'Underline', 'StrikeThrough', 'SuperScript', 'SubScript', '|',
            'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
            'LowerCase', 'UpperCase', '|',
            'Formats', 'Alignments', 'Blockquote', '|', 'NumberFormatList', 'BulletFormatList', '|',
            'Outdent', 'Indent', '|', 'CreateLink', 'Image', 'FileManager', 'Video', 'Audio', 'CreateTable', '|', 'FormatPainter', 'ClearFormat',
            '|', 'EmojiPicker', 'Print', '|',
            'SourceCode', 'FullScreen']
    };

    public insertImageSettings: ImageSettingsModel = {
        saveUrl: this.hostUrl + 'api/RichTextEditor/SaveFile',
        removeUrl: this.hostUrl + 'api/RichTextEditor/DeleteFile',
        path: this.hostUrl + 'RichTextEditor/'
    }

    public actionCompleteHandler(e: any): void {
        if (e.requestType === 'SourceCode') {
            this.rteObj.getToolbar().querySelector('#custom_tbarbtn_2').parentElement.classList.add('e-overlay');
            this.rteObj.getToolbar().querySelector('#custom_tbarbtn_3').parentElement.classList.add('e-overlay');
        } else if (e.requestType === 'Preview') {
            this.rteObj.getToolbar().querySelector('#custom_tbarbtn_2').parentElement.classList.remove('e-overlay');
            this.rteObj.getToolbar().querySelector('#custom_tbarbtn_3').parentElement.classList.remove('e-overlay');
        }
    }
    public quickToolbarOpenHandler(args: any): void {
        if (!isNullOrUndefined(args.targetElement) && args.targetElement.nodeName === 'IMG') {
            this.rteObj.getToolbar().querySelector('#custom_tbarbtn_2').parentElement.classList.add('e-overlay');
            this.rteObj.getToolbar().querySelector('#custom_tbarbtn_3').parentElement.classList.add('e-overlay');
        }
    }

    public quickToolbarCloseHandler(args: any): void {
        if (!isNullOrUndefined(args.element) && args.element.classList.contains('e-rte-image-popup')) {
            this.rteObj.getToolbar().querySelector('#custom_tbarbtn_2').parentElement.classList.remove('e-overlay');
            this.rteObj.getToolbar().querySelector('#custom_tbarbtn_3').parentElement.classList.remove('e-overlay');
        }
    }
    public exportContentToWord(): void {
        const rteHtmlData = this.rteObj.getHtml();
        const html = `<html><head></head><body>${rteHtmlData}</body></html>`;
        fetch(this.hostUrl + 'api/RichTextEditor/ExportToDocx', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ html: html }) // Wrap HTML in a JSON object
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const filename: string = 'Result.docx';
                // Create a Blob from the response and initiate the download
                return response.blob().then(blob => ({ blob, filename }));
            })
            .then(({ blob, filename }) => {
                const url = window.URL.createObjectURL(blob);       // Create a Blob URL from the response and initiate the download    
                const a = document.createElement('a');              // Create an anchor element
                a.href = url;
                a.download = filename;
                document.body.appendChild(a);                       // Append the anchor element to the document
                a.click();                                          // Trigger a click on the anchor element to initiate the download
                document.body.removeChild(a);                       // Remove the anchor element from the document
                window.URL.revokeObjectURL(url);                    // Revoke the object URL to free up resources
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    }

    public exportContentToPDF(): void {
        const rteHtmlData = this.rteObj.getHtml();
        const html = `<html><head></head><body>${rteHtmlData}</body></html>`;
        fetch(this.hostUrl + 'api/RichTextEditor/ExportToPdf', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ html: html }) // Wrap HTML in a JSON object
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.blob();
            })
            .then(blob => {
                const url: string = window.URL.createObjectURL(blob);       // Create a Blob URL from the response and initiate the download
                const a: HTMLAnchorElement = document.createElement('a');   // Create an anchor element
                a.href = url;
                a.download = 'Sample.pdf';
                document.body.appendChild(a);             // Append the anchor element to the document
                a.click();                                // Trigger a click on the anchor element to initiate the download
                document.body.removeChild(a);             // Remove the anchor element from the document
                window.URL.revokeObjectURL(url);          // Revoke the object URL to free up resources
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    }
}
