import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule } from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { EditService, GridModule } from '@syncfusion/ej2-angular-grids';
import { StylesFABComponent } from "./styles.component";
import { DefaultFABComponent } from './default.component';
import { OverviewFABComponent } from './overview.component';
import { PositionFABComponent } from './position.component';

import { RouterModule } from '@angular/router';
import { FabModule } from '@syncfusion/ej2-angular-buttons';

export const floatingActionButtonAppRoutes: Object[] = [
    {
        path: ':theme/floating-action-button/overview',
        component: OverviewFABComponent,
        name: 'Overview',
        category: 'Floating Action Button',
        description: 'This example demonstrates the overview usage of the Syncfusion<sup>®</sup> Floating Action Button (FAB).',
        sourceFiles: [
            {displayName: 'overview.component.ts', path: './src/floating-action-button/overview.component.ts'},
            {displayName: 'overview.html', path: './src/floating-action-button/overview.html'},
            {displayName: 'overview.css', path: './src/floating-action-button/overview.css'}
        ]
    },
    {
        path: ':theme/floating-action-button/default',
        component: DefaultFABComponent,
        name: 'Default Functionalities',
        category: 'Floating Action Button',
        description: 'This example demonstrates the default functionalities - icon, only label & icon with label of the Syncfusion<sup>®</sup> Floating Action Button (FAB).',
        sourceFiles: [
            {displayName: 'default.component.ts', path: './src/floating-action-button/default.component.ts'},
            {displayName: 'default.html', path: './src/floating-action-button/default.html'},
            {displayName: 'default.css', path: './src/floating-action-button/default.css'}
        ]
    },
    {
        path: ':theme/floating-action-button/position',
        component: PositionFABComponent,
        name: 'Position',
        category: 'Floating Action Button',
        description: 'This example demonstrates all the available built-in positions of the Floating Action Button (FAB).',
        sourceFiles: [
            {displayName: 'position.component.ts', path: './src/floating-action-button/position.component.ts'},
            {displayName: 'position.html', path: './src/floating-action-button/position.html'},
            {displayName: 'position.css', path: './src/floating-action-button/position.css'}
        ]
    },
    {
        path: ':theme/floating-action-button/styles',
        component: StylesFABComponent,
        name: 'Styles',
        category: 'Floating Action Button',
        description: 'This example demonstrates the available types of the Syncfusion<sup>®</sup> Floating Action Button (FAB).',
        sourceFiles: [
            {displayName: 'styles.component.ts', path: './src/floating-action-button/styles.component.ts'},
            {displayName: 'styles.html', path: './src/floating-action-button/styles.html'},
            {displayName: 'styles.css', path: './src/floating-action-button/styles.css'}
        ]
    },
];

export const FloatingActionButtonSampleModule: ModuleWithProviders<any> = RouterModule.forChild(floatingActionButtonAppRoutes);
