/**
 * barcode Control
 */
import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ButtonModule, CheckBoxModule, RadioButtonModule } from '@syncfusion/ej2-angular-buttons';
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { NumericTextBoxModule, ColorPickerModule, UploaderModule, TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { ListViewAllModule } from '@syncfusion/ej2-angular-lists';
import { BarcodeGeneratorAllModule, DataMatrixGeneratorAllModule, QRCodeGeneratorAllModule } from '@syncfusion/ej2-angular-barcode-generator';

// Barcode Components
import { defaultfunctionalities as defaultFunctionalities } from './default-functionalities.component';
import { Code32Component } from './code32.component';
import { Code39Component } from './code39.component';
import { Code39ExtdComponent } from './code39Extd.component';
import { Code93Component } from './code93.component';
import { Code128Component } from './code128.component';
import { Code128AComponent } from './code128A.component';
import { Code128BComponent } from './code128B.component';
import { Code128CComponent } from './code128C.component';
import { CodabarComponenet } from './codabar.component';
import { Ean13Component } from './ean13.component';
import { UpcAComponent } from './upcA.component';
import { UpcEComponent } from './upcE.component';
import { QrCodeComponent } from './qrCode.component';
import { DataMatrixComponent } from './datamatrix.component';

export const barcodeAppRoutes: Object[] = [
    // Barcode (Linear) Routes
    {
        path: ':theme/barcode/default-functionalities', component: defaultFunctionalities,
        name: 'EAN-8', order: '01', category: 'Getting Started',
        description: 'This sample visualizes the 8-digit Global Trade Identification Numbers.'
    },
    {
        path: ':theme/barcode/code128', component: Code128Component,
        name: 'Code 128', order: '01', category: 'Getting Started',
        description: 'This sample visualizes a barcode image that presents alphanumeric combinations.'
    },
    {
        path: ':theme/barcode/code128A', component: Code128AComponent,
        name: 'Code 128A', order: '01', category: 'Getting Started',
        description: 'This sample visualizes a barcode image that presents information with a combination of numbers.'
    },
    {
        path: ':theme/barcode/code128B', component: Code128BComponent,
        name: 'Code 128B', order: '01', category: 'Getting Started',
        description: 'This sample visualizes a barcode image that presents information with a combination of numbers.'
    },
    {
        path: ':theme/barcode/code128C', component: Code128CComponent,
        name: 'Code 128C', order: '01', category: 'Getting Started',
        description: 'This sample visualizes a barcode image with a combination of numbers and letters.'
    },
    {
        path: ':theme/barcode/code93', component: Code93Component,
        name: 'Code 93', order: '01', category: 'Getting Started',
        description: 'This sample has a native character set of 26 uppercase letters, 10 digits, and 7 special characters.'
    },
    {
        path: ':theme/barcode/code32', component: Code32Component,
        name: 'Code 32', order: '01', category: 'Getting Started',
        description: 'This sample visualizes the pharmaceutical code that encodes numeric data.'
    },
    {
        path: ':theme/barcode/codabar', component: CodabarComponenet,
        name: 'Codabar', order: '01', category: 'Getting Started',
        description: 'This sample visualizes a barcode that is designed to be accurately read.'
    },
    {
        path: ':theme/barcode/ean13', component: Ean13Component,
        name: 'EAN-13', order: '01', category: 'Getting Started',
        description: 'This sample visualizes the 13-digit Global Trade Identification Numbers.'
    },
    {
        path: ':theme/barcode/upcA', component: UpcAComponent,
        name: 'UPC-A', order: '01', category: 'Getting Started',
        description: 'This sample visualizes the 12-digit Universal Product Code.'
    },
    {
        path: ':theme/barcode/upcE', component: UpcEComponent,
        name: 'UPC-E', order: '01', category: 'Getting Started',
        description: 'This sample visualizes the shortened 6-digit version of UPC code.'
    },
    {
        path: ':theme/barcode/code39', component: Code39Component,
        name: 'Code 39', order: '01', category: 'Getting Started',
        description: 'This sample visualizes the barcode that encodes 43 characters.'
    },
    {
        path: ':theme/barcode/code39Extd', component: Code39ExtdComponent,
        name: 'Code 39 Extended', order: '01', category: 'Getting Started',
        description: 'This sample visualizes the barcode that encodes 107 characters.'
    },
    {
        path: ':theme/barcode/qrCode', component: QrCodeComponent,
        name: 'QR Code', order: '01', category: 'Getting Started',
        description: 'This sample displays a machine-readable optical label that contains information about the item to which it is attached.'
    },
     {
        path: ':theme/barcode/datamatrix', component: DataMatrixComponent,
        name: 'Data Matrix', order: '01', category: 'Getting Started',
        description: 'This example shows how to display encoded text or numerical values as the label using the Barcode component'
    }
];

@NgModule({
    imports: [
        BarcodeGeneratorAllModule,
        QRCodeGeneratorAllModule,
        DataMatrixGeneratorAllModule,
        ButtonModule,
        CheckBoxModule,
        RadioButtonModule,
        DropDownButtonModule,
        NumericTextBoxModule,
        ColorPickerModule,
        UploaderModule,
        TextBoxModule,
        ToolbarModule,
        MultiSelectModule,
        DropDownListAllModule,
        ListViewAllModule,
        RouterModule.forChild(barcodeAppRoutes)
    ],
    declarations: [],
    exports: [RouterModule]
})
export class BarcodeSampleModule { }

export const BarcodeSampleModuleForRoot: ModuleWithProviders<any> = RouterModule.forChild(barcodeAppRoutes);
