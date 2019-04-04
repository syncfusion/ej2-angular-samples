import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InPlaceEditorModule } from '@syncfusion/ej2-angular-inplace-editor';

import { DefaultInplaceEditorComponent } from './default.component';
import { DropdownsInplaceEditorComponent } from './dropdowns.component';
import { PickersInplaceEditorComponent } from './pickers.component';
import { FormInplaceEditorComponent } from './form.component';

import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { SharedModule } from '../common/shared.module';
export const inplaceeditorAppRoutes: Object[] = [
    { path: ':theme/inplace-editor/default', component: DefaultInplaceEditorComponent, name: 'Overview', order: '01', category: 'In-place Editor' },
    { path: ':theme/inplace-editor/dropdowns', component: DropdownsInplaceEditorComponent, name: 'DropDown Controls', order: '01', category: 'In-place Editor' },
    { path: ':theme/inplace-editor/pickers', component: PickersInplaceEditorComponent, name: 'Date Controls', order: '01', category: 'In-place Editor' },
    { path: ':theme/inplace-editor/form', component: FormInplaceEditorComponent, name: 'Edit Post', order: '02', category: 'Use Case' }
];

export const inplaceeditorRouter: ModuleWithProviders = RouterModule.forChild(inplaceeditorAppRoutes);

@NgModule({
    imports: [inplaceeditorRouter, InPlaceEditorModule, SharedModule, CheckBoxModule],
    declarations: [
        DefaultInplaceEditorComponent,
        DropdownsInplaceEditorComponent,
        PickersInplaceEditorComponent,
        FormInplaceEditorComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InplaceEditorSampleModule {
}