/**
 * Data Matrix Samples
 */
import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DataMatrixGeneratorAllModule } from '@syncfusion/ej2-angular-barcode-generator';
import { ButtonModule, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { NumericTextBoxModule, ColorPickerModule, TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';

// Data Matrix Components
import { DataMatrixComponent } from './datamatrix.component';
import { GS1DataMatrixComponent } from './gs1datamatrix.component';

export const datamatrixAppRoutes: Object[] = [
    {
        path: ':theme/datamatrix/datamatrix', component: DataMatrixComponent,
        name: 'Data Matrix', order: '01', category: 'Getting Started',
        description: 'This example shows how to display encoded text or numerical values as the label using the Barcode component',
    },
    {
        path: ':theme/datamatrix/gs1datamatrix', component: GS1DataMatrixComponent,
        name: 'GS1 DataMatrix', order: '02', category: 'Getting Started', type: 'new',
        description: 'This sample demonstrates how to generate a GS1 DataMatrix barcode. Its compact two-dimensional symbol encodes GS1 application identifiers for item identification and traceability labels.',
    },
];

@NgModule({
    imports: [
        DataMatrixGeneratorAllModule,
        TextBoxModule,
        NumericTextBoxModule,
        CheckBoxModule,
        ColorPickerModule,
        DropDownListAllModule,
        ButtonModule,
        RouterModule.forChild(datamatrixAppRoutes)
    ],
    declarations: [],
    exports: [RouterModule]
})
export class DatamatrixSampleModule { }

export const DatamatrixSampleModuleForRoot: ModuleWithProviders<any> = RouterModule.forChild(datamatrixAppRoutes);
