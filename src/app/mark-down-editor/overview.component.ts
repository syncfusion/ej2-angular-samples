/**
 * Rich Text Editor Markdown Preview Sample
 */
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { addClass, removeClass, Browser } from '@syncfusion/ej2-base';
import { RichTextEditorComponent, ToolbarService, LinkService, EditorMode, ToolbarType, RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor';
import { ImageService, MarkdownEditorService, TableService } from '@syncfusion/ej2-angular-richtexteditor';
import { createElement, KeyboardEventArgs, isNullOrUndefined } from '@syncfusion/ej2-base';
import * as Marked from 'marked';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { SplitterComponent, SplitterModule } from '@syncfusion/ej2-angular-layouts';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'control-content',
    templateUrl: 'overview.html',
    styleUrls: ['markdown-preview.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [ToolbarService, LinkService, ImageService, TableService, MarkdownEditorService],
    standalone: true,
    imports: [SBActionDescriptionComponent, SplitterModule, RichTextEditorModule, SBDescriptionComponent]
})
export class MarkdownOverviewComponent {

    @ViewChild('defaultRTE')
    public rteObj: RichTextEditorComponent;
    @ViewChild('splitterInstance') splitterObj: SplitterComponent;
    public srcArea: any;
    public textArea: any;
    public mode: EditorMode = 'Markdown';
    public placeholder: string = 'Enter the text here...';
    public tools: ToolbarModule = {
        type: ToolbarType.Expand,
        enableFloating :false,
        items: ['Bold', 'Italic', 'StrikeThrough', '|', 'Formats', 'Blockquote', 'OrderedList',
        'UnorderedList', '|', 'CreateLink', 'Image', 'CreateTable',
        '|', 'Undo', 'Redo']
    };
    public onCreate(): void {
        setTimeout(()=>{
            this.rteObj.refreshUI();
            this.textArea = this.rteObj.contentModule.getEditPanel();
            this.srcArea = document.querySelector('.source-code');
            this.updateValue();
        },0)
    }
    public onChange(): void {
        this.updateValue();
    }
    public resizing(): void {
        this.rteObj.refreshUI();
    }
    public updateValue(): void {
        this.srcArea.innerHTML = (Marked as any).marked((this.rteObj.contentModule.getEditPanel() as HTMLTextAreaElement).value);
    }
    public updateOrientation(): void {
        if (Browser.isDevice) {
            this.splitterObj.orientation = 'Vertical';
            (document.body.querySelector('.heading') as HTMLElement).style.width = 'auto';
        }
    }
}
