import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { DefaultTextboxController } from './default.component';
import { ReactiveComponent } from './reactive-forms.component';
import { TemplateDrivenComponent } from './template-driven-forms.component';
import { SharedModule } from '../common/shared.module';
import { FieldErrorDisplayComponent } from './field-error-display.component';


export const textboxesAppRoutes: Object[] = [
    { path: ':theme/textboxes/default', component: DefaultTextboxController, name: 'Default Functionalities', category: 'TextBoxes' },
    { path: ':theme/textboxes/template-driven-forms', component: TemplateDrivenComponent, name: 'Template-driven Forms', category: 'Forms', order: '04', type: 'new'},
    { path: ':theme/textboxes/reactive-forms', component: ReactiveComponent, name: 'Reactive Forms', category: 'Forms', order: '04', type: 'new'}
];

export const textBoxesRouter: ModuleWithProviders = RouterModule.forChild(textboxesAppRoutes);

@NgModule({
    imports: [textBoxesRouter, SharedModule, FormsModule, CommonModule, DialogModule, ReactiveFormsModule],
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