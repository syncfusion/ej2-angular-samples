import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DefaultformRendererController } from './default.component';
import { CustomComponentsFormRendererController } from './custom-components.component';

export const formRendererAppRoutes: Object[] = [
    { path: ':theme/form-renderer/default', component: DefaultformRendererController, name: 'Default Functionalities', category: 'Forms', description: 'This example demonstrates the basic form renderer component that renders schema driven form', ftName: 'form-renderer',
    sourceFiles: [
            { displayName: 'default.component.ts', path: './src/app/form-renderer/default.component.ts' },
            { displayName: 'default.html', path: './src/app/form-renderer/default.html' },
            { displayName: 'datasource.ts', path: './src/app/form-renderer/datasource.ts' }
        ]
    },
    {
        path: ':theme/form-renderer/custom-components',
        component: CustomComponentsFormRendererController,
        name: 'Custom Components',
        category: 'Forms',
        description: 'This example demonstrates how to render custom components for individual form fields in the Form Renderer control',
        ftName: 'form-renderer',
        type: 'new',
        sourceFiles: [
            { displayName: 'custom-components.component.ts', path: './src/app/form-renderer/custom-components.component.ts' },
            { displayName: 'custom-components.html', path: './src/app/form-renderer/custom-components.html' },
            { displayName: 'datasource.ts', path: './src/app/form-renderer/datasource.ts' }
        ]
    }
];

export const FormRendererSampleModule: ModuleWithProviders<any> = RouterModule.forChild(formRendererAppRoutes);

