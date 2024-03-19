/**
 * Rich Text Editor Template Driven Sample
 */
import { Component, ViewChild } from '@angular/core';
import { ToolbarService, LinkService, ImageService, HtmlEditorService, RichTextEditorComponent, RichTextEditorModule, QuickToolbarService, PasteCleanupService, VideoService, AudioService, TableService } from '@syncfusion/ej2-angular-richtexteditor';
import { SBDescriptionComponent } from '../common/dp.component';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SBActionDescriptionComponent } from '../common/adp.component';
@Component({
    selector: 'control-content',
    templateUrl: 'template-driven.html',
    styleUrls: ['forms.css'],
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, QuickToolbarService, PasteCleanupService, VideoService, AudioService, TableService],
    standalone: true,
    imports: [SBActionDescriptionComponent, FormsModule, RichTextEditorModule, NgIf, ButtonModule, SBDescriptionComponent]
})
export class TemplateDrivenComponent {
    public value: string = null;

    @ViewChild('fromRTE')
    private rteEle: RichTextEditorComponent;

    rteCreated(): void {
        this.rteEle.element.focus();
    }

    onSubmit(): void {
        alert('Form submitted successfully');
    }
}
