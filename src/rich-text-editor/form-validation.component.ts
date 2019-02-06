/**
 * RTE Form Validation Sample
 */
import { Component, OnInit } from '@angular/core';
import { FormValidator, FormValidatorModel } from '@syncfusion/ej2-inputs';
import { ToolbarService, LinkService, ImageService, HtmlEditorService } from '@syncfusion/ej2-angular-richtexteditor';
@Component({
    selector: 'control-content',
    templateUrl: 'form-validation.html',
    styleUrls: ['forms.css'],
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService]
})
export class FormValidationComponent implements OnInit {
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