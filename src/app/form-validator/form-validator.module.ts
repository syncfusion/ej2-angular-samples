import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DefaultFormValidatorComponent } from './default.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


export const formValidatorAppRoutes: Object[] = [

    { path: ':theme/form-validator/default', component: DefaultFormValidatorComponent, name: 'Reactive FormValidator', order: '01', category: 'Form Validator' }
];

export const FormValidatorModule: ModuleWithProviders<any> = RouterModule.forChild(formValidatorAppRoutes);


