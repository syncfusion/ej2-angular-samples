import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CheckBoxModule, ButtonModule } from '@syncfusion/ej2-ng-buttons';
import { NumericTextBoxModule } from '@syncfusion/ej2-ng-inputs';
import { MultiSelectModule } from '@syncfusion/ej2-ng-dropdowns';
import { DefaultMultiselectComponent } from './default.component';
import { GroupMultiSelectComponent } from './grouping.component';
import { DataBindingMultiSelectComponent } from './databinding.component';
import { TemplateMultiSelectComponent } from './template.component';
import { FilteringMultiSelectComponent } from './filtering.component';
import { CustomTagMultiSelectComponent } from './customtag.component';
import { ChipCustomizeMultiSelectComponent } from './chipcustomization.component';
import { DiacriticsFilteringMultiSelectComponent } from './diacriticsfiltering.component';
import { CheckboxMultiSelectComponent } from './checkbox.component';
import { SelectLimitComponent } from './selectionlimit.component';
import { SharedModule } from '../common/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TemplateDrivenMultiSelectComponent } from './templatedriven.component';
import { ReactiveFormMultiSelectComponent } from './reactiveform.component';
export const multiselectAppRoutes: Object[] = [
    {
        path: ':theme/multiselect/default', component: DefaultMultiselectComponent,
        name: 'Default Functionalities', category: 'MultiSelect', order: '01'
    },
    {
        path: ':theme/multiselect/databinding', component: DataBindingMultiSelectComponent, name: 'Data Binding', order: '01',
        category: 'MultiSelect'
    },
    {
        path: ':theme/multiselect/grouping', component: GroupMultiSelectComponent, name: 'Grouping', order: '01',
        category: 'MultiSelect'
    },
    {
        path: ':theme/multiselect/template', component: TemplateMultiSelectComponent, name: 'Template', order: '01',
        category: 'MultiSelect'
    },
    {
        path: ':theme/multiselect/filtering', component: FilteringMultiSelectComponent, name: 'Filtering', order: '01',
        category: 'MultiSelect'
    },
    {
        path: ':theme/multiselect/customtag', component: CustomTagMultiSelectComponent, name: 'Custom Values', order: '01',
        category: 'MultiSelect'
    },
    {
        path: ':theme/multiselect/chipcustomization', component: ChipCustomizeMultiSelectComponent, order: '01',
        name: 'Chip Customization', category: 'MultiSelect', type: 'new'
    },
    {
        path: ':theme/multiselect/diacriticsfiltering', component: DiacriticsFilteringMultiSelectComponent, order: '01',
        name: 'Diacritics Filtering', category: 'MultiSelect', type: 'new'
    },
    {
        path: ':theme/multiselect/checkbox', component: CheckboxMultiSelectComponent, order: '01',
        name: 'CheckBox', category: 'MultiSelect', type: 'new'
    },
    {
        path: ':theme/multiselect/selectionlimit', component: SelectLimitComponent, order: '01',
        name: 'Selection Limit', category: 'MultiSelect', type: 'new'
    },
    {
        path: ':theme/multiselect/templatedriven', component: TemplateDrivenMultiSelectComponent, order: '02',
        name: 'Template Driven', category: 'Form Support', type: 'new'
    },
    {
        path: ':theme/multiselect/reactiveform', component: ReactiveFormMultiSelectComponent, order: '02',
        name: 'Reactive Form', category: 'Form Support', type: 'new'
    },
];

export const MultiSelectRouter: ModuleWithProviders = RouterModule.forChild(multiselectAppRoutes);

@NgModule({
    imports: [MultiSelectRouter, MultiSelectModule, SharedModule, ButtonModule, CheckBoxModule, NumericTextBoxModule, FormsModule,
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