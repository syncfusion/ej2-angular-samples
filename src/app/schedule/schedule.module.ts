import { NgModule, Type, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { ScheduleAllModule, RecurrenceEditorAllModule } from '@syncfusion/ej2-angular-schedule';
import { NumericTextBoxAllModule } from '@syncfusion/ej2-angular-inputs';
import { DatePickerAllModule, TimePickerAllModule, DateTimePickerAllModule } from '@syncfusion/ej2-angular-calendars';
import { CheckBoxAllModule } from '@syncfusion/ej2-angular-buttons';
import { ToolbarAllModule, ContextMenuAllModule } from '@syncfusion/ej2-angular-navigations';
import { MaskedTextBoxModule, UploaderAllModule } from '@syncfusion/ej2-angular-inputs';
import { DropDownListAllModule, MultiSelectAllModule } from '@syncfusion/ej2-angular-dropdowns';

import { DefaultComponent } from './default.component';
import { TimelineComponent } from './timeline.component';
import { TimelineResourcesComponent } from './timeline-resource.component';
import { TimelineResourceGroupingComponent } from './timeline-resource-grouping.component';
import { HeaderRowsComponent } from './header-rows.component';
import { ScrollTimeComponent } from './scroll-to.component';
import { EditorValidationComponent } from './editor-validation.component';
import { TooltipComponent } from './tooltip.component';
import { KeyboardComponent } from './keyboard-interaction.component';
import { EventsComponent } from './events.component';
import { RecurrenceComponent } from './recurrence-events.component';
import { TimezoneComponent } from './timezone-event.component';
import { ViewsComponent } from './views.component';
import { ViewConfigComponent } from './view-configuration.component';
import { MonthAgendaComponent } from './month-agenda.component';
import { LocalDataComponent } from './local-data.component';
import { RemoteDataComponent } from './remote-data.component';
import { AgendaComponent } from './agenda.component';
import { CellTemplateComponent } from './cell-template.component';
import { DateheaderTemplateComponent } from './date-header-template.component';
import { EventsTemplateComponent } from './events-template.component';
import { WorkDaysComponent } from './work-days.component';
import { HideWeekEndComponent } from './hide-weekend.component';
import { WorkHoursComponent } from './work-hours.component';
import { TimescaleComponent } from './time-scale.component';
import { AddRemoveResourcesComponent } from './add-remove-resources.component';
import { ExtendedViewsComponent } from './extended-views.component';
import { GroupByChildComponent } from './group-by-child.component';
import { GroupByDateComponent } from './group-by-date.component';
import { GroupCustomWorkDaysComponent } from './group-custom-work-days.component';
import { GroupEditingComponent } from './group-editing.component';
import { GroupComponent } from './resource-grouping.component';
import { ResourcesComponent } from './resources.component';
import { ResourceComponent } from './resource.component';
import { HeaderBarComponent } from './header-bar.component';
import { CellDimensionComponent } from './cell-dimension.component';
import { StartEndHourComponent } from './start-end-hour.component';
import { ReadOnlyComponent } from './read-only.component';
import { EditorCustomFieldComponent } from './editor-custom-field.component';
import { RecGeneraterComponent } from './recurrence-editor-generate-rule.component';
import { RecPopulateComponent } from './recurrence-editor-populate-rule.component';
import { EditTempComponent } from './editor-template.component';
import { ExternalDragDropComponent } from './external-drag-drop.component';
import { ScheduleContextMenuComponent } from './context-menu.component';
import { VirtualScrollingComponent } from './virtual-scrolling.component';
import { BlockEventsComponent } from './block-events.component';
import { SearchEventsComponent } from './search-events.component';
import { CalendarIntegrationComponent } from './calendar-integration.component';
import { AdaptiveRowsComponent } from './adaptive-rows.component';
import { ExcelExportComponent } from './excel-export.component';
import { CalendarExportImportComponent } from './calendar-export-import.component';
import { SharedModule } from '../common/shared.module';

export const scheduleRouteConfig: Object[] = [
  { 'path': ':theme/schedule/default', component: DefaultComponent, name: 'Default Functionalities', order: '01', category: 'Scheduler', description: 'This demo for Essential JS2 Scheduler control shows how the flat Scheduler looks like with its default set of minimal configurations.' },
  { 'path': ':theme/schedule/local-data', component: LocalDataComponent, name: 'Local Data', order: '02', category: 'Data Binding', description: 'This demo for Essential JS2 Scheduler control shows the way of binding an array of JavaScript objects (local JSON datasource).' },
  { 'path': ':theme/schedule/remote-data', component: RemoteDataComponent, name: 'Remote Data', order: '02', category: 'Data Binding', description: 'This demo for Essential JS2 Scheduler control shows the way of binding remote services by using the DataManager.' },
  { 'path': ':theme/schedule/calendar-integration', component: CalendarIntegrationComponent, name: 'Sync Google Calendar', order: '02', category: 'Appointments', description: 'This example shows how to integrate Google Calendar events into Angular Scheduler.' },
  { 'path': ':theme/schedule/recurrence-events', component: RecurrenceComponent, name: 'Recurring Events', order: '03', category: 'Appointments', description: 'This demo for Essential JS2 Scheduler control shows the scheduler with recurring meetings handled on a regular pattern.' },
  { 'path': ':theme/schedule/block-events', component: BlockEventsComponent, name: 'Blocking Dates and Time', order: '03', category: 'Appointments', description: 'This example shows how to block specific days or time intervals on Angular Scheduler.' },
  { 'path': ':theme/schedule/search-events', component: SearchEventsComponent, name: 'Search Events', type: 'new', order: '03', category: 'Appointments', description: 'This example shows how to search the scheduler events based on specific field criteria.' },
  { 'path': ':theme/schedule/timezone-event', component: TimezoneComponent, name: 'Timezone', order: '03', category: 'Appointments', description: 'This demo for Essential JS2 Scheduler control shows how the events are displayed in different timings as per the selected timezone.' },
  { 'path': ':theme/schedule/external-drag-drop', component: ExternalDragDropComponent, name: 'External Drag and Drop', order: '03', category: 'Appointments', description: 'This example shows how to drag and drop the events from an external source into Angular scheduler.' },
  { 'path': ':theme/schedule/virtual-scrolling', component: VirtualScrollingComponent, name: 'Virtual Scrolling', order: '04', category: 'Scrolling', hideOnDevice: true, description: 'This example illustrates how to enable the virtual loading of resources and its events in Angular Scheduler.' },
  { 'path': ':theme/schedule/views', component: ViewsComponent, name: 'Basic Views ', order: '05', category: 'Views', description: 'This demo for Essential JS2 Scheduler control shows the usage of basic views such as Day, Week, Work Week and Month.' },
  { 'path': ':theme/schedule/timeline', component: TimelineComponent, name: 'Timeline Views ', order: '05', category: 'Views', description: 'This demo for Essential JS2 Scheduler control shows how the timeline scheduler looks like with its default set of configurations.' },
  { 'path': ':theme/schedule/agenda', component: AgendaComponent, name: 'Agenda View', order: '05', category: 'Views', description: 'This demo for Essential JS2 Scheduler control shows the agenda view and the configurations available in it.' },
  { 'path': ':theme/schedule/month-agenda', component: MonthAgendaComponent, name: 'Month Agenda View', order: '05', category: 'Views', description: 'This demo for Essential JS2 Scheduler control shows the layout of Month Agenda view and how it works.' },
  { 'path': ':theme/schedule/view-configuration', component: ViewConfigComponent, name: 'Individual View Settings', order: '05', category: 'Views', description: 'This demo for Essential JS2 Scheduler control shows how to customize each of the view with specific configurations.' },
  { 'path': ':theme/schedule/extended-views', component: ExtendedViewsComponent, name: 'View Intervals', order: '05', category: 'Views', description: '– This demo for Essential JS2 Scheduler control shows how to display n number of days, weeks and months on a single view.' },
  { 'path': ':theme/schedule/timeline-resource', component: TimelineResourcesComponent, name: 'Room Scheduler', order: '06', category: 'Multiple Resources', description: 'This demo for Essential JS2 Scheduler control shows how to design the room scheduling calendar and manage the events booked on a particular time interval.' },
  { 'path': ':theme/schedule/resources', component: ResourcesComponent, name: 'Fare Calendar', order: '06', category: 'Multiple Resources', description: 'This demo for Essential JS2 Scheduler control shows how to customize the scheduler to showcase it as an Airfare calendar.' },
  { 'path': ':theme/schedule/resource', component: ResourceComponent, name: 'Resources', type: 'new', order: '06', category: 'Multiple Resources', description: 'This example depicts how to show or hide the resource events on JavaScript Scheduler based on the resource selection.' },
  { 'path': ':theme/schedule/group-editing', component: GroupEditingComponent, name: 'Shared Events ', order: '06', category: 'Multiple Resources', description: 'This demo for Essential JS2 Scheduler control shows the usage of single event that are shared by multiple resources.' },
  { 'path': ':theme/schedule/group-custom-work-days', component: GroupCustomWorkDaysComponent, name: 'Different Work Days', order: '06', category: 'Multiple Resources', description: 'This demo for Essential JS2 Scheduler control shows how to set different working days for each of the resources.' },
  { 'path': ':theme/schedule/add-remove-resources', component: AddRemoveResourcesComponent, name: 'Show/Hide Resources', order: '06', category: 'Multiple Resources', description: '- This demo for Essential JS2 Scheduler control shows how to dynamically add or remove the resources to and from the scheduler layout.' },
  { 'path': ':theme/schedule/adaptive-rows', component: AdaptiveRowsComponent, name: 'Row Auto Height', type: 'new', order: '06', category: 'Multiple Resources', description: 'This example showcases how the work cells of Essential JS2 Scheduler auto adjusts its height based on the exceeding appointment count.' },
  { 'path': ':theme/schedule/resource-grouping', component: GroupComponent, name: 'Horizontal Grouping', order: '07', category: 'Resource Grouping', description: 'This demo for Essential JS2 Scheduler control shows how the calendars of multiple resources are grouped in default view layouts.' },
  { 'path': ':theme/schedule/timeline-resource-grouping', component: TimelineResourceGroupingComponent, name: 'Timeline Grouping ', order: '07', category: 'Resource Grouping', description: 'This demo for Essential JS2 Scheduler control shows how the calendars of multiple resources are grouped in timeline view layouts.' },
  { 'path': ':theme/schedule/group-by-date', component: GroupByDateComponent, name: 'Date-wise Grouping  ', order: '07', category: 'Resource Grouping', description: 'This demo for Essential JS2 Scheduler control shows how the resources are grouped under each date.' },
  { 'path': ':theme/schedule/group-by-child', component: GroupByChildComponent, name: 'Hierarchical Grouping ', order: '07', category: 'Resource Grouping', description: 'This demo for Essential JS2 Scheduler control shows how to group the child level resources against each of the parent level resources.' },
  { 'path': ':theme/schedule/cell-template', component: CellTemplateComponent, name: 'Cell', order: '08', category: 'Template', description: 'This demo for Essential JS2 Scheduler control shows how to customize the background of the specific cells using cell template option.' },
  { 'path': ':theme/schedule/date-header-template', component: DateheaderTemplateComponent, name: 'Date Header', order: '08', category: 'Template', description: 'This demo for Essential JS2 Scheduler control shows how to customize the date header cells using the template option.' },
  { 'path': ':theme/schedule/events-template', component: EventsTemplateComponent, name: 'Events', order: '08', category: 'Template', description: 'This demo for Essential JS2 Scheduler control shows how to customize the appearance of events using event template option.' },
  { 'path': ':theme/schedule/tooltip', component: TooltipComponent, name: 'Tooltip', order: '08', category: 'Template', description: 'This demo for Essential JS2 Scheduler control shows how to display tooltip over events as well as the way to customize it using template option.' },
  { 'path': ':theme/schedule/editor-validation', component: EditorValidationComponent, name: 'Field Validation', order: '09', category: 'Editor Window', description: '- This demo for Essential JS2 Scheduler control shows the way of adding default and custom validation rules to the editor fields of scheduler.' },
  { 'path': ':theme/schedule/editor-custom-field', component: EditorCustomFieldComponent, name: 'Additional Fields', order: '09', category: 'Editor Window', description: 'This demo for Essential JS2 Scheduler control shows how to add additional fields to the default editor window.' },
  { 'path': ':theme/schedule/editor-template', component: EditTempComponent, name: 'Editor Template', order: '09', category: 'Editor Window', description: 'This demo for Essential JS2 Scheduler control shows the way of customizing the default editor window with custom template design.' },
  { 'path': ':theme/schedule/header-rows', component: HeaderRowsComponent, name: 'Header Rows ', order: '10', category: 'Customization', description: 'This demo for Essential JS2 Scheduler control shows how to display the additional header rows on timeline view.' },
  { 'path': ':theme/schedule/time-scale', component: TimescaleComponent, name: 'Timescale', order: '10', category: 'Customization', description: 'This demo for Essential JS2 Scheduler control shows how to customize the grid lines of scheduler with different duration and count.' },
  { 'path': ':theme/schedule/context-menu', component: ScheduleContextMenuComponent, name: 'Context Menu', order: '10', category: 'Customization', description: 'This example shows how to enable the context menu on Angular Scheduler and perform the related actions using menu options.' },
  { 'path': ':theme/schedule/header-bar', component: HeaderBarComponent, name: 'Header Bar', order: '10', category: 'Customization', description: 'This demo for Essential JS2 Scheduler control shows the way of adding custom items onto the scheduler header bar.' },
  { 'path': ':theme/schedule/scroll-to', component: ScrollTimeComponent, name: 'Scroll Time', order: '10', category: 'Customization', description: 'This demo for Essential JS2 Scheduler control shows the way of manually scrolling to specific time on scheduler.' },
  { 'path': ':theme/schedule/work-days', component: WorkDaysComponent, name: 'Work Days', order: '10', category: 'Customization', description: 'This demo for Essential JS2 Scheduler control showcases how to set customized working days as well as first day of a week on scheduler.' },
  { 'path': ':theme/schedule/hide-weekend', component: HideWeekEndComponent, name: 'Hide Non-Working Days', order: '10', category: 'Customization', description: 'This demo for Essential JS2 Scheduler control depicts the way to show or hide the weekend days of a week.' },
  { 'path': ':theme/schedule/work-hours', component: WorkHoursComponent, name: 'Work Hours', order: '10', category: 'Customization', description: 'This demo for Essential JS2 Scheduler control showcases how to set the work hour range on scheduler.' },
  { 'path': ':theme/schedule/start-end-hour', component: StartEndHourComponent, name: 'Day Hour Limit', order: '10', category: 'Customization', description: 'This demo for Essential JS2 Scheduler control depicts how to restrict the start and end hours on scheduler.' },
  { 'path': ':theme/schedule/cell-dimension', component: CellDimensionComponent, name: 'Cell Dimension', order: '10', category: 'Customization', description: 'This demo for Essential JS2 Scheduler control shows how to set the width and height of the cells by overriding the default CSS classes.' },
  { 'path': ':theme/schedule/read-only', component: ReadOnlyComponent, name: 'Read-only Events', order: '10', category: 'Customization', description: 'This demo for Essential JS2 Scheduler control shows how to make specific events on the scheduler to be displayed in a read-only mode.' },
  { 'path': ':theme/schedule/excel-export', component: ExcelExportComponent, name: 'Excel Exporting', type: 'new', order: '13', category: 'Exporting', description: 'This example demonstrates how to export the Essential JS2 Scheduler events to the excel file format at client-side.' },
  { 'path': ':theme/schedule/calendar-export-import', component: CalendarExportImportComponent, name: 'Export and Import ICS', order: '13', category: 'Exporting', type: 'new', description: 'This example shows how to export the Scheduler events to a calendar file, and also how to import events from an .ics file into our Essential JS2 Scheduler.' },
  { 'path': ':theme/schedule/recurrence-editor-generate-rule', component: RecGeneraterComponent, name: 'Rule Generator', order: '11', category: 'Recurrence Editor', description: 'This demo for Essential JS2 Scheduler control showcases the recurrence rule generation based on the options selected from the recurrence editor.' },
  { 'path': ':theme/schedule/recurrence-editor-populate-rule', component: RecPopulateComponent, name: 'Populate Rule', order: '11', category: 'Recurrence Editor', description: 'This demo for Essential JS2 Scheduler control shows how to fill the recurrence editor fields with values based on the provided recurrence rule string.' },
  { 'path': ':theme/schedule/keyboard-interaction', component: KeyboardComponent, name: 'Keyboard Interaction', hideOnDevice: true, order: '12', category: 'Miscellaneous', description: 'This demo for Essential JS2 Scheduler control showcases the keyboard shortcuts available on scheduler.' },
  { 'path': ':theme/schedule/events', component: EventsComponent, name: 'Events', order: '12', category: 'Miscellaneous', description: 'This demo for Essential JS2 Scheduler control shows the client-side events that triggers on respective scheduler actions.' }
];

const declarations: Type<Object>[] = [
  AdaptiveRowsComponent, DefaultComponent, ScrollTimeComponent, TooltipComponent, EditorValidationComponent, KeyboardComponent,
  EventsComponent, BlockEventsComponent, SearchEventsComponent, RecurrenceComponent, TimezoneComponent, ViewsComponent,
  MonthAgendaComponent, ViewConfigComponent, AgendaComponent, LocalDataComponent, RemoteDataComponent, CellTemplateComponent,
  DateheaderTemplateComponent, EventsTemplateComponent, WorkDaysComponent, HideWeekEndComponent, HeaderBarComponent,
  CellDimensionComponent, StartEndHourComponent, EditorValidationComponent, EditorCustomFieldComponent, WorkHoursComponent,
  TimescaleComponent, ReadOnlyComponent, RecGeneraterComponent, RecPopulateComponent, EditTempComponent, GroupEditingComponent,
  GroupCustomWorkDaysComponent, GroupByDateComponent, GroupByChildComponent, ExtendedViewsComponent, ResourcesComponent, ResourceComponent,
  GroupComponent, AddRemoveResourcesComponent, TimelineComponent, TimelineResourceGroupingComponent, TimelineResourcesComponent,
  HeaderRowsComponent, ExternalDragDropComponent, ScheduleContextMenuComponent, VirtualScrollingComponent, CalendarIntegrationComponent,
  CalendarExportImportComponent, ExcelExportComponent
];

@NgModule({
  imports: [RouterModule.forChild(scheduleRouteConfig), CommonModule, HttpModule, ScheduleAllModule, RecurrenceEditorAllModule,
    NumericTextBoxAllModule, DatePickerAllModule, TimePickerAllModule, DateTimePickerAllModule, CheckBoxAllModule, ToolbarAllModule,
    DropDownListAllModule, ContextMenuAllModule, MaskedTextBoxModule, UploaderAllModule, MultiSelectAllModule, SharedModule],
  declarations: declarations,
  providers: [ScheduleAllModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ScheduleSampleModule { }
