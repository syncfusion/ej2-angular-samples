/**
 * Rich Text Editor Overview Sample
 */
import { Component,ViewChild, ViewEncapsulation } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ToolbarService, LinkService, ImageService, HtmlEditorService, EmojiPickerService, VideoService, AudioService, FormatPainterService, RichTextEditorModule, QuickToolbarService, PasteCleanupService, CountService, ToolbarSettingsModel, ImageSettingsModel, ActionBeginEventArgs} from '@syncfusion/ej2-angular-richtexteditor';
import { RichTextEditorComponent, TableService, FileManagerService } from '@syncfusion/ej2-angular-richtexteditor';
import { FileManagerSettingsModel, QuickToolbarSettingsModel } from '@syncfusion/ej2-angular-richtexteditor';
import { createElement, addClass, removeClass, Browser } from '@syncfusion/ej2-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import * as CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css.js';
import 'codemirror/mode/htmlmixed/htmlmixed.js';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { AsyncSettingsModel, UploaderComponent, UploaderModule } from '@syncfusion/ej2-angular-inputs';
import { MentionComponent, MentionModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
    selector: 'control-content',
    templateUrl: 'tools.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['over-view.css'],
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, TableService, FileManagerService, EmojiPickerService, VideoService, AudioService, FormatPainterService, QuickToolbarService, PasteCleanupService, CountService],
    standalone: true,
    imports: [SBActionDescriptionComponent, RichTextEditorModule, SBDescriptionComponent, UploaderModule, MentionModule, NgStyle]
})
export class FullFeatureComponent {

    @ViewChild('toolsRTE')
    public rteObj: RichTextEditorComponent;

    @ViewChild('uploadObj')
    public uploadObj: UploaderComponent;

    @ViewChild('editorMention')
    public mention: MentionComponent;

    public emailData: { [key: string]: Object }[] =  [
        { name: "Selma Rose", initial: 'SR', email: "selma@gmail.com", color: '#FAFDFF', bgColor: '#01579B' },
        { name: "Maria", initial: 'MA', email: "maria@gmail.com", color: '#004378', bgColor: '#ADDBFF' },
        { name: "Russo Kay", initial: 'RK', email: "russo@gmail.com", color: '#F9DEDC', bgColor: '#8C1D18' },
        { name: "Robert", initial: 'RO', email: "robert@gmail.com", color: '#FFD6F7', bgColor: '#37003A' },
        { name: "Camden Kate", initial: 'CK', email: "camden@gmail.com", color: '#FFFFFF', bgColor: '#464ECF' },
        { name: "Garth", initial: 'GA', email: "garth@gmail.com", color: '#FFFFFF', bgColor: '#008861' },
        { name: "Andrew James", initial: 'AJ', email: "james@gmail.com", color: '#FFFFFF', bgColor: '#53CA17' },
        { name: "Olivia", initial: 'OL', email: "olivia@gmail.com", color: '#FFFFFF', bgColor: '#8C1D18' },
        { name: "Sophia", initial: 'SO', email: "sophia@gmail.com", color: '#000000', bgColor: '#D0BCFF' },
        { name: "Margaret", initial: 'MA', email: "margaret@gmail.com", color: '#000000', bgColor: '#F2B8B5' },
        { name: "Ursula Ann", initial: 'UA', email: "ursula@gmail.com", color: '#000000', bgColor: '#47ACFB' },
        { name: "Laura Grace", initial: 'LG', email: "laura@gmail.com", color: '#000000', bgColor: '#FFE088' },
        { name: "Albert", initial: 'AL', email: "albert@gmail.com", color: '#FFFFFF', bgColor: '#00335B' },
        { name: "William", initial: 'WA', email: "william@gmail.com", color: '#FFFFFF', bgColor: '#163E02' }
    ];

    public fields : Object = { text: 'name' };

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
            },
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

    public fileManagerSettings: FileManagerSettingsModel = {
        enable: true,
        path: '/Pictures/Food',
        ajaxSettings: {
            url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations',
            getImageUrl: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/GetImage',
            uploadUrl: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/Upload',
            downloadUrl: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/Download'
        }
    };

    public quickToolbarSettings: QuickToolbarSettingsModel = {
        table: ['TableHeader', 'TableRows', 'TableColumns', 'TableCell', '-', 'BackgroundColor', 'TableRemove', 'TableCellVerticalAlign', 'Styles'],
        showOnRightClick: true,
    };

    public placeholder: string = 'Type something or use @ to tag a user...';

    public codeMirror: any;

    public mirrorConversion(e?: any): void {
        const id: string = this.rteObj.getID() + 'mirror-view';
        let mirrorView: HTMLElement = this.rteObj.element.querySelector('#' + id) as HTMLElement;
        if (e.targetItem === 'Preview') {
            this.rteObj.value = this.codeMirror.getValue();
            this.rteObj.dataBind();
            this.rteObj.rootContainer.classList.remove('e-rte-code-mirror-enabled');
            this.rteObj.focusIn();
        } else {
            this.rteObj.rootContainer.classList.add('e-rte-code-mirror-enabled');
            this.rteObj.rootContainer.classList.remove('e-source-code-enabled');
            if (!mirrorView) {
                mirrorView = createElement('div', { className: 'rte-code-mirror', id: id, styles: 'display: none;' });
                this.rteObj.rootContainer.appendChild(mirrorView);
                this.renderCodeMirror(mirrorView, this.rteObj.value === null ? '' : this.rteObj.value);
            }
            else {
                this.codeMirror.setValue(this.rteObj.value);
            }
            this.codeMirror.focus();
        }
    }


    public renderCodeMirror(mirrorView: HTMLElement, content: string): void {
        this.codeMirror = CodeMirror(mirrorView, {
            value: content,
            lineNumbers: true,
            mode: 'text/html',
            lineWrapping: true,
        });
    }
    public handleFullScreen(e: any): void {
        const sbCntEle: HTMLElement = document.querySelector('.sb-content.e-view')!;
        const sbHdrEle: HTMLElement = document.querySelector('.sb-header.e-view')!;
        const leftBar: HTMLElement = document.querySelector('#left-sidebar')!;
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
    public actionCompleteHandler(e: any): void {
        if (e.targetItem && (e.targetItem === 'SourceCode' || e.targetItem === 'Preview')) {
            this.mirrorConversion(e);
        }
        if (e.requestType === 'SourceCode') {
            this.rteObj.getToolbar().querySelector('#custom_tbarbtn_1').parentElement.classList.add('e-overlay');
            this.rteObj.getToolbar().querySelector('#custom_tbarbtn_2').parentElement.classList.add('e-overlay');
            this.rteObj.getToolbar().querySelector('#custom_tbarbtn_3').parentElement.classList.add('e-overlay');
        } else if (e.requestType === 'Preview') {
            this.rteObj.getToolbar().querySelector('#custom_tbarbtn_1').parentElement.classList.remove('e-overlay');
            this.rteObj.getToolbar().querySelector('#custom_tbarbtn_2').parentElement.classList.remove('e-overlay');
            this.rteObj.getToolbar().querySelector('#custom_tbarbtn_3').parentElement.classList.remove('e-overlay');
        }
    }

    public quickToolbarOpenHandler(args: any): void {
        if (!isNullOrUndefined(args.targetElement) && args.targetElement.nodeName === 'IMG') {
            this.rteObj.getToolbar().querySelector('#custom_tbarbtn_1').parentElement.classList.add('e-overlay');
            this.rteObj.getToolbar().querySelector('#custom_tbarbtn_2').parentElement.classList.add('e-overlay');
            this.rteObj.getToolbar().querySelector('#custom_tbarbtn_3').parentElement.classList.add('e-overlay');
        }
    }

    public quickToolbarCloseHandler(args: any): void {
        if (!isNullOrUndefined(args.element) && args.element.classList.contains('e-rte-image-popup')) {
            this.rteObj.getToolbar().querySelector('#custom_tbarbtn_1').parentElement.classList.remove('e-overlay');
            this.rteObj.getToolbar().querySelector('#custom_tbarbtn_2').parentElement.classList.remove('e-overlay');
            this.rteObj.getToolbar().querySelector('#custom_tbarbtn_3').parentElement.classList.remove('e-overlay');
        }
    }

    public importContentFromWord(): void {
        this.uploadObj.element.click();
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

    public onUploadSuccess(args: any): void {
        this.rteObj.executeCommand('insertHTML', args.e.currentTarget.response, { undo: true });
    }

    public actionBeginHandler(e: ActionBeginEventArgs): void {
        if (e.requestType === 'EnterAction' && this.mention.element.classList.contains('e-popup-open')) {
            e.cancel = true;
        }
        if (e.requestType === 'Maximize' || e.requestType === 'Minimize') {
            this.handleFullScreen(e);
        }
    }
}
