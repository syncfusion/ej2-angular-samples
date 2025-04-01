/**
 * Rich Text Editor Inline Sample
 */
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { ToolbarService, LinkService, ImageService, FormatModel, FontFamilyModel, RichTextEditorModule, PasteCleanupService, VideoService, AudioService, TableService} from '@syncfusion/ej2-angular-richtexteditor';
import { HtmlEditorService, QuickToolbarService, RichTextEditorComponent } from '@syncfusion/ej2-angular-richtexteditor';
import { CheckBoxComponent, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'control-content',
    templateUrl: 'inline.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['inline.css'],
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, QuickToolbarService, PasteCleanupService, VideoService, AudioService, TableService],
    standalone: true,
    imports: [SBActionDescriptionComponent, RichTextEditorModule, CheckBoxModule, SBDescriptionComponent]
})
export class InlineComponent {

    @ViewChild('select')
    public rteSelectObj: CheckBoxComponent;

    @ViewChild('inlineRTE')
    public rteObj: RichTextEditorComponent;

    public toolbarSettings: ToolbarModule = {
        items: ['Bold', 'Italic', 'Underline',
            'Formats', '-', 'Alignments', 'OrderedList', 'UnorderedList',
            'CreateLink']
    };
    public format: FormatModel = {
        width: 'auto'
    };
    public fontFamily: FontFamilyModel = {
        width: 'auto'
    };
    public inlineMode: object = { enable: true, onSelection: true };
    public onChangeSelect(): void {
        this.rteObj.inlineMode.onSelection = this.rteSelectObj.checked;
    }
    editorValue: string = `<h2>Inline Rich Text Editor</h2><p>Click on this text to edit dynamically. The formatting toolbar will appear only when you select the content.</p><h5>Features:</h5><ul><li><strong>Minimal UI:</strong> The editor is clean and distraction-free.</li><li><strong>Contextual Toolbar:</strong> The toolbar appears only when text is selected.</li><li><strong>Rich Formatting:</strong> Supports bold, italic, underline, lists, links, and more.</li><li><strong>Seamless Editing:</strong> Works like a native text field but with powerful styling options.</li></ul><blockquote><p>Try selecting this text to see the toolbar in action!</p></blockquote>`;
}
