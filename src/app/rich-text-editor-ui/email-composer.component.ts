import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RichTextEditorUIComponent, RichTextEditorUIModule, SlashCommandService, SlashCommandSettingsModel, ToolbarSettingsModel } from '@syncfusion/ej2-angular-richtexteditor-ui';
import { MultiSelectModule, MultiSelectComponent } from '@syncfusion/ej2-angular-dropdowns';
import { ToastModule, ToastComponent } from '@syncfusion/ej2-angular-notifications';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'control-content',
    templateUrl: 'email-composer.html',
    styleUrls: ['email-composer.css'],
    standalone: true,
    imports: [ FormsModule, RichTextEditorUIModule, MultiSelectModule, ToastModule, ButtonModule, SBActionDescriptionComponent, SBDescriptionComponent],
    providers: [SlashCommandService]
})
export class EmailComposerComponent {

    @ViewChild('editor')
    public editor: RichTextEditorUIComponent;

    @ViewChild('mailToast')
    public mailToast: ToastComponent;

    @ViewChild('toRecipient')
    public toRecipient: MultiSelectComponent;

    @ViewChild('ccRecipient')
    public ccRecipient: MultiSelectComponent;

    public subject: string = '';

    public emailData: { [key: string]: Object }[] = [
        { Name: 'Selma Rose', Eimg: '2', EmailId: 'selma@gmail.com' },
        { Name: 'Maria', Eimg: '1', EmailId: 'maria@gmail.com' },
        { Name: 'Russo Kay', Eimg: '8', EmailId: 'russo@gmail.com' },
        { Name: 'Robert', Eimg: 'dp', EmailId: 'robert@gmail.com' },
        { Name: 'Camden Kate', Eimg: '9', EmailId: 'camden@gmail.com' },
        { Name: 'Garth', Eimg: '7', EmailId: 'garth@gmail.com' },
        { Name: 'Andrew James', Eimg: 'pic04', EmailId: 'james@gmail.com' },
        { Name: 'Olivia', Eimg: '5', EmailId: 'olivia@gmail.com' },
        { Name: 'Sophia', Eimg: '6', EmailId: 'sophia@gmail.com' },
        { Name: 'Margaret', Eimg: '3', EmailId: 'margaret@gmail.com' },
        { Name: 'Ursula Ann', Eimg: 'dp', EmailId: 'ursula@gmail.com' },
        { Name: 'Laura Grace', Eimg: '4', EmailId: 'laura@gmail.com' },
        { Name: 'Albert', Eimg: 'pic03', EmailId: 'albert@gmail.com' },
        { Name: 'William', Eimg: '10', EmailId: 'william@gmail.com' }
    ];

    public emailFields: Object = { text: 'Name', value: 'EmailId' };

    public getItemImage(item: { [key: string]: Object } | undefined): string {
        const eimg = item && (item as any).Eimg ? String((item as any).Eimg) : 'dp';
        return `https://ej2.syncfusion.com/demos/src/rich-text-editor/images/${eimg}.png`;
    }

    public toolbarSettings: ToolbarSettingsModel = {
        items: [
            'Undo', 'Redo', '|',
            'Bold', 'Italic', 'Underline', 'Strikethrough', '|',
            'FontColor', 'BackgroundColor', '|',
            'Formats', 'Alignment', '|',
            'FontName', 'FontSize', '|',
            'NumberFormatList', 'BulletFormatList', '|',
            'Table', 'Image', 'Link', '|',
            'Subscript', 'Superscript'
        ]
    };

    public slashCommandSettings: SlashCommandSettingsModel = {
        enable: true
    };

    public onSend(): void {
        this.clearComposer();
        this.editor.value = '';
        this.editor.refresh();
        this.showToast('Mail Composer', 'Mail sent successfully.');
    }

    public onDiscard(): void {
        this.clearComposer();
        this.editor.value = '';
        this.editor.refresh();
        this.showToast('Mail Composer', 'Mail discarded. Composer cleared.');
    }

    private clearComposer(): void {
        this.subject = '';
        if (this.toRecipient) {
            this.toRecipient.value = [];
            this.toRecipient.dataBind();
        }
        if (this.ccRecipient) {
            this.ccRecipient.value = [];
            this.ccRecipient.dataBind();
        }
    }

    private showToast(title: string, message: string): void {
        if (this.mailToast) {
            this.mailToast.show({
                title,
                content: message,
                cssClass: 'e-toast-success'
            });
        }
    }
}
