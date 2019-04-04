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
import { DefaultComponent } from './default.component';
import { LocalDataComponent } from './localdata.component';
import { RemoteData } from './remotedata.component';
import { SelfReferenceComponent } from './selfreference.component';
import { ColumnFormattingComponent } from './columnformatting.component';
import { ColumnTemplateComponent } from './columntemplate.component';
import { ColumnReorderComponent } from './reorder.component';
import { ResizingComponent } from './resizing.component';
import { ColumnMenuComponent } from './columnmenu.component';
import { CellAlignmentComponent } from './cellalignment.component';
import { AutoWrap } from './autowrap.component';
import { ShowHideComponent } from './showhide.component';
import { HeaderTemplateComponent } from './headertemplate';
import { GridLinesComponent } from './gridlines.component';
import { RowHover } from './row-hover.component';
import { RowHeightComponent } from './rowheight.component';
import { InlineEditing } from './inlineediting.component';
import { DialogEditingComponent} from './dialogediting.component';
import { LockRowComponent} from './lockrow.component';
import { CellEditTypeComponent } from './celledit-type.component';
import { EditTemplateComponent } from './edittemplate.component';
import { ReactiveFormsComponent } from './reactiveforms.component';
import { TemplateFormsComponent } from './templateforms.component';
import { SortComponent } from './sorting.component'; 
import { SortingAPIComponent } from './sortingapi.component';
import { Page } from './default-paging.component';
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

export const treegridRouteConfig: Object[] = [
    { 'path': ':theme/treegrid/treegrid-overview', component: TreeGridOverviewComponent, 'name': 'Overview',
    description: 'This demo for Essential JS2 TreeGrid component shows basic treegrid features such as sorting, filtering, conditional formatting, column template and scrolling.', 
    order: '01', type: 'new', category: 'TreeGrid' },
    { 'path': ':theme/treegrid/default', component: DefaultComponent, 'name': 'Default Functionalities',
    description: 'This demo for Essential JS2 TreeGrid component shows the default rendering of the TreeGrid  component with minimum configuration.', 
    order: '01', category: 'TreeGrid' },
    { 'path': ':theme/treegrid/localdata', component: LocalDataComponent, 'name': 'Local Data',
    description: 'This example shows the binding of an array of list objects in the Syncfusion Essential JS2 TreeGrid control.', 
    order: '02', category: 'Data Binding' },
    { 'path': ':theme/treegrid/remotedata', component: RemoteData, 'name': 'Remote Data', 
    description: 'This example shows the binding of remote services by using the DataManager in the Syncfusion Essential JS2 TreeGrid.', 
    order: '02', category: 'Data Binding' },
    { 'path': ':theme/treegrid/selfreference', component: SelfReferenceComponent, 'name': 'Self Reference',
    description: 'This example illustrates binding self-referential flat data with parent ID to a Syncfusion Essential JS2 TreeGrid control.', 
    order: '02', category: 'Data Binding' },
    { 'path': ':theme/treegrid/columnformatting', component: ColumnFormattingComponent, 'name': 'Column Formatting', 
    description: 'This demo explains how to display the content of TreeGrid columns based on the specified format in Syncfusion Essential JS2 TreeGrid.', 
    order: '03', category: 'Columns' },
    { 'path': ':theme/treegrid/columntemplate', component: ColumnTemplateComponent, 'name': 'Column Template', 
    description: 'This demo explains how to define template columns in Syncfusion  Essential JS2 TreeGrid control.', 
    order: '03', category: 'Columns' },
    { 'path': ':theme/treegrid/reorder', component: ColumnReorderComponent, 'name': 'Column Reorder', 
    description: 'This demo explains how to reorder the columns of treegrid by simple drag and drop of columns using Syncfusion Essential JS2 TreeGrid control.', 
    order: '03', category: 'Columns' },
    { 'path': ':theme/treegrid/resizing', component: ResizingComponent, 'name': 'Column Resizing',
    description: 'This demo for Essential JS2 TreeGrid component shows the default rendering of the TreeGrid  component with minimum configuration.', 
    order: '03', category: 'Columns' },
    { 'path': ':theme/treegrid/columnmenu', component: ColumnMenuComponent, 'name': 'Column Menu',
    description: 'This demo explains the default functionalities of the Column Menu in Syncfusion Essential JS2 TreeGrid control.', 
    order: '03', category: 'Columns' },
    { 'path': ':theme/treegrid/cellalignment', component: CellAlignmentComponent, 'name': 'Cell Alignment',
    description: 'This demo explains how to align the content inside the cells of treegrid columns and headers in Syncfusion Essential JS2 TreeGrid control.', 
    order: '03', category: 'Columns' },
    { 'path': ':theme/treegrid/autowrap', component: AutoWrap, 'name': 'Auto Wrap Column Cells', 
    description: 'This demo explains how to wrap the content of columns within the specified width of treegrid columns in Syncfusion Essential JS2 TreeGrid control.', 
    order: '03', category: 'Columns' },
    { 'path': ':theme/treegrid/showhide', component: ShowHideComponent, 'name': 'Show or Hide Column',
    description: 'This demo explains how to hide or show the columns of treegrid dynamically using Syncfusion Essential JS2 TreeGrid methods.', 
    order: '03', category: 'Columns' },
    // { 'path': ':theme/treegrid/headertemplate', component: HeaderTemplateComponent, 'name': 'Header Template',
    // description: 'This demo explains how to customize column headers to show additional HTML elements, such as icons, images, etc. in Syncfusion Essential JS2 TreeGrid control.', 
    // order: '03', category: 'Columns' },
    { 'path': ':theme/treegrid/stackedheader', component: StackedHeaderComponent, 'name': 'Stacked Header',
    description: 'This demo explains how to provide a common header for the group of columns in Syncfusion Essential JS2 TreeGrid control.', 
    order: '03', category: 'Columns' },
    { 'path': ':theme/treegrid/checkbox-column', component: CheckboxColumnComponent, 'name': 'Checkbox Column',
    description: 'This demo explains how the hierarchy selection between the records using column checkboxes in Essential TypeScript TreeGrid control.', 
    order: '03', category: 'Columns','type': 'new' },
    { 'path': ':theme/treegrid/row-hover', component: RowHover, 'name': 'Row Hover', 
    description: 'This demo explains how the treegrid row color is changed while move the mouse over a row in Syncfusion Essential JS2 TreeGrid content.', 
    order: '04', category: 'Rows' },
    { 'path': ':theme/treegrid/rowheight', component: RowHeightComponent, 'name': 'Row Height',
    description: 'This demo explains the way of customizing the row height of Syncfusion Essential JS2 TreeGrid control.', 
    order: '04', category: 'Rows' },
    { 'path': ':theme/treegrid/inlineediting', component: InlineEditing, 'name': 'Inline Editing', 
    description: 'This example shows how to add and edit row or cell inline on the Syncfusion Essential JS2 TreeGrid control.', 
    order: '05', category: 'Editing' },
    { 'path': ':theme/treegrid/dialogediting', component: DialogEditingComponent, 'name': 'Dialog Editing', 
    description: 'This demo explains how to edit a treegrid record in the Dialog mode using Syncfusion Essential JS2 TreeGrid control.', 
    order: '05', category: 'Editing' },
    { 'path': ':theme/treegrid/lockrow', component: LockRowComponent, 'name': 'Lock Row', 
    description: 'This demo explains how to disable editing for specific rows dynamically in Syncfusion Essential JS2 TreeGrid control.', 
    order: '05', category: 'Editing' },
    { 'path': ':theme/treegrid/celledit-type', component: CellEditTypeComponent, 'name': 'Cell Edit Type', 
    description: 'This demo explains how to set different edit types and how to define edit params for the treegrid columns in Syncfusion Essential JS2 TreeGrid control.', 
    order: '05', category: 'Editing' },
    { 'path': ':theme/treegrid/commandcolumn', component: CommandColumnComponent, 'name': 'Command Column',
    description: 'This demo explains how to include CRUD action buttons as one of the columns in Syncfusion Essential JS2 TreeGrid control.', 
    order: '05', category: 'Editing' },
    { 'path': ':theme/treegrid/edittemplate', component: EditTemplateComponent, 'name': 'Edit Template',
    description: 'This demo explains how create a custom editor control for the treegrid cells when a row is edited in Syncfusion Essential JS2 TreeGrid.', 
    order: '05', category: 'Editing' },
    { 'path': ':theme/treegrid/reactiveforms', component: ReactiveFormsComponent, 'name': 'Reactive Forms',
    description: 'This demo explains how to include CRUD action buttons as one of the columns in Syncfusion Essential JS2 TreeGrid control.', 
    order: '05', category: 'Editing' },
    { 'path': ':theme/treegrid/templateforms', component: TemplateFormsComponent, 'name': 'Template Forms',
    description: 'This demo explains how to include CRUD action buttons as one of the columns in Syncfusion Essential JS2 TreeGrid control.', 
    order: '05', category: 'Editing' },
    { 'path': ':theme/treegrid/sorting', component: SortComponent, 'name': 'Multi Sorting', 
    description: 'This demo demonstrates to sort multiple columns of treegrid by hold the CTRL key and click on the column headers of Syncfusion Essential JS2 TreeGrid control.', 
    order: '06', category: 'Sorting' },
    { 'path': ':theme/treegrid/sortingapi', component: SortingAPIComponent, 'name': 'Sorting API', 
    description: 'This demo explains how to sort columns dynamically using methods of Syncfusion Essential JS2 TreeGrid control.', 
    order: '06', category: 'Sorting' },
    { 'path': ':theme/treegrid/filter', component: FilterComponent, 'name': 'Default Filtering',
    description: 'This demo explains the default functionalities of filtering and how to define the template for filter bar in Syncfusion Essential JS2 TreeGrid.', 
    order: '07', category: 'Filtering' },
    { 'path': ':theme/treegrid/filtermenu', component: FilteringMenuComponent, 'name': 'Menu Filter', 'type': 'update',
    description: 'This demo explains how to filter the content using menu filter type of Syncfusion Essential JS2 TreeGrid control.', 
    order: '07', category: 'Filtering' },
    { 'path': ':theme/treegrid/search', component: SearchComponent, 'name': 'Search',
    description: 'This demo explains how to search the text entered in the search bar in Syncfusion Essential JS2 TreeGrid content.', 
    order: '07', category: 'Filtering' },
    { 'path': ':theme/treegrid/default-paging', component: Page, 'name': 'Default Paging', 
    description: 'This demo explains how to display the records in paginated view in Syncfusion Essential JS2 TreeGrid control.', 
    order: '08', category: 'Paging' },
    { 'path': ':theme/treegrid/paging-api', component: PagingAPIComponent, 'name': 'Paging API', 
    description: 'This demo explains how to customize a pager using the APIs that are relevant to paging of Syncfusion Essential JS2 TreeGrid control.', 
    order: '08', category: 'Paging' },
    { 'path': ':theme/treegrid/selection', component: SelectionComponent, 'name': 'Default Selection',
    description: 'This demo explains the customization of selection mode and toggle selection of Syncfusion Essential JS2 TreeGrid control.', 
    order: '09', category: 'Selection' },
    { 'path': ':theme/treegrid/selection-api', component: SelectionAPIComponent, 'name': 'Selection API',
    description: 'This demo explains how to select and clear multiple rows using methods of Syncfusion Essential JS2 TreeGrid control.', 
    order: '09', category: 'Selection' },
    { 'path': ':theme/treegrid/checkbox-selection', component: CheckboxSelectionComponent, 'name': 'Checkbox Selection',
    description: 'This demo explains how the check box selection feature can be used to select treegrid rows in Essential TypeScript TreeGrid control.', 
    order: '09', category: 'Selection','type': 'new' },
    // { 'path': ':theme/treegrid/default-aggregate', component: AggregateComponent, 'name': 'Default Aggregate', 
    // description: 'This demo explains how to display the summary values such as average, minimum, etc., for the columns in Syncfusion Essential JS2 TreeGrid control.', 
    // order: '10', category: 'Aggregates' },
    // { 'path': ':theme/treegrid/custom-aggregate', component: CustomAggregateComponent, 'name': 'Custom Aggregate', 
    // description: 'This demo explains how to display the custom aggregate for the columns in Syncfusion Essential JS2 TreeGrid control.', 
    // order: '10', category: 'Aggregates' },
    { 'path': ':theme/treegrid/contextmenu-default', component: ContextMenuComponent, 'name': 'Default ContextMenu', 
    description: 'This demo explains the usage of context menu and the default context menu items in Syncfusion Essential JS2 TreeGrid control.', 
    order: '11', category: 'Context Menu' },
    { 'path': ':theme/treegrid/custom-contextmenu', component: CustomContextMenuComponent, 'name': 'Custom ContextMenu', 
    description: 'This demo explains the usage of custom context menu items in Syncfusion Essential JS2 TreeGrid control.', 
    order: '11', category: 'Context Menu' },
    { 'path': ':theme/treegrid/exporting-default', component: DefaultExportComponent, 'name': 'Default Export', 
    description: 'This demo explains how to export the treegrid content to Excel, PDF, and CSV documents using the Syncfusion Essential JS2 TreeGrid control.', 
    order: '12', category: 'Exporting' },
    { 'path': ':theme/treegrid/print', component: PrintComponent, 'name': 'Print', 
    description: 'This demo explains how to print the records of the treegrid using the Print feature of Syncfusion Essential JS2 TreeGrid control.', 
    order: '12', category: 'Exporting' },
    { 'path': ':theme/treegrid/conditionalformatting', component: ConditionalFormattingComponent, 'name': 'Conditional Formatting',
    description: 'This demo explains how to apply styles to specific cells based on certain conditions in Syncfusion Essential JS2 TreeGrid control.', 
    order: '13', category: 'Miscellaneous' },
    { 'path': ':theme/treegrid/toolbartemplate', component: ToolbarTemplateComponent, 'name': 'Toolbar Template',
    description: 'This demo explains how to render custom template elements in a toolbar by which any custom operation can be performed in Syncfusion Essential JS2 TreeGrid.', 
    order: '13', category: 'Miscellaneous' },
    { 'path': ':theme/treegrid/events', component: EventComponent, 'name': 'Events',
    description: 'This demo explains the basic functionalities of the events that are available in the Syncfusion Essential JS2 TreeGrid control.', 
    order: '13', category: 'Miscellaneous' },
    { 'path': ':theme/treegrid/keyboard', component: KeyBoardComponent, 'name': 'Keyboard Interaction',
    description: 'This demo explains the key combinations used to perform corresponding treegrid actions in Syncfusion Essential JS2 TreeGrid control.', 
    order: '13', category: 'Miscellaneous' },
    { 'path': ':theme/treegrid/gridlines', component: GridLinesComponent, 'name': 'Grid Lines',
    description: 'This demo explains how to customize the grid lines in treegrid using Syncfusion Essential JS2 TreeGrid control.', 
    order: '13', category: 'Miscellaneous' }
];

let declarations: Type<Object>[] = [TreeGridOverviewComponent, DefaultComponent, LocalDataComponent, RemoteData, SelfReferenceComponent, SortComponent, SortingAPIComponent, Page, PagingAPIComponent, ContextMenuComponent, CustomContextMenuComponent, AggregateComponent, CustomAggregateComponent, ColumnReorderComponent, ColumnFormattingComponent, ColumnTemplateComponent, ResizingComponent,
    ColumnMenuComponent, CellAlignmentComponent, AutoWrap, ShowHideComponent, HeaderTemplateComponent, FilterComponent, InlineEditing, DialogEditingComponent, LockRowComponent, CellEditTypeComponent, CommandColumnComponent, EditTemplateComponent, ReactiveFormsComponent, TemplateFormsComponent, SearchComponent,
    StackedHeaderComponent, KeyBoardComponent, DefaultExportComponent, PrintComponent, EventComponent, ConditionalFormattingComponent, ToolbarTemplateComponent,
    GridLinesComponent, RowHover, RowHeightComponent, FilteringMenuComponent, SelectionComponent, SelectionAPIComponent, CheckboxSelectionComponent, CheckboxColumnComponent];

@NgModule({
    imports: [RouterModule.forChild(treegridRouteConfig), CommonModule, HttpModule, TreeGridAllModule,
        NumericTextBoxAllModule, ToolbarModule, DropDownListAllModule, ButtonAllModule, MultiSelectAllModule, CheckBoxAllModule, ReactiveFormsModule, FormsModule, DatePickerModule, SparklineAllModule],
    declarations: declarations,
    providers: [TreeGridAllModule, SparklineAllModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TreeGridSampleModule { }
