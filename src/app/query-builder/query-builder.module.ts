import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckBoxModule, RadioButtonModule } from '@syncfusion/ej2-angular-buttons';
import { CheckBoxSelectionService, DropDownListModule, MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';
import { SliderModule } from '@syncfusion/ej2-angular-inputs';
import { QueryBuilderModule } from '@syncfusion/ej2-angular-querybuilder';
import { SharedModule } from '../common/shared.module';
import { DefaultQueryBuilderComponent } from './default.component';
import { ComplexQueryBuilderComponent } from './complex-databinding.component';
import { GridQueryBuilderComponent } from './grid.component';
import { TemplateQueryBuilderComponent } from './template.component';
import { RuleTemplateQueryBuilderComponent } from './rule-template.component';
import { HeaderTemplateQueryBuilderComponent } from './header-template.component';
import { OverviewQueryBuilderComponent } from './overview.component';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { TabModule } from '@syncfusion/ej2-angular-navigations';
export const QueryBuilderAppRoutes: Object[] = [
    {
        path: ':theme/query-builder/default',
        component: DefaultQueryBuilderComponent,
        order: '01',
        name: 'Default Functionalities',
        category: 'Query Builder'
    },
    {
        path: ':theme/query-builder/complex-databinding',
        component: ComplexQueryBuilderComponent,
        order: '01',
        name: 'Complex Databinding',
        category: 'Query Builder'
    },
    {
        path: ':theme/query-builder/grid',
        component: GridQueryBuilderComponent,
        order: '01',
        name: 'Integration with Data Grid',
        category: 'Query Builder'
    },
    {
        path: ':theme/query-builder/template',
        component: TemplateQueryBuilderComponent,
        order: '02',
        name: 'Value Template',
        category: 'Template'
    },
    {
        path: ':theme/query-builder/rule-template',
        component: RuleTemplateQueryBuilderComponent,
        order: '02',
        name: 'Rule Template',
        category: 'Template'
    },
    {
        path: ':theme/query-builder/header-template',
        component: HeaderTemplateQueryBuilderComponent,
        order: '02',
        name: 'Header Template',
        category: 'Template'
    }
];

export const QueryBuilderRouter: ModuleWithProviders<any> = RouterModule.forChild(QueryBuilderAppRoutes);

@NgModule({
    imports: [FormsModule, ReactiveFormsModule, QueryBuilderRouter, SharedModule, CommonModule, QueryBuilderModule, SliderModule, MultiSelectModule, DropDownListModule, RadioButtonModule, CheckBoxModule, GridModule, TabModule],
    declarations: [
        DefaultQueryBuilderComponent,
        TemplateQueryBuilderComponent,
        GridQueryBuilderComponent,
        HeaderTemplateQueryBuilderComponent,
        RuleTemplateQueryBuilderComponent,
        ComplexQueryBuilderComponent,
        OverviewQueryBuilderComponent
    ],
    exports: [DefaultQueryBuilderComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [CheckBoxSelectionService]
})
export class QueryBuilderSampleModule { }
