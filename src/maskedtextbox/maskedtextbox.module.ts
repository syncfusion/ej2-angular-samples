import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaskedTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { SharedModule } from '../common/shared.module';

import { DefaultMaskedTextboxController } from './default.component';
import { CustomMaskedTextboxController } from './custom-mask.component';
import { FormatMaskedTextboxController } from './formats.component';

export const maskedTextBoxAppRoutes: Object[] = [
    { path: ':theme/maskedtextbox/default', component: DefaultMaskedTextboxController, name: 'Default Functionalities', category: 'MaskedTextBox', description: "This demo for Essential JS2 MaskedTextBox control shows the default functionalities of MaskedTextBox component." },
    { path: ':theme/maskedtextbox/custom-mask', component: CustomMaskedTextboxController, name: 'Custom Mask', category: 'MaskedTextBox', description: "This demo for Essential JS2 MaskedTextBox control shows the custom mask functionalities of MaskedTextBox component." },
    { path: ':theme/maskedtextbox/formats', component: FormatMaskedTextboxController, name: 'Formats', category: 'MaskedTextBox', description: "This demo for Essential JS2 MaskedTextBox control shows the different mask formats that can be applied to MaskedTextBox component." }
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