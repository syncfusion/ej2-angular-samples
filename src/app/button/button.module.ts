import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DefaultButtonController } from './default.component';
import { ButtonModule, CheckBoxModule, RadioButtonModule, SwitchModule } from '@syncfusion/ej2-angular-buttons';
import { DropDownButtonModule, SplitButtonModule, ProgressButtonModule } from '@syncfusion/ej2-angular-splitbuttons';

import { CheckBoxController } from './checkbox.component';
import { SwitchController } from './switch.component';
import { RadioButtonController } from './radio-button.component';
import { DropDownButtonController } from './dropdown-button.component';
import { SplitButtonController } from './split-button.component';
import { ButtonGroupController } from './button-group.component';
import { ProgressButtonController } from './progress-button.component';

export const buttonAppRoutes: Object[] = [
    { path: ':theme/button/default', component: DefaultButtonController, name: 'Default Functionalities', category: 'Button', description: 'This example demonstrates the types (flat, toogle, outline, round), sizes and styles (primary, success, info, warning) of the Syncfusion<sup>®</sup> Angular button.', ftName: 'button' },
    { path: ':theme/button/button-group', component: ButtonGroupController, name: 'Button Group', category: 'Button', description: 'This example demonstrates the behaviors (default, checkbox, radio) of the Syncfusion<sup>®</sup> Angular ButtonGroup.', ftName: 'button-group' },
    { path: ':theme/button/checkbox', component: CheckBoxController, name: 'Checkbox', category: 'Button', description: 'This example demonstrates the three different states (checked, unchecked, indeterminate) of the Syncfusion<sup>®</sup> Angular CheckBox.', ftName: 'checkbox' },
    { path: ':theme/button/radio-button', component: RadioButtonController, name: 'Radio Button', category: 'Button', description: 'This example demonstrates the group functionality of the Syncfusion<sup>®</sup> Angular RadioButton with checked and unchecked states.', ftName: 'radio-button' },
    { path: ':theme/button/dropdown-button', component: DropDownButtonController, name: 'Dropdown Button', category: 'Button', description: 'This example demonstrates the usecases of the Syncfusion<sup>®</sup> Angular DropDownButton with icons, text and separator in popup action items.', ftName: 'dropdown-menu' },
    { path: ':theme/button/split-button', component: SplitButtonController, name: 'Split Button', category: 'Button', description: 'This example demonstrates the usecases of the Syncfusion<sup>®</sup> Angular SplitButton with icons and text in primary splitbutton', ftName: 'split-button' },
    { path: ':theme/button/switch', component: SwitchController, name: 'Switch', category: 'Button', description: 'This example demonstrates the toggle states (checked, unchecked) of the Syncfusion<sup>®</sup> Angular Switch.', ftName: 'toggle-switch-button' },
    { path: ':theme/button/progress-button', component: ProgressButtonController, name: 'Progress Button', category: 'Button', description: 'This example demonstrates the different functionalities of the Syncfusion<sup>®</sup> Angular ProgressButton with spinner and progress indicator.', ftName: 'progress-button' }
];

export const ButtonSampleModule: ModuleWithProviders<any> = RouterModule.forChild(buttonAppRoutes);

