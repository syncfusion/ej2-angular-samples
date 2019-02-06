/* tslint:disable: member-ordering forin */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, AbstractControl } from '@angular/forms';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'control-content',
  templateUrl: './default.html'
})


export class DefaultFormValidatorComponent implements OnInit {

  reactForm: FormGroup;

  constructor() {
    this.reactForm = new FormGroup({
      'check': new FormControl('', [FormValidators.required]),
      'email_check': new FormControl('', [FormValidators.email]),
      'date_check': new FormControl('', [FormValidators.date]),
      'city': new FormControl('', [FormValidators.required]),
      'state': new FormControl('', [FormValidators.required]),
      'Address':new FormControl(''),
    });
  }

  ngOnInit(): void {
    let formId: HTMLElement = <HTMLElement>document.getElementById('formId');
    document.getElementById('formId').addEventListener(
      'submit',
      (e: Event) => {
        e.preventDefault();
        if (this.reactForm.valid) {
          alert('Customer details added!');
          this.reactForm.reset();
        } else {
          // validating whole form
          Object.keys(this.reactForm.controls).forEach(field => {
            const control = this.reactForm.get(field);
            control.markAsTouched({ onlySelf: true });
          });
        }
      });
  }

  get check() { return this.reactForm.get('check'); }
  get email_check() { return this.reactForm.get('email_check'); }
  get date_check() { return this.reactForm.get('date_check'); }
  get city() { return this.reactForm.get('city'); }
  get state() { return this.reactForm.get('state'); }
  get Address() { return this.reactForm.get('Address'); }

}