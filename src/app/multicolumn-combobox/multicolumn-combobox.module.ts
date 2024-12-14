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
    { path: ':theme/multicolumn-combobox/default', component: DefaultMultiComboBoxComponent, name: 'Default Functionalities', order: '01', category: 'MultiColumn Combobox', description: 'This example demonstrates the default functionalities of the Syncfusion<sup>®</sup> Angular MultiColumn Combobox component.', sourceFiles: [
        {displayName: 'default.component.ts', path: './src/multicolumn-combobox/default.component.ts'},
        {displayName: 'default.html', path: './src/multicolumn-combobox/default.html'},
        {displayName: 'default.css', path: './src/multicolumn-combobox/default.component.css'},
        {displayName: 'multicolumn-data-source.ts', path: './src/multicolumn-combobox/multicolumn-data-source.ts'},
    ] },
    { path: ':theme/multicolumn-combobox/remote-data', component: RemotetMultiComboBoxComponent, name: 'Remote Data', order: '01', category: 'MultiColumn Combobox', description: 'This example demonstrates the Remote DataBinding functionalities of the Syncfusion<sup>®</sup> Angular MultiColumn Combobox component.', sourceFiles: [
        {displayName:'remote-data.component.ts', path: './src/multicolumn-combobox/remote-data.component.ts'},
        {displayName:'remote-data.html', path: './src/multicolumn-combobox/remote-data.html'},
        {displayName:'remote-data.css', path: './src/multicolumn-combobox/remote-data.component.css'},
    ]},
    { path: ':theme/multicolumn-combobox/grouping', component: GroupingMultiComboBoxComponent, name: 'Grouping', order: '01', category: 'MultiColumn Combobox', description: 'This example demonstrates the Grouping functionalities of the Syncfusion<sup>®</sup> Angular MultiColumn Combobox component.', sourceFiles: [
        {displayName: 'grouping.component.ts', path: './src/multicolumn-combobox/grouping.component.ts'},
        {displayName: 'grouping.html', path: './src/multicolumn-combobox/grouping.html'},
        {displayName: 'grouping.css', path: './src/multicolumn-combobox/grouping.component.css'},
        {displayName: 'multicolumn-data-source.ts', path: './src/multicolumn-combobox/multicolumn-data-source.ts'},
    ]},
    { path: ':theme/multicolumn-combobox/filtering', component: FilteringMultiComboBoxComponent, name: 'Filtering', order: '01', category: 'MultiColumn Combobox', description: 'This example demonstrates the Filtering functionalities of the Syncfusion<sup>®</sup> Angular MultiColumn Combobox component.', sourceFiles: [
        {displayName: 'filtering.component.ts', path: './src/multicolumn-combobox/filtering.component.ts'},
        {displayName: 'filtering.html', path: './src/multicolumn-combobox/filtering.html'},
        {displayName: 'filtering.css', path: './src/multicolumn-combobox/filtering.component.css'},
        {displayName: 'multicolumn-data-source.ts', path: './src/multicolumn-combobox/multicolumn-data-source.ts'},
    ]},
    { path: ':theme/multicolumn-combobox/virtualization', component: VirtualMultiComboBoxComponent, name: 'Virtualization', order: '01', category: 'MultiColumn Combobox', description: 'This example demonstrates the Virtualization functionalities of the Syncfusion<sup>®</sup> Angular MultiColumn Combobox component.', sourceFiles: [
        {displayName: 'virtualization.component.ts', path: './src/multicolumn-combobox/virtualization.component.ts'},
        {displayName: 'virtualization.html', path: './src/multicolumn-combobox/virtualization.html'},
        {displayName: 'virtualization.css', path: './src/multicolumn-combobox/virtualization.component.css'},
    ] },
    { path: ':theme/multicolumn-combobox/sorting', component: SortingMultiComboBoxComponent, name: 'Sorting', order: '01', category: 'MultiColumn Combobox', description: 'This example demonstrates the Sorting functionalities of the Syncfusion<sup>®</sup> Angular MultiColumn Combobox component.', sourceFiles: [
        {displayName:'sorting.component.ts', path: './src/multicolumn-combobox/sorting.component.ts'},
        {displayName:'sorting.html', path: './src/multicolumn-combobox/sorting.html'},
        {displayName:'sorting.css', path: './src/multicolumn-combobox/sorting.component.css'},
        {displayName: 'multicolumn-data-source.ts', path: './src/multicolumn-combobox/multicolumn-data-source.ts'},
    ]},
    { path: ':theme/multicolumn-combobox/rtl', component: RTLMultiComboBoxComponent, name: 'RTL', order: '01', category: 'MultiColumn Combobox', description: 'This example demonstrates the RTL functionalities of the Syncfusion<sup>®</sup> Angular MultiColumn Combobox component.', sourceFiles: [
        {displayName: 'rtl.component.ts', path: './src/multicolumn-combobox/rtl.component.ts'},
        {displayName: 'rtl.html', path: './src/multicolumn-combobox/rtl.html'},
        {displayName: 'rtl.css', path: './src/multicolumn-combobox/rtl.component.css'},
        {displayName: 'multicolumn-data-source.ts', path: './src/multicolumn-combobox/multicolumn-data-source.ts'},
    ]},
    { path: ':theme/multicolumn-combobox/keyboard-navigation', component: KeyboardMultiComboBoxComponent, name: 'Keyboard Navigation', order: '01', category: 'MultiColumn Combobox', description: 'This example demonstrates the Keyboard Navigation functionalities of the Syncfusion<sup>®</sup> Angular MultiColumn Combobox component.', sourceFiles: [
        {displayName: 'keyboard-navigation.component.ts', path: './src/multicolumn-combobox/keyboard-navigation.component.ts'},
        {displayName: 'keyboard-navigation.html', path: './src/multicolumn-combobox/keyboard-navigation.html'},
        {displayName: 'keyboard-navigation.css', path: './src/multicolumn-combobox/keyboard-navigation.component.css'},
        {displayName: 'multicolumn-data-source.ts', path: './src/multicolumn-combobox/multicolumn-data-source.ts'},
    ]},
    { path: ':theme/multicolumn-combobox/template', component: TemplateMultiComboBoxComponent, name: 'Template', order: '01', category: 'MultiColumn Combobox', description: 'This example demonstrates the Template functionalities of the Syncfusion<sup>®</sup> Angular MultiColumn Combobox component.', sourceFiles: [
        {displayName: 'template.component.ts', path: './src/multicolumn-combobox/template.component.ts'},
        {displayName: 'template.html', path: './src/multicolumn-combobox/template.html'},
        {displayName: 'template.css', path: './src/multicolumn-combobox/template.component.css'},
        {displayName: 'multicolumn-data-source.ts', path: './src/multicolumn-combobox/multicolumn-data-source.ts'},
    ] }
];

export const MultiColumnComboBoxSampleModule: ModuleWithProviders<any> = RouterModule.forChild(multicomboboxAppRoutes);
