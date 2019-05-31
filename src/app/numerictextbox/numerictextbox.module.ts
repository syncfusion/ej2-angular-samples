import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';

import { DefaultTextboxController } from './default.component';
import { FormatTextboxController } from './custom-format.component';
import { RestrictTextboxController } from './restrict-decimals.component';
import { RangeTextboxController } from './range-validation.component';
import { SharedModule } from '../common/shared.module';


export const numericAppRoutes: Object[] = [
    { path: ':theme/numerictextbox/default', component: DefaultTextboxController, name: 'Default Functionalities', category: 'Numeric Textbox', description: "The NumericTextBox is used to get the numbered inputs from the users and the currency and percentage text boxes to get the currency and percentage inputs." },
    { path: ':theme/numerictextbox/range-validation', component: RangeTextboxController, name: 'Range Validation', category: 'Numeric Textbox',  description: "The NumericTextBox has options to restrict the input value between a specific range using min, max, and strictMode properties." },
    { path: ':theme/numerictextbox/custom-format', component: FormatTextboxController, name: 'Custom Format', category: 'Numeric Textbox', description: "The NumericTextBox provides an option to customize the display format of the numeric value using the format property. " },
    { path: ':theme/numerictextbox/restrict-decimals', component: RestrictTextboxController, name: 'Restrict Decimals', category: 'Numeric Textbox', description: "The NumericTextBox provides an option to restrict the number of decimal values, by using the decimals property. So, it can only accept the integer value alone." }
];

export const NumericRouter: ModuleWithProviders = RouterModule.forChild(numericAppRoutes);

@NgModule({
    imports: [NumericTextBoxModule, NumericRouter, SharedModule],
    declarations: [
        DefaultTextboxController,
        FormatTextboxController,
        RestrictTextboxController,
        RangeTextboxController,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NumericModule {
}