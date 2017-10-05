import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaskedTextBoxModule } from '@syncfusion/ej2-ng-inputs';
import { SharedModule } from '../common/shared.module';

import { DefaultMaskedTextboxController } from './default.component';
import { CustomMaskedTextboxController } from './custommask.component';
import { FormatMaskedTextboxController } from './formats.component';

export const maskedTextBoxAppRoutes: Object[] = [
    { path: ':theme/maskedtextbox/default', component: DefaultMaskedTextboxController, name: 'Default Functionalities', category: 'MaskedTextBox' },
    { path: ':theme/maskedtextbox/custommask', component: CustomMaskedTextboxController, name: 'Custom Mask', category: 'MaskedTextBox' },
    { path: ':theme/maskedtextbox/formats', component: FormatMaskedTextboxController, name: 'Formats', category: 'MaskedTextBox' }
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