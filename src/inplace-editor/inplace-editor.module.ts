import { RouterModule } from '@angular/router';
import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { InPlaceEditorModule } from '@syncfusion/ej2-angular-inplace-editor';
import { SharedModule } from '../common/shared.module';
import { EditPostComponent } from './edit-post.component';
import { DefaultComponent } from './default.component';
import { PickersComponent } from './pickers.component';
import { DropDownsComponent } from './dropdowns.component';

export const inPlaceEditorAppRoutes: Object[] = [
    { path: ':theme/inplace-editor/default', component: DefaultComponent, name: 'Overview', category: 'In-place Editor', description: 'This sample demonstrates the default behavior of the In-place Editor component, which works by editing the values in inline and popup in Angular platform.', order: '01' },
    { path: ':theme/inplace-editor/dropdowns', component: DropDownsComponent, name: 'DropDown Components', description: 'This sample demonstrates the usage of dropdown components such as Autocomplete, ComboBox, DropDownList, and MultiSelect in Angular platform.', category: 'In-place Editor', order: '01' },
    { path: ':theme/inplace-editor/pickers', component: PickersComponent, name: 'Date Components', category: 'In-place Editor', description: 'This sample demonstrates the usage of picker components such as Date, Time, DateTime, and DateRange in Angular platform.', order: '01' },
    { path: ':theme/inplace-editor/edit-post', component: EditPostComponent, name: 'Edit Post', category: 'Use Case', description: 'This sample demonstrates the usage of In-place Editor component with a form element in Angular platform. Edit the values in place to update to the post.', order: '02' }
];

export const inPlaceEditorRouter: ModuleWithProviders = RouterModule.forChild(inPlaceEditorAppRoutes);

@NgModule({
    imports: [inPlaceEditorRouter, InPlaceEditorModule, SharedModule, CheckBoxModule],
    declarations: [
        EditPostComponent,
        DefaultComponent,
        PickersComponent,
        DropDownsComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InplaceEditorSampleModule { }