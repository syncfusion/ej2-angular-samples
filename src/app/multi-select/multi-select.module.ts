import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CheckBoxModule, ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { MultiSelectAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { DefaultMultiselectComponent } from './default.component';
import { GroupMultiSelectComponent } from './grouping.component';
import { DataBindingMultiSelectComponent } from './data-binding.component';
import { TemplateMultiSelectComponent } from './template.component';
import { FilteringMultiSelectComponent } from './filtering.component';
import { CustomTagMultiSelectComponent } from './custom-value.component';
import { ChipCustomizeMultiSelectComponent } from './chip-customization.component';
import { DiacriticsFilteringMultiSelectComponent } from './diacritics-filtering.component';
import { CheckboxMultiSelectComponent } from './checkbox.component';
import { SelectLimitComponent } from './selection-limit.component';
import { SharedModule } from '../common/shared.module';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { TemplateDrivenMultiSelectComponent } from './template-driven.component';
import { ReactiveFormMultiSelectComponent } from './reactive-form.component';
import { BrowserModule } from '@angular/platform-browser';
export const multiselectAppRoutes: Object[] = [
    {
        path: ':theme/multi-select/default', component: DefaultMultiselectComponent,
        name: 'Default Functionalities', category: 'MultiSelect Dropdown', description: 'This example demonstrates the default functionalities of the Angular multiselect component with minimum configuration.', order: '01'
    },
    { path: ':theme/multi-select/data-binding', component: DataBindingMultiSelectComponent, name: 'Data Binding', description: 'This example demonstrates how to bind with local data source and fetch data from remote data service in the Angular multiselect component.', order: '01',
		category: 'MultiSelect Dropdown' },
    { path: ':theme/multi-select/grouping', component: GroupMultiSelectComponent, name: 'Grouping', description: 'This example demonstrates how to group based on the different categories with individual header and icon support using the Angular multiselect component.', order: '01',
		category: 'MultiSelect Dropdown' },
    { path: ':theme/multi-select/template', component: TemplateMultiSelectComponent, name: 'Template', description: 'This example demonstrates how to customize the appearance of each item in the Angular multiselect component pop-up list using the template.',order: '01',
		category: 'MultiSelect Dropdown' },
    { path: ':theme/multi-select/filtering', component: FilteringMultiSelectComponent, name: 'Filtering', description: 'This example demonstrates how the filtering functionalities works based on the typed characters in the Angular multiselect component.', order: '01',
		category: 'MultiSelect Dropdown' },
    { path: ':theme/multi-select/custom-value', component: CustomTagMultiSelectComponent, name: 'Custom Values', description: 'This example demonstrates the addition of a new value that is not present in the predefined list of the Angular multiselect component.', order: '01',
		category: 'MultiSelect Dropdown' },
    {
        path: ':theme/multi-select/chip-customization', component: ChipCustomizeMultiSelectComponent, description: 'This example demonstrates how to customize the appearance of the selected chip element in the Angular multiselect component.', order: '01',
        name: 'Chip Customization', category: 'MultiSelect Dropdown'
    },
    {
        path: ':theme/multi-select/diacritics-filtering', component: DiacriticsFilteringMultiSelectComponent, description: 'This example demonstrates how to select the multiple values through checkbox in the Angular multiselect component.', order: '01',
        name: 'Diacritics Filtering', category: 'MultiSelect Dropdown'
    },
    {
        path: ':theme/multi-select/checkbox', component: CheckboxMultiSelectComponent, description: 'This example demonstrates the maximum selection limit functionalities with checkbox of the Angular multiselect component.', order: '01',
        name: 'CheckBox', category: 'MultiSelect Dropdown'
    },
    {
        path: ':theme/multi-select/selection-limit', component: SelectLimitComponent, description: 'This example demonstrates how to achieve the diacritics filter functionalities in the Angular multiselect component.', order: '01',
        name: 'Selection Limit', category: 'MultiSelect Dropdown'
    },
    {
        path: ':theme/multi-select/template-driven', component: TemplateDrivenMultiSelectComponent, description: 'This demo explains the template-driven forms support of the Syncfusion angular multiselect component.', order: '02',
        name: 'Template Driven', category: 'Form Support'
    },
    {
        path: ':theme/multi-select/reactive-form', component: ReactiveFormMultiSelectComponent, description: 'This demo explains the reactive forms support of the Syncfusion angular multiselect component.', order: '02',
        name: 'Reactive Form', category: 'Form Support'
    },
];

export const MultiSelectRouter: ModuleWithProviders = RouterModule.forChild(multiselectAppRoutes);

@NgModule({
    imports: [MultiSelectRouter, MultiSelectAllModule, SharedModule, ButtonModule, CheckBoxModule, NumericTextBoxModule, FormsModule,
              ReactiveFormsModule,BrowserModule],
    declarations: [
        DefaultMultiselectComponent,
        GroupMultiSelectComponent,
        DataBindingMultiSelectComponent,
        TemplateMultiSelectComponent,
        FilteringMultiSelectComponent,
        CustomTagMultiSelectComponent,
        ChipCustomizeMultiSelectComponent,
        CheckboxMultiSelectComponent,
        SelectLimitComponent,
        DiacriticsFilteringMultiSelectComponent,
        TemplateDrivenMultiSelectComponent,
        ReactiveFormMultiSelectComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MultiSelectSampleModule {
}