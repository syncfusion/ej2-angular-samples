import { NgModule, Type, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { PivotViewAllModule } from '@syncfusion/ej2-angular-pivotview';
import { PivotFieldListAllModule } from '@syncfusion/ej2-angular-pivotview';
import { NumericTextBoxAllModule } from '@syncfusion/ej2-angular-inputs';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { DefaultComponent } from './default.component';
import { GroupingBarComponent } from './grouping-bar.component';
import { FieldListComponent } from './field-list.component';
import { CalculatedFieldComponent } from './calculated-field.component';
import { AggregationComponent } from './aggregation.component';
import { ExportingComponent } from './exporting.component';
import { ValueSortingComponent } from './value-sorting.component';
import { RTLComponent } from './right-to-left.component';
import { LocalComponent } from './local.component';
import { RemoteComponent } from './remote.component';
import { SortingComponent } from './sorting.component';
import { FilteringComponent } from './filtering.component';
import { ChartComponent } from './chart.component';
import { SharedModule } from '../common/shared.module';

export const pivotviewRouteConfig: Object[] = [
    { 'path': ':theme/pivot-view/default', component: DefaultComponent, 'name': 'Default Functionalities', order: '01', category: 'Pivot Grid' },
    { 'path': ':theme/pivot-view/local', component: LocalComponent, 'name': 'Local Data', order: '02', category: 'Data Binding' },
    { 'path': ':theme/pivot-view/remote', component: RemoteComponent, 'name': 'Remote Data', order: '02', category: 'Data Binding' },
    { 'path': ':theme/pivot-view/field-list', component: FieldListComponent, 'name': 'Field List', order: '03', category: 'User Interaction' },
    { 'path': ':theme/pivot-view/grouping-bar', component: GroupingBarComponent, 'name': 'Grouping Bar', order: '03', category: 'User Interaction' },
    { 'path': ':theme/pivot-view/calculated-field', component: CalculatedFieldComponent, 'name': 'Calculated Field', order: '04', category: 'Formula' },
    { 'path': ':theme/pivot-view/aggregation', component: AggregationComponent, 'name': 'Aggregation', order: '04', category: 'Formula' },
    { 'path': ':theme/pivot-view/sorting', component: SortingComponent, 'name': 'Default Sorting', order: '05', category: 'Sorting' },
    { 'path': ':theme/pivot-view/value-sorting', component: ValueSortingComponent, 'name': 'Value Sorting', order: '05', category: 'Sorting' },
    { 'path': ':theme/pivot-view/filtering', component: FilteringComponent, 'name': 'Default Filtering', order: '06', category: 'Filtering' },
    { 'path': ':theme/pivot-view/chart', component: ChartComponent, 'name': 'Chart', order: '07', category: 'Integration' },
    { 'path': ':theme/pivot-view/exporting', component: ExportingComponent, 'name': 'Export', order: '08', category: 'Miscellaneous' }
];

let declarations: Type<Object>[] = [DefaultComponent, LocalComponent, RemoteComponent, GroupingBarComponent, FieldListComponent, CalculatedFieldComponent,
    AggregationComponent, ExportingComponent, ValueSortingComponent, RTLComponent, ChartComponent, SortingComponent,
    FilteringComponent];

@NgModule({
    imports: [RouterModule.forChild(pivotviewRouteConfig), CommonModule, HttpModule, ToolbarModule, PivotViewAllModule, PivotFieldListAllModule, SharedModule, NumericTextBoxAllModule],
    declarations: declarations,
    providers: [PivotViewAllModule, PivotFieldListAllModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PivotViewSampleModule { }
