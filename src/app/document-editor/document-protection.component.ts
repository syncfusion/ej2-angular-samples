import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ToolbarService, DocumentEditorContainerComponent, DocumentEditorContainerModule, DocumentEditorSettingsModel } from '@syncfusion/ej2-angular-documenteditor';
import { TitleBar } from './title-bar';
import { dataProtection, WEB_API_ACTION } from './data';
import { ChangeEventArgs, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { ColorPickerComponent, ColorPickerEventArgs, ColorPickerModule } from '@syncfusion/ej2-angular-inputs';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
/**
 * Document Editor Component
 */
@Component({
    selector: 'control-content',
    templateUrl: 'document-protection.html',
    encapsulation: ViewEncapsulation.None,
    providers: [ToolbarService],
    standalone: true,
    imports: [DocumentEditorContainerModule, DropDownListModule, ColorPickerModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class DocumentEditorProtectionComponent {
    public hostUrl: string = 'https://services.syncfusion.com/angular/production/api/documenteditor/';
    public settings: DocumentEditorSettingsModel = { showRuler:true  };
    @ViewChild('documenteditor_default')
    public container: DocumentEditorContainerComponent;
    @ViewChild('colorpicker')
    public colorpicker: ColorPickerComponent;
    public culture: string = 'en-US';
    titleBar: TitleBar;

    userList: string[] = ['engineer@mycompany.com', 'manager@mycompany.com'];

    currentUser: string = 'engineer@mycompany.com';

    onCreate(): void {
        let titleBarElement: HTMLElement = document.getElementById('default_title_bar');
        this.titleBar = new TitleBar(titleBarElement, this.container.documentEditor, true);
        this.container.documentEditor.open(JSON.stringify(dataProtection));
        this.container.documentEditor.documentName = 'Document Protection';
        this.container.documentEditor.currentUser = 'engineer@mycompany.com';
        this.colorpicker.value = this.container.documentEditor.userColor;
        this.titleBar.updateDocumentTitle();
    }

    onDocumentChange(): void {
        if (!isNullOrUndefined(this.titleBar)) {
            this.titleBar.updateDocumentTitle();
        }
        this.container.documentEditor.focusIn();
    }

    onChange(event: ChangeEventArgs): void {
        this.container.documentEditor.currentUser = event.value as string;
    }

    onColorChange(args: ColorPickerEventArgs): void {
        this.container.documentEditor.userColor = args.currentValue.hex;
    }
}