import { NgModule, ModuleWithProviders, Type } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { RouterModule } from '@angular/router';
import { SharedModule } from '../common/shared.module';
import { GanttAllModule } from '@syncfusion/ej2-angular-gantt';
import { CheckBoxAllModule } from '@syncfusion/ej2-angular-buttons';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { TextBoxAllModule, NumericTextBoxAllModule } from '@syncfusion/ej2-angular-inputs';
import { MultiSelectAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { GanttDefaultComponent } from './default.component';
import { GanttEditingComponent } from './editing.component';
import { GanttContextMenuComponent } from './context-menu.component';
import { GanttExportingComponent } from './exporting.component';
import { GanttFilteringComponent } from './filtering.component';
import { GanttEventsComponent } from './events.component';
import { GanttKeyboardInteractionsComponent } from './keyboard-interactions.component';
import { GanttLocalDataComponent } from './local-data.component';
import { GanttRemoteDataComponent } from './remote-data.component';
import { GanttSelfDataComponent } from './self-reference-data.component';
import { GanttBaselineComponent } from './baseline.component';
import { GanttUnscheduledComponent } from './unscheduled-task.component';
import { GanttTimelineComponent } from './timeline.component';
import { GanttZoomingComponent } from './zooming.component';
import { GanttColumnMenuComponent } from './column-menu.component';
import { ShowHideComponent } from './show-hide-column.component';
import { ColumnReorderComponent } from './reorder.component';
import { ResizeComponent } from './resize.component';
import { ColumnTemplateComponent  } from './column-template.component';
import { HeaderTemplateComponent  } from './header-template.component';
import { GanttTaskbarTemplateComponent } from './taskbar-template.component';
import { GanttTasklabelTemplateComponent } from './tasklabel-template.component';
import { GanttTooltipTemplateComponent } from './tooltip-template.component';
import { GanttToolbarTemplateComponent } from './toolbar-template.component';
import { GanttGridLinesComponent } from './grid-lines.component';
import { GanttSortingComponent } from './sorting.component';
import { GanttSortingAPIComponent } from './sorting-api.component';
import { GanttWorkWeekComponent } from './work-week.component';
import { GanttWorkingTimeRangeComponent } from './working-time-range.component';
import { GanttHolidaysComponent } from './holidays.component';
import { GanttIndicatorsComponent } from './indicators.component';
import { GanttEventMarkersComponent } from './event-markers.component';
import { GanttResourcesComponent } from './resources.component';
import { GanttTaskModeComponent } from './taskMode.component';
import { GanttSelectionComponent } from './selection.component';
import { GanttDragAndDropComponent } from './drag-and-drop.component';
import { GanttResourceViewComponent } from './resource-view.component';
import { GanttResourceMultiTaskbarComponent } from './resource-multi-taskbar.component';
import { GanttSplitTasksComponent } from './split-tasks.component';
import { GanttVirtualScrollComponent } from './virtual-scroll.component';
import { GanttTimezoneComponent } from './timezone.component';

export const GanttAppRoutes: Object[] = [
    {
        path: ':theme/gantt/default', component: GanttDefaultComponent,
        description: 'This example demonstrates the simple Gantt chart with summary task, child tasks, milestone tasks, dependencies with event markers of project',
        name: 'Default Functionalities', order: '01', category: 'Gantt'
    },
    {
        path: ':theme/gantt/editing', component: GanttEditingComponent,
        description: 'This example demonstrates the cell editing, dialog editing, taskbar editing and dependency editing support in Gantt',
        name: 'Editing', order: '01', category: 'Gantt'
    },
    {
        path: ':theme/gantt/selection', component: GanttSelectionComponent,
        description: 'This example demonstrates the various selection support of row and cell with different type in Syncfusion Essential JS2 Gantt',
        name: 'Selection', order: '01', category: 'Gantt'
    },
    {
        path: ':theme/gantt/context-menu', component: GanttContextMenuComponent,
        description: 'This demo explains the usage of context menu and the default context menu items in Syncfusion Gantt component.',
        name: 'Context Menu', order: '01', category: 'Gantt'
    },
    {
        path: ':theme/gantt/exporting', component: GanttExportingComponent,
        description: 'This demo explains how to export Gantt content to Excel and CSV documents using the Syncfusion Gantt component.',
        name: 'Exporting', order: '01', category: 'Gantt'
    },
    {
        path: ':theme/gantt/filtering', component: GanttFilteringComponent,
        description: 'This example demonstrates the filtering support with filter menu option for various types of columns in Gantt',
        name: 'Filtering', order: '01', category: 'Gantt'
    },
    {
        path: ':theme/gantt/events', component: GanttEventsComponent,
        description: 'This demo demonstrates the basic functionalities of the events that are available in the Syncfusion Essential JS2 Gantt.',
        name: 'Events', order: '01', category: 'Gantt'
    },
    {
        path: ':theme/gantt/keyboard-interactions', component: GanttKeyboardInteractionsComponent,
        description: 'This demo demonstrates the key combinations used to perform corresponding Gantt actions in Syncfusion Essential JS2 Gantt.',
        name: 'Keyboard Interactions', order: '01', category: 'Gantt'
    },
    {
        path: ':theme/gantt/drag-and-drop', component: GanttDragAndDropComponent,
        description: 'This demo for Essential JS 2 Gantt control how the rows can be dragged within the gantt using the row drag-and-drop feature.',
        name: 'Row Drag And Drop', order: '01', category: 'Gantt'
    },
    {
        path: ':theme/gantt/split-tasks', component: GanttSplitTasksComponent,
        description: 'This demo explains how to interrupt the already scheduled tasks using the Syncfusion TypeScript Gantt control.',
        name: 'Split Tasks', order: '01', category: 'Gantt'
    },
    {
        path: ':theme/gantt/virtual-scroll', component: GanttVirtualScrollComponent,
        description: 'This example illustrates binding large data and smooth scrolling with large data using the Virtual Scroll feature in the Syncfusion Gantt chart.',
        name: 'Virtual Scroll', order: '01', category: 'Gantt'
    },
    {
        path: ':theme/gantt/local-data', component: GanttLocalDataComponent,
        description: 'This example demonstrates the way of binding local data to Gantt chart with an array of JavaScript objects.',
        name: 'Local Data', order: '02', category: 'Data Binding'
    },
    {
        path: ':theme/gantt/remote-data', component: GanttRemoteDataComponent,
        description: 'This sample demonstrates the way of binding data to Gantt chart with remote service. The Gantt chart data source is bound to remote data using DataManager.',
        name: 'Remote Data', order: '02', category: 'Data Binding'
    },
    {
        path: ':theme/gantt/self-reference-data', component: GanttSelfDataComponent,
        description: 'This example demonstrates the way of binding self-referential flat data with parentID to the Gantt chart.',
        name: 'Self Reference Data', order: '02', category: 'Data Binding'
    },
    {
        path: ':theme/gantt/resources', component: GanttResourcesComponent,
        description: 'This example demonstrates how to allocate available resources to the task based on their skills and availability',
        name: 'Resource Allocation', order: '03', category: 'Resources'
    },
    {
        path: ':theme/gantt/resource-view', component: GanttResourceViewComponent,
        description: 'This sample explains the Resource break down view in the Gantt chart that is how to visualize the list of tasks assigned to each resource in hierarchy manner.',
        name: 'Resource View', order: '03', category: 'Resources'
    },
    {
        path: ':theme/gantt/resource-multi-taskbar', component: GanttResourceMultiTaskbarComponent,
        description: 'This sample explains how to visualize the list of tasks assigned to each resource on a single parent row while collapsing the parent record.',
        name: 'Resource Multi Taskbar', order: '03', category: 'Resources'
    },
    {
        path: ':theme/gantt/work-week', component: GanttWorkWeekComponent,
        description: 'This sample demonstrates the way to bind the customizable array of working days in a week for project.',
        name: 'Workweek', order: '04', category: 'Scheduling Concepts'
    },
    {
        path: ':theme/gantt/working-time-range', component: GanttWorkingTimeRangeComponent,
        description: 'This example demonstrates how to customize the working time of a day for the whole project. We can define working time in different intervals.',
        name: 'Working Time Range', order: '04', category: 'Scheduling Concepts'
    },
    {
        path: ':theme/gantt/holidays', component: GanttHolidaysComponent,
        description: 'This example demonstrates how to define holidays in the project, which should be considered while calculating the duration and on rendering taskbars.',
        name: 'Holidays', order: '04', category: 'Scheduling Concepts'
    },
    {
        path: ':theme/gantt/taskMode', component: GanttTaskModeComponent,
        description: 'This example demonstrates how to change the task modes as auto, manual or custom depends upon particular tasks.',
        name: 'Task Scheduling Mode', order: '04', category: 'Scheduling Concepts'
    },
    {
        path: ':theme/gantt/event-markers', component: GanttEventMarkersComponent,
        description: 'This example demonstrates how to highlight the different stages in the project development cycle just like bookmark.',
        name: 'Event Markers', order: '04', category: 'Scheduling Concepts'
    },
    {
        path: ':theme/gantt/indicators', component: GanttIndicatorsComponent,
        description: 'This example demonstrates how to highlight some important details of tasks on specified date in the project with the label and icons.',
        name: 'Indicators', order: '04', category: 'Scheduling Concepts'
    },
    {
        path: ':theme/gantt/baseline', component: GanttBaselineComponent,
        description: 'Baselines are enabled to view the deviation between the planned dates of tasks and actual progress of task dates',
        name: 'Baseline', order: '04', category: 'Scheduling Concepts'
    },
    {
        path: ':theme/gantt/unscheduled-task', component: GanttUnscheduledComponent,
        description: 'This example demonstrates the unscheduled tasks in Gantt with custom toolbar item and dynamic add support.',
        name: 'Unscheduled Tasks', order: '04', category: 'Scheduling Concepts'
    },
    {
        path: ':theme/gantt/timezone', component: GanttTimezoneComponent, type: "new", 
        description: 'This demo explains how the Gantt Chart schedules projects in different timezones.',
        name: 'Timezone', order: '04', category: 'Scheduling Concepts'
    },
    {
        path: ':theme/gantt/timeline', component: GanttTimelineComponent,
        description: 'This example demonstrates the various timeline mode options and properties available to customize the timeline in Gantt',
        name: 'Timeline API', order: '05', category: 'Timeline'
    },
    {
        path: ':theme/gantt/zooming', component: GanttZoomingComponent,
        description: 'This example demonstrates the zooming support of the Gantt chart timeline and ZoomToFit support of the Gantt chart.',
        name: 'Zooming', order: '05', category: 'Timeline'
    },
    {
        path: ':theme/gantt/column-menu', component: GanttColumnMenuComponent,
        description: 'This demo explains the default functionalities of the Column Menu in Syncfusion Essential JS2 Gantt.',
        name: 'Column Menu', order: '06', category: 'Columns'
    },
    {
        path: ':theme/gantt/show-hide-column', component: ShowHideComponent ,
        description: 'This demo explains how to hide or show the columns of gantt dynamically using Syncfusion Essential JS2 Gantt methods.',
        name: 'Show or Hide Column', order: '06', category: 'Columns'
    },
    {
        path: ':theme/gantt/reorder', component: ColumnReorderComponent ,
        description: 'This demo explains how to reorder the columns of gantt by simple drag and drop of columns using Syncfusion Essential JS2 Gantt component.',
        name: 'Column Reorder', order: '06', category: 'Columns'
    },
    {
        path: ':theme/gantt/resize', component: ResizeComponent ,
        description: 'This demo explains how to resize the columns of gantt in the Essential JS2 Gantt component.',
        name: 'Column Resize', order: '06', category: 'Columns'
    },
    {
        path: ':theme/gantt/column-template', component: ColumnTemplateComponent ,
        description: 'This demo explains how to define template columns in Syncfusion  Essential JS2 Gantt component.',
        name: 'Column Template', order: '06', category: 'Columns'
    },
    {
        path: ':theme/gantt/header-template', component: HeaderTemplateComponent ,
        description: 'This demo explains how to customize column headers to show additional HTML elements, such as icons, images, etc. in Syncfusion Essential JS2 Gantt component.',
        name: 'Header Template', order: '06', category: 'Columns'
    },
    {
        path: ':theme/gantt/taskbar-template', component: GanttTaskbarTemplateComponent,
        description: 'This example demonstrates the taskbar template support with child taskbar template, parent taskbar template and milestone template.',
        name: 'Taskbar Template', order: '07', category: 'Customization'
    },
    {
        path: ':theme/gantt/tasklabel-template', component: GanttTasklabelTemplateComponent,
        description: 'This demo explains how to render label template for the left, right, and task labels in Syncfusion Essential JS2 Gantt.',
        name: 'Task Label Template', order: '07', category: 'Customization'
    },
    {
        path: ':theme/gantt/tooltip-template', component: GanttTooltipTemplateComponent,
        description: 'This demo explains how to render tooltip template for taskbar and baseline in Syncfusion Essential JS2 Gantt.',
        name: 'Tooltip Template', order: '07', category: 'Customization'
    },
    {
        path: ':theme/gantt/toolbar-template', component: GanttToolbarTemplateComponent,
        description: 'This demo explains how to render custom toolbar elements in a toolbar, by which any custom operation can be performed in Syncfusion Essential JS2 Gantt.',
        name: 'Toolbar Template', order: '07', category: 'Customization'
    },
    {
        path: ':theme/gantt/grid-lines', component: GanttGridLinesComponent,
        description: 'This demo explains how to customize the grid lines in Gantt by selecting values from dropdown using Syncfusion Essential JS2 Gantt.',
        name: 'Grid Lines', order: '07', category: 'Customization'
    },
    {
        path: ':theme/gantt/sorting', component: GanttSortingComponent,
        description: 'This demo demonstrates how to sort multiple columns of Gantt by holding the CTRL key and clicking the column headers of Syncfusion Essential JS2 Gantt.',
        name: 'Default', order: '08', category: 'Sorting'
    },
    {
        path: ':theme/gantt/sorting-api', component: GanttSortingAPIComponent,
        description: 'This demo demonstrates how to sort columns and clear sorted columns dynamically using the sortColumn and clearSorting method of Syncfusion Essential JS2 Gantt.',
        name: 'Sorting API', order: '08', category: 'Sorting'
    }
];

export const GanttRouter: ModuleWithProviders<any> = RouterModule.forChild(GanttAppRoutes);
let declarations: Type<Object>[] = [
    GanttDefaultComponent,
    GanttWorkWeekComponent,
    GanttWorkingTimeRangeComponent,
    GanttHolidaysComponent,
    GanttIndicatorsComponent,
    GanttEventMarkersComponent,
    GanttResourcesComponent,
    GanttTaskModeComponent,
    GanttBaselineComponent,
    GanttEditingComponent,
    GanttContextMenuComponent,
    GanttExportingComponent,
    GanttFilteringComponent,
    GanttEventsComponent,
    GanttKeyboardInteractionsComponent,
    GanttLocalDataComponent,
    GanttRemoteDataComponent,
    GanttSelfDataComponent,
    GanttBaselineComponent,
    GanttUnscheduledComponent,
    GanttTimelineComponent,
    GanttZoomingComponent,
    GanttColumnMenuComponent,
    ShowHideComponent,
    ColumnReorderComponent,
    ResizeComponent,
    ColumnTemplateComponent,
    HeaderTemplateComponent,
    GanttTaskbarTemplateComponent,
    GanttTasklabelTemplateComponent,
    GanttTooltipTemplateComponent,
    GanttToolbarTemplateComponent,
    GanttGridLinesComponent,
    GanttSortingComponent,
    GanttSortingAPIComponent,
    GanttSelectionComponent,
    GanttDragAndDropComponent,
    GanttResourceViewComponent,
    GanttResourceMultiTaskbarComponent,
    GanttSplitTasksComponent,
    GanttVirtualScrollComponent,
    GanttTimezoneComponent
];
@NgModule({
    imports: [CommonModule, GanttRouter, SharedModule, GanttAllModule, DropDownListAllModule, CheckBoxAllModule, TextBoxAllModule, NumericTextBoxAllModule, MultiSelectAllModule],
    declarations: declarations,
    providers: [GanttAllModule]
})
export class GanttSampleModule {
}
