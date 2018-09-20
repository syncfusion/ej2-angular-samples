/**
 * RTE Inline Sample
 */
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { ToolbarService, ToolbarType, LinkService, ImageService } from '@syncfusion/ej2-angular-richtexteditor';
import { HtmlEditorService, QuickToolbarService, RichTextEditorComponent } from '@syncfusion/ej2-angular-richtexteditor';
import { CheckBoxComponent } from '@syncfusion/ej2-angular-buttons';

@Component({
    selector: 'control-content',
    templateUrl: 'inline.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['inline.css'],
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, QuickToolbarService]
})
export class InlineComponent {
    @ViewChild('select')
    public rteSelectObj: CheckBoxComponent;
    @ViewChild('inlineRTE')
    public rteObj: RichTextEditorComponent;
    public inlineMode: object = { enable: true, onSelection: true };
    public onChangeSelect(): void {
        this.rteObj.inlineMode.onSelection = this.rteSelectObj.checked;
        this.rteObj.dataBind();
    }
    public toolbarSettings: Object = {
        items: ['Bold', 'Italic', 'Underline',
            'Formats', '-', 'Alignments', 'OrderedList', 'UnorderedList',
            'CreateLink']
    };
    public format: Object = {
        width: 'auto'
    };
    public fontFamily: Object = {
        width: 'auto'
    };
}