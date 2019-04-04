import { NgModule, Type, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { GridAllModule } from '@syncfusion/ej2-angular-grids';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { NumericTextBoxAllModule } from '@syncfusion/ej2-angular-inputs';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { OverViewComponent } from './over-view.component';
import { DefaultComponent } from './default.component';
import { DataBindingComponent } from './remote-data.component';
import { LocalDataComponent } from './local-data.component';
import { ShowHideComponent } from './column/show-hide.component';
import { StackedHeaderComponent } from './column/stacked-header.component';
import { AutoWrapComponent } from './column/auto-wrap.component';
import { ReorderComponent } from './column/reorder.component';
import { SortComponent } from './sorting.component';
import { PageComponent } from './paging.component';
import { FilterComponent } from './filtering.component';
import { FilteringMenuComponent } from './filter-menu.component';
import { SelectionComponent } from './selection.component';
import { SelectionApiComponent } from './selection-api.component';
import { GroupComponent } from './grouping.component';
import { MasterComponent, DetailComponent } from './master-detail.component';
import { SearchComponent } from './searching.component';
import { ScrollComponent } from './scrolling.component';
import { GridLinesComponent } from './grid-lines.component';
import { DragAndDropComponent } from './drag-and-drop.component';
import { AggregateComponent } from './aggregate-default.component';
import { AggregateGroupComponent } from './aggregate-group.component';
import { ReactiveAggregateComponent } from './reactive-aggregate.component';
import { ColumnTemplateComponent } from './column-template.component';
import { RowTemplateComponent } from './row-template.component';
import { DetailTemplateComponent } from './detail-template.component';
import { HierarchyComponent } from './hierarchy.component';
import { VirtualizationComponent } from './virtualization.component';
import { NormalEditComponent } from './normal-edit.component';
import { DialogEditComponent } from './dialog-editing.component';
import { BatchEditComponent } from './batch-editing.component';
import { SharedModule } from '../common/shared.module';
import { ColumnChooserComponent } from './column/column-chooser.component';
import { ColumnResizingComponent } from './column/column-resizing.component';
import { ExportingComponent } from './default-exporting.component';
import { AdvancedExportingComponent } from './advanced-exporting.component';
import { PrintComponent } from './print.component';
import { CheckboxSelectionComponent } from './checkbox-selection.component';
import { CommandColumnComponent } from './command-column.component';
import { ClipboardComponent } from './clipboard.component';
import { ContextMenuComponent } from './context-menu.component';
import { ColumnMenuComponent } from './column/column-menu.component';
import { ColumnSpanningComponent } from './column/column-spanning.component';
import { FrozenRowsComponent } from './column/frozen-rows.component';
import { ForeignKeyColumnComponent } from './column/foreign-key.component';
import { RowHeightComponent } from './row-height.component';
import { AsyncPipeComponent } from './async-pipe.component';
import { OrdersService } from './order.service';
import { DialogReactiveFormComponent } from './dialog-reactive-form.component';
import { DatePickerAllModule } from '@syncfusion/ej2-angular-calendars';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { TemplateDrivenFormComponent } from './template-driven-form.component';
import { HierarchyExportComponent } from './master-details-export.component';
import { RowSpanningComponent} from './row-spanning.component';
import { DragWithinSingle} from './drag-drop-within-grid.component';

export const gridRouteConfig: Object[] = [
    { 'path': ':theme/grid/over-view', component: OverViewComponent, 'name': 'Overview', description: 'This demo for Essential JS 2 grid component is an overview of how to display and manipulate large data with configuration options.', order: '01', category: 'Data Grid' },
    { 'path': ':theme/grid/default', component: DefaultComponent, 'name': 'Default Functionalities', description: 'This demo for Essential JS 2 grid component shows the default rendering of the grid component with minimum configuration.', order: '01', category: 'Data Grid' },
    { 'path': ':theme/grid/grouping', component: GroupComponent, name: 'Grouping', description: 'This demo for Essential JS 2 grid component demonstrates the grouping feature of the grid component. The grid component has options to group records based on columns.', order: '01', category: 'Data Grid' },
    { 'path': ':theme/grid/grid-lines', component: GridLinesComponent, 'name': 'Grid Lines', description: 'This demo for Essential JS 2 grid component demonstrates the visibility of the grid lines that separate the rows and columns.', order: '01', category: 'Data Grid' },
    { 'path': ':theme/grid/hierarchy', component: HierarchyComponent, name: 'Hierarchy Grid', description: 'This demo for Essential JS 2 grid component shows the hierarchical binding feature that helps to build multilevel parent-child relationships.', order: '01', category: 'Data Grid' },
    { 'path': ':theme/grid/clipboard', component: ClipboardComponent, name: 'Clipboard', description: 'This demo for Essential JS 2 grid component shows the copy-to-clipboard functionality.', order: '01', category: 'Data Grid' },
    { 'path': ':theme/grid/sorting', component: SortComponent, name: 'Sorting', description: 'This demo for Essential JS 2 grid component shows the grid multisorting feature. Using this feature, grid rows can be sorted by two or more columns.', order: '01', category: 'Data Grid' },
    { 'path': ':theme/grid/paging', component: PageComponent, name: 'Paging', description: 'This demo for Essential JS 2 grid component shows how you can display the contents of the grid in page segments using the paging feature.', order: '01', category: 'Data Grid' },
    {
        'path': ':theme/grid/context-menu', component: ContextMenuComponent, name: 'Context Menu', description: 'This demo for Essential JS 2 grid component shows the usage of the context menu in grid component. Grid has an option to show the context menu when it’s right-clicked on.', order: '01',
        category: 'Data Grid'
    },
    { 'path': ':theme/grid/master-detail', component: MasterComponent, name: 'Master/Detail', description: 'This demo for  Essential JS 2 grid component shows usage of master/detail in which the details of a Master Grid record, is viewed in a separate Grid(Detail Grid) by clicking the particular row.', order: '01', category: 'Data Grid' },
    { 'path': ':theme/grid/scrolling', component: ScrollComponent, name: 'Default Scrolling', description: 'This demo for Essential JS 2 grid component shows the usage of the horizontal and vertical scrollbars to view grid content that exceeds the grid area.', order: '02', category: 'Scrolling' },
    {
        'path': ':theme/grid/virtualization', component: VirtualizationComponent, name: 'Virtual Scrolling', description: 'This demo demonstrates how to use Essential JS 2 grid to show a large data view without performance degradation by rendering only the required rows and columns.', order: '02',
        category: 'Scrolling'
    },
    { 'path': ':theme/grid/local-data', component: LocalDataComponent, 'name': 'Local Data', description: 'This demo for Essential JS 2 grid component shows how to bind with a local data source.', order: '03', category: 'Data Binding' },
    { 'path': ':theme/grid/remote-data', component: DataBindingComponent, 'name': 'Remote Data', description: 'This demo for Essential JS 2 grid component shows how to consume data from a remote data service.', order: '03', category: 'Data Binding' },
    { 'path': ':theme/grid/column/auto-wrap', component: AutoWrapComponent, name: 'AutoWrap Column cells', description: 'This demo for Essential JS 2 grid component shows how the grid cell content is autowrapped to show large cell content.', order: '04', category: 'Columns' },
    { 'path': ':theme/grid/column/show-hide', component: ShowHideComponent, 'name': 'Show or Hide Column', description: 'This demo for Essential JS 2 grid component demonstrates the dynamic show and hide columns feature.', order: '04', category: 'Columns' },
    {
        'path': ':theme/grid/column-template', component: ColumnTemplateComponent, name: 'Column Template', description: 'This demo for Essential JS 2 grid component shows the usage of template columns in grid.', order: '04',
        category: 'Columns'
    },
    {
        'path': ':theme/grid/column/stacked-header', component: StackedHeaderComponent,
        name: 'Stacked Header', description: 'This demo for Essential JS 2 grid component shows the usage of the stacked header feature.', order: '04', category: 'Columns'
    },
    { 'path': ':theme/grid/column/reorder', component: ReorderComponent, name: 'Reorder', description: 'This demo for Essential JS 2 grid component shows the reordering columns features.', order: '04', category: 'Columns' },
    {
        'path': ':theme/grid/column/column-chooser', component: ColumnChooserComponent, name: 'Column Chooser', order: '04',description: 'This demo for Essential JS 2 grid component shows how the column chooser feature can be used to show or hide columns dynamically.',
        category: 'Columns'
    },
    {
        'path': ':theme/grid/column/column-resizing', component: ColumnResizingComponent, name: 'Column Resize', order: '04',description: 'This demo for Essential JS 2 grid component shows how the column resizing feature can be used to change width dynamically.',
        category: 'Columns'
    },
    {
        'path': ':theme/grid/column/column-spanning', component: ColumnSpanningComponent, name: 'Column Spanning', order: '04',description: 'This demo for Essential JS 2 grid component shows the usage of the column spanning feature.',
        category: 'Columns'
    },
    {
        'path': ':theme/grid/column/frozen-rows', component: FrozenRowsComponent, name: 'Frozen Rows and Columns', order: '04',description: 'This demo for Essential JS 2 grid component shows how the rows and columns can be frozen or pinned.',
        category: 'Columns'
    },
    {
        'path': ':theme/grid/column/column-menu', component: ColumnMenuComponent, name: 'Column Menu', order: '04',description: 'This demo for Essential JS 2 grid component shows the usage of the various column functionalities of the column menu feature.',
        category: 'Columns'
    },
    {
        'path': ':theme/grid/column/foreign-key', component: ForeignKeyColumnComponent, name: 'Foreign Key Column', order: '04',description: 'This demo for Essential JS 2 grid component demonstrates the usage of a foreign key column and performing actions such as filtering, sorting, and editing in the foreign key column.',
        category: 'Columns'
    },
    {
        'path': ':theme/grid/row-template', component: RowTemplateComponent,
        name: 'Row Template', description: 'This demo for Essential JS 2 grid component shows the usage of the row template feature.', order: '05', category: 'Rows'
    },
    {
        'path': ':theme/grid/detail-template', component: DetailTemplateComponent, name: 'Detail Template', order: '05',description: 'This demo for Essential JS 2 grid component shows the usage of the detail template feature.',
        category: 'Rows'
    },
    {
        'path': ':theme/grid/row-height', component: RowHeightComponent, name: 'Row Height', description: 'This demo for Essential JS 2 grid component shows the row height feature.', order: '05', category: 'Rows'
    },
    {
        'path': ':theme/grid/drag-and-drop', component: DragAndDropComponent, name: 'Row Drag And Drop', description: 'This demo for Essential JS 2 grid component demonstrates how the rows can be dragged between grids using the row drag-and-drop feature.', order: '05', category: 'Rows',
        hideOnDevice: true
    },
    {
        'path': ':theme/grid/drag-drop-within-grid', component: DragWithinSingle, name: 'Row Drag And Drop Within Grid', description: 'This demo for Essential JS 2 grid control demonstrates how the rows can be dragged within the grids using the row drag-and-drop feature.', order: '05', category: 'Rows',
        hideOnDevice: true
    },
    {
        'path': ':theme/grid/row-spanning', component: RowSpanningComponent, name: 'Row Spanning', description: 'This demo for Essential JS 2 grid control shows the usage of the row and column spanning feature.', order: '05', category: 'Rows',
        hideOnDevice: true
    },
    { 'path': ':theme/grid/filtering', component: FilterComponent, name: 'Default Filtering', description: 'This demo for Essential JS 2 grid component shows how to place a filter bar row in the header to filter grid rows.', order: '07', category: 'Filtering' },
    {
        'path': ':theme/grid/filter-menu', component: FilteringMenuComponent, name: 'Filter Menu',
        description: 'This demo for Essential JS 2 grid component demonstrates a way of filtering rows using a menu, check box, and Excel filter UI.', order: '07', category: 'Filtering'
    },
    { 'path': ':theme/grid/searching', component: SearchComponent, name: 'Search', description: 'This demo for Essential JS 2 grid component shows the content searching feature.', order: '07', category: 'Filtering' },

    { 'path': ':theme/grid/selection', component: SelectionComponent, name: 'Default Selection', description: 'This demo for Essential JS 2 grid component shows how to select rows or cells through simple mouse down or keyboard interaction using the selection feature.', order: '09', category: 'Selection' },
    { 'path': ':theme/grid/selection-api', component: SelectionApiComponent, name: 'Selection API', description: 'This demo for Essential JS 2 grid component shows how to perform selection programmatically.', order: '09', category: 'Selection' },
    {
        'path': ':theme/grid/checkbox-selection', component: CheckboxSelectionComponent,
        name: 'Checkbox Selection', description: 'This demo for Essential JS 2 grid component shows how the check box selection feature can be used to select grid rows.', order: '09',   category: 'Selection'
    },
    {
        'path': ':theme/grid/aggregate-default', component: AggregateComponent,
        name: 'Default Aggregate', description: 'This demo for Essential JS 2 grid component shows how the row values can be aggregated and shown in a column footer.', order: '10', category: 'Aggregate'
    },
    {
        'path': ':theme/grid/aggregate-group', component: AggregateGroupComponent,
        name: 'Group and Caption aggregate', description: 'This demo for Essential JS 2 grid component shows how the row values can be aggregated for each group of items and shown in a group caption and footer.', order: '10', category: 'Aggregate'
    },
    {
        'path': ':theme/grid/reactive-aggregate', component: ReactiveAggregateComponent,
        name: 'Reactive Aggregate', description:'This demo for Essential JS 2 grid component shows how aggregate values are updated while the row is modified.', order: '10', category: 'Aggregate',
    },
    {
        'path': ':theme/grid/normal-edit', component: NormalEditComponent, name: 'Inline Editing', description: 'This demo for Essential JS 2 grid component shows the inline editing operation.', order: '11',
        category: 'Editing'
    },
    {
        'path': ':theme/grid/dialog-editing', component: DialogEditComponent, name: 'Dialog Editing', description: 'This demo for Essential JS 2 grid component shows how to edit grid rows using the Essential JS 2 dialog component.', order: '11',
        category: 'Editing'
    },
    {
        'path': ':theme/grid/dialog-reactive-form', component: DialogReactiveFormComponent, name: 'Reactive Forms', description: 'This demo for Essential JS 2 grid component shows how data is edited using reactive angular forms.',  order: '11',
        category: 'Editing'
    },
    {
        'path': ':theme/grid/template-driven-form', component: TemplateDrivenFormComponent, name: 'Template-driven Forms', description: 'This demo for Essential JS 2 grid component shows how to edit the data using inline mode in reactive angular forms.', order: '11',
        category: 'Editing'
    },
    {
        'path': ':theme/grid/batch-editing', component: BatchEditComponent, name: 'Batch Editing', description: 'This demo for Essential JS 2 grid component shows how to perform bulk changes to the grid content using batch edit mode.', order: '11',
        category: 'Editing'
    },
    {
        'path': ':theme/grid/command-column', component: CommandColumnComponent, name: 'Command Column', description:'This demo for Essential JS 2 grid component shows how to edit and delete records using a command column.', order: '11',
        category: 'Editing'
    },

    {
        'path': ':theme/grid/default-exporting', component: ExportingComponent, name: 'Default Exporting', description: 'This demo for Essential JS 2 grid component shows the client-side exporting of grid content to Excel, PDF, and CSV formats.', order: '12',
        category: 'Exporting'
    },
    {
        'path': ':theme/grid/advanced-exporting', component: AdvancedExportingComponent, name: 'Advanced Exporting', description: 'This demo for Essential JS 2 grid component demonstrates how exporting can be customized to add headers and footers in exported documents.', order: '12',
        category: 'Exporting'
    },
    {
        'path': ':theme/grid/master-details-export', component: HierarchyExportComponent, name: 'Hierarchy Export', order: '12', description: 'This demo for Essential JS 2 grid component shows how to export the hierarchy grid content.',
        category: 'Exporting'
    },
    {
        'path': ':theme/grid/print', component: PrintComponent, name: 'Print', order: '12', description: 'This demo for Essential JS 2 grid component shows how to print the grid content.',
        category: 'Exporting'
    },
    {
        'path': ':theme/grid/async-pipe', component: AsyncPipeComponent, name: 'Async Pipe', description: 'This demo for Essential JS 2 grid component shows how to consume RxJS observables and perform editing, sorting and grouping operations using async pipe.', order: '03',
        category: 'Data Binding'
    }
];

let declarations: Type<Object>[] = [DefaultComponent, GridLinesComponent,
    LocalDataComponent, DataBindingComponent, ShowHideComponent, MasterComponent, DetailComponent, ReorderComponent,
    GroupComponent, StackedHeaderComponent, AutoWrapComponent, OverViewComponent, SortComponent, PageComponent, FilterComponent,
    SelectionComponent, ScrollComponent, SearchComponent, SelectionApiComponent, DragAndDropComponent, AggregateComponent,
    AggregateGroupComponent, RowTemplateComponent, ColumnTemplateComponent, DetailTemplateComponent, HierarchyComponent,
    VirtualizationComponent, NormalEditComponent, DialogEditComponent, ColumnChooserComponent, BatchEditComponent, ColumnResizingComponent,
    ExportingComponent, AdvancedExportingComponent, PrintComponent, CheckboxSelectionComponent, ClipboardComponent, CommandColumnComponent,
    FilteringMenuComponent, ColumnSpanningComponent, ContextMenuComponent, ColumnMenuComponent, FrozenRowsComponent,
    ForeignKeyColumnComponent, RowHeightComponent, AsyncPipeComponent, DialogReactiveFormComponent, TemplateDrivenFormComponent,
    ReactiveAggregateComponent, RowSpanningComponent, DragWithinSingle, HierarchyExportComponent
];

@NgModule({
    imports: [RouterModule.forChild(gridRouteConfig), CommonModule, HttpModule, ToolbarModule, GridAllModule, SharedModule,
        NumericTextBoxAllModule, DialogModule, DatePickerAllModule, DropDownListAllModule, ReactiveFormsModule, FormsModule],
    declarations: declarations,
    providers: [GridAllModule, OrdersService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GridSampleModule { }
