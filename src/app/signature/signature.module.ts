import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { ColorPickerModule } from '@syncfusion/ej2-angular-inputs';
import { CheckBoxModule, ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { UploaderModule, SignatureModule, TextBoxModule, NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { TabModule, ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { SplitButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { DefaultSignatureComponent } from './default.component';
import { ToolbarSignatureComponent } from './toolbar.component';

export const signatureAppRoutes: Object[] = [
    { path: ':theme/signature/default', component: DefaultSignatureComponent, name: 'Default Functionalities', order: '01', category: 'Signature', description: 'This example demonstrates the default functionalities of the Syncfusion Angular Signature.' },
    { path: ':theme/signature/toolbar', component: ToolbarSignatureComponent, name: 'Toolbar', order: '01', category: 'Signature', description: 'This example demonstrates the toolbar functionalities of the Syncfusion Angular Signature.' },
];

export const SignatureSampleModule: ModuleWithProviders<any> = RouterModule.forChild(signatureAppRoutes);


