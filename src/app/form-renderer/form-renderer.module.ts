import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DefaultformRendererController } from './default.component';

export const formRendererAppRoutes: Object[] = [
    { path: ':theme/form-renderer/default', component: DefaultformRendererController, name: 'Default Functionalities', category: 'Forms', description: 'This example demonstrates the basic form renderer component that renders schema driven form', ftName: 'form-renderer', type: 'new' }
];

export const FormRendererSampleModule: ModuleWithProviders<any> = RouterModule.forChild(formRendererAppRoutes);

