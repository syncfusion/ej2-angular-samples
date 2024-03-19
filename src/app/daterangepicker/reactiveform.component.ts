/**
 * DateRangePicker Reactive Form Sample
 */
import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgIf, DatePipe } from '@angular/common';
import { DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';

@Component({
    selector: 'control-content',
    templateUrl: 'reactiveform.html',
    styleUrls: ['./formsupport.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ReactiveFormsModule, DateRangePickerModule, NgIf, DatePipe]
})
export class ReactiveFormDateRangePickerComponent {
    skillForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.createForm();
    }
    createForm(): void {
        this.skillForm = this.fb.group({
            daterange: ['', Validators.required]
        });
    }
}