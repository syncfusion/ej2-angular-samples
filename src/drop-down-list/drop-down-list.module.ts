import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DefaultDropDownListComponent } from './default.component';
import { GroupAndIconDropDownListComponent } from './grouping-icon.component';
import { DataBindingDropDownListComponent } from './data-binding.component';
import { TemplateDropDownListComponent } from './template.component';
import { CascadingDropDownListComponent } from './cascading.component';
import { FilteringDropDownListComponent } from './filtering.component';
import { DiacriticsFilteringDropDownListComponent } from './diacritics-filtering.component';
import { InlineDropDownListComponent } from './inline.component';
import { SharedModule } from '../common/shared.module';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { TemplateDrivenDropDownListComponent } from './template-driven.component';
import { ReactiveFormDropDownListComponent } from './reactive-form.component';
export const dropdownlistAppRoutes: Object[] = [
    { path: ':theme/drop-down-list/default', component: DefaultDropDownListComponent, name: 'Default Functionalities', description: 'This demo for Essential JS2 DropDownList control shows the default rendering of the DropDownList control with minimum configuration.', order: '01',
		category: 'DropDownList' },
    { path: ':theme/drop-down-list/grouping-icon', component: GroupAndIconDropDownListComponent, name: 'Grouping and Icons', description: 'This demo demonstrates the grouping of suggestions based on different categories with individual header and icon support in the DropDownList control.', order: '01',
		category: 'DropDownList' },
    { path: ':theme/drop-down-list/data-binding', component: DataBindingDropDownListComponent, name: 'Data Binding', description: 'This demo for Essential JS2 DropDownList control shows how to bind with  local data source and how to consume data from remote data service.', order: '01',
		category: 'DropDownList' },
    { path: ':theme/drop-down-list/template', component: TemplateDropDownListComponent, name: 'Template', description: 'This demo demonstrates on how to customize the appearance of each item that is displayed in the pop-up list using templating in DropDownList control.', order: '01',
		category: 'DropDownList' },
    { path: ':theme/drop-down-list/filtering', component: FilteringDropDownListComponent, name: 'Filtering', description: 'This demo demonstrates the filtering functionalities of the DropDownList control.', order: '01',
		category: 'DropDownList' },
    { path: ':theme/drop-down-list/cascading', component: CascadingDropDownListComponent, name: 'Cascading', description: 'This demo for Essential JS2 DropDownList control helps the user populate data to the next level DropDownList based on the selected value of the parent DropDownList.', order: '01',
		category: 'DropDownList' },
    { path: ':theme/drop-down-list/inline', component: InlineDropDownListComponent, name: 'Inline', category: 'DropDownList', description: 'This demo for Essential JS2 DropDownList control demonstrates to render the DropDownList control in line with other content.', order: '01' },
    {
        path: ':theme/drop-down-list/diacritics-filtering', component: DiacriticsFilteringDropDownListComponent, description: 'This demo demonstrates the diacritics filter functionality of the DropDownList control.', order: '01',
        name: 'Diacritics Filtering', category: 'DropDownList'
    },
    { path: ':theme/drop-down-list/template-driven', component: TemplateDrivenDropDownListComponent, name: 'Template Driven', description: 'This demo demonstrates the template-driven forms support of the DropDownList control.', order: '02',
      category: 'Form Support' },
    { path: ':theme/drop-down-list/reactive-form', component: ReactiveFormDropDownListComponent, name: 'Reactive Form', description: 'This demo demonstrates the reactive forms support of the DropDownList control.', order: '02',
		category: 'Form Support' }

];

export const DropDownListRouter: ModuleWithProviders = RouterModule.forChild(dropdownlistAppRoutes);

@NgModule({
    imports: [DropDownListRouter, SharedModule, FormsModule, ReactiveFormsModule],
    declarations: [
        DefaultDropDownListComponent,
        GroupAndIconDropDownListComponent,
        DataBindingDropDownListComponent,
        TemplateDropDownListComponent,
        CascadingDropDownListComponent,
        FilteringDropDownListComponent,
        InlineDropDownListComponent,
        DiacriticsFilteringDropDownListComponent,
        TemplateDrivenDropDownListComponent,
        ReactiveFormDropDownListComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DropDownListSampleModule {
}