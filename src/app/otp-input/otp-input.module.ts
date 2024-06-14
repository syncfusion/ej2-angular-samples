import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { OtpInputModule } from '@syncfusion/ej2-angular-inputs';
import { DefaultOtpInputComponent } from './default.component';
import { APIOtpInputComponent } from './api.component';

export const otpInputAppRoutes: Object[] = [
    { path: ':theme/otp-input/default', component: DefaultOtpInputComponent, name: 'Default Functionalities', order: '01', category: 'OtpInput', description: 'This example demonstrates the default functionalities of the Syncfusion Angular OtpInput component.' },
    { path: ':theme/otp-input/api', component: APIOtpInputComponent, name: 'API', order: '01', category: 'OtpInput', description: 'This example demonstrates the API functionalities of the Syncfusion Angular OtpInput component.' }
];

export const OtpInputSampleModule: ModuleWithProviders<any> = RouterModule.forChild(otpInputAppRoutes);