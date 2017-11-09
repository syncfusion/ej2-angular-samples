import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DefaultFormValidatorComponent } from './default.component';
import { SharedModule } from '../common/shared.module';

export const formValidatorAppRoutes: Object[] = [
    {
        path: ':theme/form-validator/default',
        component: DefaultFormValidatorComponent,
        name: 'Default Functionalities',
        category: 'Form Validator'
    }
];

export const formValidatorRouter: ModuleWithProviders = RouterModule.forChild(formValidatorAppRoutes);

@NgModule({
    imports: [formValidatorRouter, SharedModule],
    declarations: [
        DefaultFormValidatorComponent
    ]
})

/**
 * FormValidator Sample
 */

export class FormValidatorModule { }