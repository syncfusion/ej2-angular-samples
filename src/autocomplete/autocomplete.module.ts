import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AutoCompleteModule } from '@syncfusion/ej2-ng-dropdowns';
import { CheckBoxModule } from '@syncfusion/ej2-ng-buttons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DefaultAutoCompleteComponent } from './default.component';
import { GroupAndIconAutoCompleteComponent } from './groupingicon.component';
import { DataBindingAutoCompleteComponent } from './databinding.component';
import { TemplateAutoCompleteComponent } from './template.component';
import { HighlightAutoCompleteComponent } from './highlight.component';
import { CustomFilteringAutoCompleteComponent } from './customfiltering.component';
import { DiacriticsFilteringAutoCompleteComponent } from './diacriticsfiltering.component';
import { TemplateDrivenAutoCompleteComponent } from './templatedriven.component';
import { ReactiveFormAutoCompleteComponent } from './reactiveform.component';
import { SharedModule } from '../common/shared.module';
export const autoCompleteAppRoutes: Object[] = [
    {
        path: ':theme/autocomplete/default', component: DefaultAutoCompleteComponent, order: '01',
        name: 'Default Functionalities', category: 'AutoComplete'
    },
    {
        path: ':theme/autocomplete/groupingicon', component: GroupAndIconAutoCompleteComponent, order: '01',
        name: 'Grouping and Icons', category: 'AutoComplete'
    },
    {
        path: ':theme/autocomplete/databinding', component: DataBindingAutoCompleteComponent, order: '01',
        name: 'Data Binding', category: 'AutoComplete'
    },
    {
        path: ':theme/autocomplete/template', component: TemplateAutoCompleteComponent, order: '01',
        name: 'Template', category: 'AutoComplete'
    },
    {
        path: ':theme/autocomplete/highlight', component: HighlightAutoCompleteComponent, order: '01',
        name: 'Highlight', category: 'AutoComplete'
    },
    {
        path: ':theme/autocomplete/customfiltering', component: CustomFilteringAutoCompleteComponent, order: '01',
        name: 'Custom Filtering', category: 'AutoComplete'
    },
    {
        path: ':theme/autocomplete/diacriticsfiltering', component: DiacriticsFilteringAutoCompleteComponent, order: '01',
        name: 'Diacritics Filtering', category: 'AutoComplete', type: 'new'
    },
    {
        path: ':theme/autocomplete/templatedriven', component: TemplateDrivenAutoCompleteComponent, order: '02',
        name: 'Template Driven', category: 'Form Support', type: 'new'
    },
    {
        path: ':theme/autocomplete/reactiveform', component: ReactiveFormAutoCompleteComponent, order: '02',
        name: 'Reactive Form', category: 'Form Support', type: 'new'
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