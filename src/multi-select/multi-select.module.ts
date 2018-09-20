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
export const multiselectAppRoutes: Object[] = [
    {
        path: ':theme/multi-select/default', component: DefaultMultiselectComponent,
        name: 'Default Functionalities', category: 'MultiSelect', description: 'This demo for Essential JS2 MultiSelect control shows the default rendering of the MultiSelect control with minimum configuration.', order: '01'
    },
    { path: ':theme/multi-select/data-binding', component: DataBindingMultiSelectComponent, name: 'Data Binding', description: 'This demo for Essential JS2 MultiSelect control shows how to bind with  local data source and how to consume data from remote data service.', order: '01',
		category: 'MultiSelect' },
    { path: ':theme/multi-select/grouping', component: GroupMultiSelectComponent, name: 'Grouping', description: 'This demo demonstrates the grouping of suggestions based on different categories with individual header in the MultiSelect control.', order: '01',
		category: 'MultiSelect' },
    { path: ':theme/multi-select/template', component: TemplateMultiSelectComponent, name: 'Template', description: 'This demo demonstrates on how to customize the appearance of each item that is displayed in the pop-up list using templating in MultiSelect control.',order: '01',
		category: 'MultiSelect' },
    { path: ':theme/multi-select/filtering', component: FilteringMultiSelectComponent, name: 'Filtering', description: 'This demo demonstrates the filtering functionalities of the MultiSelect control.', order: '01',
		category: 'MultiSelect' },
    { path: ':theme/multi-select/custom-value', component: CustomTagMultiSelectComponent, name: 'Custom Values', description: 'This demo for Essential JS2 MultiSelect control demonstrates the addition of a new value that is not present in the predefined list.', order: '01',
		category: 'MultiSelect' },
    {
        path: ':theme/multi-select/chip-customization', component: ChipCustomizeMultiSelectComponent, description: 'This demo for Essential JS2 MultiSelect control demonstrates on how to customize the selected chip element on selection action.', order: '01',
        name: 'Chip Customization', category: 'MultiSelect'
    },
    {
        path: ':theme/multi-select/diacritics-filtering', component: DiacriticsFilteringMultiSelectComponent, description: 'This demo demonstrates the diacritics filter functionality of the MultiSelect control.', order: '01',
        name: 'Diacritics Filtering', category: 'MultiSelect'
    },
    {
        path: ':theme/multi-select/checkbox', component: CheckboxMultiSelectComponent, description: 'This demo for Essential JS2 MultiSelect control demonstrates the built-in support to select the multiple values through checkbox.', order: '01',
        name: 'CheckBox', category: 'MultiSelect'
    },
    {
        path: ':theme/multi-select/selection-limit', component: SelectLimitComponent, description: 'This demo for Essential JS2 MultiSelect control demonstrates to limit the number of items that is selected in a component.', order: '01',
        name: 'Selection Limit', category: 'MultiSelect'
    },
    {
        path: ':theme/multi-select/template-driven', component: TemplateDrivenMultiSelectComponent, description: 'This demo demonstrates the template-driven forms support of the MultiSelect control.', order: '02',
        name: 'Template Driven', category: 'Form Support'
    },
    {
        path: ':theme/multi-select/reactive-form', component: ReactiveFormMultiSelectComponent, description: 'This demo demonstrates the reactive forms support of the MultiSelect control.', order: '02',
        name: 'Reactive Form', category: 'Form Support'
    },
];

export const MultiSelectRouter: ModuleWithProviders = RouterModule.forChild(multiselectAppRoutes);

@NgModule({
    imports: [MultiSelectRouter, MultiSelectAllModule, SharedModule, ButtonModule, CheckBoxModule, NumericTextBoxModule, FormsModule,
              ReactiveFormsModule],
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