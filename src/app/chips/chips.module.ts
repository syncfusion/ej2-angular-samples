import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DefaultChipsComponent } from './default.component';
import { ApiChipsComponent } from './chips-api.component';
import { ChipListModule, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';

import { SharedModule } from '../common/shared.module';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';

export const chipsAppRoutes: Object[] = [
    {
        path: ':theme/chips/default',
        component: DefaultChipsComponent,
        name: 'Default Functionalities',
        category: 'Chips',
        description: 'This demo for Essential JS2 chips shows its types (default, input, choice, filter) ' +
            'and styles (primary, success, info, warning, danger) of chips.',
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
        description: 'This demo for Essential JS2 chips shows its types (default, input, choice, filter) ' +
            'and styles (primary, success, info, warning, danger) of chips.',
            sourceFiles: [
                {displayName: 'chips-api.component.ts', path: './src/chips/chips-api.component.ts'},
                {displayName: 'chips-api.html', path: './src/chips/chips-api.html'},
                {displayName: 'chips-api.css', path: './src/chips/chips-api.css'},
                {displayName: 'data.json', path: './src/chips/data.json'},
            ]
    }
];

export const chipsRouter: ModuleWithProviders<any> = RouterModule.forChild(chipsAppRoutes);

@NgModule({
    imports: [chipsRouter, ChipListModule, SharedModule, DropDownListModule, CheckBoxModule],
    declarations: [
        DefaultChipsComponent,
        ApiChipsComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChipsSampleModule { }
