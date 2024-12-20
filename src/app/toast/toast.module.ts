import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RadioButtonModule, CheckBoxModule, ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { RouterModule } from '@angular/router';
import { ToastModule } from '@syncfusion/ej2-angular-notifications';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { DefaultController } from './default.component';
import { TypesController } from './types.component';
import { TemplateController } from './template.component';
import { ApiController } from './api.component';
import { PositionsController } from './positions.component';


export const toastAppRoutes: Object[] = [
    { path: ':theme/toast/default', component: DefaultController, order: '01', name: 'Default Functionalities', description: 'This demo for Essential<sup>®</sup> JS2 Toast control shows the basic layout of a Toast to show simple notification and hide them.', category: 'Toast' },
    { path: ':theme/toast/types', component: TypesController, order: '01', name: 'Types', description: 'This demo for Essential<sup>®</sup> JS2 Toast control shows 4-predefined toast colors for various scenarios which can be using CSS class.', category: 'Toast' },
    { path: ':theme/toast/template', component: TemplateController, order: '01', name: 'Template', description: 'This demo for Essential<sup>®</sup> JS2 Toast control shows the Template rendering of the Toast.', category: 'Toast' },
    { path: ':theme/toast/positions', component: PositionsController, order: '01', name: 'Positions', description: 'This demo for Essential<sup>®</sup> JS2 Toast control shows the different positioning of the Toast based on the target given.', category: 'Toast' },
    { path: ':theme/toast/api', component: ApiController, order: '01', name: 'API', description: 'This demo for Essential<sup>®</sup> JS2 Toast control shows all the API functionalities available in Toast.', category: 'Toast' }
];

export const ToastSampleModule: ModuleWithProviders<any> = RouterModule.forChild(toastAppRoutes);

