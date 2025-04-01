import { NgModule, Type, CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ScheduleAllModule, RecurrenceEditorAllModule } from '@syncfusion/ej2-angular-schedule';
import { NumericTextBoxAllModule, TextBoxAllModule } from '@syncfusion/ej2-angular-inputs';
import { DatePickerAllModule, TimePickerAllModule, DateTimePickerAllModule } from '@syncfusion/ej2-angular-calendars';
import { ButtonAllModule, CheckBoxAllModule, SwitchAllModule } from '@syncfusion/ej2-angular-buttons';
import { ToolbarAllModule, ContextMenuAllModule, AppBarModule } from '@syncfusion/ej2-angular-navigations';
import { MaskedTextBoxModule, UploaderAllModule } from '@syncfusion/ej2-angular-inputs';
import { DropDownListAllModule, MultiSelectAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';
import { DropDownButtonAllModule } from '@syncfusion/ej2-angular-splitbuttons';
import { ToastAllModule } from '@syncfusion/ej2-angular-notifications';
import { DefaultComponent } from './default.component';
import { TimelineComponent } from './timeline.component';
import { TimelineResourcesComponent } from './timeline-resource.component';
import { TimelineResourceGroupingComponent } from './timeline-resource-grouping.component';
import { HolidayCalendarComponent } from './holiday-calendar.component';
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
import { DataVirtualizationComponent } from './data-virtualization.component';
import { BlockEventsComponent } from './block-events.component';
import { SearchEventsComponent } from './search-events.component';
import { CalendarIntegrationComponent } from './calendar-integration.component';
import { AdaptiveRowsComponent } from './adaptive-rows.component';
import { ExcelExportComponent } from './excel-export.component';
import { CalendarExportImportComponent } from './calendar-export-import.component';
import { PrintComponent } from './print.component';
import { YearComponent } from './year.component';
import { InlineEditingComponent } from './inline-editing.component';
import { OverlapEventsComponent } from './overlap-events.component';
import { QuickInfoTemplateComponent } from './quick-info-template.component';
import { OverviewComponent } from './overview.component';
import { MultipleSchedulerComponent } from './schedule-to-schedule.component';
import { EventsGridFromScheduleComponent } from './grid-to-schedule.component';
import { MultiDragComponent } from './multi-drag.component';
import { AdaptiveGroupingComponent } from './adaptive-grouping.component';
import { RealTimeBindingComponent } from './realtime-binding.component';
import { ReminderComponent } from './reminder.component';
import { CustomMonthViewComponent } from './custom-month-view.component';
import { ReactiveFormsComponent } from './reactive-forms.component';
import { EventCalendarComponent } from './event-calendar.component';
import { ClipboardComponent } from './clipboard.component';

// tslint:disable:max-line-length
export const scheduleRouteConfig: Record<string, any>[] = [
  { path: ':theme/schedule/overview', component: OverviewComponent, name: 'Overview', order: '01', category: 'Scheduler', description: 'This example demonstrates the overview functionalities in Angular Scheduler Component.' },
  { path: ':theme/schedule/default', component: DefaultComponent, name: 'Default Functionalities', order: '01', category: 'Scheduler', description: 'This demo shows how the Scheduler control functionalities work with the default set of minimal configurations in a Angular application.' },
  { path: ':theme/schedule/event-calendar', component: EventCalendarComponent, name: 'Event Calendar', order: '15', category: 'Product Use Case', description: 'This demo shows the way to organize and filter multiple types of events such as Personal, Birthdays, Work, and Holidays in the Angular scheduler.' },
  { path: ':theme/schedule/holiday-calendar', component: HolidayCalendarComponent, name: 'Holiday Calendar', order: '15', category: 'Product Use Case', description: 'This demo illustrates how to add and remove holiday events and perform CRUD operations on holiday dates in the Angular scheduler.' },
  { path: ':theme/schedule/local-data', component: LocalDataComponent, name: 'Local Data', order: '02', category: 'Data Binding', description: 'This demo shows how to populate appointments in the Angular Scheduler through local data sources like JSON data types with the proper date format.' },
  { path: ':theme/schedule/remote-data', component: RemoteDataComponent, name: 'Remote Data', order: '02', category: 'Data Binding', description: 'This demo shows how to populate appointments or events in the Angular Scheduler through remote data sources such as web services, web API, URL, and OData.' },
  { path: ':theme/schedule/calendar-integration', component: CalendarIntegrationComponent, name: 'Sync Google Calendar', order: '02', category: 'Appointments', description: 'This example shows how to synchronously work with Angular Scheduler and Google Calendar by converting Scheduler events to the required format.' },
  { path: ':theme/schedule/realtime-binding', component: RealTimeBindingComponent, name: 'Real-Time Binding', order: '02', category: 'Appointments', description: 'This demo showcases the way of binding signalR services to Scheduler component. Here, the SignalR is used to bind the data with Scheduler.' },
  { path: ':theme/schedule/recurrence-events', component: RecurrenceComponent, name: 'Recurring Events', order: '03', category: 'Appointments', description: 'This demo shows how to define recurring events (appointments) with different patterns and rules that meet iCalendar specifications in the Angular Scheduler.' },
  { path: ':theme/schedule/block-events', component: BlockEventsComponent, name: 'Blocking Dates and Time', order: '03', category: 'Appointments', description: 'This example shows how to block specific days or time intervals on the Angular Scheduler that helps to mark unavailable time or days in Calendar. ' },
  { path: ':theme/schedule/search-events', component: SearchEventsComponent, name: 'Search Events', order: '03', category: 'Appointments', description: 'This example shows how to filter the appointments or events of the Angular Scheduler based on a search string in a particular field or all fields.' },
  { path: ':theme/schedule/timezone-event', component: TimezoneComponent, name: 'Timezone', order: '03', category: 'Appointments', description: 'This demo shows how the Angular Scheduler works with different time zones. The events in the Scheduler automatically adapt to the selected time zone.' },
  { path: ':theme/schedule/inline-editing', component: InlineEditingComponent, name: 'Inline Editing', order: '03', category: 'Appointments', description: 'The example showcases the inline mode of the Angular Scheduler that is used to create an appointment or edit an existing appointments subject easily and quickly.' },
  { path: ':theme/schedule/overlap-events', component: OverlapEventsComponent, name: 'Conflict Free Event', order: '03', category: 'Appointments', type: 'new', description: 'This demo explains how to restrict overlapping appointments within the same time range in Angular Scheduler.' },
  { path: ':theme/schedule/external-drag-drop', component: ExternalDragDropComponent, name: 'External Drag and Drop', order: '04', category: 'Drag and Drop', description: 'This demo shows the ability to drag and drop appointments from an external source (such as the DataGrid, ListView, etc.)  into the Angular Scheduler.' },
  { path: ':theme/schedule/multi-drag', component: MultiDragComponent, name: 'Multiple Events Drag', order: '04', category: 'Drag and Drop', description: 'This demo explains you about the ability to select multiple appointments and drag them simultaneously.' },
  { path: ':theme/schedule/schedule-to-schedule', component: MultipleSchedulerComponent, name: 'Multiple schedulers', order: '04', category: 'Drag and Drop', description: 'This example illustrates how to drag and drop events among multiple schedules. You can drag and drop events from one schedule to another in the Angular Scheduler.' },
  { path: ':theme/schedule/grid-to-schedule', component: EventsGridFromScheduleComponent, name: 'Drag Events From DataGrid', order: '04', category: 'Drag and Drop', description: 'This example illustrates how to drag and drop events between the DataGrid and the schedule. You can drag and drop events from the schedule to the DataGrid and from the DataGrid to in the Angular Scheduler.' },
  { path: ':theme/schedule/virtual-scrolling', component: VirtualScrollingComponent, name: 'Virtual Scrolling', order: '05', category: 'Scrolling', hideOnDevice: true, description: 'This example illustrates how to achieve high performance in the Angular Scheduler using virtual scrolling to load resources and events on demand.' },
  { path: ':theme/schedule/data-virtualization', component: DataVirtualizationComponent , name: 'Data Virtualization', order: '05', hideOnDevice: true, description: 'This example illustrates how to load events on demand in Angular Scheduler' },
  { path: ':theme/schedule/views', component: ViewsComponent, name: 'Basic Views ', order: '06', category: 'Views', description: 'This example demonstrates the basic views (day, week, workweek, and month) of the Angular Scheduler control with their default configurations.' },
  { path: ':theme/schedule/timeline', component: TimelineComponent, name: 'Timeline Views ', order: '06', category: 'Views', description: 'This example presents timeline views (day, week, workweek, and month) of the Angular Scheduler with their default configurations.' },
  { path: ':theme/schedule/agenda', component: AgendaComponent, name: 'Agenda View', order: '06', category: 'Views', description: 'This demo shows the agenda view of the Angular Schedule that displays events as a list with virtual scrolling, with a number of initially loaded days.' },
  { path: ':theme/schedule/month-agenda', component: MonthAgendaComponent, name: 'Month Agenda View', order: '06', category: 'Views', description: 'This demo presents the Angular Scheduler month-agenda view, which follows the month-view layout while displaying events for a selected date.' },
  { path: ':theme/schedule/year', component: YearComponent, name: 'Year View', order: '06', category: 'Views', description: 'This example presents a year view of the Angular Scheduler that displays appointments or events for an entire year with a horizontal or vertical layout.' },
  { path: ':theme/schedule/custom-month-view', component: CustomMonthViewComponent, name: 'Custom Month View', order: '06', category: 'Views', description: 'This example showcases how to customize the starting week, number of weeks, and number of events displayed in a single row in the Angular Scheduler month view.' },
  { path: ':theme/schedule/view-configuration', component: ViewConfigComponent, name: 'Individual View Settings', order: '06', category: 'Views', description: 'This demo shows how to configure different settings for each view in the Angular Scheduler, like applying event templates to the month view alone.' },
  { path: ':theme/schedule/extended-views', component: ExtendedViewsComponent, name: 'View Intervals', order: '06', category: 'Views', description: 'This demo shows how to design own custom views like 3 days, 2 weeks, 4 months apart from the default day, work week, month in Angular Event Scheduler.' },
  { path: ':theme/schedule/timeline-resource', component: TimelineResourcesComponent, name: 'Room Scheduler', order: '07', category: 'Multiple Resources', description: 'This demo shows how to design a meeting room calendar, conference room calendar, and cabin room manager using our Angular event calendar control.' },
  { path: ':theme/schedule/resources', component: ResourcesComponent, name: 'Fare Calendar', order: '07', category: 'Multiple Resources', description: 'This demo is a real-time airfare calendar showcase application with flight and airfare details using the Angular Scheduler control.' },
  { path: ':theme/schedule/resource', component: ResourceComponent, name: 'Resources', order: '07', category: 'Multiple Resources', description: 'This Angular Scheduler control example depicts how to show or hide appointments or events based on selected resources among multiple resources.' },
  { path: ':theme/schedule/group-editing', component: GroupEditingComponent, name: 'Shared Events ', order: '07', category: 'Multiple Resources', description: 'This demo presents event (appointment) sharing, which enables a single event to be shared by multiple resources in the Angular Scheduler event calendar.' },
  { path: ':theme/schedule/group-custom-work-days', component: GroupCustomWorkDaysComponent, name: 'Different Work Days', order: '07', category: 'Multiple Resources', description: 'This demo shows how to set different workdays for each resource in a group to build a doctor availability application in the Angular event calendar.' },
  { path: ':theme/schedule/add-remove-resources', component: AddRemoveResourcesComponent, name: 'Show/Hide Resources', order: '07', category: 'Multiple Resources', description: 'This demo shows how to dynamically add or remove resources from the Angular Scheduler layout along with their appointments (events).' },
  { path: ':theme/schedule/adaptive-rows', component: AdaptiveRowsComponent, name: 'Row Auto Height', order: '07', category: 'Multiple Resources', description: 'This demo shows how the work cells of the Angular Scheduler adjust their height automatically based on the number of events present in those time ranges.' },
  { path: ':theme/schedule/resource-grouping', component: GroupComponent, name: 'Horizontal Grouping', order: '08', category: 'Resource Grouping', description: 'This demo shows how to group multiple resources (e.g., airlines) in the Angular Scheduler. The resource header can be customized using a template.' },
  { path: ':theme/schedule/timeline-resource-grouping', component: TimelineResourceGroupingComponent, name: 'Timeline Grouping ', order: '08', category: 'Resource Grouping', description: 'This demo shows how to group multiple resources with timeline views in the Angular Schedule and how to display resources with expanded and collapsed headers.' },
  { path: ':theme/schedule/group-by-date', component: GroupByDateComponent, name: 'Date-wise Grouping  ', order: '08', category: 'Resource Grouping', description: 'This demo shows how to group multiple resources by date in the Angular Scheduler. The resource row is rendered under each date in the header.' },
  { path: ':theme/schedule/group-by-child', component: GroupByChildComponent, name: 'Hierarchical Grouping ', order: '08', category: 'Resource Grouping', description: 'This demo shows how to group resources in a hierarchical structure for parent-child resources in the Angular Scheduler control.' },
  { path: ':theme/schedule/adaptive-grouping', component: AdaptiveGroupingComponent, name: 'Adaptive Grouping', order: '08', category: 'Resource Grouping', description: 'This demo shows how to change the mode of the Schedule to Adaptive mode in the Angular Scheduler control.' },
  { path: ':theme/schedule/cell-template', component: CellTemplateComponent, name: 'Cell', order: '09', category: 'Template', description: 'This demo shows how to customize the default appearance of work cells with images, links, and coloring styles using cell templates in the Angular Scheduler.' },
  { path: ':theme/schedule/date-header-template', component: DateheaderTemplateComponent, name: 'Date Header', order: '09', category: 'Template', description: 'This demo shows how to customize the default appearance of date header cells with images and links using the template option in the Angular Scheduler.' },
  { path: ':theme/schedule/events-template', component: EventsTemplateComponent, name: 'Events', order: '09', category: 'Template', description: 'This demo shows how to customize the look and feel of appointments (events) in the Angular Scheduler with images and links by using an event template.' },
  { path: ':theme/schedule/tooltip', component: TooltipComponent, name: 'Tooltip', order: '09', category: 'Template', description: 'This demo shows how to enable tooltips (popovers) in Angular Scheduler appointments (events) and customize them using a tooltip template.' },
  { path: ':theme/schedule/quick-info-template', component: QuickInfoTemplateComponent, name: 'Quick Info Template', order: '09', category: 'Template', description: 'The example showcases the customized quick info popups for cells and events using the templates that help to override the built-in style in the Angular Scheduler.' },
  { path: ':theme/schedule/editor-validation', component: EditorValidationComponent, name: 'Field Validation', order: '10', category: 'Editor Window', description: 'This demo covers the Appointment field validation that adds default and custom validation rules to the editor fields of the Angular Scheduler.' },
  { path: ':theme/schedule/editor-custom-field', component: EditorCustomFieldComponent, name: 'Additional Fields', order: '10', category: 'Editor Window', description: 'This demo shows how to customize appointment editor (event window) with additional fields using pop-up open events in the Angular event calendar.' },
  { path: ':theme/schedule/editor-template', component: EditTempComponent, name: 'Editor Template', order: '10', category: 'Editor Window', description: 'This demo shows how to design custom appointment (event) editor windows by adding or removing fields from the Angular Scheduler appointment window.' },
  { path: ':theme/schedule/reactive-forms', component: ReactiveFormsComponent, name: 'Reactive Forms', order: '10', category: 'Editor Window', description: 'This demo shows about CRUD operations in Scheduler using the Reactive Angular Forms.' },
  { path: ':theme/schedule/header-rows', component: HeaderRowsComponent, name: 'Header Rows ', order: '11', category: 'Customization', description: 'This demo shows how to include additional header rows like week number and month number on the timeline view in the Angular event calendar.' },
  { path: ':theme/schedule/time-scale', component: TimescaleComponent, name: 'Timescale', order: '11', category: 'Customization', description: 'This demo shows how to customize the default timescale with interval, show/hide gridlines, slots count, and template in Angular Scheduler.' },
  { path: ':theme/schedule/context-menu', component: ScheduleContextMenuComponent, name: 'Context Menu', order: '11', category: 'Customization', description: 'This example shows how to integrate the context menu within the Angular Scheduler and control the related functionalities using menu options.' },
  { path: ':theme/schedule/header-bar', component: HeaderBarComponent, name: 'Header Bar', order: '11', category: 'Customization', description: 'This demo shows how to use templating to customize the header bar of the Angular Scheduler with images, links, styles, and other UI controls.' },
  { path: ':theme/schedule/scroll-to', component: ScrollTimeComponent, name: 'Scroll Time', order: '11', category: 'Customization', description: 'This example demonstrates how to scroll to a specific time programmatically based on the selected time in the Angular Scheduler control.' },
  { path: ':theme/schedule/work-days', component: WorkDaysComponent, name: 'Work Days', order: '11', category: 'Customization', description: 'This demo shows how to customize the workdays and the first day of the week to fit different work schedules in the Angular Scheduler.' },
  { path: ':theme/schedule/hide-weekend', component: HideWeekEndComponent, name: 'Hide Non-Working Days', order: '11', category: 'Customization', description: 'This demo shows how to show or hide weekend days in the Angular Scheduler, which is similar to the workweek view, but with customizable workdays.' },
  { path: ':theme/schedule/work-hours', component: WorkHoursComponent, name: 'Work Hours', order: '11', category: 'Customization', description: 'This demo shows how to customize the work hour range on the Angular Scheduler calendar, allowing business hours other than 9 AM to 6 PM.' },
  { path: ':theme/schedule/start-end-hour', component: StartEndHourComponent, name: 'Day Hour Limit', order: '11', category: 'Customization', description: 'This demo shows how to limit the start and end hours in the Angular Scheduler which is applicable for all views and used here to render business hours only.' },
  { path: ':theme/schedule/cell-dimension', component: CellDimensionComponent, name: 'Cell Dimension', order: '11', category: 'Customization', description: 'This demo shows how to change the default width and height of work cells, allowing the Angular Scheduler to be viewable zoomed in or zoomed out.' },
  { path: ':theme/schedule/read-only', component: ReadOnlyComponent, name: 'Read-only Events', order: '11', category: 'Customization', description: 'This demo shows how to make specific events in the Angular Scheduler read-only, making them viewable but not editable by end users.' },
  { path: ':theme/schedule/reminder', component: ReminderComponent, name: 'Reminder', order: '11', category: 'Customization', description: 'This demo showcases an event reminder notification that will be displayed after 5 seconds of sample getting loaded.' },
  { path: ':theme/schedule/excel-export', component: ExcelExportComponent, name: 'Excel Exporting', order: '14', category: 'Exporting', description: 'This example demonstrates how to export Angular Scheduler events (appointments) to the Microsoft Excel file format on the client side.' },
  { path: ':theme/schedule/calendar-export-import', component: CalendarExportImportComponent, name: 'Export and Import ICS', order: '14', category: 'Exporting', description: 'This demo shows how to handle exporting to ICS and importing from ICS in the Angular Scheduler. The ICS file must come from Google Calendar or MS Outlook.' },
  { path: ':theme/schedule/print', component: PrintComponent, name: 'Print', order: '14', category: 'Exporting', description: 'This sample demonstrates how to print all the appointments (events) in the Angular Scheduler on the client side using the Print Library.' },
  { path: ':theme/schedule/recurrence-editor-generate-rule', component: RecGeneraterComponent, name: 'Rule Generator', order: '12', category: 'Recurrence Editor', description: 'This demo showcases how to generate various recurrence pattern rules, such as daily, weekly, monthly, and yearly, using the Recurrence Editor.' },
  { path: ':theme/schedule/recurrence-editor-populate-rule', component: RecPopulateComponent, name: 'Populate Rule', order: '12', category: 'Recurrence Editor', description: 'This demo shows how to populate a predefined set of recurrence rules in the Recurrence Editor fields to help users create recurring events.' },
  { path: ':theme/schedule/clipboard', component: ClipboardComponent, name: 'Clipboard', order: '13', category: 'Miscellaneous', description: 'This demo showcases clipboard operations (cut, copy, and paste) with Scheduler events, along with a context menu for additional actions.'},
  { path: ':theme/schedule/keyboard-interaction', component: KeyboardComponent, name: 'Keyboard Interaction', hideOnDevice: true, order: '13', category: 'Miscellaneous', description: 'This demo showcases all the available keyboard shortcuts that help users perform actions using only the keyboard in the Angular Scheduler control.' },
  { path: ':theme/schedule/events', component: EventsComponent, name: 'Events', order: '13', category: 'Miscellaneous', description: 'This demo lists the client-side events triggered on Angular Scheduler actions in the Event Tracer. The Event Tracer also includes a Clear option.' }
];
// tslint:enable:max-line-length

export const ScheduleSampleModule: ModuleWithProviders<any> = RouterModule.forChild(scheduleRouteConfig);
