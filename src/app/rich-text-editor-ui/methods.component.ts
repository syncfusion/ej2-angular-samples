import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { RichTextEditorUIComponent, RichTextEditorUIModule } from '@syncfusion/ej2-angular-richtexteditor-ui';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'control-content',
    templateUrl: 'methods.html',
    styleUrls: ['methods.css'],
    standalone: true,
    imports: [RichTextEditorUIModule, ButtonModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class MethodsComponent {

    @ViewChild('editor')
    public editor: RichTextEditorUIComponent;

    public methodResult: string = '';

    public tools = {
        items: ['Bold', 'Italic', 'Underline', '|', 'FontColor', 'BackgroundColor', '|', 'Formats', '|', 'NumberFormatList', 'BulletFormatList', '|', 'Undo', 'Redo']
    };

    public onGetHtml(): void {
        this.methodResult = this.editor.getHtml();
    }

    public onGetText(): void {
        this.methodResult = this.editor.getText();
    }

    public onGetDocument(): void {
        this.methodResult = JSON.stringify(this.editor.getDocument());
    }

    public onFocus(): void {
        this.editor.focusIn();
        this.methodResult = 'editor focused';
    }

    public onBlur(): void {
        this.editor.focusOut();
        this.methodResult = 'editor blurred';
    }
}
