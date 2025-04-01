/**
 * Rich Text Editor Default Functionality Sample
 */
import { Component } from '@angular/core';
import { ToolbarService, LinkService, ImageService, HtmlEditorService, RichTextEditorModule, QuickToolbarService, VideoService, AudioService, TableService, PasteCleanupService } from '@syncfusion/ej2-angular-richtexteditor';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
@Component({
    selector: 'control-content',
    templateUrl: 'rich-text-editor.html',
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, QuickToolbarService, VideoService, AudioService, TableService, PasteCleanupService],
    standalone: true,
    imports: [SBActionDescriptionComponent, RichTextEditorModule, SBDescriptionComponent]
})
export class DefaultRTEComponent {
    editorValue: string = `<h2>Welcome to the Rich Text Editor Demo!</h2><p>The Rich Text Editor control is a WYSIWYG ("what you see is what you get") editor that provides the best user experience to create and update the content. Users can format their content using standard toolbar commands.</p><h4>Flexible Editing!</h4><p>For a better editing experience, the Angular Rich Text Editor component offers a variety of tools and choices. So, you can quickly insert <strong>images</strong>, <strong>videos</strong>, <strong>hyperlinks</strong>, and <strong>tables</strong>; <strong>merge table cells</strong>; and configure.</p><p>You can easily format the text and paragraphs by setting the editor’s foreground and <strong>background colors</strong>, <strong>font type</strong>, <strong>italicization</strong>, <strong>adding ordered </strong>and <strong>unordered custom lists</strong>, <strong>underlining</strong>, <strong>strikethrough</strong>, and <strong>bolding</strong>.<br><br></p><p><img alt="Editor Features Overview" src="https://cdn.syncfusion.com/ej2/richtexteditor-resources/RTE-Overview.png" width="400" height="200" class="e-img-left"></p>`;
}
