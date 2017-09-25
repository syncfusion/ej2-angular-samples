import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComboBoxModule } from '@syncfusion/ej2-ng-dropdowns';
import { CheckBoxModule  } from '@syncfusion/ej2-ng-buttons';
import { FormsModule }   from '@angular/forms';
import { DefaultComboBoxComponent } from './default.component';
import { GroupAndIconComboBoxComponent } from './groupingicon.component';
import { DataBindingComboBoxComponent } from './databinding.component';
import { TemplateComboBoxComponent } from './template.component';
import { CascadingComboBoxComponent } from './cascading.component';
import { FilteringComboBoxComponent } from './filtering.component';
import { SharedModule } from '../common/shared.module';
export const comboboxAppRoutes: Object[] = [
    { path: ':theme/combobox/default', component: DefaultComboBoxComponent, name: 'Default Functionalities', category: 'ComboBox' },
    { path: ':theme/combobox/groupingicon', component: GroupAndIconComboBoxComponent, name: 'Grouping and Icons', category: 'ComboBox' },
    { path: ':theme/combobox/databinding', component: DataBindingComboBoxComponent, name: 'Data Binding', category: 'ComboBox' },
    { path: ':theme/combobox/template', component: TemplateComboBoxComponent, name: 'Template', category: 'ComboBox' },
     { path: ':theme/combobox/filtering', component: FilteringComboBoxComponent, name: 'Filtering', category: 'ComboBox' },
    { path: ':theme/combobox/cascading', component: CascadingComboBoxComponent, name: 'Cascading', category: 'ComboBox' }

];

export const ComboBoxRouter: ModuleWithProviders = RouterModule.forChild(comboboxAppRoutes);

@NgModule({
    imports: [ComboBoxRouter, ComboBoxModule, SharedModule, CheckBoxModule, FormsModule],
    declarations: [
        DefaultComboBoxComponent,
        GroupAndIconComboBoxComponent,
        DataBindingComboBoxComponent,
        TemplateComboBoxComponent,
        CascadingComboBoxComponent,
        FilteringComboBoxComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComboBoxSampleModule {
}