import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AutoCompleteModule } from '@syncfusion/ej2-ng-dropdowns';
import { CheckBoxModule  } from '@syncfusion/ej2-ng-buttons';
import { FormsModule }   from '@angular/forms';
import { DefaultAutoCompleteComponent } from './default.component';
import { GroupAndIconAutoCompleteComponent } from './groupingicon.component';
import { DataBindingAutoCompleteComponent } from './databinding.component';
import { TemplateAutoCompleteComponent } from './template.component';
import { HighlightAutoCompleteComponent } from './highlight.component';
import { CustomFilteringAutoCompleteComponent } from './customfiltering.component';
import { SharedModule } from '../common/shared.module';
export const autoCompleteAppRoutes: Object[] = [
    {
        path: ':theme/autocomplete/default', component: DefaultAutoCompleteComponent,
        name: 'Default Functionalities', category: 'AutoComplete'
    },
    {
        path: ':theme/autocomplete/groupingicon', component: GroupAndIconAutoCompleteComponent,
        name: 'Grouping and Icons', category: 'AutoComplete'
    },
    {
        path: ':theme/autocomplete/databinding', component: DataBindingAutoCompleteComponent,
        name: 'Data Binding', category: 'AutoComplete'
    },
    {
        path: ':theme/autocomplete/template', component: TemplateAutoCompleteComponent,
        name: 'Template', category: 'AutoComplete'
    },
    {
        path: ':theme/autocomplete/highlight', component: HighlightAutoCompleteComponent,
        name: 'Highlight', category: 'AutoComplete'
    },
    {
        path: ':theme/autocomplete/customfiltering', component: CustomFilteringAutoCompleteComponent,
        name: 'Custom Filtering', category: 'AutoComplete'
    }
];

export const AutoCompleteRouter: ModuleWithProviders = RouterModule.forChild(autoCompleteAppRoutes);

@NgModule({
    imports: [AutoCompleteRouter, AutoCompleteModule, SharedModule, CheckBoxModule, FormsModule],
    declarations: [
        DefaultAutoCompleteComponent,
        GroupAndIconAutoCompleteComponent,
        DataBindingAutoCompleteComponent,
        TemplateAutoCompleteComponent,
        HighlightAutoCompleteComponent,
        CustomFilteringAutoCompleteComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AutoCompleteSampleModule {
}