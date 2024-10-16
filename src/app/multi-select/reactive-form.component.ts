/**
 * MultiSelect Reactive Form Sample
 */
import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SBDescriptionComponent } from '../common/dp.component';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { NgIf } from '@angular/common';
import { MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'control-content',
    templateUrl: 'reactive-form.html',
    styleUrls: ['./form-support.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, FormsModule, ReactiveFormsModule, MultiSelectModule, NgIf, ButtonModule, SBDescriptionComponent]
})
export class ReactiveFormMultiSelectComponent {
    public autoreactiveskillset: string[] = [
        'ASP.NET', 'ActionScript', 'Basic',
        'C++' , 'C#' , 'dBase' , 'Delphi' ,
        'ESPOL' , 'F#' , 'FoxPro' , 'Java',
        'J#' , 'Lisp' , 'Logo' , 'PHP'
    ];
    public autoreactiveplaceholder: String = 'Select book';
    skillForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.createForm();
    }
    createForm() : void {
        this.skillForm = this.fb.group({
            skillname: ['', Validators.required],
            sname: ['', Validators.required],
            smail: ['', [Validators.required, Validators.email]]
        });
    }
    onfocus(element: FocusEvent) : void {
        let target: HTMLInputElement = element.target as HTMLInputElement;
        let parentNode: HTMLElement = target.parentNode as HTMLElement;
        if (parentNode.classList.contains('e-input-in-wrap')) {
            parentNode = (parentNode.parentNode as HTMLElement);
        }
        parentNode.classList.add('e-input-focus');
        parentNode.querySelector('.e-float-text').classList.add('e-label-top');
        parentNode.querySelector('.e-float-text').classList.remove('e-label-bottom');
    }
    onblur(element: FocusEvent) : void {
        let target: HTMLInputElement = element.target as HTMLInputElement;
        let parentNode: HTMLElement = target.parentNode as HTMLElement;
        if (parentNode.classList.contains('e-input-in-wrap')) {
            (parentNode.parentNode as HTMLElement).classList.remove('e-input-focus');
        }
        parentNode.classList.remove('e-input-focus');
        if (target.value === null || target.value === '') {
            parentNode.querySelector('.e-float-text').classList.remove('e-label-top');
            parentNode.querySelector('.e-float-text').classList.add('e-label-bottom');
        }else {
            parentNode.querySelector('.e-float-text').classList.add('e-label-top');
            parentNode.querySelector('.e-float-text').classList.remove('e-label-bottom');
        }
    }
    onreset(element: MouseEvent) : void {
        let parentNode: NodeListOf<HTMLElement> = document.getElementsByClassName('box-form')[0].querySelectorAll('.e-float-text');
        for (let i: number = 0; i < parentNode.length; i++) {
            parentNode[i].classList.remove('e-label-top');
            parentNode[i].classList.add('e-label-bottom');
        }
    }
}