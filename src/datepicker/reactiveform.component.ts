/**
 * DatePicker Reactive Form Sample
 */
import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonComponent } from '@syncfusion/ej2-angular-buttons';

@Component({
    selector: 'control-content',
    templateUrl: 'reactiveform.html',
    styleUrls: ['./formsupport.css'],
    encapsulation: ViewEncapsulation.None
})
export class ReactiveFormDatePickerComponent {
    skillForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.createForm();
    }
    createForm(): void {
        this.skillForm = this.fb.group({
            date: ['', Validators.required]
        });
    }
}