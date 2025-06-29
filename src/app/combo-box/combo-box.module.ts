import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComboBoxModule } from '@syncfusion/ej2-angular-dropdowns';
import { CheckBoxModule  } from '@syncfusion/ej2-angular-buttons';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { DefaultComboBoxComponent } from './default.component';
import { GroupAndIconComboBoxComponent } from './grouping-icon.component';
import { DataBindingComboBoxComponent } from './data-binding.component';
import { DisabledItemsComboBoxComponent } from './disabled-items.component'
import { TemplateComboBoxComponent } from './template.component';
import { ResizeComboBoxComponent } from './resize.component';
import { CascadingComboBoxComponent } from './cascading.component';
import { FilteringComboBoxComponent } from './filtering.component';
import { CustomValueComboBoxComponent } from './custom-value.component';
import { DiacriticsFilteringComboBoxComponent } from './diacritics-filtering.component';
import { TemplateDrivenComboBoxComponent } from './template-driven.component';
import { ReactiveFormComboBoxComponent } from './reactive-form.component';

import { BrowserModule } from '@angular/platform-browser';
import { VirtualScrollComboBoxComponent } from './virtual-scroll.component';
import { ObjectComboBoxComponent } from './object-value-binding.component';
export const comboboxAppRoutes: Object[] = [
    { path: ':theme/combo-box/default', component: DefaultComboBoxComponent, name: 'Default Functionalities', description: 'This example demonstrates the default functionalities of the Angular combo box component with minimum configuration.', order: '01',
	  category: 'ComboBox' },
    { path: ':theme/combo-box/grouping-icon', component: GroupAndIconComboBoxComponent, name: 'Grouping and Icons', description: 'This example demonstrates how to group based on the different categories with individual header and icon support using the Angular combo box component.', order: '01',
    	category: 'ComboBox' },
    { path: ':theme/combo-box/data-binding', component: DataBindingComboBoxComponent, name: 'Data Binding', description: 'This example demonstrates how to bind with local data source and fetch data from remote data service in the Angular combo box component.', order: '01',
    	category: 'ComboBox' },
    { path: ':theme/combo-box/object-value-binding', component: ObjectComboBoxComponent, name: 'Oject Value Binding', description: 'This example demonstrates how to bind with data source in the Angular combo box component.', order: '01',
    category: 'ComboBox' },
    { path: ':theme/combo-box/disabled-items', component: DisabledItemsComboBoxComponent, name: 'Disabled Items', description: 'This example showcases the disabled items of Angular combo box component.', order: '01',
    	category: 'ComboBox' },
    { path: ':theme/combo-box/custom-value', component: CustomValueComboBoxComponent, name: 'Custom Value', description: 'This example demonstrates the addition of a new value that is not present in the predefined list of the Angular combo box component.', order: '01',
		category: 'ComboBox' },
    { path: ':theme/combo-box/template', component: TemplateComboBoxComponent, name: 'Template', description: 'This example demonstrates how to customize the appearance of each item in the Angular combo box component pop-up list using the template.', order: '01',
		category: 'ComboBox' },
    { path: ':theme/combo-box/resize', component: ResizeComboBoxComponent, name: 'Popup Resize' , description: 'This demo showcases the custom resizing functionality of Combo Box, You can adjust the size of the popup based on your preferences, allowing for better control over its appearance.', order: '01',
      category: 'ComboBox' },
    { path: ':theme/combo-box/virtual-scroll', component: VirtualScrollComboBoxComponent, name: 'Virtualization', description: 'This example demonstrates how to utilize the virtualization support of Angular combo box component.', order: '01', 
    category: 'ComboBox' },
    { path: ':theme/combo-box/filtering', component: FilteringComboBoxComponent, name: 'Filtering', type:'update', description: 'This example demonstrates how the filtering functionalities works based on the typed characters in the Angular combo box component.', order: '01',
		category: 'ComboBox' },
    { path: ':theme/combo-box/cascading', component: CascadingComboBoxComponent, name: 'Cascading', description: 'This example demonstrates how to create a related combo box (Cascading ComboBox) using the Angular combo box component.', order: '01',
		category: 'ComboBox' },
    {
        path: ':theme/combo-box/diacritics-filtering', component: DiacriticsFilteringComboBoxComponent, description: 'This example demonstrates how to achieve the diacritics filter functionalities in the Angular combo box component.', order: '01',
        name: 'Diacritics Filtering', category: 'ComboBox'
    },
    { path: ':theme/combo-box/template-driven', component: TemplateDrivenComboBoxComponent, name: 'Template Driven', description: 'This demo explains the template-driven forms support of the Syncfusion<sup>®</sup> angular combo box component.', order: '02',
		category: 'Form Support' },
    { path: ':theme/combo-box/reactive-form', component: ReactiveFormComboBoxComponent, name: 'Reactive Form', description: 'This demo explains the reactive forms support of the Syncfusion<sup>®</sup> angular combo box component.', order: '02',
		category: 'Form Support' }

];

export const ComboBoxSampleModule: ModuleWithProviders<any> = RouterModule.forChild(comboboxAppRoutes);

