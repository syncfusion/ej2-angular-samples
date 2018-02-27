import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NumericTextBoxModule } from '@syncfusion/ej2-ng-inputs';

import { DefaultTextboxController } from './default.component';
import { FormatTextboxController } from './format.component';
import { RestrictTextboxController } from './restrict.component';
import { RangeTextboxController } from './range.component';
import { InternationalizationController } from './internationalization.component';
import { SharedModule } from '../common/shared.module';


export const numericAppRoutes: Object[] = [
    { path: ':theme/numerictextbox/default', component: DefaultTextboxController, name: 'Default Functionalities', category: 'NumericTextBox' },
    { path: ':theme/numerictextbox/range', component: RangeTextboxController, name: 'Range Validation', category: 'NumericTextBox' },
    { path: ':theme/numerictextbox/format', component: FormatTextboxController, name: 'Custom Format', category: 'NumericTextBox' },
    { path: ':theme/numerictextbox/restrict', component: RestrictTextboxController, name: 'Restrict Decimals', category: 'NumericTextBox' }
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