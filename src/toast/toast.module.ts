import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RadioButtonModule, CheckBoxModule, ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { RouterModule } from '@angular/router';
import { ToastModule } from '@syncfusion/ej2-angular-notifications';
import { DefaultController } from './default.component';
import { TypesController } from './types.component';
import { TemplateController } from './template.component';
import { ApiController } from './api.component';
import { PositionsController } from './positions.component';
import { SharedModule } from '../common/shared.module';

export const toastAppRoutes: Object[] = [
    { path: ':theme/toast/default', component: DefaultController, order: '01', name: 'Default Functionalities', description: 'The sample demonstrates about default functionalities of a Toast component and helps to design reminder like an alert in Angular platform.', category: 'Toast' },
    { path: ':theme/toast/types', component: TypesController, order: '01', name: 'Types', description: 'The sample demonstrates how to design success, warning, information, and error messages using Toast component based on CSS classes in Angular platform.', category: 'Toast' },
    { path: ':theme/toast/template', component: TemplateController, order: '01', name: 'Template', description: 'The sample demonstrates how to design a reminder application by customizing the content of Toast component using an HTML template in Angular platform.', category: 'Toast' },
    { path: ':theme/toast/positions', component: PositionsController, order: '01', name: 'Positions', description: 'The sample demonstrates how to display the toast notification with various built-in or custom position based on target or page in Angular platform.', category: 'Toast' },
    { path: ':theme/toast/api', component: ApiController, order: '01', name: 'API', description: 'The sample exposes the available properties, methods, and events of Toast component which helps to create flexible toast notification in Angular platform.', category: 'Toast' }
];

export const toastRouter: ModuleWithProviders = RouterModule.forChild(toastAppRoutes);

@NgModule({
    imports: [toastRouter, SharedModule, ToastModule, RadioButtonModule, CheckBoxModule, ButtonModule],
    declarations: [
        DefaultController,
        TypesController,
        TemplateController,
        PositionsController,
        ApiController ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ToastSampleModule { }