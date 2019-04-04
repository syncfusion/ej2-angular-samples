import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DefaultFormValidatorComponent } from './default.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../common/shared.module';

export const formValidatorAppRoutes: Object[] = [

    { path: ':theme/form-validator/default', component: DefaultFormValidatorComponent, name: 'Reactive FormValidator', order: '01', category: 'Form Validator' }
];

export const formValidatorRouter: ModuleWithProviders = RouterModule.forChild(formValidatorAppRoutes);

@NgModule({
    imports: [formValidatorRouter, SharedModule, FormsModule, ReactiveFormsModule, CommonModule],
    declarations: [
        DefaultFormValidatorComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

/**
 * FormValidator Sample
 */

export class FormValidatorModule { }
