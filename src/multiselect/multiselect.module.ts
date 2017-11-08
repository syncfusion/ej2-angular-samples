import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MultiSelectModule } from '@syncfusion/ej2-ng-dropdowns';
import { DefaultMultiselectComponent } from './default.component';
import { GroupMultiSelectComponent } from './grouping.component';
import { DataBindingMultiSelectComponent } from './databinding.component';
import { TemplateMultiSelectComponent } from './template.component';
import { FilteringMultiSelectComponent } from './filtering.component';
import { CustomTagMultiSelectComponent } from './customtag.component';
import { SharedModule } from '../common/shared.module';
export const multiselectAppRoutes: Object[] = [
    { path: ':theme/multiselect/default', component: DefaultMultiselectComponent,
        name: 'Default Functionalities', category: 'MultiSelect' },
    { path: ':theme/multiselect/databinding', component: DataBindingMultiSelectComponent, name: 'Data Binding', category: 'MultiSelect' },
    { path: ':theme/multiselect/grouping', component: GroupMultiSelectComponent, name: 'Grouping', category: 'MultiSelect' },
    { path: ':theme/multiselect/template', component: TemplateMultiSelectComponent, name: 'Template', category: 'MultiSelect' },
    { path: ':theme/multiselect/filtering', component: FilteringMultiSelectComponent, name: 'Filtering', category: 'MultiSelect' },
    { path: ':theme/multiselect/customtag', component: CustomTagMultiSelectComponent, name: 'Custom Values', category: 'MultiSelect' },
];

export const MultiSelectRouter: ModuleWithProviders = RouterModule.forChild(multiselectAppRoutes);

@NgModule({
    imports: [MultiSelectRouter, MultiSelectModule, SharedModule],
    declarations: [
        DefaultMultiselectComponent,
        GroupMultiSelectComponent,
        DataBindingMultiSelectComponent,
        TemplateMultiSelectComponent,
        FilteringMultiSelectComponent,
        CustomTagMultiSelectComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MultiSelectSampleModule {
}