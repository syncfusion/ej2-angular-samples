import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DefaultButtonController } from './default.component';
import { CheckBoxModule, RadioButtonModule  } from '@syncfusion/ej2-ng-buttons';
import { CheckBoxController } from './check-box.component';
import { RadioButtonController } from './radio-button.component';
import { SharedModule } from '../common/shared.module';

export const buttonAppRoutes: Object[] = [
    { path: ':theme/button/default', component: DefaultButtonController, name: 'Default Functionalities', category: 'Button' },
    { path: ':theme/button/check-box', component: CheckBoxController, name: 'CheckBox', category: 'Button' },
    { path: ':theme/button/radio-button', component: RadioButtonController, name: 'RadioButton', category: 'Button' }
];

export const buttonRouter: ModuleWithProviders = RouterModule.forChild(buttonAppRoutes);

@NgModule({
    imports: [buttonRouter, CheckBoxModule, RadioButtonModule, SharedModule],
    declarations: [
        DefaultButtonController,
        CheckBoxController,
        RadioButtonController
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ButtonModule { }