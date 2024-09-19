/**
 * Rich Text Editor Reactive Form Sample
 */
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToolbarService, LinkService, ImageService, HtmlEditorService, RichTextEditorComponent, RichTextEditorModule, QuickToolbarService, PasteCleanupService, VideoService, AudioService, TableService } from '@syncfusion/ej2-angular-richtexteditor';
import { FormBuilder, FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SBDescriptionComponent } from '../common/dp.component';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { NgIf } from '@angular/common';
import { SBActionDescriptionComponent } from '../common/adp.component';
@Component({
    selector: 'control-content',
    templateUrl: 'reactive-form.html',
    styleUrls: ['forms.css'],
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, QuickToolbarService, PasteCleanupService, VideoService, AudioService, TableService],
    standalone: true,
    imports: [SBActionDescriptionComponent, FormsModule, ReactiveFormsModule, RichTextEditorModule, NgIf, ButtonModule, SBDescriptionComponent]
})
export class FormComponent implements OnInit {

    rteForm: FormGroup;

    @ViewChild('fromRTE')
    private rteEle: RichTextEditorComponent;

    constructor(private fb: FormBuilder) {
        // <--- inject FormBuilder
    }

    ngOnInit(): void {
        this.rteForm = new FormGroup({
            'name': new FormControl(null, [Validators.required, this.contentValidator()])
        });
    }

    rteCreated(): void {
        this.rteEle.element.focus();
    }

    onSubmit(): void {
        alert('Form submitted successfully');
        this.rteForm.reset();
    }

    contentValidator() {
        return (control: FormControl) => {
            const content = control.value || '';
            const textContent = this.removeHtmlTags(content).replace(/\s+/g, '');
            const imgElements = this.countImageTags(content);
            const adjustedLength = textContent.length + imgElements;
            return adjustedLength >= 20 ? null : { minLength: true };
        };
    }

    removeHtmlTags(input: string): string {
        const div = document.createElement('div');
        div.innerHTML = input;
        return div.textContent || div.innerText || '';
    }

    countImageTags(input: string): number {
        const div = document.createElement('div');
        div.innerHTML = input;
        return div.getElementsByTagName('img').length;
    }
}
