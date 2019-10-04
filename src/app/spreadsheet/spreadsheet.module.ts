/**
 * Spreadsheet Component
 */
import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SpreadsheetAllModule } from '@syncfusion/ej2-angular-spreadsheet';
import { DefaultController } from './default.component';
import { CellDataBindingController } from './cell-data-binding.component';
import { RemoteDataBindingController } from './remote-data-binding.component';
import { FormulasController } from './formula.component';
import { CellFormatController } from './cell-formatting.component';
import { NumberFormattingController } from './number-formatting.component';

import { SharedModule } from '../common/shared.module';

export const spreadsheetAppRoutes: Object[] = [
    {
        path: ':theme/spreadsheet/default', component: DefaultController,
        name: 'Default Functionalities', category: 'Spreadsheet', order: '01',
        description: 'This example demonstrates the default functionalities of the Syncfusion Angular Spreadsheet that includes editing, importing & exporting.'
    },
    {
        path: ':theme/spreadsheet/formula', component: FormulasController,
        name: 'Formula', category: 'Spreadsheet', order: '01',
        description: 'This demo for Essential Angular Spreadsheet control shows the way of using basic formulas with minimum configuration.'
    },
    {
        path: ':theme/spreadsheet/cell-data-binding', component: CellDataBindingController,
        name: 'Cell Data Binding', category: 'Data Binding', order: '02',
        description: 'This demo for Essential Angular Spreadsheet control shows the cell data binding with minimum configuration.'
    },
    {
        path: ':theme/spreadsheet/remote-data-binding', component: RemoteDataBindingController,
        name: 'Remote Data Binding', category: 'Data Binding', order: '02',
        description: 'This demo for Essential Angular Spreadsheet control shows the way of data binding with remote service using DataManager.'
    },
    {
        path: ':theme/spreadsheet/cell-formatting', component: CellFormatController,
        name: 'Cell Formatting', category: 'Formatting', order: '03',
        description: 'This demo for Essential JS 2 Spreadsheet control shows the way of cell formatting with minimum configuration.'
    },
    {
        path: ':theme/spreadsheet/number-formatting', component: NumberFormattingController,
        name: 'Number Formatting', category: 'Formatting', order: '03',
        description: 'This demo for Essential Angular Spreadsheet control shows the way of number formatting with minimum configuration.'
    }
];

export const spreadsheetRouter: ModuleWithProviders = RouterModule.forChild(spreadsheetAppRoutes);

@NgModule({
    imports: [spreadsheetRouter, CommonModule, SpreadsheetAllModule, SharedModule],
    declarations: [
        DefaultController,
        FormulasController,
        CellDataBindingController,
        RemoteDataBindingController,
        CellFormatController,
        NumberFormattingController
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SpreadsheetSampleModule {

}