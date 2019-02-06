import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { ReactiveComponent } from './reactive-forms.component';
import { TemplateDrivenComponent } from './template-driven-forms.component';
import { FieldErrorDisplayComponent } from './field-error-display.component';
import { DefaultTextboxController } from './default.component';
import { SharedModule } from '../common/shared.module';


export const textboxesAppRoutes: Object[] = [
    { path: ':theme/textboxes/default', component: DefaultTextboxController, name: 'Default Functionalities', category: 'TextBox', description: 'This sample covers the major features of the text box component, such as floating labels and placeholders, integrated icons, validation states, sizing, types, and more.' },
	{ path: ':theme/textboxes/template-driven-forms', component: TemplateDrivenComponent, name: 'Template-driven Forms', category: 'Forms', order: '04', description: 'This sample demonstrates how to integrate the text box component in an Angular (ng) template-driven form that binds values to the model using ngModel.'},
    { path: ':theme/textboxes/reactive-forms', component: ReactiveComponent, name: 'Reactive Forms', category: 'Forms', order: '04', description: 'This sample demonstrates how to integrate the text box component in an Angular (ng) reactive form that works based on form-group, form-builder, and form-control.'}
];

export const textBoxesRouter: ModuleWithProviders = RouterModule.forChild(textboxesAppRoutes);

@NgModule({
    imports: [textBoxesRouter, SharedModule, FormsModule, CommonModule, DialogModule, TextBoxModule, ReactiveFormsModule],
    declarations: [
        DefaultTextboxController,
		TemplateDrivenComponent,
        ReactiveComponent,
        FieldErrorDisplayComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TextboxesModule {
}