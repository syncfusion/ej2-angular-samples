import { FormValidator, FormValidatorModel } from '@syncfusion/ej2-inputs';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

/**
 * Default Form Validator Component
 */
@Component({
    selector: 'control-content',
    templateUrl: 'default.html',
    encapsulation: ViewEncapsulation.None
})

export class DefaultFormValidatorComponent implements OnInit {

    private formValidator: FormValidatorModel;

    ngOnInit(): void {
        this.formValidator = {
            // Initialize the custom placement
            customPlacement: (inputElement: HTMLElement, errorElement: HTMLElement) => {
                inputElement.parentElement.appendChild(errorElement);
            }
        };
        // Initialize form-validator
        let formObj: FormValidator;
        formObj = new FormValidator('#formId', this.formValidator);
    }
}