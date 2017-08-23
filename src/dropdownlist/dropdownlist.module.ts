import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DefaultDropDownListComponent } from './default.component';
import { GroupAndIconDropDownListComponent } from './groupingicon.component';
import { DataBindingDropDownListComponent } from './databinding.component';
import { TemplateDropDownListComponent } from './template.component';
import { CascadingDropDownListComponent } from './cascading.component';
import { FilteringDropDownListComponent } from './filtering.component';
import { SharedModule } from '../common/shared.module';

export const dropdownlistAppRoutes: Object[] = [
    { path: 'dropdownlist/default', component: DefaultDropDownListComponent, name: 'Default Functionalities', category: 'DropDownList' },
    { path: 'dropdownlist/groupingicon', component: GroupAndIconDropDownListComponent, name: 'Grouping and Icons', category: 'DropDownList' },
    { path: 'dropdownlist/databinding', component: DataBindingDropDownListComponent, name: 'Data Binding', category: 'DropDownList' },
    { path: 'dropdownlist/template', component: TemplateDropDownListComponent, name: 'Template', category: 'DropDownList' },
    { path: 'dropdownlist/filtering', component: FilteringDropDownListComponent, name: 'Filtering', category: 'DropDownList' },
    { path: 'dropdownlist/cascading', component: CascadingDropDownListComponent, name: 'Cascading', category: 'DropDownList' },
];

export const DropDownListRouter: ModuleWithProviders = RouterModule.forChild(dropdownlistAppRoutes);

@NgModule({
    imports: [DropDownListRouter, SharedModule],
    declarations: [
        DefaultDropDownListComponent,
        GroupAndIconDropDownListComponent,
        DataBindingDropDownListComponent,
        TemplateDropDownListComponent,
        CascadingDropDownListComponent,
        FilteringDropDownListComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DropDownListSampleModule {
}