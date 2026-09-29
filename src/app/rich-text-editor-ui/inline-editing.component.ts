import { Component, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { RichTextEditorUIComponent, RichTextEditorUIModule, ValueFormat } from '@syncfusion/ej2-angular-richtexteditor-ui';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { INLINE_EDITING_CONTENT } from './inline-editing-content';

@Component({
    selector: 'control-content',
    templateUrl: 'inline-editing.html',
    standalone: true,
    imports: [RichTextEditorUIModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class InlineEditingComponent {

    @ViewChild('editor')
    public editor: RichTextEditorUIComponent;

    public value: ValueFormat = INLINE_EDITING_CONTENT;

    public tools = {
        enable: false
    };

    public quickToolbarSettings = {
        text: ['Undo', 'Redo', '|', 'Bold', 'Italic', 'Underline', 'Strikethrough', '|', 'FontColor', 'BackgroundColor', '|', 'Formats', 'Alignment', '|', 'Table' , 'Image' , 'Link', '|', 'FontName', 'FontSize','|', 'NumberFormatList', 'BulletFormatList','|','Subscript','Superscript']
    };

    constructor(@Inject('sourceFiles') sourceFiles: any) {
        sourceFiles.files = ['inline-editing-content.ts'];
    }
}
