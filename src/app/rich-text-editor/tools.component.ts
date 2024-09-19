/**
 * Rich Text Editor Overview Sample
 */
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ToolbarService, LinkService, ImageService, HtmlEditorService, EmojiPickerService, VideoService, AudioService, FormatPainterService, RichTextEditorModule, QuickToolbarService, PasteCleanupService, CountService, ToolbarSettingsModel, ImageSettingsModel, ActionBeginEventArgs } from '@syncfusion/ej2-angular-richtexteditor';
import { RichTextEditorComponent, TableService, FileManagerService, SlashMenuService, ImportExportService } from '@syncfusion/ej2-angular-richtexteditor';
import { FileManagerSettingsModel, QuickToolbarSettingsModel, SlashMenuSettingsModel, ExportPdfModel, ExportWordModel, ImportWordModel } from '@syncfusion/ej2-angular-richtexteditor';
import { createElement, addClass, removeClass, Browser } from '@syncfusion/ej2-base';
import * as CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css.js';
import 'codemirror/mode/htmlmixed/htmlmixed.js';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { MentionComponent, MentionModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
    selector: 'control-content',
    templateUrl: 'tools.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['over-view.css'],
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, TableService, FileManagerService, EmojiPickerService, VideoService, AudioService, FormatPainterService, QuickToolbarService, PasteCleanupService, CountService, SlashMenuService, ImportExportService],
    standalone: true,
    imports: [SBActionDescriptionComponent, RichTextEditorModule, SBDescriptionComponent, MentionModule, NgStyle]
})
export class FullFeatureComponent {

    @ViewChild('toolsRTE')
    public rteObj: RichTextEditorComponent;

    @ViewChild('editorMention')
    public mention: MentionComponent;

    public emailData: { [key: string]: Object }[] = [
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

    public fields: Object = { text: 'name' };

    private hostUrl: string = 'https://services.syncfusion.com/angular/production/';

    public tools: ToolbarSettingsModel = {
        items: [
            'Undo', 'Redo', '|', 'ImportWord', 'ExportWord', 'ExportPdf', '|',
            'Bold', 'Italic', 'Underline', 'StrikeThrough', 'InlineCode', 'SuperScript', 'SubScript', '|',
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
    public slashMenuSettings: SlashMenuSettingsModel = {
        enable: true,
        items: ['Paragraph', 'Heading 1', 'Heading 2', 'Heading 3', 'Heading 4', 'OrderedList', 'UnorderedList',
            'CodeBlock', 'Blockquote', 'Link', 'Image', 'Video', 'Audio', 'Table', 'Emojipicker',
        ]
    };
    public importWord: ImportWordModel = {
        serviceUrl: this.hostUrl + 'api/RichTextEditor/ImportFromWord',
    };
    public exportWord: ExportWordModel = {
        serviceUrl: this.hostUrl + 'api/RichTextEditor/ExportToDocx',
        fileName: 'RichTextEditor.docx',
        stylesheet: `
        .e-rte-content {
            font-size: 1em;
            font-weight: 400;
            margin: 0;
        }
    `
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
