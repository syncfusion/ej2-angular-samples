import { Component, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { RichTextEditorUIComponent, RichTextEditorUIModule, ValueFormat, ToolbarSettingsModel } from '@syncfusion/ej2-angular-richtexteditor-ui';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { EDITOR_CONTENT } from './basic-editing-content';

@Component({
    selector: 'control-content',
    templateUrl: 'basic-editing.html',
    standalone: true,
    imports: [RichTextEditorUIModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class BasicEditingComponent {

    @ViewChild('editor')
    public editor: RichTextEditorUIComponent;

    public value: ValueFormat = EDITOR_CONTENT;

    public tools: ToolbarSettingsModel =  {
        items: [ 'Undo', 'Redo', '|', 'Bold', 'Italic', 'Underline', 'Strikethrough', 'Subscript', 'Superscript', '|', 'FontColor', 'BackgroundColor',  '|', 'Formats', 'Alignment', '|', 'Link', 'Image', 'Table' , '|', 'NumberedList', 'BulletList', '|', 'ClearFormat']
    };

    constructor(@Inject('sourceFiles') sourceFiles: any) {
        sourceFiles.files = ['basic-editing-content.ts'];
    }
}
