/**
 * RTE Reactive Form Sample
 */
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToolbarService, LinkService, ImageService, HtmlEditorService, RichTextEditorComponent } from '@syncfusion/ej2-angular-richtexteditor';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
    selector: 'control-content',
    templateUrl: 'reactive-form.html',
    styleUrls: ['forms.css'],
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService]
})
export class FormComponent implements OnInit {
    rteForm: FormGroup;
    @ViewChild('fromRTE') rteEle: RichTextEditorComponent;

    constructor(private fb: FormBuilder) {
        // <--- inject FormBuilder
    }
    ngOnInit(): void {
        this.rteForm = new FormGroup({
            'name': new FormControl(null, Validators.required)
        });
    }
    rteCreated(): void {
        this.rteEle.element.focus();
    }
    onSubmit(): void {
        alert('Form submitted successfully');
    }
}