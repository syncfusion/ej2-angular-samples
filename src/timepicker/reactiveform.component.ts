/**
 * DatePicker Reactive Form Sample
 */

import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'control-content',
    templateUrl: 'reactiveform.html',
    styleUrls: ['./formsupport.css'],
    encapsulation: ViewEncapsulation.None
})
export class ReactiveFormTimePickerComponent {
    skillForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.createForm();
    }
    createForm() : void {
        this.skillForm = this.fb.group({
            time: ['', Validators.required]
        });
    }
}