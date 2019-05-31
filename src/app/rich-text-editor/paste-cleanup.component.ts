/**
 * RTE Paste Cleanup functionality Sample
 */
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { RadioButtonComponent } from '@syncfusion/ej2-angular-buttons';
import { RichTextEditorComponent, ToolbarService, LinkService, ImageService } from '@syncfusion/ej2-angular-richtexteditor';
import { PasteCleanupService } from '@syncfusion/ej2-angular-richtexteditor';
import { HtmlEditorService, CountService, QuickToolbarService } from '@syncfusion/ej2-angular-richtexteditor';
import { Link, Count, HtmlEditor, QuickToolbar } from '@syncfusion/ej2-angular-richtexteditor';
import { TextBox } from '@syncfusion/ej2-inputs'
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';

@Component({
    selector: 'control-content',
    templateUrl: 'paste-cleanup.html',
    styleUrls: ['style.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, CountService, QuickToolbarService, PasteCleanupService]
})
export class PasteCleanupComponent {
    @ViewChild('pasteCleanupRTE')
    public rteObj: RichTextEditorComponent;
    @ViewChild('formatOption')
    public formatObj: DropDownListComponent;
    @ViewChild('prompt')
    public promptObj: RadioButtonComponent;
    @ViewChild('plainText')
    public plainTextObj: RadioButtonComponent;
    @ViewChild('keepFormat')
    public keepFormatObj: RadioButtonComponent;
    @ViewChild('cleanFormat')
    public cleanFormatObj: RadioButtonComponent;
    @ViewChild('deniedTags')
    public deniedTags: TextBox;
    @ViewChild('deniedAttributes')
    public deniedAttributes: TextBox;
    @ViewChild('allowedStyleProperties')
    public allowedStyleProperties: TextBox;

    public pasteCleanupSettings: any = {
        prompt: true,
        plainText: false,
        keepFormat: false,
        deniedTags: [],
        deniedAttrs: [],
        allowedStyleProps: []
    };

    public formatData: Object[] = [
        { Id: 'prompt', Format: 'Prompt' },
        { Id: 'plainTextFormatting', Format: 'Plain Text' },
        { Id: 'keepFormating', Format: 'Keep Format' },
        { Id: 'Clean Formatting', Format: 'Clean Format' }
    ];
    public fields: Object = { Format: 'Id', value: 'Format' };
    public height: string = '200px';
    public value: string = 'Prompt';

    public formatChange(): void {
        if (this.formatObj.value === 'Prompt') {
            this.rteObj.pasteCleanupSettings.prompt = true;
        } else if (this.formatObj.value === 'Plain Text') {
            this.rteObj.pasteCleanupSettings.prompt = false;
            this.rteObj.pasteCleanupSettings.plainText = true;
        } else if (this.formatObj.value === 'Keep Format') {
            this.rteObj.pasteCleanupSettings.prompt = false;
            this.rteObj.pasteCleanupSettings.plainText = false;
            this.rteObj.pasteCleanupSettings.keepFormat = true;
        } else if (this.formatObj.value === 'Clean Format') {
            this.rteObj.pasteCleanupSettings.prompt = false;
            this.rteObj.pasteCleanupSettings.plainText = false;
            this.rteObj.pasteCleanupSettings.keepFormat = false;
        }
    }

    public deniedTagChange(): void {
        this.rteObj.pasteCleanupSettings.deniedTags = (eval)('[' + this.deniedTags.value + ']');
        this.rteObj.dataBind();
    }
    public deniedAttrsChange(): void {
        this.rteObj.pasteCleanupSettings.deniedAttrs = (eval)('[' + this.deniedAttributes.value + ']');
        this.rteObj.dataBind();
    }
    public allowStyleChange(): void {
        this.rteObj.pasteCleanupSettings.allowedStyleProps = (eval)('[' + this.allowedStyleProperties.value + ']');
        this.rteObj.dataBind();
    }
}