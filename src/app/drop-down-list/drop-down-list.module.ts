import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { DefaultDropDownListComponent } from './default.component';
import { GroupAndIconDropDownListComponent } from './grouping-icon.component';
import { DataBindingDropDownListComponent } from './data-binding.component';
import { DisabledItemsDropDownListComponent } from './disabled-items.component';
import { TemplateDropDownListComponent } from './template.component';
import { ResizeDropDownListComponent } from './resize.component';
import { CascadingDropDownListComponent } from './cascading.component';
import { FilteringDropDownListComponent } from './filtering.component';
import { DiacriticsFilteringDropDownListComponent } from './diacritics-filtering.component';
import { InlineDropDownListComponent } from './inline.component';

import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { TemplateDrivenDropDownListComponent } from './template-driven.component';
import { ReactiveFormDropDownListComponent } from './reactive-form.component';
import { BrowserModule } from '@angular/platform-browser';
import { VirtualScrollDropDownListComponent } from './virtual-scroll.component';
import { ObjectDropDownListComponent } from './object-value-binding';
export const dropdownlistAppRoutes: Object[] = [
    { path: ':theme/drop-down-list/default', component: DefaultDropDownListComponent, name: 'Default Functionalities', description: 'This example demonstrates the default functionalities of the Angular drop-down list component with minimum configuration.', order: '01',
		category: 'Dropdown List' },
    { path: ':theme/drop-down-list/grouping-icon', component: GroupAndIconDropDownListComponent, name: 'Grouping and Icons', description: 'This example demonstrates how to group based on the different categories with individual header and icon support using Angular drop-down list component.', order: '01',
		category: 'Dropdown List' },
    { path: ':theme/drop-down-list/data-binding', component: DataBindingDropDownListComponent, name: 'Data Binding', description: 'This example demonstrates how to bind with local data source and fetch data from remote data service in the Angular drop-down list component.', order: '01',
		category: 'Dropdown List' },
    { path: ':theme/drop-down-list/object-value-binding', component: ObjectDropDownListComponent, name: 'Object Value Binding', description: 'This example demonstrates how to bind with data source in the Angular drop-down list component.', order: '01',
		category: 'Dropdown List' },
    { path: ':theme/drop-down-list/disabled-items', component: DisabledItemsDropDownListComponent, name: 'Disabled Items', description: 'This example showcases the disabled items of Angular drop-down list component.', order: '01',
		category: 'Dropdown List' },
    { path: ':theme/drop-down-list/template', component: TemplateDropDownListComponent, name: 'Template', description: 'This example demonstrates how to customize the appearance of each item in the Angular drop-down list component pop-up list using the template.', order: '01',
		category: 'Dropdown List' },
    { path: ':theme/drop-down-list/resize', component: ResizeDropDownListComponent,  name: 'Popup Resize', description: 'This demo showcases the custom resizing functionality of Dropdown List, You can adjust the size of the popup based on your preferences, allowing for better control over its appearance', order: '01',
      category: 'Dropdown List' },
    { path: ':theme/drop-down-list/virtual-scroll', component: VirtualScrollDropDownListComponent, name: 'Virtualization', description: 'This example demonstrates how to utilize the virtualization support of Angular drop-down list component.', order: '01',
		category: 'Dropdown List' },
    { path: ':theme/drop-down-list/filtering', component: FilteringDropDownListComponent, name: 'Filtering', description: 'This example demonstrates how the filtering functionalities works based on the typed characters in the Angular drop-down list component.', order: '01',
		category: 'Dropdown List' },
    { path: ':theme/drop-down-list/cascading', component: CascadingDropDownListComponent, name: 'Cascading', description: 'This example demonstrates how to create a related drop-down list (Cascading DropDownList) using the Angular drop-down list component.', order: '01',
		category: 'Dropdown List' },
    { path: ':theme/drop-down-list/inline', component: InlineDropDownListComponent, name: 'Inline', category: 'Dropdown List', description: 'This example demonstrates how to render the Angular drop-down list component in line with highlighted contents.', order: '01' },
    {
        path: ':theme/drop-down-list/diacritics-filtering', component: DiacriticsFilteringDropDownListComponent, description: 'This example demonstrates how to achieve the diacritics filter functionalities in the Angular drop-down list component.', order: '01',
        name: 'Diacritics Filtering', category: 'Dropdown List'
    },
    { path: ':theme/drop-down-list/template-driven', component: TemplateDrivenDropDownListComponent, name: 'Template Driven', description: 'This demo explains the template-driven forms support of the Syncfusion<sup>®</sup> angular drop-down list component.', order: '02',
      category: 'Form Support' },
    { path: ':theme/drop-down-list/reactive-form', component: ReactiveFormDropDownListComponent, name: 'Reactive Form', description: 'This demo explains the reactive forms support of the Syncfusion<sup>®</sup> angular drop-down list component.', order: '02',
		category: 'Form Support' }

];

export const DropDownListSampleModule: ModuleWithProviders<any> = RouterModule.forChild(dropdownlistAppRoutes);

