import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DefaultChipsComponent } from './default.component';
import { ApiChipsComponent } from './chips-api.component';
import { ChipListModule, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';


import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { DragAndDropChipsComponent } from './draganddrop.component';

export const chipsAppRoutes: Object[] = [
    {
        path: ':theme/chips/default',
        component: DefaultChipsComponent,
        name: 'Default Functionalities',
        category: 'Chips',
        description: 'This demo for Essential JS2 chips shows its types (default, input, choice, filter) and styles (primary, success, info, warning, danger) of chips.',
            sourceFiles: [
                {displayName: 'default.component.ts', path: './src/chips/default.component.ts'},
                {displayName: 'default.html', path: './src/chips/default.html'},
                {displayName: 'default.css', path: './src/chips/default.css'}
            ]
    },
    {
        path: ':theme/chips/chips-api',
        component: ApiChipsComponent,
        name: 'API',
        category: 'Chips',
        description: 'This demo for Essential JS2 chips shows its types (default, input, choice, filter) and styles (primary, success, info, warning, danger) of chips.',
            sourceFiles: [
                {displayName: 'chips-api.component.ts', path: './src/chips/chips-api.component.ts'},
                {displayName: 'chips-api.html', path: './src/chips/chips-api.html'},
                {displayName: 'chips-api.css', path: './src/chips/chips-api.css'}
            ]
    },
    {
        path: ':theme/chips/draganddrop',
        component: DragAndDropChipsComponent,
        name: 'Draggable Chips',
        category: 'Chips',
        type: 'new',
        description: 'This sample demonstrates the drag and drop functionalities of chips component.',
            sourceFiles: [
                {displayName: 'draganddrop.component.ts', path: './src/chips/draganddrop.component.ts'},
                {displayName: 'draganddrop.html', path: './src/chips/draganddrop.html'},
                {displayName: 'draganddrop.css', path: './src/chips/draganddrop.css'}
            ]
    }
];

export const ChipsSampleModule: ModuleWithProviders<any> = RouterModule.forChild(chipsAppRoutes);


