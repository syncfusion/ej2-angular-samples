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
import { ProtectSheetComponent } from './protect-sheet.component';
import { SortinAndFilteringComponent } from './sorting-and-filtering.component';
import { CellTemplateComponent } from './cell-template.component';
import { SharedModule } from '../common/shared.module';
import { ConditionalFormattingController } from './conditional-formatting.component';

export const spreadsheetAppRoutes: Object[] = [
    {
        path: ':theme/spreadsheet/default', component: DefaultController,
        name: 'Default Functionalities', category: 'Spreadsheet', order: '01',
        description: 'This example demonstrates the default functionalities of the Syncfusion Angular Spreadsheet that includes editing, importing & exporting.'
    },
    {
        path: ':theme/spreadsheet/formula', component: FormulasController,
        name: 'Formula', category: 'Spreadsheet', order: '01',
        description: 'This demo for Syncfusion Angular Spreadsheet control shows the way of using basic formulas with minimum configuration.'
    },
    {
        path: ':theme/spreadsheet/protect-sheet', component: ProtectSheetComponent,
        name: 'Protect Sheet', category: 'Spreadsheet', order: '01',
        description: 'This demo for Syncfusion Angular Spreadsheet control includes lock cell and protect sheet feature with its configurations.'
    },
    {
        path: ':theme/spreadsheet/cell-data-binding', component: CellDataBindingController,
        name: 'Cell Data Binding', category: 'Data Binding', order: '02',
        description: 'This demo for Syncfusion Angular Spreadsheet control shows the cell data binding with minimum configuration.'
    },
    {
        path: ':theme/spreadsheet/remote-data-binding', component: RemoteDataBindingController,
        name: 'Remote Data Binding', category: 'Data Binding', order: '02',
        description: 'This demo for Syncfusion Angular Spreadsheet control shows the way of data binding with remote service using DataManager.'
    },
    {
        path: ':theme/spreadsheet/cell-formatting', component: CellFormatController,
        name: 'Cell Formatting', category: 'Formatting', order: '03',
        description: 'This demo for Syncfusion Angular Spreadsheet control shows the way of cell formatting with minimum configuration.'
    },
    {
        path: ':theme/spreadsheet/number-formatting', component: NumberFormattingController,
        name: 'Number Formatting', category: 'Formatting', order: '03',
        description: 'This demo for Syncfusion Angular Spreadsheet control shows the way of number formatting with minimum configuration.'
    },
    {
        path: ':theme/spreadsheet/conditional-formatting', component: ConditionalFormattingController,
        name: 'Conditional Formatting', category: 'Formatting', order: '03', type: 'new',
        description: 'This demo for Essential JS 2 Spreadsheet control shows conditional formatting feature.'
    },
    {
        path: ':theme/spreadsheet/sorting-and-filtering', component: SortinAndFilteringComponent,
        name: 'Sorting and Filtering', category: 'Data Analysis', order: '04',
        description: 'This demo for Syncfusion Angular Spreadsheet control shows sorting and filtering feature.'
    },
    {
        path: ':theme/spreadsheet/cell-template', component: CellTemplateComponent,
        name: 'Cell Template', category: 'Templates', order: '05',
        description: 'This demo for Syncfusion Angular Spreadsheet control shows cell template feature.'
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
        NumberFormattingController,
        ProtectSheetComponent,
        SortinAndFilteringComponent,
        CellTemplateComponent,
        ConditionalFormattingController
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SpreadsheetSampleModule {

}