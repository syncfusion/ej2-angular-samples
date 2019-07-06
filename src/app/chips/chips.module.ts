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
            'and styles (primary, success, info, warning, danger) of chips.'
    },
    {
        path: ':theme/chips/chips-api',
        component: ApiChipsComponent,
        name: 'API',
        category: 'Chips',
        description: 'This demo for Essential JS2 chips shows its types (default, input, choice, filter) ' +
            'and styles (primary, success, info, warning, danger) of chips.'
    }
];

export const chipsRouter: ModuleWithProviders = RouterModule.forChild(chipsAppRoutes);

@NgModule({
    imports: [chipsRouter, ChipListModule, SharedModule, DropDownListModule, CheckBoxModule],
    declarations: [
        DefaultChipsComponent,
        ApiChipsComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChipsSampleModule { }
