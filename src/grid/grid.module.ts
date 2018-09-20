import { NgModule, Type, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { GridAllModule } from '@syncfusion/ej2-angular-grids';
import { NumericTextBoxAllModule } from '@syncfusion/ej2-angular-inputs';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { OverViewComponent } from './over-view.component';
import { DefaultComponent } from './default.component';
import { DataBindingComponent } from './remotedata.component';
import { LocalDataComponent } from './localdata.component';
import { ShowHideComponent } from './column/showhide.component';
import { StackedHeaderComponent } from './column/stackedheader.component';
import { AutoWrapComponent } from './column/autowrap.component';
import { ReorderComponent } from './column/reorder.component';
import { SortComponent } from './sorting.component';
import { PageComponent } from './paging.component';
import { FilterComponent } from './filtering.component';
import { FilteringMenuComponent } from './filtermenu.component';
import { SelectionComponent } from './selection.component';
import { SelectionApiComponent } from './selectionapi.component';
import { GroupComponent } from './grouping.component';
import { MasterComponent, DetailComponent } from './masterdetail.component';
import { SearchComponent } from './searching.component';
import { ScrollComponent } from './scrolling.component';
import { GridLinesComponent } from './gridlines.component';
import { DragAndDropComponent } from './draganddrop.component';
import { AggregateComponent } from './aggregatedefault.component';
import { AggregateGroupComponent } from './aggregategroup.component';
import { ColumnTemplateComponent } from './columntemplate.component';
import { RowTemplateComponent } from './rowtemplate.component';
import { DetailTemplateComponent } from './detailtemplate.component';
import { HierarchyComponent } from './hierarchy.component';
import { VirtualizationComponent } from './virtualization.component';
import { NormalEditComponent } from './normal-edit.component';
import { DialogEditComponent } from './dialog-editing.component';
import { BatchEditComponent } from './batch-editing.component';
import { SharedModule } from '../common/shared.module';
import { ColumnChooserComponent } from './column/columnchooser.component';
import { ColumnResizingComponent } from './column/columnresizing.component';
import { ExportingComponent } from './default-exporting.component';
import { AdvancedExportingComponent } from './advanced-exporting.component';
import { PrintComponent } from './print.component';
import { CheckboxSelectionComponent } from './checkboxselection.component';
import { CommandColumnComponent } from './command-column.component';
import { ClipboardComponent } from './clipboard.component';
import { ContextMenuComponent } from './contextmenu.component';
import { ColumnMenuComponent } from './column/columnmenu.component';
import { ColumnSpanningComponent } from './column/columnspanning.component';
import { FrozenRowsComponent } from './column/frozenrows.component';
import { ForeignKeyColumnComponent } from './column/foreignkey.component';
import { RowHeightComponent } from './rowheight.component';
import { AsyncPipeComponent } from './asyncpipe.component';
import { OrdersService } from './order.service';
import { DialogReactiveFormComponent } from './dialog-reactive-form.component';
import { DatePickerAllModule } from '@syncfusion/ej2-angular-calendars';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { TemplateDrivenFormComponent } from './template-driven-form.component';

export const gridRouteConfig: Object[] = [
    { 'path': ':theme/grid/over-view', component: OverViewComponent, 'name': 'Overview', description: 'This demo for  Essential JS2 Grid component shows the overview of display and manipulate large data with configuration options to component the way the data is presented and manipulated.', 'type':'new', order: '01', category: 'Data Grid' },
    { 'path': ':theme/grid/default', component: DefaultComponent, 'name': 'Default Functionalities', description: 'This demo for Essential JS2 Grid component shows the default rendering of the Grid  component with minimum configuration.', order: '01', category: 'Data Grid' },
    { 'path': ':theme/grid/grouping', component: GroupComponent, name: 'Grouping', order: '01', description: 'This demo for  Essential JS2 Grid component  demonstrates the grouping feature of the Grid component. The Grid component has options to group the records based on the required column.', category: 'Data Grid' },
    { 'path': ':theme/grid/gridlines', component: GridLinesComponent, 'name': 'Grid Lines', description: 'This demo for  Essential JS2 Grid component demonstrates the visibility of the grid lines that separates the rows and columns.', order: '01', category: 'Data Grid' },
    { 'path': ':theme/grid/hierarchy', component: HierarchyComponent, name: 'Hierarchy Grid', description: 'This demo for  Essential JS2 Grid component shows the hierarchical binding feature which helps to build multi-level parent child relationship.', order: '01', category: 'Data Grid' },
    { 'path': ':theme/grid/clipboard', component: ClipboardComponent, name: 'Clipboard', description: 'This demo for  Essential JS2 Grid component shows about copy to clipboard functionality.', order: '01', category: 'Data Grid' },
    { 'path': ':theme/grid/sorting', component: SortComponent, name: 'Sorting', description: 'This demo for Essential JS2 Grid component shows the Grid multi sorting feature using this feature grid rows can be sorted by two or more columns.', order: '01', category: 'Data Grid' },
    { 'path': ':theme/grid/paging', component: PageComponent, name: 'Paging', description: 'This demo for Essential JS2 Grid component shows how you can display the contents of the Grid in page segments using paging feature.', order: '01', category: 'Data Grid' },
    {
        'path': ':theme/grid/contextmenu', component: ContextMenuComponent, name: 'Context Menu', description: 'This demo for  Essential JS2 Grid component shows usage of context menu in Grid component. Grid has options to show the context menu when right click on it.', order: '01',
        category: 'Data Grid'
    },
    { 'path': ':theme/grid/masterdetail', component: MasterComponent, name: 'Master/Detail', description: 'This demo for  Essential JS2 Grid component shows usage of master/detail in which the details of a Master Grid record, is viewed in a separate Grid(Detail Grid) by clicking the particular row.', order: '01', category: 'Data Grid' },
    { 'path': ':theme/grid/scrolling', component: ScrollComponent, name: 'Default Scrolling', description: 'This demo for Essential JS2 Grid component shows the usage of the horizontal and vertical scrollbars to view the exceeded grid content.', order: '02', category: 'Scrolling' },
    {
        'path': ':theme/grid/virtualization', component: VirtualizationComponent, name: 'Virtual Scrolling', description: 'This demo demonstrates how to use Essential JS2 Grid to show large data view without performance degradation by rendering only required rows and columns.', order: '02',
        category: 'Scrolling'
    },
    { 'path': ':theme/grid/localdata', component: LocalDataComponent, 'name': 'Local Data', description: 'This demo for Essential JS2 Grid component shows how to bind with  local data source.', order: '03', category: 'Data Binding' },
    { 'path': ':theme/grid/remotedata', component: DataBindingComponent, 'name': 'Remote Data', description: 'This demo for Essential JS2 Grid component shows how to consume data from remote data service.', order: '03', category: 'Data Binding' },
    { 'path': ':theme/grid/column/autowrap', component: AutoWrapComponent, name: 'AutoWrap Column cells', description: 'This demo for Essential JS2 Grid component shows how the grid cell content is auto wrapped to show large cell content.', order: '04', category: 'Columns' },
    { 'path': ':theme/grid/column/showhide', component: ShowHideComponent, 'name': 'Show or Hide Column', description: 'This demo for Essential JS2 Grid component demonstrates the dynamic show and hide columns feature.', order: '04', category: 'Columns' },
    {
        'path': ':theme/grid/columntemplate', component: ColumnTemplateComponent, name: 'Column Template', description: 'This demo for Essential JS2 Grid component shows usage of template columns in Grid.', order: '04',
        category: 'Columns'
    },
    {
        'path': ':theme/grid/column/stackedheader', component: StackedHeaderComponent,
        name: 'Stacked Header', description: 'This demo for Essential JS2 Grid component shows usage of stacked header feature.', order: '04', category: 'Columns'
    },
    { 'path': ':theme/grid/column/reorder', component: ReorderComponent, name: 'Reorder', description: 'This demo for Essential JS2 Grid component shows reordering columns features.', order: '04', category: 'Columns' },
    {
        'path': ':theme/grid/columnchooser', component: ColumnChooserComponent, name: 'Column Chooser', description: 'This demo for Essential JS2 Grid component shows how the column chooser feature can be used to shown/hidden dynamically.', order: '04',
        category: 'Columns'
    },
    {
        'path': ':theme/grid/column/columnresizing', component: ColumnResizingComponent, name: 'Column Resize', description: 'This demo for Essential JS2 Grid component shows how the column resizing feature can be used to change width dynamically.', order: '04',
        category: 'Columns'
    },
    {
        'path': ':theme/grid/column/columnspanning', component: ColumnSpanningComponent, name: 'Column Spanning', description: 'This demo for Essential JS2 Grid component shows the usage of column spanning feature.', order: '04',
        category: 'Columns'
    },
    {
        'path': ':theme/grid/column/frozenrows', component: FrozenRowsComponent, name: 'Frozen Rows and Columns', description: 'This demo for Essential JS2 Grid component shows how the rows and columns can be frozen or pinned.', order: '04',
        category: 'Columns'
    },
    {
        'path': ':theme/grid/column/columnmenu', component: ColumnMenuComponent, name: 'Column Menu', description: 'This demo for Essential JS2 Grid component shows the usage of various column functionalities using column menu feature.', order: '04',
        category: 'Columns'
    },
    {
        'path': ':theme/grid/column/foreignkey', component: ForeignKeyColumnComponent, name: 'Foreign Key Column', description: 'This demo for Essential JS2 Grid component demonstrates the usage of foreign key column and performing actions such as filtering, sorting and editing in the foreign key column.', order: '04',
        category: 'Columns'
    },
    {
        'path': ':theme/grid/rowtemplate', component: RowTemplateComponent,
        name: 'Row Template', description: 'This demo for Essential JS2 Grid component shows the usage of row template feature.', order: '05', category: 'Rows'
    },
    {
        'path': ':theme/grid/detailtemplate', component: DetailTemplateComponent, name: 'Detail Template', description: 'This demo for Essential JS2 Grid component shows the usage of detail template feature.', order: '05',
        category: 'Rows'
    },
    {
        'path': ':theme/grid/rowheight', component: RowHeightComponent, name: 'Row Height', description: 'This demo for Essential JS2 Grid component shows the row height feature.', order: '05', category: 'Rows'
    },
    {
        'path': ':theme/grid/draganddrop', component: DragAndDropComponent, name: 'Row Drag And Drop', description: 'This demo for Essential JS2 Grid component demonstrates how the rows can be drag and dropped between grids using row drag and drop feature.', order: '05', category: 'Rows',
        hideOnDevice: true
    },
    { 'path': ':theme/grid/filtering', component: FilterComponent, name: 'Default Filtering', description: 'This demo for Essential JS2 Grid component shows the how to place filter bar row in header to filter grid rows.', order: '07', category: 'Filtering' },
    { 'path': ':theme/grid/filtermenu', component: FilteringMenuComponent, name: 'Filter Menu', description: 'This demo for Essential JS2 Grid component demonstrates the way of filtering rows using menu, checkbox and excel filter UI.', order: '07', category: 'Filtering' },
    { 'path': ':theme/grid/searching', component: SearchComponent, name: 'Search', description: 'This demo for Essential JS2 Grid component shows the content searching feature.', order: '07', category: 'Filtering' },

    { 'path': ':theme/grid/selection', component: SelectionComponent, name: 'Default Selection', description: 'This demo for Essential JS2 Grid component shows how to select row or cell through simple mouse down or keyboard interaction using selection feature.', order: '09', category: 'Selection' },
    { 'path': ':theme/grid/selectionapi', component: SelectionApiComponent, name: 'Selection API', description: 'This demo for Essential JS2 Grid component shows the perform selection programmatically.', order: '09', category: 'Selection' },
    {
        'path': ':theme/grid/checkboxselection', component: CheckboxSelectionComponent,
        name: 'Checkbox Selection', description: 'This demo for Essential JS2 Grid component shows how the checkbox selection feature can be used to select grid rows.', order: '09', category: 'Selection', type: 'update'
    },
    {
        'path': ':theme/grid/aggregatedefault', component: AggregateComponent,
        name: 'Default Aggregate', description: 'This demo for Essential JS2 Grid component shows how the row values can be aggregated and showed in column footer.', order: '10', category: 'Aggregate'
    },
    {
        'path': ':theme/grid/aggregategroup', component: AggregateGroupComponent,
        name: 'Group and Caption aggregate', description: 'This demo for Essential JS2 Grid component shows how the row values can be aggregated for each grouped items and showed in group caption and footer.', order: '10', category: 'Aggregate'
    },
    {
        'path': ':theme/grid/normal-edit', component: NormalEditComponent, description: 'This demo for Essential JS2 Grid component shows inline editing operation.', name: 'Inline Editing', order: '11',
        category: 'Editing'
    },
    {
        'path': ':theme/grid/dialog-editing', component: DialogEditComponent, name: 'Dialog Editing', description: 'This demo for Essential JS2 Grid component shows how to edit the grid rows using Essential JS2 Dialog component.', order: '11',
        category: 'Editing'
    },
    {
        'path': ':theme/grid/dialog-reactive-form', component: DialogReactiveFormComponent, name: 'Reactive Forms', description: 'This demo for Essential JS2 Grid component shows how data is edited using reactive angular forms.', order: '11',
        category: 'Editing', type: 'new'
    },
    {
        'path': ':theme/grid/template-driven-form', component: TemplateDrivenFormComponent, name: 'Template-driven Forms', description: 'This demo for Essential JS2 Grid component shows how data is edited using inline mode in reactive angular forms.', order: '11',
        category: 'Editing', type: 'new'
    },
    {
        'path': ':theme/grid/batch-editing', component: BatchEditComponent, name: 'Batch Editing', description: 'This demo for Essential JS2 Grid component shows how to perform bulk changes to the grid content using batch edit mode.', order: '11',
        category: 'Editing'
    },
    {
        'path': ':theme/grid/command-column', component: CommandColumnComponent, name: 'Command Column', description:'This demo for Essential JS2 Grid component shows how to perform edit and delete records using command column.', order: '11',
        category: 'Editing'
    },

    {
        'path': ':theme/grid/default-exporting', component: ExportingComponent, name: 'Default Exporting', description: 'This demo for Essential JS2 Grid component shows the client-side exporting of the grid content to the Excel, Pdf and CSV formats.', order: '12',
        category: 'Exporting'
    },
    {
        'path': ':theme/grid/advanced-exporting', component: AdvancedExportingComponent, name: 'Advanced Exporting', description: 'This demo for Essential JS2 Grid component demonstrates how the exporting can be customized to add header and footer in exported document.', order: '12',
        category: 'Exporting'
    },
    {
        'path': ':theme/grid/print', component: PrintComponent, name: 'Print', description: 'This demo for Essential JS2 Grid component shows how to print the grid content.', order: '12',
        category: 'Exporting'
    },
    {
        'path': ':theme/grid/asyncpipe', component: AsyncPipeComponent, name: 'Async Pipe', description: 'This demo for Essential JS2 Grid component demonstrates how to consume RxJS observables and perform editing, sorting and grouping operations using async pipe..', order: '03',
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
    ForeignKeyColumnComponent, RowHeightComponent, AsyncPipeComponent, DialogReactiveFormComponent, TemplateDrivenFormComponent
];

@NgModule({
    imports: [RouterModule.forChild(gridRouteConfig), CommonModule, HttpModule, ToolbarModule, GridAllModule, SharedModule,
        NumericTextBoxAllModule, DatePickerAllModule, DropDownListAllModule, ReactiveFormsModule, FormsModule],
    declarations: declarations,
    providers: [GridAllModule, OrdersService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GridSampleModule { }
