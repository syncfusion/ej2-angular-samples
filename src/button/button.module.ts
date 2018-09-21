import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DefaultButtonController } from './default.component';
import { CheckBoxModule, RadioButtonModule, SwitchModule  } from '@syncfusion/ej2-angular-buttons';
import { DropDownButtonModule, SplitButtonModule, ProgressButtonModule  } from '@syncfusion/ej2-angular-splitbuttons';
import { CheckBoxController } from './check-box.component';
import { SwitchController } from './switch.component';
import { RadioButtonController } from './radio-button.component';
import { DropDownButtonController } from './drop-down-button.component';
import { SplitButtonController } from './split-button.component';
import { ButtonGroupController } from './button-group.component';
import { ProgressButtonController } from './progress-button.component'
import { SharedModule } from '../common/shared.module';

export const buttonAppRoutes: Object[] = [
    { path: ':theme/button/default', component: DefaultButtonController, name: 'Default Functionalities', category: 'Button', description: 'This demo for Essential JS2 Button shows its types (flat, toggle, outline, round, icon), sizes and styles (primary, success, info, warning) of buttons.', ftName: 'button' },
    { path: ':theme/button/button-group', component: ButtonGroupController, name: 'ButtonGroup', category: 'Button', type: 'preview', description: 'This demo for Syncfusion Essential JS2 Button Group control shows the horizontal group of buttons. This supports radio and checkbox type behaviors.', ftName: 'button-group' },
    { path: ':theme/button/check-box', component: CheckBoxController, name: 'CheckBox', category: 'Button', description: 'This demo for Essential JS2 Check Box control shows the checked, unchecked, and indeterminate states of checkbox. It also provide supports for specifying label.', ftName: 'checkbox' },
    { path: ':theme/button/radio-button', component: RadioButtonController, name: 'RadioButton', category: 'Button', description: 'This demo for Syncfusion Essential JS2 RadioButton control shows the radio button group functionality. It contains checked and unchecked state.', ftName: 'radio-button' },
    { path: ':theme/button/drop-down-button', component: DropDownButtonController, name: 'DropDownButton', category: 'Button', description: 'This demo for Essential JS2 DropDown Button control shows the types and styles of drop down button. The popup contains action items with text, icons and separator.', ftName: 'dropdown-button' },
    { path: ':theme/button/split-button', component: SplitButtonController, name: 'SplitButton', category: 'Button', description: 'This demo for Syncfusion Essential JS2 SplitButton control shows the use cases of split button. The icons, text and both can be loaded in primary splitbutton.', ftName: 'split-button' },
    { path: ':theme/button/switch', component: SwitchController, name: 'Switch', category: 'Button', type: 'preview', description: 'This demo for Syncfusion Essential JS2 Switch control allows to toggle between the checked and unchecked states. It also provides support for custom UI.', ftName: 'switch' },
    { path: ':theme/button/progress-button', component: ProgressButtonController, name: 'ProgressButton', category: 'Button', type: 'preview' }
];

export const buttonRouter: ModuleWithProviders = RouterModule.forChild(buttonAppRoutes);

@NgModule({
    imports: [buttonRouter, CheckBoxModule, RadioButtonModule, DropDownButtonModule, SplitButtonModule, SwitchModule, SharedModule, ProgressButtonModule],
    declarations: [
        DefaultButtonController,
        ButtonGroupController,
        CheckBoxController,
        RadioButtonController,
        DropDownButtonController,
        SplitButtonController,
	    SwitchController,
        ProgressButtonController
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ButtonModule { }