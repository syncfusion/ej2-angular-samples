import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RichTextEditorUIComponent, RichTextEditorUIModule, ToolbarSettingsModel } from '@syncfusion/ej2-angular-richtexteditor-ui';
import { DialogComponent, DialogModule } from '@syncfusion/ej2-angular-popups';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'control-content',
    templateUrl: 'editor-in-dialog.html',
    standalone: true,
    imports: [ CommonModule, RichTextEditorUIModule, DialogModule, ButtonModule, SBActionDescriptionComponent, SBDescriptionComponent ]
})
export class EditorInDialogComponent {

    @ViewChild('dialog')
    public dialog: DialogComponent;

    @ViewChild('editor')
    public editor: RichTextEditorUIComponent;

    public openButtonVisible: boolean = false;

    public toolbarSettings: ToolbarSettingsModel = {
        items: [
            'Bold', 'Italic', 'Underline', '|',
            'Formats', 'BulletFormatList', 'NumberFormatList', '|',
            'Link', 'Undo', 'Redo'
        ]
    };

    public dialogButtons: Object[] = [
        {
            click: (): void => this.onSend(),
            buttonModel: {
                content: 'Send',
                isPrimary: true
            }
        },
        {
            click: (): void => this.onCancel(),
            buttonModel: {
                content: 'Cancel'
            }
        }
    ];

    public onOpenDialog(): void {
        this.dialog.show();
    }

    public onDialogOpen(): void {
        this.openButtonVisible = false;
        setTimeout((): void => {
            if (this.editor) {
                this.editor.focusIn();
            }
        }, 0);
    }

    public onDialogClose(): void {
        this.openButtonVisible = true;
    }

    private onSend(): void {
        const content: string = this.editor.getHtml();
        if (content && content.replace(/<[^>]*>/g, '').trim()) {
            const plain: string = content.replace(/<[^>]*>/g, '');
            window.alert('Message sent:\n\n' + plain);
            this.editor.value = '';
            this.editor.dataBind();
            this.dialog.hide();
        }
    }

    private onCancel(): void {
        if (this.editor) {
            this.editor.value = '';
            this.editor.dataBind();
        }
        this.dialog.hide();
    }
}