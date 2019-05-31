import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaskedTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { SharedModule } from '../common/shared.module';

import { DefaultMaskedTextboxController } from './default.component';
import { CustomMaskedTextboxController } from './custom-mask.component';
import { FormatMaskedTextboxController } from './formats.component';

export const maskedTextBoxAppRoutes: Object[] = [
    { path: ':theme/maskedtextbox/default', component: DefaultMaskedTextboxController, name: 'Default Functionalities', category: 'Input Mask', description: "The Masked Textbox allows users to enter only the valid input based on the provided mask format such as Phone number, Country ISO code, Date, Time and so on." },
    { path: ':theme/maskedtextbox/custom-mask', component: CustomMaskedTextboxController, name: 'Custom Mask', category: 'Input Mask', description: "The custom mask is done using custom characters as mask elements. Time format and IP address fields are achieved using the custom mask literals and regex." },
    { path: ':theme/maskedtextbox/formats', component: FormatMaskedTextboxController, name: 'Formats', category: 'Input Mask', description: "This sample demonstrates the usage of different mask formats through the properties panel. You can also get the value and raw value of the masked textbox." }
];

export const MaskedTextBoxRouter: ModuleWithProviders = RouterModule.forChild(maskedTextBoxAppRoutes);

@NgModule({
    imports: [MaskedTextBoxRouter, MaskedTextBoxModule, SharedModule, FormsModule],
    declarations: [
        DefaultMaskedTextboxController,
        CustomMaskedTextboxController,
        FormatMaskedTextboxController
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MaskedTextBoxSampleModule {
}