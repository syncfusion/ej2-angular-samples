import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComboBoxModule } from '@syncfusion/ej2-ng-dropdowns';
import { CheckBoxModule } from '@syncfusion/ej2-ng-buttons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DefaultComboBoxComponent } from './default.component';
import { GroupAndIconComboBoxComponent } from './groupingicon.component';
import { DataBindingComboBoxComponent } from './databinding.component';
import { TemplateComboBoxComponent } from './template.component';
import { CascadingComboBoxComponent } from './cascading.component';
import { FilteringComboBoxComponent } from './filtering.component';
import { CustomValueComboBoxComponent } from './custom-value.component';
import { DiacriticsFilteringComboBoxComponent } from './diacriticsfiltering.component';
import { TemplateDrivenComboBoxComponent } from './templatedriven.component';
import { ReactiveFormComboBoxComponent } from './reactiveform.component';
import { SharedModule } from '../common/shared.module';
export const comboboxAppRoutes: Object[] = [
  {
    path: ':theme/combobox/default', component: DefaultComboBoxComponent, name: 'Default Functionalities', order: '01',
    category: 'ComboBox'
  },
  {
    path: ':theme/combobox/groupingicon', component: GroupAndIconComboBoxComponent, name: 'Grouping and Icons', order: '01',
    category: 'ComboBox'
  },
  {
    path: ':theme/combobox/databinding', component: DataBindingComboBoxComponent, name: 'Data Binding', order: '01',
    category: 'ComboBox'
  },
  {
    path: ':theme/combobox/custom-value', component: CustomValueComboBoxComponent, name: 'Custom Value', order: '01',
    category: 'ComboBox'
  },
  {
    path: ':theme/combobox/template', component: TemplateComboBoxComponent, name: 'Template', order: '01',
    category: 'ComboBox'
  },
  {
    path: ':theme/combobox/filtering', component: FilteringComboBoxComponent, name: 'Filtering', order: '01',
    category: 'ComboBox'
  },
  {
    path: ':theme/combobox/cascading', component: CascadingComboBoxComponent, name: 'Cascading', order: '01',
    category: 'ComboBox'
  },
  {
    path: ':theme/combobox/diacriticsfiltering', component: DiacriticsFilteringComboBoxComponent, order: '01',
    name: 'Diacritics Filtering', category: 'ComboBox', type: 'new'
  },
  {
    path: ':theme/combobox/templatedriven', component: TemplateDrivenComboBoxComponent, name: 'Template Driven', order: '02',
    category: 'Form Support', type: 'new'
  },

  {
    path: ':theme/combobox/reactiveform', component: ReactiveFormComboBoxComponent, name: 'Reactive Form', order: '02',
    category: 'Form Support', type: 'new'
  }

];

export const ComboBoxRouter: ModuleWithProviders = RouterModule.forChild(comboboxAppRoutes);

@NgModule({
  imports: [ComboBoxRouter, ComboBoxModule, SharedModule, CheckBoxModule, FormsModule, ReactiveFormsModule],
  declarations: [
    DefaultComboBoxComponent,
    GroupAndIconComboBoxComponent,
    DataBindingComboBoxComponent,
    CustomValueComboBoxComponent,
    TemplateComboBoxComponent,
    CascadingComboBoxComponent,
    FilteringComboBoxComponent,
    DiacriticsFilteringComboBoxComponent,
    TemplateDrivenComboBoxComponent,
    ReactiveFormComboBoxComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComboBoxSampleModule {
}