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
import { ConditionalFormattingComponent } from './conditional-formatting.component';
import { FieldListComponent } from './field-list.component';
import { CalculatedFieldComponent } from './calculated-field.component';
import { AggregationComponent } from './aggregation.component';
import { ExportingComponent } from './exporting.component';
import { DrillThroughComponent } from './drill-through.component';
import { EditingComponent } from './editing.component';
import { HyperLinkComponent } from './hyper-link.component';
import { ValueSortingComponent } from './value-sorting.component';
import { RTLComponent } from './right-to-left.component';
import { LocalComponent } from './local.component';
import { RemoteComponent } from './remote.component';
import { OlapComponent } from './olap.component';
import { SortingComponent } from './sorting.component';
import { FilteringComponent } from './filtering.component';
import { LabelFilterComponent } from './label-filtering.component';
import { ValueFilterComponent } from './value-filtering.component';
import { VirtualScrollingComponent } from './virtual-scrolling.component';
import { ChartComponent } from './pivot-chart.component';
import { DeferUpdateComponent } from './defer-update.component';
import { SummaryCustomizationComponent } from './summary-customization.component';
import { CellTemplateComponent } from './cell-template.component';
import { GroupingComponent } from './grouping.component';
import { ToolbarComponent } from './toolbar.component';
import { SelectionComponent } from './selection.component';
import { IntegrationComponent } from './external-binding.component';
import { SharedModule } from '../common/shared.module';
import { CheckBoxAllModule, RadioButtonAllModule, ButtonAllModule } from '@syncfusion/ej2-angular-buttons';
import { KeyboardNavigationComponent } from './keyboard-navigation.component';

export const pivottableRouteConfig: Object[] = [
    { 'path': ':theme/pivot-table/default', 'description': 'This demo for Essential JS2 Pivot Table control shows the basic rendering of the pivot table with minimum configuration', component: DefaultComponent, 'name': 'Default Functionalities', order: '01', category: 'Pivot Table' },
    { 'path': ':theme/pivot-table/local', 'description': 'This demo for Essential JS2 Pivot Table control demonstrate the basic rendering of the pivot table with local JSON and CSV data', component: LocalComponent, 'name': 'Local Data', order: '02', category: 'Data Binding' },
    { 'path': ':theme/pivot-table/remote', 'description': 'This demo for Essential JS2 Pivot Table control demonstrate the basic rendering of the pivot table with JSON and CSV remote data', component: RemoteComponent, 'name': 'Remote Data', order: '02', category: 'Data Binding' },
    { 'path': ':theme/pivot-table/olap', 'description': 'This demo for Essential JS2 Pivot Table control demonstrate the basic rendering of the pivot table with olap data', component: OlapComponent, 'name': 'OLAP', order: '02', category: 'Data Binding' },
    { 'path': ':theme/pivot-table/pivot-chart', 'description': 'This demo for Essential JS2 Pivot Table control demonstrate integration of pivot table data into a simple chart component', component: ChartComponent, 'name': 'Pivot Chart', order: '03', category: 'Integration' },
    { 'path': ':theme/pivot-table/external-binding', 'description': 'This demo for Essential JS2 Pivot Table control demonstrate the rendering of chart component with cell selection option', component: IntegrationComponent, 'name': 'External Binding', order: '03', category: 'Integration' },
    { 'path': ':theme/pivot-table/field-list', 'description': 'This demo for Essential JS2 Pivot Table control demonstrate the field list feature of the pivot table', component: FieldListComponent, 'name': 'Field List', order: '04', category: 'User Interaction' },
    { 'path': ':theme/pivot-table/grouping-bar', 'description': 'This demo for Essential JS2 Pivot Table control demonstrate the grouping bar feature of the pivot table', component: GroupingBarComponent, 'name': 'Grouping Bar', order: '04', category: 'User Interaction', type: 'update' },
    { 'path': ':theme/pivot-table/conditional-formatting', 'description': 'This demo for Essential JS2 Pivot Table control demonstrate formatting the appearance of the pivot table cells with values based on the applied conditions', component: ConditionalFormattingComponent, 'name': 'Conditional Formatting', order: '04', category: 'User Interaction' },
    { 'path': ':theme/pivot-table/selection', 'description': 'This demo for Essential JS2 Pivot Table control demonstrate the cell selection feature', component: SelectionComponent, 'name': 'Selection', order: '04', category: 'User Interaction' },
    { 'path': ':theme/pivot-table/summary-customization', 'description': 'This demo for Essential JS2 Pivot Table control demonstrate the summary customization feature of the pivot table', component: SummaryCustomizationComponent, 'name': 'Show/Hide Totals', order: '04', category: 'User Interaction' },
    { 'path': ':theme/pivot-table/grouping', 'description': 'This demo for Essential JS2 Pivot Table control demonstrate the grouping feature for date and number fields', component: GroupingComponent, 'name': 'Grouping', order: '04', category: 'User Interaction' },
    { 'path': ':theme/pivot-table/toolbar', 'description': 'This demo for Essential JS2 Pivot Table control demonstrate the toolbar feature of the pivot table', component: ToolbarComponent, 'name': 'Toolbar', order: '04', category: 'User Interaction' },
    { 'path': ':theme/pivot-table/keyboard-navigation', 'description': 'This sample demonstrates how to use keyboard shortcuts to interact with Pivot Table features such as the pivot table, grouping bar, field list, toolbar, calculated field, drill through, and filter dialog', component: KeyboardNavigationComponent, 'name': 'Keyboard Navigation', order: '05', category: 'Keyboard Navigation', type: 'new' },
    { 'path': ':theme/pivot-table/calculated-field', 'description': 'This demo for Essential JS2 Pivot Table control shows calculated field, and it allows users to add calculated items', component: CalculatedFieldComponent, 'name': 'Calculated Field', order: '06', category: 'Formula' },
    { 'path': ':theme/pivot-table/aggregation', 'description': 'This demo for Essential JS2 Pivot Table control shows different types of aggregation for value fields', component: AggregationComponent, 'name': 'Aggregation', order: '06', category: 'Formula' },
    { 'path': ':theme/pivot-table/sorting', 'description': 'This demo for Essential JS2 Pivot Table control shows ordering(sorting) of fields either in ascending or descending order', component: SortingComponent, 'name': 'Default Sorting', order: '07', category: 'Sorting' },
    { 'path': ':theme/pivot-table/value-sorting', 'description': 'This demo for Essential JS2 Pivot Table control shows sorting values on column or row wise in ascending or descending order', component: ValueSortingComponent, 'name': 'Value Sorting', order: '07', category: 'Sorting' },
    { 'path': ':theme/pivot-table/filtering', 'description': 'This demo for Essential JS2 Pivot Table control demonstrate member filtering of field headers either by including or excluding them', component: FilteringComponent, 'name': 'Default Filtering', order: '08', category: 'Filtering' },
    { 'path': ':theme/pivot-table/label-filtering', 'description': 'This demo for Essential JS2 Pivot Table control demonstrate label filtering of field headers either by including or excluding them', component: LabelFilterComponent, 'name': 'Label Filtering', order: '08', category: 'Filtering' },
    { 'path': ':theme/pivot-table/value-filtering', 'description': 'This demo for Essential JS2 Pivot Table control demonstrate the filtering of field headers based on the grand total (value based)', component: ValueFilterComponent, 'name': 'Value Filtering', order: '08', category: 'Filtering' },
    { 'path': ':theme/pivot-table/virtual-scrolling', 'description': 'This demo for Essential JS2 Pivot Table control shows virtual scrolling option available vertically and horizontally to load large records with ease', component: VirtualScrollingComponent, 'name': 'Virtual Scrolling', order: '09', category: 'Scrolling' },
    { 'path': ':theme/pivot-table/cell-template', 'description': 'This demo for Essential JS2 Pivot Table control demonstrate cell template option on cells of the pivot table', component: CellTemplateComponent, 'name': 'Cell Template', order: '10', category: 'Customization' },
    { 'path': ':theme/pivot-table/drill-through', 'description': 'This demo for Essential JS2 Pivot Table control shows the raw items of any value cells in pivot table', component: DrillThroughComponent, 'name': 'Drill Through', 'order': '11', 'category': 'Miscellaneous' },
    { 'path': ':theme/pivot-table/editing', 'description': 'This demo for Essential JS2 Pivot Table control allows to edit, add and delete the value cells in pivot table', component: EditingComponent, 'name': 'Editing', 'order': '11', 'category': 'Miscellaneous' },
    { 'path': ':theme/pivot-table/hyper-link', 'description': 'This demo for Essential JS2 Pivot Table control shows hyperlink option on cells of the pivot table', component: HyperLinkComponent, 'name': 'Hyperlink', order: '11', category: 'Miscellaneous' },
    { 'path': ':theme/pivot-table/defer-update', 'description': 'This demo for Essential JS2 Pivot Table control demonstrate defer layout update feature of the pivot table', component: DeferUpdateComponent, 'name': 'Defer Layout Update', order: '11', category: 'Miscellaneous' },
    { 'path': ':theme/pivot-table/exporting', 'description': 'This demo for Essential JS2 Pivot Table control demonstrate client-side exporting of the pivot table to Excel, CSV and PDF formats', component: ExportingComponent, 'name': 'Export', order: '11', category: 'Miscellaneous' }
];

let declarations: Type<Object>[] = [DefaultComponent, LocalComponent, RemoteComponent, OlapComponent, GroupingBarComponent, FieldListComponent, KeyboardNavigationComponent, CalculatedFieldComponent,
    AggregationComponent, ExportingComponent, DrillThroughComponent, EditingComponent, ValueSortingComponent, RTLComponent, ChartComponent, SortingComponent,
    FilteringComponent, LabelFilterComponent, ValueFilterComponent, ConditionalFormattingComponent, VirtualScrollingComponent, HyperLinkComponent, DeferUpdateComponent, SummaryCustomizationComponent, ToolbarComponent,
    SelectionComponent, IntegrationComponent, CellTemplateComponent, GroupingComponent];

@NgModule({
    imports: [RouterModule.forChild(pivottableRouteConfig), CommonModule, HttpModule, ToolbarModule, PivotViewAllModule, PivotFieldListAllModule, SharedModule, NumericTextBoxAllModule, ButtonAllModule, CheckBoxAllModule, RadioButtonAllModule],
    declarations: declarations,
    providers: [PivotViewAllModule, PivotFieldListAllModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PivotTableSampleModule { }
