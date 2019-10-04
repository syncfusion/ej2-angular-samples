import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ToolbarService, DocumentEditorContainerComponent } from '@syncfusion/ej2-angular-documenteditor';
import { TitleBar } from './title-bar';
import { dataProtection, WEB_API_ACTION } from './data';
import { ChangeEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { ColorPickerComponent, ColorPickerEventArgs } from '@syncfusion/ej2-angular-inputs';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
/**
 * Document Editor Component
 */
@Component({
    selector: 'control-content',
    templateUrl: 'document-protection.html',
    encapsulation: ViewEncapsulation.None,
    providers: [ToolbarService]
})
export class DocumentEditorProtectionComponent {
    public hostUrl: string = 'https://ej2services.syncfusion.com/production/web-services/';
    @ViewChild('documenteditor_default')
    public container: DocumentEditorContainerComponent;
    @ViewChild('colorpicker')
    public colorpicker: ColorPickerComponent;
    titleBar: TitleBar;

    userList: string[] = ['engineer@mycompany.com', 'manager@mycompany.com'];

    currentUser: string = 'engineer@mycompany.com';

    onCreate(): void {
        let titleBarElement: HTMLElement = document.getElementById('default_title_bar');
        this.titleBar = new TitleBar(titleBarElement, this.container.documentEditor, true);
        this.container.locale = 'en-US';
        this.container.serviceUrl = this.hostUrl + WEB_API_ACTION;
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