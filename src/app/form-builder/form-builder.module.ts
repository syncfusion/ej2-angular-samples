import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DefaultFormBuilderController } from './default.component';

export const formBuilderAppRoutes: Object[] = [
    { path: ':theme/form-builder/default', component: DefaultFormBuilderController, name: 'Default Functionalities', category: 'Forms', description: 'This example demonstrates the basic form builder component for visually designing forms', ftName: 'form-builder', type: 'new',
    sourceFiles: [
            { displayName: 'default.component.ts', path: './src/app/form-builder/default.component.ts' },
            { displayName: 'default.html', path: './src/app/form-builder/default.html' }
        ]
    }
];

export const FormBuilderSampleModule: ModuleWithProviders<any> = RouterModule.forChild(formBuilderAppRoutes);
