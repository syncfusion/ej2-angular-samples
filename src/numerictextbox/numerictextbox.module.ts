import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';

import { DefaultTextboxController } from './default.component';
import { FormatTextboxController } from './custom-format.component';
import { RestrictTextboxController } from './restrict-decimals.component';
import { RangeTextboxController } from './range-validation.component';
import { InternationalizationController } from './internationalization.component';
import { SharedModule } from '../common/shared.module';


export const numericAppRoutes: Object[] = [
    { path: ':theme/numerictextbox/default', component: DefaultTextboxController, name: 'Default Functionalities', category: 'NumericTextBox', description: "This demo for Essential JS2 NumericTextBox control shows the default functionalities of NumericTextBox component." },
    { path: ':theme/numerictextbox/range-validation', component: RangeTextboxController, name: 'Range Validation', category: 'NumericTextBox',  description: "This demo for Essential JS2 NumericTextBox control shows the range validation functionalities of NumericTextBox component." },
    { path: ':theme/numerictextbox/custom-format', component: FormatTextboxController, name: 'Custom Format', category: 'NumericTextBox', description: "This demo for Essential JS2 NumericTextBox control shows the custom format functionalities of NumericTextBox component." },
    { path: ':theme/numerictextbox/restrict-decimals', component: RestrictTextboxController, name: 'Restrict Decimals', category: 'NumericTextBox', description: "This demo for Essential JS2 NumericTextBox control shows to restrict decimal value in NumericTextBox component." }
];

export const NumericRouter: ModuleWithProviders = RouterModule.forChild(numericAppRoutes);

@NgModule({
    imports: [NumericTextBoxModule, NumericRouter, SharedModule],
    declarations: [
        DefaultTextboxController,
        FormatTextboxController,
        RestrictTextboxController,
        RangeTextboxController,
        InternationalizationController
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NumericModule {
}