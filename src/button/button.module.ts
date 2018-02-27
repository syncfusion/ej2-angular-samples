import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DefaultButtonController } from './default.component';
import { CheckBoxModule, RadioButtonModule  } from '@syncfusion/ej2-ng-buttons';
import { DropDownButtonModule, SplitButtonModule  } from '@syncfusion/ej2-ng-splitbuttons';
import { CheckBoxController } from './check-box.component';
import { RadioButtonController } from './radio-button.component';
import { DropDownButtonController } from './drop-down-button.component';
import { SplitButtonController } from './split-button.component';
import { SharedModule } from '../common/shared.module';

export const buttonAppRoutes: Object[] = [
    { path: ':theme/button/default', component: DefaultButtonController, name: 'Default Functionalities', category: 'Button' },
    { path: ':theme/button/check-box', component: CheckBoxController, name: 'CheckBox', category: 'Button' },
    { path: ':theme/button/radio-button', component: RadioButtonController, name: 'RadioButton', category: 'Button' },
    { path: ':theme/button/drop-down-button', component: DropDownButtonController, name: 'DropDownButton', category: 'Button', type: 'preview' },
    { path: ':theme/button/split-button', component: SplitButtonController, name: 'SplitButton', category: 'Button', type: 'preview' }
];

export const buttonRouter: ModuleWithProviders = RouterModule.forChild(buttonAppRoutes);

@NgModule({
    imports: [buttonRouter, CheckBoxModule, RadioButtonModule, DropDownButtonModule, SplitButtonModule, SharedModule],
    declarations: [
        DefaultButtonController,
        CheckBoxController,
        RadioButtonController,
        DropDownButtonController,
        SplitButtonController
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ButtonModule { }