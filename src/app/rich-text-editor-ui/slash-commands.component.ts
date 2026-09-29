import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { RichTextEditorUIComponent, RichTextEditorUIModule, SlashCommandService, SlashCommandSettingsModel } from '@syncfusion/ej2-angular-richtexteditor-ui';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'control-content',
    templateUrl: 'slash-commands.html',
    standalone: true,
    imports: [RichTextEditorUIModule, SBActionDescriptionComponent, SBDescriptionComponent],
    providers: [SlashCommandService]
})
export class SlashCommandsComponent {

    @ViewChild('editor')
    public editor: RichTextEditorUIComponent;

    public placeholder: string = 'Type "/" and choose format.';

    public slashCommandSettings: SlashCommandSettingsModel = {
        enable: true,
        items: [
            'Paragraph', 'Heading 1', 'Heading 2', 'Heading 3', 'Heading 4',
            'NumberedList', 'BulletList', 'Blockquote', 'Table', 'Link', 'Image',
        ]
    };
}
