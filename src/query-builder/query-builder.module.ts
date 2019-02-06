import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CheckBoxModule, RadioButtonModule } from '@syncfusion/ej2-angular-buttons';
import { CheckBoxSelectionService, DropDownListModule, MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';
import { SliderModule } from '@syncfusion/ej2-angular-inputs';
import { QueryBuilderModule } from '@syncfusion/ej2-angular-querybuilder';
import { SharedModule } from '../common/shared.module';
import { DefaultQueryBuilderComponent } from './default.component';
import { TemplateQueryBuilderComponent } from './template.component';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { GridQueryBuilderComponent } from './grid.component';
export const QueryBuilderAppRoutes: Object[] = [
    {
        path: ':theme/query-builder/default',
        component: DefaultQueryBuilderComponent,
        order: '01',
        name: 'Default Functionalities',
        category: 'Query Builder'
    },
    {
        path: ':theme/query-builder/template',
        component: TemplateQueryBuilderComponent,
        order: '01',
        name: 'Template',
        category: 'Query Builder'
    },
    {
        path: ':theme/query-builder/grid',
        component: GridQueryBuilderComponent,
        order: '01',
        name: 'Integration with Data Grid',
        category: 'Query Builder'
    }
];

export const QueryBuilderRouter: ModuleWithProviders = RouterModule.forChild(QueryBuilderAppRoutes);

@NgModule({
    imports: [QueryBuilderRouter, SharedModule, CommonModule, QueryBuilderModule,
        SliderModule, MultiSelectModule, DropDownListModule, RadioButtonModule, CheckBoxModule,
        GridModule],
    declarations: [
        DefaultQueryBuilderComponent,
        TemplateQueryBuilderComponent,
        GridQueryBuilderComponent
    ],
    exports: [DefaultQueryBuilderComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [CheckBoxSelectionService]
})
export class QueryBuilderSampleModule { }
