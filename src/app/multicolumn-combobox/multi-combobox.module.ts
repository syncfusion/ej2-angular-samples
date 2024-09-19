import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


import { MultiColumnComboBoxModule } from '@syncfusion/ej2-angular-multicolumn-combobox';
import { DefaultMultiComboBoxComponent } from './default.component';
import { RemotetMultiComboBoxComponent } from './remote-data.component';
import { GroupingMultiComboBoxComponent } from './grouping.component';
import { FilteringMultiComboBoxComponent } from './filtering.component';
import { VirtualMultiComboBoxComponent } from './virtualization.component';
import { SortingMultiComboBoxComponent } from './sorting.component';
import { RTLMultiComboBoxComponent } from './rtl.component';
import { KeyboardMultiComboBoxComponent } from './keyboard-navigation.component';
import { TemplateMultiComboBoxComponent } from './template.component';

export const multicomboboxAppRoutes: Object[] = [
    { path: ':theme/multicolumn-combobox/default', component: DefaultMultiComboBoxComponent, name: 'Default Functionalities', order: '01', category: 'MultiColumn Combobox', description: 'This example demonstrates the default functionalities of the Syncfusion Angular MultiColumn Combobox component.' },
    { path: ':theme/multicolumn-combobox/remote-data', component: RemotetMultiComboBoxComponent, name: 'Remote Data', order: '01', category: 'MultiColumn Combobox', description: 'This example demonstrates the Remote DataBinding functionalities of the Syncfusion Angular MultiColumn Combobox component.' },
    { path: ':theme/multicolumn-combobox/grouping', component: GroupingMultiComboBoxComponent, name: 'Grouping', order: '01', category: 'MultiColumn Combobox', description: 'This example demonstrates the Grouping functionalities of the Syncfusion Angular MultiColumn Combobox component.' },
    { path: ':theme/multicolumn-combobox/filtering', component: FilteringMultiComboBoxComponent, name: 'Filtering', order: '01', category: 'MultiColumn Combobox', description: 'This example demonstrates the Filtering functionalities of the Syncfusion Angular MultiColumn Combobox component.' },
    { path: ':theme/multicolumn-combobox/virtualization', component: VirtualMultiComboBoxComponent, name: 'Virtualization', order: '01', category: 'MultiColumn Combobox', description: 'This example demonstrates the Virtualization functionalities of the Syncfusion Angular MultiColumn Combobox component.' },
    { path: ':theme/multicolumn-combobox/sorting', component: SortingMultiComboBoxComponent, name: 'Sorting', order: '01', category: 'MultiColumn Combobox', description: 'This example demonstrates the Sorting functionalities of the Syncfusion Angular MultiColumn Combobox component.' },
    { path: ':theme/multicolumn-combobox/rtl', component: RTLMultiComboBoxComponent, name: 'RTL', order: '01', category: 'MultiColumn Combobox', description: 'This example demonstrates the RTL functionalities of the Syncfusion Angular MultiColumn Combobox component.' },
    { path: ':theme/multicolumn-combobox/keyboard-navigation', component: KeyboardMultiComboBoxComponent, name: 'Keyboard Navigation', order: '01', category: 'MultiColumn Combobox', description: 'This example demonstrates the Keyboard Navigation functionalities of the Syncfusion Angular MultiColumn Combobox component.' },
    { path: ':theme/multicolumn-combobox/template', component: TemplateMultiComboBoxComponent, name: 'Template', order: '01', category: 'MultiColumn Combobox', description: 'This example demonstrates the Template functionalities of the Syncfusion Angular MultiColumn Combobox component.' }
];

export const MultiColumnComboBoxSampleModule: ModuleWithProviders<any> = RouterModule.forChild(multicomboboxAppRoutes);
