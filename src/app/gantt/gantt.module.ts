import { NgModule, ModuleWithProviders, Type } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { RouterModule } from '@angular/router';

import { GanttAllModule } from '@syncfusion/ej2-angular-gantt';
import { CheckBoxAllModule, SwitchAllModule } from '@syncfusion/ej2-angular-buttons';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { TextBoxAllModule, NumericTextBoxAllModule } from '@syncfusion/ej2-angular-inputs';
import { MultiSelectAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { GanttDefaultComponent } from './default.component';
import { GanttEditingComponent } from './editing.component';
import { GanttContextMenuComponent } from './context-menu.component';
import { GanttExportingComponent } from './exporting.component';
import { GanttAdvancedExportingComponent } from './advanced-exporting.component';
import { GanttFilteringComponent } from './filtering.component';
import { GanttAdvancedFilteringComponent } from './advanced-filtering.component';
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
import { GanttTimelineTemplateComponent } from './timeline-template.component';
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
import { GanttCriticalPathComponent } from './critical-path.component'
import { GanttLoadingAnimationComponent } from './loading-animation.component';
import { GanttOverviewComponent } from './overview.component';
import { GanttLoadOnDemandComponent } from './load-on-demand.component';
import { GanttUndoRedoComponent } from './undo-redo.component';

export const GanttAppRoutes: Object[] = [
    {
        path: ':theme/gantt/overview', component: GanttOverviewComponent,
        description: 'This example demonstrates the simple Gantt chart with summary task, child tasks, milestone tasks, dependencies with event markers of project',
        name: 'Overview', order: '01', category: 'Gantt Chart'
    },
    {
        path: ':theme/gantt/default', component: GanttDefaultComponent,
        description: 'This example demonstrates the simple Gantt chart with summary task, child tasks, milestone tasks, dependencies with event markers of project',
        name: 'Default Functionalities', order: '01', category: 'Gantt Chart'
    },
    {
        path: ':theme/gantt/editing', component: GanttEditingComponent,
        description: 'This example demonstrates the cell editing, dialog editing, taskbar editing and dependency editing support in Gantt',
        name: 'Editing', order: '01', category: 'Gantt Chart'
    },
    {
        path: ':theme/gantt/virtual-scroll', component: GanttVirtualScrollComponent,
        description: 'This example illustrates binding large data and smooth scrolling with large data using the Virtual Scroll feature in the Syncfusion<sup>®</sup> Gantt chart.',
        name: 'Virtual Scrolling', order: '01', category: 'Gantt Chart'
    },
    {
        path: ':theme/gantt/undo-redo', component: GanttUndoRedoComponent,
        description: 'This sample demonstrates the undo-redo feature in the Gantt Chart provides users with the ability to reverse or redo their recent actions within the Gantt Chart.',
        name: 'Undo Redo', order: '01', category: 'Gantt Chart'
    },
    {
        path: ':theme/gantt/loading-animation', component: GanttLoadingAnimationComponent,
        description: 'This demo for Essential JS 2 gantt component shows the loading indicator when gantt loading, refreshing and performing other action.',
        name: 'Loading Animation', order: '01', category: 'Gantt Chart'
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
      path: ':theme/gantt/load-on-demand', component: GanttLoadOnDemandComponent,
      description: 'This sample demonstrates the load on-demand data binding support in Gantt Chart.',
      name: 'Big Data Set', order: '02', category: 'Data Binding'
    },
    {
        path: ':theme/gantt/self-reference-data', component: GanttSelfDataComponent,
        description: 'This example demonstrates the way of binding self-referential flat data with parentID to the Gantt chart.',
        name: 'Self Reference Data', order: '02', category: 'Data Binding'
    },
    {
        path: ':theme/gantt/taskMode', component: GanttTaskModeComponent,
        description: 'This example demonstrates how to change the task modes as auto, manual or custom depends upon particular tasks.',
        name: 'Task Scheduling Mode', order: '03', category: 'Scheduling Concepts'
    },
    {
        path: ':theme/gantt/work-week', component: GanttWorkWeekComponent,
        description: 'This sample demonstrates the way to bind the customizable array of working days in a week for project.',
        name: 'Workweek', order: '03', category: 'Scheduling Concepts'
    },
    {
        path: ':theme/gantt/working-time-range', component: GanttWorkingTimeRangeComponent,
        description: 'This example demonstrates how to customize the working time of a day for the whole project. We can define working time in different intervals.',
        name: 'Working Time Range', order: '03', category: 'Scheduling Concepts'
    },
    {
        path: ':theme/gantt/holidays', component: GanttHolidaysComponent,
        description: 'This example demonstrates how to define holidays in the project, which should be considered while calculating the duration and on rendering taskbars.',
        name: 'Holidays', order: '03', category: 'Scheduling Concepts'
    },
    {
        path: ':theme/gantt/unscheduled-task', component: GanttUnscheduledComponent,
        description: 'This example demonstrates the unscheduled tasks in Gantt with custom toolbar item and dynamic add support.',
        name: 'Unscheduled Tasks', order: '03', category: 'Scheduling Concepts'
    },
    {
        path: ':theme/gantt/timezone', component: GanttTimezoneComponent,
		description: 'This demo explains how the Gantt Chart schedules projects in different timezones.',
        name: 'Timezone', order: '03', category: 'Scheduling Concepts'
    },
    {
        path: ':theme/gantt/critical-path', component: GanttCriticalPathComponent,
        description: 'This example demonstrates the critical path rendering in Gantt',
        name: 'Critical Path', order: '03', category: 'Scheduling Concepts'
    },
    {
        path: ':theme/gantt/baseline', component: GanttBaselineComponent,
        description: 'Baselines are enabled to view the deviation between the planned dates of tasks and actual progress of task dates',
        name: 'Baseline', order: '03', category: 'Scheduling Concepts'
    },
    {
        path: ':theme/gantt/event-markers', component: GanttEventMarkersComponent,
        description: 'This example demonstrates how to highlight the different stages in the project development cycle just like bookmark.',
        name: 'Event Markers', order: '03', category: 'Scheduling Concepts'
    },
    {
        path: ':theme/gantt/indicators', component: GanttIndicatorsComponent,
        description: 'This example demonstrates how to highlight some important details of tasks on specified date in the project with the label and icons.',
        name: 'Indicators', order: '03', category: 'Scheduling Concepts'
    },
    {
        path: ':theme/gantt/timeline', component: GanttTimelineComponent,
        description: 'This example demonstrates the various timeline mode options and properties available to customize the timeline in Gantt',
        name: 'Timeline API', order: '04', category: 'Timeline'
    },
    {
        path: ':theme/gantt/zooming', component: GanttZoomingComponent,
        description: 'This example demonstrates the zooming support of the Gantt chart timeline and ZoomToFit support of the Gantt chart.',
        name: 'Zooming', order: '04', category: 'Timeline'
    },
    {
        path: ':theme/gantt/column-template', component: ColumnTemplateComponent ,
        description: 'This demo explains how to define template columns in Syncfusion<sup>®</sup>  Essential JS2 Gantt component.',
        name: 'Column Template', order: '05', category: 'Columns'
    },
    {
        path: ':theme/gantt/header-template', component: HeaderTemplateComponent ,
        description: 'This demo explains how to customize column headers to show additional HTML elements, such as icons, images, etc. in Syncfusion<sup>®</sup> Essential JS2 Gantt component.',
        name: 'Header Template', order: '05', category: 'Columns'
    },
    {
        path: ':theme/gantt/reorder', component: ColumnReorderComponent ,
        description: 'This demo explains how to reorder the columns of gantt by simple drag and drop of columns using Syncfusion<sup>®</sup> Essential JS2 Gantt component.',
        name: 'Reorder', order: '05', category: 'Columns'
    },
    {
        path: ':theme/gantt/resize', component: ResizeComponent ,
        description: 'This demo explains how to resize the columns of gantt in the Essential JS2 Gantt component.',
        name: 'Resizing', order: '05', category: 'Columns'
    },
    {
        path: ':theme/gantt/column-menu', component: GanttColumnMenuComponent,
        description: 'This demo explains the default functionalities of the Column Menu in Syncfusion<sup>®</sup> Essential JS2 Gantt.',
        name: 'Column Menu', order: '05', category: 'Columns'
    },
    {
        path: ':theme/gantt/show-hide-column', component: ShowHideComponent ,
        description: 'This demo explains how to hide or show the columns of gantt dynamically using Syncfusion<sup>®</sup> Essential JS2 Gantt methods.',
        name: 'Show or Hide Column', order: '05', category: 'Columns'
    },
    {
        path: ':theme/gantt/resources', component: GanttResourcesComponent,
        description: 'This example demonstrates how to allocate available resources to the task based on their skills and availability',
        name: 'Resource Allocation', order: '06', category: 'Resources'
    },
    {
        path: ':theme/gantt/resource-view', component: GanttResourceViewComponent,
        description: 'This sample explains the Resource break down view in the Gantt chart that is how to visualize the list of tasks assigned to each resource in hierarchy manner.',
        name: 'Resource View', order: '06', category: 'Resources'
    },
    {
        path: ':theme/gantt/resource-multi-taskbar', component: GanttResourceMultiTaskbarComponent,
        description: 'This sample explains how to visualize the list of tasks assigned to each resource on a single parent row while collapsing the parent record.',
        name: 'Resource Multi Taskbar', order: '06', category: 'Resources', type: "update"
    },
    {
        path: ':theme/gantt/sorting', component: GanttSortingComponent,
        description: 'This demo demonstrates how to sort multiple columns of Gantt by holding the CTRL key and clicking the column headers of Syncfusion<sup>®</sup> Essential JS2 Gantt.',
        name: 'Default Sorting', order: '07', category: 'Sorting'
    },
    {
        path: ':theme/gantt/sorting-api', component: GanttSortingAPIComponent,
        description: 'This demo demonstrates how to sort columns and clear sorted columns dynamically using the sortColumn and clearSorting method of Syncfusion<sup>®</sup> Essential JS2 Gantt.',
        name: 'Sorting API', order: '07', category: 'Sorting'
    },
    {
        path: ':theme/gantt/taskbar-template', component: GanttTaskbarTemplateComponent,
        description: 'This example demonstrates the taskbar template support with child taskbar template, parent taskbar template and milestone template.',
        name: 'Taskbar Template', order: '08', category: 'Templates'
    },
    {
        path: ':theme/gantt/timeline-template', component: GanttTimelineTemplateComponent,
        description: 'This sample explains the way of rendering timeline template by mapping template elements to the timelineTemplate property.',
        name: 'Timeline Template', order: '08', category: 'Templates'
    },
    {
        path: ':theme/gantt/tasklabel-template', component: GanttTasklabelTemplateComponent,
        description: 'This demo explains how to render label template for the left, right, and task labels in Syncfusion<sup>®</sup> Essential JS2 Gantt.',
        name: 'Task Label Template', order: '08', category: 'Templates'
    },
    {
        path: ':theme/gantt/tooltip-template', component: GanttTooltipTemplateComponent,
        description: 'This demo explains how to render tooltip template for taskbar and baseline in Syncfusion<sup>®</sup> Essential JS2 Gantt.',
        name: 'Tooltip Template', order: '08', category: 'Templates', hideOnDevice: true, type: "update"
    },
    {
        path: ':theme/gantt/toolbar-template', component: GanttToolbarTemplateComponent,
        description: 'This demo explains how to render custom toolbar elements in a toolbar, by which any custom operation can be performed in Syncfusion<sup>®</sup> Essential JS2 Gantt.',
        name: 'Toolbar Template', order: '08', category: 'Templates'
    },
    {
      path: ':theme/gantt/filtering', component: GanttFilteringComponent,
      description: 'This example demonstrates the filtering support with filter menu option for various types of columns in Gantt',
      name: 'Default Filtering', order: '10', category: 'Filtering'
    },
    {
      path: ':theme/gantt/advanced-filtering', component: GanttAdvancedFilteringComponent,
      description: 'This sample demonstrates the integration of the QueryBuilder component for complex filtering in the Gantt',
      name: 'Advanced Filtering', order: '10', category: 'Filtering'
    },
    {
        path: ':theme/gantt/exporting', component: GanttExportingComponent,
        description: 'This demo explains how to export Gantt content to Excel and CSV documents using the Syncfusion<sup>®</sup> Gantt component.',
        name: 'Exporting', order: '11', category: 'Exporting'
    },
    {
        path: ':theme/gantt/advanced-exporting', component: GanttAdvancedExportingComponent,
        description: 'This demo explains how to export Gantt chart content with customization to PDF documents using the Syncfusion<sup>®</sup> Gantt component.',
        name: 'Advanced Exporting', order: '11', category: 'Exporting',type: "new"
    },
    {
        path: ':theme/gantt/selection', component: GanttSelectionComponent,
        description: 'This example demonstrates the various selection support of row and cell with different type in Syncfusion<sup>®</sup> Essential JS2 Gantt',
        name: 'Selection', order: '09', category: 'Miscellaneous'
    },
    {
        path: ':theme/gantt/context-menu', component: GanttContextMenuComponent,
        description: 'This demo explains the usage of context menu and the default context menu items in Syncfusion<sup>®</sup> Gantt component.',
        name: 'Context Menu', order: '09', category: 'Miscellaneous'
    },
    {
        path: ':theme/gantt/drag-and-drop', component: GanttDragAndDropComponent,
        description: 'This demo for Essential JS 2 Gantt control how the rows can be dragged within the gantt using the row drag-and-drop feature.',
        name: 'Row Drag and Drop', order: '09', category: 'Miscellaneous'
    },
    {
        path: ':theme/gantt/split-tasks', component: GanttSplitTasksComponent,
        description: 'This demo explains how to interrupt the already scheduled tasks using the Syncfusion<sup>®</sup> TypeScript Gantt control.',
        name: 'Split Tasks', order: '09', category: 'Miscellaneous'
    },
    {
        path: ':theme/gantt/grid-lines', component: GanttGridLinesComponent,
        description: 'This demo explains how to customize the grid lines in Gantt by selecting values from dropdown using Syncfusion<sup>®</sup> Essential JS2 Gantt.',
        name: 'Gridlines', order: '09', category: 'Miscellaneous'
    },
    {
        path: ':theme/gantt/events', component: GanttEventsComponent,
        description: 'This demo demonstrates the basic functionalities of the events that are available in the Syncfusion<sup>®</sup> Essential JS2 Gantt.',
        name: 'Events', order: '09', category: 'Miscellaneous'
    },
    {
        path: ':theme/gantt/keyboard-interactions', component: GanttKeyboardInteractionsComponent,
        description: 'This demo demonstrates the key combinations used to perform corresponding Gantt actions in Syncfusion<sup>®</sup> Essential JS2 Gantt.',
        name: 'Keyboard Navigation', order: '09', category: 'Miscellaneous', hideOnDevice: true
    },
];

export const GanttSampleModule: ModuleWithProviders<any> = RouterModule.forChild(GanttAppRoutes);
