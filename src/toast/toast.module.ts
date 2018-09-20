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
    { path: ':theme/toast/default', component: DefaultController, order: '01', name: 'Default Functionalities', description: 'This demo for Essential JS2 Toast control shows the basic layout of a Toast to show simple notification and hide them.', category: 'Toast' },
    { path: ':theme/toast/types', component: TypesController, order: '01', name: 'Types', description: 'This demo for Essential JS2 Toast control shows 4-predefined toast colors for various scenarios which can be using CSS class.', category: 'Toast' },
    { path: ':theme/toast/template', component: TemplateController, order: '01', name: 'Template', description: 'This demo for Essential JS2 Toast control shows the Template rendering of the Toast.', category: 'Toast' },
    { path: ':theme/toast/positions', component: PositionsController, order: '01', name: 'Positions', description: 'This demo for Essential JS2 Toast control shows the different positioning of the Toast based on the target given.', category: 'Toast' },
    { path: ':theme/toast/api', component: ApiController, order: '01', name: 'API', description: 'This demo for Essential JS2 Toast control shows all the API functionalities available in Toast.', category: 'Toast' }
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