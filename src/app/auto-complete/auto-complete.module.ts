import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { AutoCompleteModule } from '@syncfusion/ej2-angular-dropdowns';
import { CheckBoxModule  } from '@syncfusion/ej2-angular-buttons';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { DefaultAutoCompleteComponent } from './default.component';
import { GroupAndIconAutoCompleteComponent } from './grouping-icon.component';
import { DataBindingAutoCompleteComponent } from './data-binding.component';
import { DisabledItemsAutoCompleteComponent } from './disabled-items.component';
import { TemplateAutoCompleteComponent } from './template.component';
import { CustomResizeAutoCompleteComponent } from './resize.component';
import { HighlightAutoCompleteComponent } from './highlight.component';
import { CustomFilteringAutoCompleteComponent } from './custom-filtering.component';
import { DiacriticsFilteringAutoCompleteComponent } from './diacritics-filtering.component';
import { TemplateDrivenAutoCompleteComponent } from './template-driven.component';
import { ReactiveFormAutoCompleteComponent } from './reactive-form.component';

import { BrowserModule } from '@angular/platform-browser';
import { VirtualScrollAutoCompleteComponent } from './virtual-scroll.component';
import { ObjectAutoCompleteComponent } from './object-value-binding';
export const autoCompleteAppRoutes: Object[] = [
    {
        path: ':theme/auto-complete/default', component: DefaultAutoCompleteComponent, order: '01',
        name: 'Default Functionalities', description: 'This example demonstrates the default functionalities of the Angular autocomplete component with minimum configuration.', category: 'AutoComplete'
    },
    {
        path: ':theme/auto-complete/grouping-icon', component: GroupAndIconAutoCompleteComponent, order: '01',
        name: 'Grouping and Icons', description: 'This example demonstrates how to group based on the different categories with individual header and icon support using the Angular autocomplete component.', category: 'AutoComplete'
    },
    {
        path: ':theme/auto-complete/data-binding', component: DataBindingAutoCompleteComponent, order: '01',
        name: 'Data Binding', description: 'This example demonstrates how to bind with local data source and fetch data from remote data service in the Angular autocomplete component.', category: 'AutoComplete'
    },
    {
        path: ':theme/auto-complete/object-value-binding', component: ObjectAutoCompleteComponent, order: '01',
        name: 'Object Value Binding', description: 'This example demonstrates how to bind with data source in the Angular autocomplete component.', category: 'AutoComplete'
    },
    { path: ':theme/auto-complete/disabled-items', component: DisabledItemsAutoCompleteComponent, name: 'Disabled Items', description: 'This example showcases the disabled items of Angular autocomplete component.', order: '01',
    	category: 'AutoComplete' },
    {
        path: ':theme/auto-complete/template', component: TemplateAutoCompleteComponent, order: '01',
        name: 'Template', description: 'This example demonstrates how to customize the appearance of each item in the Angular autocomplete component pop-up list using template.', category: 'AutoComplete'
    },
    {
        path: ':theme/auto-complete/resize', component: CustomResizeAutoCompleteComponent, order: '01',
        name: 'Popup Resize',  description: 'This demo showcases the custom resizing functionality of AutoComplete, You can adjust the size of the popup based on your preferences, allowing for better control over its appearance.', category: 'AutoComplete'
    },
    {
        path: ':theme/auto-complete/virtual-scroll', component: VirtualScrollAutoCompleteComponent, order: '01',
        name: 'Virtualization', description: 'This example demonstrates how to utilize the virtualization support of Angular autocomplete component.', category: 'AutoComplete'
    },
    {
        path: ':theme/auto-complete/highlight', component: HighlightAutoCompleteComponent, order: '01',
        name: 'Highlight', description: 'This example demonstrates how to highlight the searched characters in the suggested list items of the Angular autocomplete component.', category: 'AutoComplete'
    },
    {
        path: ':theme/auto-complete/custom-filtering', component: CustomFilteringAutoCompleteComponent, order: '01',
        name: 'Custom Filtering', description: 'This example demonstrates how to achieve the custom filtering functionalities in the Angular autocomplete component.', category: 'AutoComplete'
    },
{
        path: ':theme/auto-complete/diacritics-filtering', component: DiacriticsFilteringAutoCompleteComponent, order: '01',
        name: 'Diacritics Filtering', description: 'This example demonstrates how to achieve the diacritics filter functionalities in the Angular autocomplete component.',category: 'AutoComplete'
    },
    {
        path: ':theme/auto-complete/template-driven', component: TemplateDrivenAutoCompleteComponent, order: '02',
        name: 'Template Driven', description: 'This demo explains the template-driven forms support of the Syncfusion<sup>®</sup> angular autocomplete component.', category: 'Form Support'
    },
    {
        path: ':theme/auto-complete/reactive-form', component: ReactiveFormAutoCompleteComponent, order: '02',
        name: 'Reactive Form', description: 'This demo explains the reactive forms support of the Syncfusion<sup>®</sup> angular autocomplete component.', category: 'Form Support'
    }
];

export const AutoCompleteSampleModule: ModuleWithProviders<any> = RouterModule.forChild(autoCompleteAppRoutes);

