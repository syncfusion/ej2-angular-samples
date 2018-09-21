import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AutoCompleteModule } from '@syncfusion/ej2-angular-dropdowns';
import { CheckBoxModule  } from '@syncfusion/ej2-angular-buttons';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { DefaultAutoCompleteComponent } from './default.component';
import { GroupAndIconAutoCompleteComponent } from './grouping-icon.component';
import { DataBindingAutoCompleteComponent } from './data-binding.component';
import { TemplateAutoCompleteComponent } from './template.component';
import { HighlightAutoCompleteComponent } from './highlight.component';
import { CustomFilteringAutoCompleteComponent } from './custom-filtering.component';
import { DiacriticsFilteringAutoCompleteComponent } from './diacritics-filtering.component';
import { TemplateDrivenAutoCompleteComponent } from './template-driven.component';
import { ReactiveFormAutoCompleteComponent } from './reactive-form.component';
import { SharedModule } from '../common/shared.module';
export const autoCompleteAppRoutes: Object[] = [
    {
        path: ':theme/auto-complete/default', component: DefaultAutoCompleteComponent, order: '01',
        name: 'Default Functionalities', description: 'This demo for Essential JS2 AutoComplete control shows the default rendering of the AutoComplete control with minimum configuration.', category: 'AutoComplete'
    },
    {
        path: ':theme/auto-complete/grouping-icon', component: GroupAndIconAutoCompleteComponent, order: '01',
        name: 'Grouping and Icons', description: 'This demo demonstrates the grouping of suggestions based on different categories with individual header and icon support in the AutoComplete control.', category: 'AutoComplete'
    },
    {
        path: ':theme/auto-complete/data-binding', component: DataBindingAutoCompleteComponent, order: '01',
        name: 'Data Binding', description: 'This demo for Essential JS2 Autocomplete control shows how to bind with  local data source and how to consume data from remote data service.', category: 'AutoComplete'
    },
    {
        path: ':theme/auto-complete/template', component: TemplateAutoCompleteComponent, order: '01',
        name: 'Template', description: 'This demo demonstrates on how to customize the appearance of each item that is displayed in the pop-up list using templating.', category: 'AutoComplete'
    },
    {
        path: ':theme/auto-complete/highlight', component: HighlightAutoCompleteComponent, order: '01',
        name: 'Highlight', description: 'The demo demonstrates the built-in support to highlight the searched characters on the suggested list items.', category: 'AutoComplete'
    },
    {
        path: ':theme/auto-complete/custom-filtering', component: CustomFilteringAutoCompleteComponent, order: '01',
        name: 'Custom Filtering', description: 'This demo demonstrates the custom filtering functionalities of the AutoComplete control.', category: 'AutoComplete'
    },
{
        path: ':theme/auto-complete/diacritics-filtering', component: DiacriticsFilteringAutoCompleteComponent, order: '01',
        name: 'Diacritics Filtering', description: 'This demo demonstrates the diacritics filter functionality of the AutoComplete control.',category: 'AutoComplete'
    },
    {
        path: ':theme/auto-complete/template-driven', component: TemplateDrivenAutoCompleteComponent, order: '02',
        name: 'Template Driven', description: 'This demo demonstrates the template-driven forms support of the AutoComplete control.', category: 'Form Support'
    },
    {
        path: ':theme/auto-complete/reactive-form', component: ReactiveFormAutoCompleteComponent, order: '02',
        name: 'Reactive Form', description: 'This demo demonstrates the reactive forms support of the AutoComplete control.', category: 'Form Support'
    }
];

export const AutoCompleteRouter: ModuleWithProviders = RouterModule.forChild(autoCompleteAppRoutes);

@NgModule({
    imports: [AutoCompleteRouter, AutoCompleteModule, SharedModule, CheckBoxModule, FormsModule, ReactiveFormsModule],
    declarations: [
        DefaultAutoCompleteComponent,
        GroupAndIconAutoCompleteComponent,
        DataBindingAutoCompleteComponent,
        TemplateAutoCompleteComponent,
        HighlightAutoCompleteComponent,
        CustomFilteringAutoCompleteComponent,
        DiacriticsFilteringAutoCompleteComponent,
        TemplateDrivenAutoCompleteComponent,
        ReactiveFormAutoCompleteComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AutoCompleteSampleModule {
}