/**
 * barcode Control
 */
import { NgModule, ModuleWithProviders, Type } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ButtonModule, CheckBoxModule, RadioButtonModule } from '@syncfusion/ej2-angular-buttons';
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { NumericTextBoxModule, ColorPickerModule, UploaderModule, TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';

import { MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';

import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';

import { ListViewAllModule } from '@syncfusion/ej2-angular-lists';

import { BarcodeGeneratorAllModule,QRCodeGeneratorAllModule,DataMatrixGeneratorAllModule} from '@syncfusion/ej2-angular-barcode-generator';

import { defaultfunctionalities as defaultFunctionalities } from './default-functionalities.component';
import { Code32Component} from './code32.component'
import { Code39Component} from './code39.component'
import { Code39ExtdComponent} from './code39Extd.component'
import { Code93Component} from './code93.component'
import { Code128Component} from './code128.component'
import { Code128AComponent} from './code128A.component'
import { Code128BComponent} from './code128B.component'
import { Code128CComponent} from './code128C.component'
import { DataMatrixComponent} from './datamatrix.component'
import { CodabarComponenet} from './codabar.component'
import { Ean13Component} from './ean13.component'
import { UpcAComponent} from './upcA.component'
import { UpcEComponent} from './upcE.component'
import { QrCodeComponent} from './qrCode.component'




export const barcodeAppRoutes: Object[] = [
    {
        path: ':theme/barcode/default-functionalities', component: defaultFunctionalities,
        name: 'EAN-8', order: '01', category: 'Getting Started',
        description: 'This sample visualizes the processing of an order placed using credit card with built-in flow shapes.',
    },
  
    {
        path: ':theme/barcode/code128', component: Code128Component,
        name: 'Code 128', order: '01', category: 'Getting Started',
        description: 'This sample visualizes the processing of an order placed using credit card with built-in flow shapes.',
    },
    {
        path: ':theme/barcode/code128A', component: Code128AComponent,
        name: 'Code 128A', order: '01', category: 'Getting Started',
        description: 'This sample visualizes the processing of an order placed using credit card with built-in flow shapes.',
    },
    {
        path: ':theme/barcode/code128B', component: Code128BComponent,
        name: 'Code 128B', order: '01', category: 'Getting Started',
        description: 'This sample visualizes the processing of an order placed using credit card with built-in flow shapes.',
    },
    {
        path: ':theme/barcode/code128C', component: Code128CComponent,
        name: 'Code 128C', order: '01', category: 'Getting Started',
        description: 'This sample visualizes the processing of an order placed using credit card with built-in flow shapes.',
    },
    {
        path: ':theme/barcode/code93', component: Code93Component,
        name: 'Code 93', order: '01', category: 'Getting Started',
        description: 'This sample visualizes the processing of an order placed using credit card with built-in flow shapes.',
    },
    {
        path: ':theme/barcode/code32', component: Code32Component,
        name: 'Code 32', order: '01', category: 'Getting Started',
        description: 'This sample visualizes the processing of an order placed using credit card with built-in flow shapes.',
    },
   
   
   
    {
        path: ':theme/barcode/codabar', component: CodabarComponenet,
        name: 'Codabar', order: '01', category: 'Getting Started',
        description: 'This sample visualizes the processing of an order placed using credit card with built-in flow shapes.',
    },
    {
        path: ':theme/barcode/ean13', component: Ean13Component,
        name: 'EAN-13', order: '01', category: 'Getting Started',
        description: 'This sample visualizes the processing of an order placed using credit card with built-in flow shapes.',
    },
    {
        path: ':theme/barcode/upcA', component: UpcAComponent,
        name: 'UPC-A', order: '01', category: 'Getting Started',
        description: 'This sample visualizes the processing of an order placed using credit card with built-in flow shapes.',
    },
    {
        path: ':theme/barcode/upcE', component: UpcEComponent,
        name: 'UPC-E', order: '01', category: 'Getting Started',
        description: 'This sample visualizes the processing of an order placed using credit card with built-in flow shapes.',
    },
    {
        path: ':theme/barcode/code39', component: Code39Component,
        name: 'Code39', order: '01', category: 'Getting Started',
        description: 'This sample visualizes the processing of an order placed using credit card with built-in flow shapes.',
    },
    {
        path: ':theme/barcode/code39Extd', component: Code39ExtdComponent,
        name: 'Code 39 Extended', order: '01', category: 'Getting Started',
        description: 'This sample visualizes the processing of an order placed using credit card with built-in flow shapes.',
    },
    {
        path: ':theme/barcode/qrCode', component: QrCodeComponent,
        name: 'QR Code', order: '01', category: 'Getting Started',
        description: 'This sample visualizes the processing of an order placed using credit card with built-in flow shapes.',
    },
    {
        path: ':theme/barcode/datamatrix', component: DataMatrixComponent,
        name: 'Data Matrix', order: '01', category: 'Getting Started',
        description: 'This sample visualizes the processing of an order placed using credit card with built-in flow shapes.',
    },
];

export const BarcodeSampleModule: ModuleWithProviders<any> = RouterModule.forChild(barcodeAppRoutes);