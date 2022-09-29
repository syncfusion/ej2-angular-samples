import { TreeGridAllModule } from '@syncfusion/ej2-angular-treegrid';
import { NgModule, Type, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { NumericTextBoxAllModule } from '@syncfusion/ej2-angular-inputs';
import { DatePickerModule, DatePickerAllModule } from '@syncfusion/ej2-angular-calendars';
import { ButtonAllModule , CheckBoxAllModule} from '@syncfusion/ej2-angular-buttons';
import { ToolbarModule, ToolbarAllModule } from '@syncfusion/ej2-angular-navigations';
import { DropDownListAllModule, MultiSelectAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { TreeGridOverviewComponent } from './treegrid-overview.component';
import { TreeGridClipboardComponent } from './clipboard.component';
import { TreeGridAdaptiveComponent} from './adaptive.component';
import { DefaultComponent } from './default.component';
import { LocalDataComponent } from './localdata.component';
import { RemoteData } from './remotedata.component';
import { SelfReferenceComponent } from './selfreference.component';
import { ColumnFormattingComponent } from './columnformatting.component';
import { ColumnTemplateComponent } from './columntemplate.component';
import { ColumnReorderComponent } from './reorder.component';
import { ResizingComponent } from './resizing.component';
import { ColumnMenuComponent } from './columnmenu.component';
import { FreezeComponent } from './frozen-column.component';
import { CellAlignmentComponent } from './cellalignment.component';
import { AutoWrap } from './autowrap.component';
import { ShowHideComponent } from './showhide.component';
import { HeaderTemplateComponent } from './headertemplate';
import { GridLinesComponent } from './gridlines.component';
import { RowHover } from './row-hover.component';
import { RowHeightComponent } from './rowheight.component';
import { RowTemplateComponent } from './row-template.component';
import { DragDropComponent } from './drag-drop.component';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { InlineEditing } from './inlineediting.component';
import { DialogEditingComponent} from './dialogediting.component';
import { BatchEditingComponent} from './batchediting.component';
import { LockRowComponent} from './lockrow.component';
import { CellEditTypeComponent } from './celledit-type.component';
import { EditTemplateComponent } from './edittemplate.component';
import { ReactiveFormsComponent } from './reactiveforms.component';
import { TemplateFormsComponent } from './templateforms.component';
import { SortComponent } from './sorting.component'; 
import { SortingAPIComponent } from './sortingapi.component';
import { DefaultPagingComponent } from './default-paging.component';
import { PagingAPIComponent } from './paging-api.component';
import { ContextMenuComponent } from './contextmenu-default.component';
import { CustomContextMenuComponent } from './custom-contextmenu.component';
import { AggregateComponent } from './default-aggregate.component';
import { CustomAggregateComponent } from './custom-aggregate.component';
import { FilteringMenuComponent } from './filtermenu.component';
import { SelectionComponent } from './selection.component';
import { SelectionAPIComponent } from './selection-api.component';
import { DefaultExportComponent } from './exporting-default.component';
import { PrintComponent } from './print.component';
import { FilterComponent } from './filter.component';
import { SearchComponent } from './search.component';
import { CommandColumnComponent } from './commandcolumn.component';
import { StackedHeaderComponent } from './stackedheader.component';
import { KeyBoardComponent } from './keyboard.component';
import { EventComponent } from './events.component';
import { ConditionalFormattingComponent } from './conditionalformatting.component';
import { ToolbarTemplateComponent } from './toolbartemplate.component';
import { CheckboxSelectionComponent } from './checkbox-selection.component';
import { CheckboxColumnComponent } from './checkbox-column.component';
import { ReactiveFormsModule ,  FormsModule} from '@angular/forms';
import { SparklineAllModule } from '@syncfusion/ej2-angular-charts';
import { DefaultScrollingComponent } from './default-scrolling.component';
import { VirtualScrollingComponent } from './virtual-scrolling.component';
import { ColumnChooserComponent } from './columnchooser.component';
import { InfiniteScrollingComponent } from './infinite-scrolling.component';
import { FrozenAPI } from './frozen-api.component';

export const treegridRouteConfig: Object[] = [
    { 'path': ':theme/treegrid/treegrid-overview', component: TreeGridOverviewComponent, 'name': 'Overview',
    description: 'This Angular Tree Grid example demonstrates the overview in Angular Tree Grid Component. Explore here for more details.', 
    order: '01', category: 'Tree Grid' },
    { 'path': ':theme/treegrid/default', component: DefaultComponent, 'name': 'Default Functionalities',
    description: 'This demo for Essential JS2 Tree Grid component shows the default rendering of the Tree Grid  component with minimum configuration.', 
    order: '01', category: 'Tree Grid' },
    { 'path': ':theme/treegrid/adaptive', component: TreeGridAdaptiveComponent, 'name': 'Adaptive Layout',
    description: 'This example demonstrates the adaptive rendering behavior of Tree Grid features.', 
    order: '01', category: 'Tree Grid' },

   
    { 'path': ':theme/treegrid/localdata', component: LocalDataComponent, 'name': 'Local Data',
    description: 'This example shows the binding of an array of list objects in the Syncfusion Essential JS2 Tree Grid control.', 
    order: '02', category: 'Data Binding' },
    { 'path': ':theme/treegrid/remotedata', component: RemoteData, 'name': 'Remote Data', 
    description: 'This example shows the binding of remote services by using the DataManager in the Syncfusion Essential JS2 Tree Grid.', 
    order: '02', category: 'Data Binding' },
    { 'path': ':theme/treegrid/selfreference', component: SelfReferenceComponent, 'name': 'Self Reference Data',
    description: 'This example illustrates binding self-referential flat data with parent ID to a Syncfusion Essential JS2 Tree Grid control.', 
    order: '02', category: 'Data Binding' },
    { 'path': ':theme/treegrid/columntemplate', component: ColumnTemplateComponent, 'name': 'Column Template', 
    description: 'This demo explains how to define template columns in Syncfusion  Essential JS2 Tree Grid control.', 
    order: '03', category: 'Columns' },
    { 'path': ':theme/treegrid/columnformatting', component: ColumnFormattingComponent, 'name': 'Column Formatting', 
    description: 'This demo explains how to display the content of Tree Grid columns based on the specified format in Syncfusion Essential JS2 Tree Grid.', 
    order: '03', category: 'Columns' },
    { 'path': ':theme/treegrid/cellalignment', component: CellAlignmentComponent, 'name': 'Cell Alignment',
    description: 'This demo explains how to align the content inside the cells of Tree Grid columns and headers in Syncfusion Essential JS2 Tree Grid control.', 
    order: '03', category: 'Columns' },
    { 'path': ':theme/treegrid/reorder', component: ColumnReorderComponent, 'name': 'Reorder', 
    description: 'This demo explains how to reorder the columns of Tree Grid by simple drag and drop of columns using Syncfusion Essential JS2 Tree Grid control.', 
    order: '03', category: 'Columns' },
    { 'path': ':theme/treegrid/resizing', component: ResizingComponent, 'name': 'Resizing',
    description: 'This demo for Essential JS2 Tree Grid component shows the default rendering of the Tree Grid  component with minimum configuration.', 
    order: '03', category: 'Columns' },
    { 'path': ':theme/treegrid/stackedheader', component: StackedHeaderComponent, 'name': 'Stacked Header',
    description: 'This demo explains how to provide a common header for the group of columns in Syncfusion Essential JS2 Tree Grid control.', 
    order: '03', category: 'Columns' },
    { 'path': ':theme/treegrid/columnmenu', component: ColumnMenuComponent, 'name': 'Column Menu',
    description: 'This demo explains the default functionalities of the Column Menu in Syncfusion Essential JS2 Tree Grid control.', 
    order: '03', category: 'Columns' },
    { 'path': ':theme/treegrid/autowrap', component: AutoWrap, 'name': 'Auto Wrap Column Cells', 
    description: 'This demo explains how to wrap the content of columns within the specified width of Tree Grid columns in Syncfusion Essential JS2 Tree Grid control.', 
    order: '03', category: 'Columns' },
    { 'path': ':theme/treegrid/columnchooser', component: ColumnChooserComponent, 'name': 'Column Chooser',
    description: 'This demo explains how to dynamically show/hide columns in Tree Grid using Syncfusion Essential JS2 Tree Grid control.', 
    order: '03', category: 'Columns' },
    { 'path': ':theme/treegrid/showhide', component: ShowHideComponent, 'name': 'Show or Hide Column',
    description: 'This demo explains how to hide or show the columns of Tree Grid dynamically using Syncfusion Essential JS2 Tree Grid methods.', 
    order: '03', category: 'Columns' },
    // { 'path': ':theme/treegrid/headertemplate', component: HeaderTemplateComponent, 'name': 'Header Template',
    // description: 'This demo explains how to customize column headers to show additional HTML elements, such as icons, images, etc. in Syncfusion Essential JS2 Tree Grid control.', 
    // order: '03', category: 'Columns' },
   
    { 'path': ':theme/treegrid/checkbox-column', component: CheckboxColumnComponent, 'name': 'Checkbox Column',
    description: 'This demo explains how the hierarchy selection between the records using column checkboxes in Essential TypeScript Tree Grid control.', 
    order: '03', category: 'Columns' },
    { 'path': ':theme/treegrid/row-template', component: RowTemplateComponent, 'name': 'Row Template',
    description: 'This demo for Essential JS 2 Tree Grid component shows the usage of the row template feature.', 
    order: '04', category: 'Rows' },
    { 'path': ':theme/treegrid/drag-drop', component: DragDropComponent, 'name': 'Drag and Drop',
    description: 'This demo for Essential JS 2 Tree Grid component shows how the rows can be dragged within the Tree Grid using the row drag-and-drop feature.',
    order: '04', category: 'Rows'},
    { 'path': ':theme/treegrid/row-hover', component: RowHover, 'name': 'Row Hover', 
    description: 'This demo explains how the Tree Grid row color is changed while move the mouse over a row in Syncfusion Essential JS2 Tree Grid content.', 
    order: '04', category: 'Rows' },
    { 'path': ':theme/treegrid/rowheight', component: RowHeightComponent, 'name': 'Row Height',
    description: 'This demo explains the way of customizing the row height of Syncfusion Essential JS2 Tree Grid control.', 
    order: '04', category: 'Rows' },
 

    { 'path': ':theme/treegrid/inlineediting', component: InlineEditing, 'name': 'Inline Editing',
    description: 'This example shows how to add and edit row or cell inline on the Syncfusion Essential JS2 Tree Grid control.', 
    order: '05', category: 'Editing' },
    { 'path': ':theme/treegrid/dialogediting', component: DialogEditingComponent, 'name': 'Dialog Editing', 
    description: 'This demo explains how to edit a Tree Grid record in the Dialog mode using Syncfusion Essential JS2 Tree Grid control.', 
    order: '05', category: 'Editing' },
    { 'path': ':theme/treegrid/batchediting', component: BatchEditingComponent, 'name': 'Batch Editing',
    description: 'This example shows how to add and edit row or cell in the Batch mode using Syncfusion TypeScript Tree Grid control.', 
    order: '05', category: 'Editing' },
    { 'path': ':theme/treegrid/commandcolumn', component: CommandColumnComponent, 'name': 'Command Column',
    description: 'This demo explains how to include CRUD action buttons as one of the columns in Syncfusion Essential JS2 Tree Grid control.', 
    order: '05', category: 'Editing' },
    { 'path': ':theme/treegrid/celledit-type', component: CellEditTypeComponent, 'name': 'Cell Edit Type', 
    description: 'This demo explains how to set different edit types and how to define edit params for the Tree Grid columns in Syncfusion Essential JS2 Tree Grid control.', 
    order: '05', category: 'Editing' },
    { 'path': ':theme/treegrid/edittemplate', component: EditTemplateComponent, 'name': 'Edit Template',
    description: 'This demo explains how create a custom editor control for the Tree Grid cells when a row is edited in Syncfusion Essential JS2 Tree Grid.', 
    order: '05', category: 'Editing' },
    { 'path': ':theme/treegrid/lockrow', component: LockRowComponent, 'name': 'Lock Row', 
    description: 'This demo explains how to disable editing for specific rows dynamically in Syncfusion Essential JS2 Tree Grid control.', 
    order: '05', category: 'Editing' },

    { 'path': ':theme/treegrid/reactiveforms', component: ReactiveFormsComponent, 'name': 'Reactive Forms',
    description: 'This demo explains how to include CRUD action buttons as one of the columns in Syncfusion Essential JS2 Tree Grid control.', 
    order: '05', category: 'Editing' },
    { 'path': ':theme/treegrid/templateforms', component: TemplateFormsComponent, 'name': 'Template Forms',
    description: 'This demo explains how to include CRUD action buttons as one of the columns in Syncfusion Essential JS2 Tree Grid control.', 
    order: '05', category: 'Editing' },
    { 'path': ':theme/treegrid/sorting', component: SortComponent, 'name': 'Multi Sorting', 
    description: 'This demo demonstrates to sort multiple columns of Tree Grid by hold the CTRL key and click on the column headers of Syncfusion Essential JS2 Tree Grid control.', 
    order: '06', category: 'Sorting' },
    { 'path': ':theme/treegrid/sortingapi', component: SortingAPIComponent, 'name': 'Sorting API', 
    description: 'This demo explains how to sort columns dynamically using methods of Syncfusion Essential JS2 Tree Grid control.', 
    order: '06', category: 'Sorting' },
    { 'path': ':theme/treegrid/filter', component: FilterComponent, 'name': 'Default Filtering',
    description: 'This demo explains the default functionalities of filtering and how to define the template for filter bar in Syncfusion Essential JS2 Tree Grid.', 
    order: '07', category: 'Filtering' },
    { 'path': ':theme/treegrid/filtermenu', component: FilteringMenuComponent, 'name': 'Menu Filter',
    description: 'This demo explains how to filter the content using menu filter type of Syncfusion Essential JS2 Tree Grid control.', 
    order: '07', category: 'Filtering' },
    { 'path': ':theme/treegrid/search', component: SearchComponent, 'name': 'Search',
    description: 'This demo explains how to search the text entered in the search bar in Syncfusion Essential JS2 Tree Grid content.', 
    order: '07', category: 'Filtering' },
    { 'path': ':theme/treegrid/default-paging', component: DefaultPagingComponent, 'name': 'Pager Dropdown', 
    description: 'This demo explains how to display the records in paginated view in Syncfusion Essential JS2 Tree Grid control.', 
    order: '08', category: 'Paging' },
    { 'path': ':theme/treegrid/paging-api', component: PagingAPIComponent, 'name': 'Paging API', 
    description: 'This demo explains how to customize a pager using the APIs that are relevant to paging of Syncfusion Essential JS2 Tree Grid control.', 
    order: '08', category: 'Paging' },
    { 'path': ':theme/treegrid/default-scrolling', component: DefaultScrollingComponent, 'name': 'Default Scrolling',
    description: 'This demo for Essential JS 2 Tree Grid control shows the usage of horizontal and vertical scrollbars to view Tree Grid content that exceeds the Tree Grid area.', 
    order: '09', category: 'Scrolling'},
    { 'path': ':theme/treegrid/frozen-column', component: FreezeComponent, 'name': 'Frozen Columns',
    description: 'This demo for Essential JS 2 Tree Grid control shows frozen columns feature of Tree Grid. Scroll the movable content to view the frozen columns.', 
    order: '09', category: 'Scrolling'},
    { 'path': ':theme/treegrid/frozen-api', component: FrozenAPI, 'name': 'Freeze Direction',
    description: 'This demo for Essential JS 2 Tree Grid control shows frozen columns feature of Tree Grid with Freeze direction Left/Right.', 
    order: '09', category: 'Scrolling'},
    { 'path': ':theme/treegrid/virtual-scrolling', component: VirtualScrollingComponent, 'name': 'Virtual Scrolling',
    description: 'This demo demonstrates how to use Essential JS 2 Tree Grid to show a large data view without performance degradation by rendering only the required rows.', 
    order: '09', category: 'Scrolling', type: 'update' },
    { 'path': ':theme/treegrid/infinite-scrolling', component: InfiniteScrollingComponent, 'name': 'Infinite Scrolling',
    description: 'This demo demonstrates how to use Essential JS 2 Tree Grid to show a large data view without performance degradation by rendering only the required rows.', 
    order: '09', category: 'Scrolling' },
    { 'path': ':theme/treegrid/selection', component: SelectionComponent, 'name': 'Default Selection',
    description: 'This demo explains the customization of selection mode and toggle selection of Syncfusion Essential JS2 Tree Grid control.', 
    order: '10', category: 'Selection' },
    { 'path': ':theme/treegrid/selection-api', component: SelectionAPIComponent, 'name': 'Selection API',
    description: 'This demo explains how to select and clear multiple rows using methods of Syncfusion Essential JS2 Tree Grid control.', 
    order: '10', category: 'Selection' },
    { 'path': ':theme/treegrid/checkbox-selection', component: CheckboxSelectionComponent, 'name': 'Checkbox Selection',
    description: 'This demo explains how the check box selection feature can be used to select Tree Grid rows in Essential TypeScript Tree Grid control.', 
    order: '10', category: 'Selection' },
    // { 'path': ':theme/treegrid/default-aggregate', component: AggregateComponent, 'name': 'Default Aggregate', 
    // description: 'This demo explains how to display the summary values such as average, minimum, etc., for the columns in Syncfusion Essential JS2 Tree Grid control.', 
    // order: '10', category: 'Aggregates' },
    // { 'path': ':theme/treegrid/custom-aggregate', component: CustomAggregateComponent, 'name': 'Custom Aggregate', 
    // description: 'This demo explains how to display the custom aggregate for the columns in Syncfusion Essential JS2 Tree Grid control.', 
    // order: '10', category: 'Aggregates' },
    { 'path': ':theme/treegrid/exporting-default', component: DefaultExportComponent, 'name': 'Default Exporting',
    description: 'This demo explains how to export the Tree Grid content to Excel, PDF, and CSV documents using the Syncfusion Essential JS2 Tree Grid control.', 
    order: '11', category: 'Exporting' },
    { 'path': ':theme/treegrid/print', component: PrintComponent, 'name': 'Print', 
    description: 'This demo explains how to print the records of the Tree Grid using the Print feature of Syncfusion Essential JS2 Tree Grid control.', 
    order: '11', category: 'Exporting' },
    { 'path': ':theme/treegrid/contextmenu-default', component: ContextMenuComponent, 'name': 'Default Context Menu', 
    description: 'This demo explains the usage of context menu and the default context menu items in Syncfusion Essential JS2 Tree Grid control.', 
    order: '12', category: 'Context Menu' },
    { 'path': ':theme/treegrid/custom-contextmenu', component: CustomContextMenuComponent, 'name': 'Custom Context Menu', 
    description: 'This demo explains the usage of custom context menu items in Syncfusion Essential JS2 Tree Grid control.', 
    order: '12', category: 'Context Menu' },
  
    { 'path': ':theme/treegrid/gridlines', component: GridLinesComponent, 'name': 'Gridlines',
    description: 'This demo explains how to customize the grid lines in Tree Grid using Syncfusion Essential JS2 Tree Grid control.', 
    order: '13', category: 'Miscellaneous' },
    { 'path': ':theme/treegrid/clipboard', component: TreeGridClipboardComponent, 'name': 'Clipboard',
    description: 'This sample demonstrates copy to clipboard functionality of the Tree Grid component. Select rows and click Copy button from toolbar to copy content. To copy with header click Copy with header button from toolbar.', 
    order: '13', category: 'TreeGrid' },
    { 'path': ':theme/treegrid/conditionalformatting', component: ConditionalFormattingComponent, 'name': 'Conditional Formatting',
    description: 'This demo explains how to apply styles to specific cells based on certain conditions in Syncfusion Essential JS2 Tree Grid control.', 
    order: '13', category: 'Miscellaneous' },
    { 'path': ':theme/treegrid/toolbartemplate', component: ToolbarTemplateComponent, 'name': 'Toolbar Template',
    description: 'This demo explains how to render custom template elements in a toolbar by which any custom operation can be performed in Syncfusion Essential JS2 Tree Grid.', 
    order: '13', category: 'Miscellaneous' },
    { 'path': ':theme/treegrid/events', component: EventComponent, 'name': 'Events',
    description: 'This demo explains the basic functionalities of the events that are available in the Syncfusion Essential JS2 Tree Grid control.', 
    order: '13', category: 'Miscellaneous' },
    { 'path': ':theme/treegrid/keyboard', component: KeyBoardComponent, 'name': 'Keyboard Navigation',
    description: 'This demo explains the key combinations used to perform corresponding Tree Grid actions in Syncfusion Essential JS2 Tree Grid control.', 
    order: '13', category: 'Miscellaneous' }
];

let declarations: Type<Object>[] = [TreeGridOverviewComponent, DefaultComponent, TreeGridClipboardComponent, TreeGridAdaptiveComponent, LocalDataComponent, RemoteData, SelfReferenceComponent, SortComponent, SortingAPIComponent, DefaultPagingComponent, PagingAPIComponent, ContextMenuComponent, CustomContextMenuComponent, AggregateComponent, CustomAggregateComponent, ColumnReorderComponent, ColumnFormattingComponent, ColumnTemplateComponent, ResizingComponent,
    ColumnMenuComponent, ColumnChooserComponent, CellAlignmentComponent, AutoWrap, ShowHideComponent, HeaderTemplateComponent, FilterComponent, InlineEditing, DialogEditingComponent, BatchEditingComponent, LockRowComponent, CellEditTypeComponent, CommandColumnComponent, EditTemplateComponent, ReactiveFormsComponent, TemplateFormsComponent, SearchComponent,
    StackedHeaderComponent, KeyBoardComponent, DefaultExportComponent, PrintComponent, EventComponent, ConditionalFormattingComponent, ToolbarTemplateComponent,InfiniteScrollingComponent,
    GridLinesComponent, RowHover, RowHeightComponent, RowTemplateComponent, DragDropComponent, FilteringMenuComponent, FreezeComponent, DefaultScrollingComponent, VirtualScrollingComponent, SelectionComponent, SelectionAPIComponent, CheckboxSelectionComponent, CheckboxColumnComponent, FrozenAPI];

@NgModule({
    imports: [RouterModule.forChild(treegridRouteConfig), CommonModule, HttpModule, TreeGridAllModule,
        NumericTextBoxAllModule, ToolbarModule, DropDownListAllModule, ButtonAllModule, DialogModule, MultiSelectAllModule, CheckBoxAllModule, ReactiveFormsModule, FormsModule, DatePickerModule, SparklineAllModule],
    declarations: declarations,
    providers: [TreeGridAllModule, SparklineAllModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TreeGridSampleModule { }
