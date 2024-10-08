/**
 * DatePicker Reactive Form Sample
 */

import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgIf, DatePipe } from '@angular/common';
import { TimePickerModule } from '@syncfusion/ej2-angular-calendars';

@Component({
    selector: 'control-content',
    templateUrl: 'reactiveform.html',
    styleUrls: ['./formsupport.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ReactiveFormsModule, TimePickerModule, NgIf, DatePipe]
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