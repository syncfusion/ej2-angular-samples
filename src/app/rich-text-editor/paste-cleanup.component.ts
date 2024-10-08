/**
 * Rich Text Editor Paste Cleanup functionality Sample
 */
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { RadioButtonComponent } from '@syncfusion/ej2-angular-buttons';
import { RichTextEditorComponent, ToolbarService, PasteCleanupSettingsModel, LinkService, ImageService, RichTextEditorModule, VideoService, AudioService, TableService } from '@syncfusion/ej2-angular-richtexteditor';
import { PasteCleanupService } from '@syncfusion/ej2-angular-richtexteditor';
import { HtmlEditorService, QuickToolbarService } from '@syncfusion/ej2-angular-richtexteditor';
import { Link, Count, HtmlEditor, QuickToolbar } from '@syncfusion/ej2-angular-richtexteditor';
import { TextBox } from '@syncfusion/ej2-inputs'
import { DropDownListComponent, FieldSettingsModel, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { isNullOrUndefined } from '@syncfusion/ej2-base';


@Component({
    selector: 'control-content',
    templateUrl: 'paste-cleanup.html',
    styleUrls: ['style.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, QuickToolbarService, PasteCleanupService, VideoService, AudioService, TableService],
    standalone: true,
    imports: [RichTextEditorModule, DropDownListModule, TextBoxModule, SBActionDescriptionComponent, SBDescriptionComponent]
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

    public pasteCleanupSettings: PasteCleanupSettingsModel = {
        prompt: true,
        plainText: false,
        keepFormat: false
    };

    public formatData: { [key: string]: Object }[] = [
        { Id: 'prompt', Format: 'Prompt' },
        { Id: 'plainTextFormatting', Format: 'Plain Text' },
        { Id: 'keepFormating', Format: 'Keep Format' },
        { Id: 'Clean Formatting', Format: 'Clean Format' }
    ];
    public fields: FieldSettingsModel = { text: 'Format', value: 'Format' };
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
        this.onPasteCleanupSettingsChange(this.deniedTags.value, 'deniedTags');
    }
    public deniedAttrsChange(): void {
        this.onPasteCleanupSettingsChange(this.deniedAttributes.value, 'deniedAttrs');
    }
    public allowStyleChange(): void {
        this.onPasteCleanupSettingsChange(this.allowedStyleProperties.value, 'allowedStyleProps');
    }

    public onPasteCleanupSettingsChange(value: any, settingsProperty: string): void {
        if (!isNullOrUndefined(value)) {
            const arrayValue = value.split(',').map((item) => item.trim().replace(/^['"]|['"]$/g, ''));
            this.rteObj.pasteCleanupSettings[settingsProperty] = arrayValue.filter((prop) => prop !== '');
        }
    }
}
