import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { TextBoxModule, NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { ReactiveComponent } from './reactive-forms.component';
import { TemplateDrivenComponent } from './template-driven-forms.component';
import { FieldErrorDisplayComponent } from './field-error-display.backup';
import { DefaultTextboxController } from './default.component';

import { DefaultTextAreaController } from './multiline-textbox.component';
import { CheckBoxModule  } from '@syncfusion/ej2-angular-buttons';


export const textboxesAppRoutes: Object[] = [
    { path: ':theme/textboxes/default', component: DefaultTextboxController, name: 'Default Functionalities', category: 'TextBox', description: 'The example describes key features of Angular textbox such as a floating label, input group, placeholder, validation states, sizing, types, and more.' },
    { path: ':theme/textboxes/multiline-textbox', component: DefaultTextAreaController, name: 'Multiline TextBox', category: 'TextBox', description: 'The example exposes a Angular Multiline TextBox (textarea). It helps to render address, feedback, and more in a form with customizable rows and columns.'},
	{ path: ':theme/textboxes/template-driven-forms', component: TemplateDrivenComponent, name: 'Template-driven Forms', category: 'Forms', order: '04', description: 'This example shows how to integrate the textbox component in an Angular (ng) template-driven form that binds values to the model using ngModel.'},
    { path: ':theme/textboxes/reactive-forms', component: ReactiveComponent, name: 'Reactive Forms', category: 'Forms', order: '04', description: 'This example shows how to integrate the textbox component in an Angular (ng) reactive form that works based on form-group, form-builder, and form-control.'}
];

export const TextboxesModule: ModuleWithProviders<any> = RouterModule.forChild(textboxesAppRoutes);

