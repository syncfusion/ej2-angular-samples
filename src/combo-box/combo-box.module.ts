import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComboBoxModule } from '@syncfusion/ej2-angular-dropdowns';
import { CheckBoxModule  } from '@syncfusion/ej2-angular-buttons';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { DefaultComboBoxComponent } from './default.component';
import { GroupAndIconComboBoxComponent } from './grouping-icon.component';
import { DataBindingComboBoxComponent } from './data-binding.component';
import { TemplateComboBoxComponent } from './template.component';
import { CascadingComboBoxComponent } from './cascading.component';
import { FilteringComboBoxComponent } from './filtering.component';
import { CustomValueComboBoxComponent } from './custom-value.component';
import { DiacriticsFilteringComboBoxComponent } from './diacritics-filtering.component';
import { TemplateDrivenComboBoxComponent } from './template-driven.component';
import { ReactiveFormComboBoxComponent } from './reactive-form.component';
import { SharedModule } from '../common/shared.module';
export const comboboxAppRoutes: Object[] = [
    { path: ':theme/combo-box/default', component: DefaultComboBoxComponent, name: 'Default Functionalities', description: 'This demo for Essential JS2 ComboBox control shows the default rendering of the ComboBox control with minimum configuration.', order: '01',
	  category: 'ComboBox' },
    { path: ':theme/combo-box/grouping-icon', component: GroupAndIconComboBoxComponent, name: 'Grouping and Icons', description: 'This demo demonstrates the grouping of suggestions based on different categories with individual header and icon support in the ComboBox control.', order: '01',
    	category: 'ComboBox' },
    { path: ':theme/combo-box/data-binding', component: DataBindingComboBoxComponent, name: 'Data Binding', description: 'This demo for Essential JS2 ComboBox control shows how to bind with  local data source and how to consume data from remote data service.', order: '01',
    	category: 'ComboBox' },
    { path: ':theme/combo-box/custom-value', component: CustomValueComboBoxComponent, name: 'Custom Value', description: 'This demo for Essential JS2 ComboBox control demonstrates the addition of a new value that is not present in the predefined list.', order: '01',
		category: 'ComboBox' },
    { path: ':theme/combo-box/template', component: TemplateComboBoxComponent, name: 'Template', description: 'This demo demonstrates on how to customize the appearance of each item that is displayed in the pop-up list using templating in ComboBox control.', order: '01',
		category: 'ComboBox' },
    { path: ':theme/combo-box/filtering', component: FilteringComboBoxComponent, name: 'Filtering', description: 'This demo demonstrates the filtering functionalities of the ComboBox control.', order: '01',
		category: 'ComboBox' },
    { path: ':theme/combo-box/cascading', component: CascadingComboBoxComponent, name: 'Cascading', description: 'This demo for Essential JS2 ComboBox control helps the user populate data to the next level ComboBox based on the selected value of the parent ComboBox.', order: '01',
		category: 'ComboBox' },
    {
        path: ':theme/combo-box/diacritics-filtering', component: DiacriticsFilteringComboBoxComponent, description: 'This demo demonstrates the diacritics filter functionality of the ComboBox control.', order: '01',
        name: 'Diacritics Filtering', category: 'ComboBox'
    },
    { path: ':theme/combo-box/template-driven', component: TemplateDrivenComboBoxComponent, name: 'Template Driven', description: 'This demo demonstrates the template-driven forms support of the ComboBox control.', order: '02',
		category: 'Form Support' },
    { path: ':theme/combo-box/reactive-form', component: ReactiveFormComboBoxComponent, name: 'Reactive Form', description: 'This demo demonstrates the reactive forms support of the ComboBox control.', order: '02',
		category: 'Form Support' }

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