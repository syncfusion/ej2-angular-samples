import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DefaultDropDownListComponent } from './default.component';
import { GroupAndIconDropDownListComponent } from './groupingicon.component';
import { DataBindingDropDownListComponent } from './databinding.component';
import { TemplateDropDownListComponent } from './template.component';
import { CascadingDropDownListComponent } from './cascading.component';
import { FilteringDropDownListComponent } from './filtering.component';
import { DiacriticsFilteringDropDownListComponent } from './diacriticsfiltering.component';
import { InlineDropDownListComponent } from './inline.component';
import { SharedModule } from '../common/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TemplateDrivenDropDownListComponent } from './templatedriven.component';
import { ReactiveFormDropDownListComponent } from './reactiveform.component';
export const dropdownlistAppRoutes: Object[] = [
  {
    path: ':theme/dropdownlist/default', component: DefaultDropDownListComponent, name: 'Default Functionalities', order: '01',
    category: 'DropDownList'
  },
  {
    path: ':theme/dropdownlist/groupingicon', component: GroupAndIconDropDownListComponent, name: 'Grouping and Icons', order: '01',
    category: 'DropDownList'
  },
  {
    path: ':theme/dropdownlist/databinding', component: DataBindingDropDownListComponent, name: 'Data Binding', order: '01',
    category: 'DropDownList'
  },
  {
    path: ':theme/dropdownlist/template', component: TemplateDropDownListComponent, name: 'Template', order: '01',
    category: 'DropDownList'
  },
  {
    path: ':theme/dropdownlist/filtering', component: FilteringDropDownListComponent, name: 'Filtering', order: '01',
    category: 'DropDownList'
  },
  {
    path: ':theme/dropdownlist/cascading', component: CascadingDropDownListComponent, name: 'Cascading', order: '01',
    category: 'DropDownList'
  },
  {
    path: ':theme/dropdownlist/inline', component: InlineDropDownListComponent, name: 'Inline', category: 'DropDownList', order: '01',
    type: 'new'
  },
  {
    path: ':theme/dropdownlist/diacriticsfiltering', component: DiacriticsFilteringDropDownListComponent, order: '01',
    name: 'Diacritics Filtering', category: 'DropDownList', type: 'new'
  },
  {
    path: ':theme/dropdownlist/templatedriven', component: TemplateDrivenDropDownListComponent, name: 'Template Driven', order: '02',
    category: 'Form Support', type: 'new'
  },
  {
    path: ':theme/dropdownlist/reactiveform', component: ReactiveFormDropDownListComponent, name: 'Reactive Form', order: '02',
    category: 'Form Support', type: 'new'
  }

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