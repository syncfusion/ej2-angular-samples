import { Component, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { RichTextEditorUIComponent, RichTextEditorUIModule } from '@syncfusion/ej2-angular-richtexteditor-ui';
import { DropDownListComponent, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { ToolbarType, ToolbarPosition, ValueFormat } from '@syncfusion/ej2-richtexteditor-ui';
import { TOOLBAR_CONTENT } from './toolbar-content';

@Component({
    selector: 'control-content',
    templateUrl: 'toolbar.html',
    standalone: true,
    imports: [RichTextEditorUIModule, DropDownListModule, CheckBoxModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class ToolbarComponent {

    @ViewChild('editor')
    public editor: RichTextEditorUIComponent;

    @ViewChild('toolbarTypeDropdown')
    public toolbarTypeDropdown: DropDownListComponent;

    @ViewChild('toolbarPositionDropdown')
    public toolbarPositionDropdown: DropDownListComponent;

    public toolbarType: ToolbarType = 'Expanded';
    public toolbarPosition: ToolbarPosition = 'Top';
    public enableFloating: boolean = true;
    public value: ValueFormat = TOOLBAR_CONTENT;

    public tools = {
        items: ['Undo', 'Redo', '|', 'Bold', 'Italic', 'Underline', 'Strikethrough', '|', 'FontColor', 'BackgroundColor', '|', 'Formats', 'Alignment', '|', 'Table' , 'Image' , 'Link', '|', 'FontName', 'FontSize','|', 'NumberFormatList', 'BulletFormatList','|','Subscript','Superscript', '|', 'ClearFormat'],
        type: this.toolbarType,
        position: this.toolbarPosition,
        enableFloating: this.enableFloating
    };

    public toolbarTypeData: { [key: string]: Object }[] = [
        { text: 'Expanded', value: 'Expanded' },
        { text: 'MultiRow', value: 'MultiRow' },
        { text: 'Scrollable', value: 'Scrollable' }
    ];

    public toolbarPositionData: { [key: string]: Object }[] = [
        { text: 'Top', value: 'Top' },
        { text: 'Bottom', value: 'Bottom' }
    ];

    public onToolbarTypeChange(args: any): void {
        this.toolbarType = args.value;
        this.tools.type = this.toolbarType;
        this.editor.toolbarSettings.type = this.toolbarType;
        this.editor.dataBind();
    }

    public onToolbarPositionChange(args: any): void {
        this.toolbarPosition = args.value;
        this.tools.position = this.toolbarPosition;
        this.editor.toolbarSettings.position = this.toolbarPosition;
        this.editor.dataBind();
    }

    public onEnableFloatingChange(args: any): void {
        this.enableFloating = args.checked;
        this.tools.enableFloating = this.enableFloating;
        this.editor.toolbarSettings.enableFloating = this.enableFloating;
        this.editor.dataBind();
    }

    constructor(@Inject('sourceFiles') sourceFiles: any) {
        sourceFiles.files = ['toolbar-content.ts'];
    }
}
