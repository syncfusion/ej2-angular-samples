/**
 * RTE Template Driven Sample
 */
import { Component, ViewChild } from '@angular/core';
import { ToolbarService, LinkService, ImageService, HtmlEditorService, RichTextEditorComponent } from '@syncfusion/ej2-angular-richtexteditor';
@Component({
    selector: 'control-content',
    templateUrl: 'template-driven.html',
    styleUrls: ['forms.css'],
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService]
})
export class TemplateDrivenComponent {
    public value: any = null;
    @ViewChild('fromRTE') rteEle: RichTextEditorComponent;

    rteCreated(): void {
        this.rteEle.element.focus();
    }

    onSubmit(): void {
      alert('Form submitted successfully');
    }
}