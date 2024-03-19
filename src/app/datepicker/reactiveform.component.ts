/**
 * DatePicker Reactive Form Sample
 */
import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '@syncfusion/ej2-angular-buttons';
import { NgIf, DatePipe } from '@angular/common';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';

@Component({
    selector: 'control-content',
    templateUrl: 'reactiveform.html',
    styleUrls: ['./formsupport.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ReactiveFormsModule, DatePickerModule, NgIf, DatePipe]
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