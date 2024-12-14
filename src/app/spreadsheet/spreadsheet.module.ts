/**
 * Spreadsheet Component
 */
import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SpreadsheetAllModule } from '@syncfusion/ej2-angular-spreadsheet';
import { TextBoxAllModule } from '@syncfusion/ej2-angular-inputs';
import { RadioButtonAllModule, ButtonAllModule } from '@syncfusion/ej2-angular-buttons';
import { DropDownListAllModule, MultiSelectAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { DefaultController } from './default.component';
import { CellDataBindingController } from './cell-data-binding.component';
import { RemoteDataBindingController } from './remote-data-binding.component';
import { FormulasController } from './formula.component';
import { CellFormatController } from './cell-formatting.component';
import { NumberFormattingController } from './number-formatting.component';
import { ProtectSheetComponent } from './protect-sheet.component';
import { FreezePaneComponent } from './freeze-pane.component';
import { SortinAndFilteringComponent } from './sorting-and-filtering.component';
import { CellTemplateComponent } from './cell-template.component';
import { ConditionalFormattingController } from './conditional-formatting.component';
import { ImageController } from './image.component';
import { ChartController } from './chart.component';
import { DataValidationComponent } from './data-validation.component';
import { HyperlinkComponent } from './hyperlink.component';
import { NotesController } from './notes.component';
import { PrintController } from './print.component';

export const spreadsheetAppRoutes: Object[] = [
    {
        path: ':theme/spreadsheet/default', component: DefaultController,
        name: 'Default Functionalities', category: 'Spreadsheet', order: '01',
        description: 'This example demonstrates the default functionalities of the Syncfusion<sup>®</sup> Angular Spreadsheet that includes editing, importing & exporting.'
    },
    {
        path: ':theme/spreadsheet/formula', component: FormulasController,
        name: 'Formula', category: 'Spreadsheet', order: '01',
        description: 'This demo for Syncfusion<sup>®</sup> Angular Spreadsheet control shows the way of using basic formulas with minimum configuration.'
    },
    {
        path: ':theme/spreadsheet/protect-sheet', component: ProtectSheetComponent,
        name: 'Protection', category: 'Spreadsheet', order: '01',
        description: 'This demo for Syncfusion<sup>®</sup> Angular Spreadsheet control includes lock cell and protect sheet feature with its configurations.'
    },
    {
        path: ':theme/spreadsheet/freeze-pane', component: FreezePaneComponent,
        name: 'Freeze Panes', category: 'Spreadsheet', order: '01',
        description: 'This demo for Syncfusion<sup>®</sup> Angular Spreadsheet control includes freeze rows and columns feature.'
    },
    {
        path: ':theme/spreadsheet/data-validation', component: DataValidationComponent,
        name: 'Data Validation', category: 'Spreadsheet', order: '01',
        description: 'This demo for Syncfusion<sup>®</sup> Angular Spreadsheet control includes data validation.'
    },
    {
        path: ':theme/spreadsheet/hyperlink', component: HyperlinkComponent,
        name: 'Hyperlink', category: 'Spreadsheet', order: '01',
        description: 'This demo for Syncfusion<sup>®</sup> Angular Spreadsheet control includes hyperlink.'
    },
    {
        path: ':theme/spreadsheet/cell-data-binding', component: CellDataBindingController,
        name: 'Cell Data Binding', category: 'Data Binding', order: '02',
        description: 'This demo for Syncfusion<sup>®</sup> Angular Spreadsheet control shows the cell data binding with minimum configuration.'
    },
    {
        path: ':theme/spreadsheet/remote-data-binding', component: RemoteDataBindingController,
        name: 'Remote Data Binding', category: 'Data Binding', order: '02',
        description: 'This demo for Syncfusion<sup>®</sup> Angular Spreadsheet control shows the way of data binding with remote service using DataManager.'
    },
    {
        path: ':theme/spreadsheet/cell-formatting', component: CellFormatController,
        name: 'Cell Formatting', category: 'Formatting', order: '03',
        description: 'This demo for Syncfusion<sup>®</sup> Angular Spreadsheet control shows the way of cell formatting with minimum configuration.'
    },
    {
        path: ':theme/spreadsheet/number-formatting', component: NumberFormattingController,
        name: 'Number Formatting', category: 'Formatting', order: '03',
        description: 'This demo for Syncfusion<sup>®</sup> Angular Spreadsheet control shows the way of number formatting with minimum configuration.'
    },
    {
        path: ':theme/spreadsheet/conditional-formatting', component: ConditionalFormattingController,
        name: 'Conditional Formatting', category: 'Formatting', order: '03',
        description: 'This demo for Essential<sup>®</sup> JS 2 Spreadsheet control shows conditional formatting feature.'
    },
    {
        path: ':theme/spreadsheet/sorting-and-filtering', component: SortinAndFilteringComponent,
        name: 'Sorting and Filtering', category: 'Data Analysis', order: '04',
        description: 'This demo for Syncfusion<sup>®</sup> Angular Spreadsheet control shows sorting and filtering feature.'
    },
    {
        path: ':theme/spreadsheet/chart', component: ChartController,
        name: 'Chart', category: 'Data Visualization', order: '05',
        description: "This demo for Essential<sup>®</sup> JS 2 Spreadsheet control shows the chart feature."
    },
    {
        path: ':theme/spreadsheet/image', component: ImageController,
        name: 'Image', category: 'Illustrations', order: '06',
        description: "This demo for Essential<sup>®</sup> JS 2 Spreadsheet control shows image feature."
    },
    {
        path: ':theme/spreadsheet/cell-template', component: CellTemplateComponent,
        name: 'Cell Template', category: 'Templates', order: '07',
        description: 'This demo for Syncfusion<sup>®</sup> Angular Spreadsheet control shows cell template feature.'
    },
    {
        path: ':theme/spreadsheet/notes', component: NotesController,
        name: 'Notes', category: 'Review', order: '09',
        description: 'This demo for Angular Spreadsheet control showcases notes feature.'
    },
    {
        path: ':theme/spreadsheet/print', component: PrintController,
        name: 'Print', category: 'Printing', order: '08',
        description: 'This example demonstrates the printing functionalities of the Angular Spreadsheet.'
    }
];

export const SpreadsheetSampleModule: ModuleWithProviders<any> = RouterModule.forChild(spreadsheetAppRoutes);

