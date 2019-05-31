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
import { SortingComponent } from './sorting.component';
import { FilteringComponent } from './filtering.component';
import { LabelFilterComponent } from './label-filtering.component';
import { ValueFilterComponent } from './value-filtering.component';
import { VirtualScrollingComponent } from './virtual-scrolling.component';
import { ChartComponent } from './chart.component';
import { DeferUpdateComponent } from './defer-update.component';
import { SummaryCustomizationComponent } from './summary-customization.component';
import { CellTemplateComponent } from './cell-template.component';
import { GroupingComponent } from './grouping.component';
import { ToolbarComponent } from './toolbar.component';
import { SelectionComponent } from './selection.component';
import { IntegrationComponent } from './external-binding.component';
import { SharedModule } from '../common/shared.module';
import { CheckBoxAllModule, RadioButtonAllModule, ButtonAllModule } from '@syncfusion/ej2-angular-buttons';

export const pivotviewRouteConfig: Object[] = [
    { 'path': ':theme/pivot-view/default', 'description': 'This demo for Essential JS2 Pivot Table control shows the basic rendering of the pivotgrid with minimum configuration', component: DefaultComponent, 'name': 'Default Functionalities', order: '01', category: 'Pivot Table' },
    { 'path': ':theme/pivot-view/local', 'description': 'This demo for Essential JS2 Pivot Table control demonstrate the basic rendering of the pivotgrid widget with local JSON data', component: LocalComponent, 'name': 'Local Data', order: '02', category: 'Data Binding' },
    { 'path': ':theme/pivot-view/remote', 'description': 'This demo for Essential JS2 Pivot Table control demonstrate the basic rendering of the pivotgrid widget with remote data or service data', component: RemoteComponent, 'name': 'Remote Data', order: '02', category: 'Data Binding' },
    { 'path': ':theme/pivot-view/field-list', 'description': 'This demo for Essential JS2 Pivot Table control demonstrate the field list feature of the pivotgrid widget', component: FieldListComponent, 'name': 'Field List', order: '03', category: 'User Interaction' },
    { 'path': ':theme/pivot-view/grouping-bar', 'description': 'This demo for Essential JS2 Pivot Table control demonstrate the grouping bar feature of the pivotgrid widget', component: GroupingBarComponent, 'name': 'Grouping Bar', order: '03', category: 'User Interaction' },
    { 'path': ':theme/pivot-view/conditional-formatting', 'description': 'This demo for Essential JS2 Pivot Table control demonstrate formatting the appearance of the pivot grid cells with values based on the applied conditions', component: ConditionalFormattingComponent, 'name': 'Conditional Formatting', order: '03', category: 'User Interaction' },
    { 'path': ':theme/pivot-view/selection', 'description': 'This demo for Essential JS2 Pivot Table control demonstrate the cell selection feature', component: SelectionComponent, 'name': 'Selection', order: '03', category: 'User Interaction', type: 'new' },
    { 'path': ':theme/pivot-view/summary-customization', 'description': 'This demo for Essential JS2 Pivot Table control demonstrate the summary customization feature of the pivotgrid widget', component: SummaryCustomizationComponent, 'name': 'Show/Hide Totals', order: '03', category: 'User Interaction' },
    { 'path': ':theme/pivot-view/grouping', 'description': 'This demo for Essential JS2 Pivot Table control demonstrate the grouping feature for date and number fields', component: GroupingComponent, 'name': 'Grouping', order: '03', category: 'User Interaction', type: 'new' },
    { 'path': ':theme/pivot-view/toolbar', 'description': 'This demo for Essential JS2 Pivot Table control demonstrate the toolbar feature of the pivotgrid widget', component: ToolbarComponent, 'name': 'Toolbar', order: '03', category: 'User Interaction', type: 'new' },
    { 'path': ':theme/pivot-view/calculated-field', 'description': 'This demo for Essential JS2 Pivot Table control shows calculated field, and it allows users to add calculated items', component: CalculatedFieldComponent, 'name': 'Calculated Field', order: '04', category: 'Formula' },
    { 'path': ':theme/pivot-view/aggregation', 'description': 'This demo for Essential JS2 Pivot Table control shows different types of aggregation for value fields', component: AggregationComponent, 'name': 'Aggregation', order: '04', category: 'Formula' },
    { 'path': ':theme/pivot-view/sorting', 'description': 'This demo for Essential JS2 Pivot Table control shows ordering(sorting) of fields either in ascending or descending order', component: SortingComponent, 'name': 'Default Sorting', order: '05', category: 'Sorting' },
    { 'path': ':theme/pivot-view/value-sorting', 'description': 'This demo for Essential JS2 Pivot Table control shows sorting values on column or row wise in ascending or descending order', component: ValueSortingComponent, 'name': 'Value Sorting', order: '05', category: 'Sorting' },
    { 'path': ':theme/pivot-view/filtering', 'description': 'This demo for Essential JS2 Pivot Table control demonstrate member filtering of field headers either by including or excluding them', component: FilteringComponent, 'name': 'Default Filtering', order: '06', category: 'Filtering' },
    { 'path': ':theme/pivot-view/label-filtering', 'description': 'This demo for Essential JS2 Pivot Table control demonstrate label filtering of field headers either by including or excluding them', component: LabelFilterComponent, 'name': 'Label Filtering', order: '06', category: 'Filtering' },
    { 'path': ':theme/pivot-view/value-filtering', 'description': 'This demo for Essential JS2 Pivot Table control demonstrate the filtering of field headers based on the grand total (value based)', component: ValueFilterComponent, 'name': 'Value Filtering', order: '06', category: 'Filtering' },
    { 'path': ':theme/pivot-view/chart', 'description': 'This demo for Essential JS2 Pivot Table control demonstrate integration of pivot table data into a simple chart widget', component: ChartComponent, 'name': 'Chart', order: '07', category: 'Integration', type: 'update' },
    { 'path': ':theme/pivot-view/external-binding', 'description': 'This demo for Essential JS2 Pivot Table control demonstrate the rendering of chart widget with cell selection option', component: IntegrationComponent, 'name': 'External Binding', order: '07', category: 'Integration', type: 'new' },
    { 'path': ':theme/pivot-view/virtual-scrolling', 'description': 'This demo for Essential JS2 Pivot Table control shows virtual scrolling option available vertically and horizontally to load large records with ease', component: VirtualScrollingComponent, 'name': 'Virtual Scrolling', order: '08', category: 'Scrolling' },
	{ 'path': ':theme/pivot-view/cell-template', 'description': 'This demo for Essential JS2 Pivot Table control demonstrate cell template option on cells of the pivotgrid widget', component: CellTemplateComponent, 'name': 'Cell Template', order: '09', category: 'Customization', type: 'new'},
    { 'path': ':theme/pivot-view/drill-through', 'description': 'This demo for Essential JS2 Pivot Table control shows the raw items of any value cells in pivot grid', component: DrillThroughComponent, 'name': 'Drill Through', 'order': '10', 'category': 'Miscellaneous' },
    { 'path': ':theme/pivot-view/editing', 'description': 'This demo for Essential JS2 Pivot Table control allows to edit, add and delete the value cells in pivot grid', component: EditingComponent, 'name': 'Editing', 'order': '10', 'category': 'Miscellaneous' },
    { 'path': ':theme/pivot-view/hyper-link', 'description': 'This demo for Essential JS2 Pivot Table control shows hyperlink option on cells of the pivotgrid widget', component: HyperLinkComponent, 'name': 'Hyperlink', order: '10', category: 'Miscellaneous' },
    { 'path': ':theme/pivot-view/defer-update', 'description': 'This demo for Essential JS2 Pivot Table control demonstrate defer layout update feature of the pivotgrid widget', component: DeferUpdateComponent, 'name': 'Defer Layout Update', order: '10', category: 'Miscellaneous' },
    { 'path': ':theme/pivot-view/exporting', 'description': 'This demo for Essential JS2 Pivot Table control demonstrate client-side exporting of the pivotgrid widget to Excel, CSV and PDF formats', component: ExportingComponent, 'name': 'Export', order: '10', category: 'Miscellaneous' }
];

let declarations: Type<Object>[] = [DefaultComponent, LocalComponent, RemoteComponent, GroupingBarComponent, FieldListComponent, CalculatedFieldComponent,
    AggregationComponent, ExportingComponent, DrillThroughComponent, EditingComponent, ValueSortingComponent, RTLComponent, ChartComponent, SortingComponent,
    FilteringComponent, LabelFilterComponent, ValueFilterComponent, ConditionalFormattingComponent, VirtualScrollingComponent, HyperLinkComponent, DeferUpdateComponent, SummaryCustomizationComponent, ToolbarComponent,
    SelectionComponent, IntegrationComponent, CellTemplateComponent, GroupingComponent];

@NgModule({
    imports: [RouterModule.forChild(pivotviewRouteConfig), CommonModule, HttpModule, ToolbarModule, PivotViewAllModule, PivotFieldListAllModule, SharedModule, NumericTextBoxAllModule, ButtonAllModule, CheckBoxAllModule, RadioButtonAllModule],
    declarations: declarations,
    providers: [PivotViewAllModule, PivotFieldListAllModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PivotViewSampleModule { }
