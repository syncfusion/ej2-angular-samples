import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { TextAreaModule, TextBoxModule, NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { ReactiveComponent } from './reactive-forms.component';
import { TemplateDrivenComponent } from './template-driven-forms.component';
import { FieldErrorDisplayComponent } from './field-error-display.backup';
import { DefaultTextAreaController } from './default-component';
import { FloatingLabelTextAreaController } from './floating-label-component';
import { ResizeTextAreaController } from './resize-component';
import { ApiTextAreaController } from './api-component';
import { CheckBoxModule  } from '@syncfusion/ej2-angular-buttons';


export const textareasAppRoutes: Object[] = [
    { path: ':theme/textarea/default', component: DefaultTextAreaController, name: 'Default Functionalities', category: 'TextArea', description: 'This example describes key features of Angular textarea such as input group, placeholder, validation states, and more.' },
    { path: ':theme/textarea/floating-label', component: FloatingLabelTextAreaController, name: 'Floating Label', category: 'TextArea', description: 'This example exposes the floating behaviour of the placeholder respective to the selected floatLabelType option from the property panel in Angular textarea.'},
    { path: ':theme/textarea/resize', component: ResizeTextAreaController, name: 'Resize', category: 'TextArea', description: 'This example exposes the resizing behaviour respective to the selected resizeMode option from the property panel in the Angular textarea.'},
    { path: ':theme/textarea/api', component: ApiTextAreaController, name: 'API', category: 'TextArea', description: 'This example exposes the API functionalities used to customize the appearance and behavior of the React textarea.'},
	{ path: ':theme/textarea/template-driven-forms', component: TemplateDrivenComponent, name: 'Template-driven Forms', category: 'Forms', order: '04', description: 'This example shows how to integrate the textarea component in an Angular (ng) template-driven form that binds values to the model using ngModel.'},
    { path: ':theme/textarea/reactive-forms', component: ReactiveComponent, name: 'Reactive Forms', category: 'Forms', order: '04', description: 'This example shows how to integrate the textarea component in an Angular (ng) reactive form that works based on form-group, form-builder, and form-control.'}
];

export const TextAreasModule: ModuleWithProviders<any> = RouterModule.forChild(textareasAppRoutes);

