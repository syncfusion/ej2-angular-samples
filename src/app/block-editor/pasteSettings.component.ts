import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { BlockEditor, BlockEditorModule, BlockModel, PasteCleanupSettingsModel } from '@syncfusion/ej2-angular-blockeditor';
import { DropDownListComponent, FieldSettingsModel, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { TextBoxComponent, TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import blockData from './blockData.json';

@Component({
    selector: 'app-root',
    templateUrl: 'pasteSettings.html',
    styleUrls: ['pasteSettings.component.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [BlockEditorModule, DropDownListModule, TextBoxModule]
})
export class BlockEditorPasteSettingsComponent {

    @ViewChild('pasteBlockEditor')
    public blockEditorObj: BlockEditor;

    @ViewChild('formatOption')
    public formatObj?: DropDownListComponent;

    @ViewChild('deniedTags')
    public deniedTags?: TextBoxComponent;

    @ViewChild('allowedStyleProperties')
    public allowedStyleProperties?: TextBoxComponent;

    public blockDataPaste: BlockModel[] = blockData.blockDataPaste as BlockModel[];

    public pasteSettings: PasteCleanupSettingsModel = {
        deniedTags: ['script', 'iframe'],
        plainText: false,
        keepFormat: true,
        allowedStyles: []
    };

    public formatData: { [key: string]: Object }[] = [
        { Id: 'plainText', Format: 'Plain Text' },
        { Id: 'keepFormat', Format: 'Keep Format' }
    ];

    public fields: FieldSettingsModel = { text: 'Format', value: 'Id' };
    public height: string = '200px';
    public value: string = 'keepFormat';

    // Toggle paste behavior based on dropdown selection
    public formatChange(): void {
        if (!this.blockEditorObj) {
            console.warn('BlockEditorComponent is not available yet.');
            return;
        }
        if (this.formatObj?.value === 'plainText') {
            this.blockEditorObj.pasteCleanupSettings.plainText = true;
            this.blockEditorObj.pasteCleanupSettings.keepFormat = false;
        } else if (this.formatObj?.value === 'keepFormat') {
            this.blockEditorObj.pasteCleanupSettings.plainText = false;
            this.blockEditorObj.pasteCleanupSettings.keepFormat = true;
        }
        this.blockEditorObj.dataBind();
    }

    // update denied tags properties from a comma-separated textbox
    public deniedTagChange(): void {
        if (!this.deniedTags?.value) return;
        this.onPasteCleanupSettingsChange(this.deniedTags.value, 'deniedTags');
    }

    // update allowed style properties from a comma-separated textbox
    public allowStyleChange(): void {
        if (!this.allowedStyleProperties?.value) return;
        this.onPasteCleanupSettingsChange(this.allowedStyleProperties.value, 'allowedStyles');
    }

    // Update the specified paste settings property with parsed array value and rebind the editor
    public onPasteCleanupSettingsChange(value: any, settingsProperty: string): void {
        if (!this.blockEditorObj) {
            console.warn('BlockEditorComponent is not available yet.');
            return;
        }
        if (!isNullOrUndefined(value)) {
            const arrayValue = value.split(',').map((item: string) => item.trim().replace(/^['"]|['"]$/g, ''));
            this.blockEditorObj.pasteCleanupSettings[settingsProperty] = arrayValue.filter((prop: string) => prop !== '');
            this.blockEditorObj.dataBind();
        }
    }
}
