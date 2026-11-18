/**
 * QR Code Samples
 */
import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { QRCodeGeneratorAllModule } from '@syncfusion/ej2-angular-barcode-generator';
import { ButtonModule, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { NumericTextBoxModule, ColorPickerModule, TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';

// QR Code Components
import { QrCodeComponent } from './qrCode.component';
import { GS1QRCodeComponent } from './gs1qrcode.component';

export const qrcodeAppRoutes: Object[] = [
    {
        path: ':theme/qrcode/qrCode', component: QrCodeComponent,
        name: 'QR Code', order: '01', category: 'Getting Started',
        description: 'This sample displays a machine-readable optical label that contains information about the item to which it is attached.',
    },
    {
        path: ':theme/qrcode/gs1qrcode', component: GS1QRCodeComponent,
        name: 'GS1 QR Code', order: '02', category: 'Getting Started', type: 'new',
        description: 'This sample demonstrates how to generate a GS1 QR Code. It encodes GS1 application identifiers in a two-dimensional symbol that can carry product and traceability data for supply-chain use.',
    },
];

@NgModule({
    imports: [
        QRCodeGeneratorAllModule,
        TextBoxModule,
        NumericTextBoxModule,
        CheckBoxModule,
        ColorPickerModule,
        DropDownListAllModule,
        ButtonModule,
        RouterModule.forChild(qrcodeAppRoutes)
    ],
    declarations: [],
    exports: [RouterModule]
})
export class QrcodeSampleModule { }

export const QrcodeSampleModuleForRoot: ModuleWithProviders<any> = RouterModule.forChild(qrcodeAppRoutes);
