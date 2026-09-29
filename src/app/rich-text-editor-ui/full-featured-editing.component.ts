import { Component, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { RichTextEditorUIComponent, RichTextEditorUIModule, SlashCommandService, SlashCommandSettingsModel, ValueFormat } from '@syncfusion/ej2-angular-richtexteditor-ui';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { FULL_FEATURED_CONTENT } from './full-featured-content';

@Component({
    selector: 'control-content',
    templateUrl: 'full-featured-editing.html',
    standalone: true,
    imports: [RichTextEditorUIModule, SBActionDescriptionComponent, SBDescriptionComponent],
    providers: [SlashCommandService]
})
export class FullFeaturedEditingComponent {

    @ViewChild('editor')
    public editor: RichTextEditorUIComponent;

    public value: ValueFormat = FULL_FEATURED_CONTENT;

    public tools = {
        items: [ 'Undo', 'Redo', '|', 'Bold', 'Italic', 'Underline', 'Strikethrough', 'InlineCode', '|', 'Link', 'Image', 'Table', 'CodeBlock', 'HorizontalLine', 'Quote', '|', 'Formats', 'Alignment', 'Callout', '|', 'BulletFormatList', 'NumberFormatList', 'Checklist', '|', 'Outdent', 'Indent', '|', 'FontColor', 'BackgroundColor', 'FontName', 'FontSize', '|', 'LowerCase', 'UpperCase', '|', 'Superscript', 'Subscript', '|', 'ClearFormat']
    };

    public quickTools = {
        text: ['Bold', 'Italic', 'Underline', 'Strikethrough', 'BackgroundColor', 'FontColor', '|', 'Formats', '|', 'Link', 'Table', 'Image', 'ClearFormat']
    };

    public slashCommandSettings: SlashCommandSettingsModel = {
        enable: true
    };

    constructor(@Inject('sourceFiles') sourceFiles: any) {
        sourceFiles.files = ['full-featured-content.ts'];
    }
}
