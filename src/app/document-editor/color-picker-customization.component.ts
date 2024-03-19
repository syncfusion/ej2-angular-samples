import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ToolbarService, DocumentEditorContainerComponent, DocumentEditorContainerModule,DocumentEditorSettingsModel } from '@syncfusion/ej2-angular-documenteditor';
import { TitleBar } from './title-bar';
import { defaultDocument, WEB_API_ACTION } from './data';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { RadioButtonComponent,CheckBoxComponent,CheckBoxModule,RadioButtonModule } from '@syncfusion/ej2-angular-buttons';

/**
 * Document Editor Component
 */
@Component({
    selector: 'control-content',
    templateUrl: 'color-picker-customization.html',
    encapsulation: ViewEncapsulation.None,
    providers: [ToolbarService],
    standalone: true,
    imports: [DocumentEditorContainerModule, SBActionDescriptionComponent, SBDescriptionComponent,CheckBoxModule, RadioButtonModule]
})
export class ColorPickerCustomizationComponent {
    public hostUrl: string = 'https://services.syncfusion.com/angular/production/api/documenteditor/';
    @ViewChild('documenteditor_default')
    public container: DocumentEditorContainerComponent;
    @ViewChild('pickerradio')
    public pickerRadio : RadioButtonComponent;
    @ViewChild('paletteradio')
    public paletteRadio : RadioButtonComponent;
    @ViewChild('showButtons')
    public showButtonsCheckBox : CheckBoxComponent;
    @ViewChild('modeSwitcher')
    public modeSwitcherCheckBox : CheckBoxComponent;
    public culture: string = 'en-US';
    titleBar: TitleBar;
    public settings: DocumentEditorSettingsModel = { showRuler:true , colorPickerSettings : { mode: 'Palette' , modeSwitcher: true , showButtons: true } };
    onCreate(): void {
        let titleBarElement: HTMLElement = document.getElementById('default_title_bar');
        this.titleBar = new TitleBar(titleBarElement, this.container.documentEditor, true);
        this.container.documentEditor.open(JSON.stringify(defaultDocument));
        this.container.documentEditor.documentName = 'Color Picker Customization';
        this.titleBar.updateDocumentTitle();
    }

    onDocumentChange(): void {
        if (!isNullOrUndefined(this.titleBar)) {
            this.titleBar.updateDocumentTitle();
        }
        this.container.documentEditor.focusIn();
    }
    public changePickerMode() : void {
        if(this.pickerRadio.checked)
        {
            this.container.documentEditorSettings.colorPickerSettings = { mode:'Picker'};
        }
    }
    public changePaletteMode() : void {
        if(this.paletteRadio.checked)
        {
            this.container.documentEditorSettings.colorPickerSettings = {mode: 'Palette'};
        }
    }
    public changeShowButtons() : void{
        this.container.documentEditorSettings.colorPickerSettings = {showButtons: this.showButtonsCheckBox.checked};
    }
    public changeModeSwitcher(): void{
        this.container.documentEditorSettings.colorPickerSettings = {modeSwitcher: this.modeSwitcherCheckBox.checked};
    }
}