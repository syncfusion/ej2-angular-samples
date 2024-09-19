import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckBoxModule, RadioButtonModule } from '@syncfusion/ej2-angular-buttons';
import { CheckBoxSelectionService, DropDownListModule, MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';
import { SliderModule } from '@syncfusion/ej2-angular-inputs';
import { QueryBuilderModule } from '@syncfusion/ej2-angular-querybuilder';

import { DefaultQueryBuilderComponent } from './default.component';
import { ComplexQueryBuilderComponent } from './complex-databinding.component';
import { GridQueryBuilderComponent } from './grid.component';
import { TemplateQueryBuilderComponent } from './template.component';
import { RuleTemplateQueryBuilderComponent } from './rule-template.component';
import { HeaderTemplateQueryBuilderComponent } from './header-template.component';
import { CloneComponent } from './clone.component';
import { LockComponent } from './lock.component';
import { MongoComponent } from './mongo.component';
import { DragDropComponent } from './drag-drop.component';
import { SeparateConnectorComponent } from './separate-connector.component';
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
        path: ':theme/query-builder/mongo',
        component: MongoComponent,
        order: '01',
        name: 'Mongo and SQL Query',
        category: 'Query Builder'
    },
    {
        path: ':theme/query-builder/clone',
        component: CloneComponent,
        order: '01',
        name: 'Clone Group/ Rule',
        category: 'Query Builder'
    },
    {
        path: ':theme/query-builder/lock',
        component: LockComponent,
        order: '01',
        name: 'Lock Group/ Rule',
        category: 'Query Builder'
    },
    {
        path: ':theme/query-builder/drag-drop',
        component: DragDropComponent,
        order: '01',
        name: 'Drag and Drop',
        category: 'Query Builder'
    },
    {
        path: ':theme/query-builder/separate-connector',
        component: SeparateConnectorComponent,
        order: '01',
        name: 'Separate Connector',
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

export const QueryBuilderSampleModule: ModuleWithProviders<any> = RouterModule.forChild(QueryBuilderAppRoutes);
