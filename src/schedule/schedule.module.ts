import { NgModule, Type, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { ScheduleAllModule, RecurrenceEditorAllModule } from '@syncfusion/ej2-angular-schedule';
import { NumericTextBoxAllModule } from '@syncfusion/ej2-angular-inputs';
import { DatePickerAllModule, TimePickerAllModule, DateTimePickerAllModule } from '@syncfusion/ej2-angular-calendars';
import { CheckBoxAllModule } from '@syncfusion/ej2-angular-buttons';
import { ToolbarAllModule } from '@syncfusion/ej2-angular-navigations';
import { MaskedTextBoxModule } from '@syncfusion/ej2-angular-inputs';
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
import { DefaultEventsComponent } from './default-events.component';
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
import { HeaderBarComponent } from './header-bar.component';
import { CellDimensionComponent } from './cell-dimension.component';
import { StartEndHourComponent } from './start-end-hour.component';
import { ReadOnlyComponent } from './read-only.component';
import { EditorCustomFieldComponent } from './editor-custom-field.component';
import { RecGeneraterComponent } from './recurrence-editor-generate-rule.component';
import { RecPopulateComponent } from './recurrence-editor-populate-rule.component';
import { EditTempComponent } from './editor-template.component';
import { SharedModule } from '../common/shared.module';


export const scheduleRouteConfig: Object[] = [
    { 'path': ':theme/schedule/default', component: DefaultComponent, name: 'Default Functionalities', order: '01', category: 'Schedule', description: 'This demo for Essential JS2 Schedule control shows how the flat Scheduler looks like with its default set of minimal configurations.' },
    { 'path': ':theme/schedule/local-data', component: LocalDataComponent, name: 'Local Data', order: '02', category: 'Data Binding', description: 'This demo for Essential JS2 Schedule control shows the way of binding an array of JavaScript objects (local JSON datasource).' },
    { 'path': ':theme/schedule/remote-data', component: RemoteDataComponent, name: 'Remote Data', order: '02', category: 'Data Binding', description: 'This demo for Essential JS2 Schedule control shows the way of binding remote services by using the DataManager.' },
    { 'path': ':theme/schedule/default-events', component: DefaultEventsComponent, name: 'Normal Events', order: '03', category: 'Appointments', description: 'This demo for Essential JS2 Schedule control shows the usage of different types of events such as normal, spanned and all-day.' },
    { 'path': ':theme/schedule/recurrence-events', component: RecurrenceComponent, name: 'Recurring Events', order: '03', category: 'Appointments', description: 'This demo for Essential JS2 Schedule control shows the scheduler with recurring meetings handled on a regular pattern.' },
    { 'path': ':theme/schedule/timezone-event', component: TimezoneComponent, name: 'Timezone', order: '03', category: 'Appointments', description: 'This demo for Essential JS2 Schedule control shows how the events are displayed in different timings as per the selected timezone.' },
    { 'path': ':theme/schedule/views', component: ViewsComponent, name: 'Basic Views ', order: '04', category: 'Views', description: 'This demo for Essential JS2 Schedule control shows the usage of basic views such as Day, Week, Work Week and Month.' },
    { 'path': ':theme/schedule/timeline', component: TimelineComponent, name: 'Timeline Views ', type: 'new', order: '04', category: 'Views', description: 'This demo for Essential JS2 Schedule control shows how the timeline scheduler looks like with its default set of configurations.' },
    { 'path': ':theme/schedule/agenda', component: AgendaComponent, name: 'Agenda View', order: '04', category: 'Views', description: 'This demo for Essential JS2 Schedule control shows the agenda view and the configurations available in it.' },
    { 'path': ':theme/schedule/month-agenda', component: MonthAgendaComponent, name: 'Month Agenda View', order: '04', category: 'Views', description: 'This demo for Essential JS2 Schedule control shows the layout of Month Agenda view and how it works.' },
    { 'path': ':theme/schedule/view-configuration', component: ViewConfigComponent, name: 'Individual View Settings', order: '04', category: 'Views', description: 'This demo for Essential JS2 Schedule control shows how to customize each of the view with specific configurations.' },
    { 'path': ':theme/schedule/extended-views', component: ExtendedViewsComponent, name: 'View Intervals', order: '04', category: 'Views', description: '– This demo for Essential JS2 Schedule control shows how to display n number of days, weeks and months on a single view.' },
    { 'path': ':theme/schedule/timeline-resource', component: TimelineResourcesComponent, name: 'Room Scheduler', type: 'new', order: '05', category: 'Multiple Resources', description: 'This demo for Essential JS2 Schedule control shows how to design the room scheduling calendar and manage the events booked on a particular time interval.' },
    { 'path': ':theme/schedule/resources', component: ResourcesComponent, name: 'Fare Calendar', order: '05', category: 'Multiple Resources', description: 'This demo for Essential JS2 Schedule control shows how to customize the scheduler to showcase it as an Airfare calendar.' },
    { 'path': ':theme/schedule/group-editing', component: GroupEditingComponent, name: 'Shared Events ', type: 'update', order: '05', category: 'Multiple Resources', description: 'This demo for Essential JS2 Schedule control shows the usage of single event that are shared by multiple resources.' },
    { 'path': ':theme/schedule/group-custom-work-days', component: GroupCustomWorkDaysComponent, name: 'Different Work Days', order: '05', category: 'Multiple Resources', description: 'This demo for Essential JS2 Schedule control shows how to set different working days for each of the resources.' },
    { 'path': ':theme/schedule/add-remove-resources', component: AddRemoveResourcesComponent, name: 'Show/Hide Resources', type: 'update', order: '05', category: 'Multiple Resources', description: '- This demo for Essential JS2 Schedule control shows how to dynamically add or remove the resources to and from the scheduler layout.' },
    { 'path': ':theme/schedule/group', component: GroupComponent, name: 'Horizontal Grouping', order: '06', category: 'Resource Grouping', description: 'This demo for Essential JS2 Schedule control shows how the calendars of multiple resources are grouped in default view layouts.' },
    { 'path': ':theme/schedule/timeline-resource-grouping', component: TimelineResourceGroupingComponent, name: 'Timeline Grouping ', type: 'new', order: '06', category: 'Resource Grouping', description: 'This demo for Essential JS2 Schedule control shows how the calendars of multiple resources are grouped in timeline view layouts.' },
    { 'path': ':theme/schedule/group-by-date', component: GroupByDateComponent, name: 'Date-wise Grouping  ', order: '06', category: 'Resource Grouping', description: 'This demo for Essential JS2 Schedule control shows how the resources are grouped under each date.' },
    { 'path': ':theme/schedule/group-by-child', component: GroupByChildComponent, name: 'Hierarchical Grouping ', order: '06', category: 'Resource Grouping', description: 'This demo for Essential JS2 Schedule control shows how to group the child level resources against each of the parent level resources.' },
    { 'path': ':theme/schedule/cell-template', component: CellTemplateComponent, name: 'Cell', order: '07', category: 'Template', description: 'This demo for Essential JS2 Schedule control shows how to customize the background of the specific cells using cell template option.' },
    { 'path': ':theme/schedule/date-header-template', component: DateheaderTemplateComponent, name: 'Date Header', type: 'update', order: '07', category: 'Template', description: 'This demo for Essential JS2 Schedule control shows how to customize the date header cells using the template option.' },
    { 'path': ':theme/schedule/events-template', component: EventsTemplateComponent, name: 'Events', type: 'update', order: '07', category: 'Template', description: 'This demo for Essential JS2 Schedule control shows how to customize the appearance of events using event template option.' },
    { 'path': ':theme/schedule/tooltip', component: TooltipComponent, name: 'Tooltip', order: '07', category: 'Template', description: 'This demo for Essential JS2 Schedule control shows how to display tooltip over events as well as the way to customize it using template option.' },
    { 'path': ':theme/schedule/editor-validation', component: EditorValidationComponent, name: 'Field Validation', order: '08', category: 'Editor Window', description: '- This demo for Essential JS2 Schedule control shows the way of adding default and custom validation rules to the editor fields of scheduler.' },
    { 'path': ':theme/schedule/editor-custom-field', component: EditorCustomFieldComponent, name: 'Additional Fields', order: '08', category: 'Editor Window', description: 'This demo for Essential JS2 Schedule control shows how to add additional fields to the default editor window.' },
    { 'path': ':theme/schedule/editor-template', component: EditTempComponent, name: 'Editor Template', order: '08', category: 'Editor Window', description: 'This demo for Essential JS2 Schedule control shows the way of customizing the default editor window with custom template design.' },
    { 'path': ':theme/schedule/header-rows', component: HeaderRowsComponent, name: 'Header Rows ', type: 'new', order: '09', category: 'Customization', description: 'This demo for Essential JS2 Schedule control shows how to display the additional header rows on timeline view.' },
    { 'path': ':theme/schedule/time-scale', component: TimescaleComponent, name: 'Timescale', type: 'update', order: '09', category: 'Customization', description: 'This demo for Essential JS2 Schedule control shows how to customize the grid lines of scheduler with different duration and count.' },
    { 'path': ':theme/schedule/header-bar', component: HeaderBarComponent, name: 'Header Bar', order: '09', category: 'Customization', description: 'This demo for Essential JS2 Schedule control shows the way of adding custom items onto the scheduler header bar.' },
    { 'path': ':theme/schedule/scroll-to', component: ScrollTimeComponent, name: 'Scroll Time', type: 'update', order: '09', category: 'Customization', description: 'This demo for Essential JS2 Schedule control shows the way of manually scrolling to specific time on scheduler.' },
    { 'path': ':theme/schedule/work-days', component: WorkDaysComponent, name: 'Work Days', type: 'update', order: '09', category: 'Customization', description: 'This demo for Essential JS2 Schedule control showcases how to set customized working days as well as first day of a week on scheduler.' },
    { 'path': ':theme/schedule/hide-weekend', component: HideWeekEndComponent, name: 'Hide Weekend', order: '09', category: 'Customization', description: 'This demo for Essential JS2 Schedule control depicts the way to show or hide the weekend days of a week.' },
    { 'path': ':theme/schedule/work-hours', component: WorkHoursComponent, name: 'Work Hours', type: 'update', order: '09', category: 'Customization', description: 'This demo for Essential JS2 Schedule control showcases how to set the work hour range on scheduler.' },
    { 'path': ':theme/schedule/start-end-hour', component: StartEndHourComponent, name: 'Day Hour Limit', type: 'update', order: '09', category: 'Customization', description: 'This demo for Essential JS2 Schedule control depicts how to restrict the start and end hours on scheduler.' },
    { 'path': ':theme/schedule/cell-dimension', component: CellDimensionComponent, name: 'Cell Dimension', order: '09', category: 'Customization', description: 'This demo for Essential JS2 Schedule control shows how to set the width and height of the cells by overriding the default CSS classes.' },
    { 'path': ':theme/schedule/read-only', component: ReadOnlyComponent, name: 'Read-only Events', order: '09', category: 'Customization', description: 'This demo for Essential JS2 Schedule control shows how to make specific events on the scheduler to be displayed in a read-only mode.' },
    { 'path': ':theme/schedule/recurrence-editor-generate-rule', component: RecGeneraterComponent, name: 'Rule Generator', order: '10', category: 'Recurrence Editor', description: 'This demo for Essential JS2 Schedule control showcases the recurrence rule generation based on the options selected from the recurrence editor.' },
    { 'path': ':theme/schedule/recurrence-editor-populate-rule', component: RecPopulateComponent, name: 'Populate Rule', order: '10', category: 'Recurrence Editor', description: 'This demo for Essential JS2 Schedule control shows how to fill the recurrence editor fields with values based on the provided recurrence rule string.' },
    { 'path': ':theme/schedule/keyboard-interaction', component: KeyboardComponent, name: 'Keyboard Interaction', order: '11', category: 'Miscellaneous', description: 'This demo for Essential JS2 Schedule control showcases the keyboard shortcuts available on scheduler.' },
    { 'path': ':theme/schedule/events', component: EventsComponent, name: 'Events', order: '11', category: 'Miscellaneous', description: 'This demo for Essential JS2 Schedule control shows the client-side events that triggers on respective scheduler actions.' },
];

let declarations: Type<Object>[] = [DefaultComponent, ScrollTimeComponent, TooltipComponent, EditorValidationComponent, KeyboardComponent, EventsComponent,
    DefaultEventsComponent, RecurrenceComponent, TimezoneComponent, ViewsComponent, MonthAgendaComponent, ViewConfigComponent, AgendaComponent,
    LocalDataComponent, RemoteDataComponent, CellTemplateComponent, DateheaderTemplateComponent, EventsTemplateComponent, WorkDaysComponent,
    HideWeekEndComponent, HeaderBarComponent, CellDimensionComponent, StartEndHourComponent, EditorValidationComponent, EditorCustomFieldComponent,
    WorkHoursComponent, TimescaleComponent, ReadOnlyComponent, RecGeneraterComponent, RecPopulateComponent, EditTempComponent,
    GroupEditingComponent, GroupCustomWorkDaysComponent, GroupByDateComponent, GroupByChildComponent, ExtendedViewsComponent,
    ResourcesComponent, GroupComponent, AddRemoveResourcesComponent, TimelineComponent, TimelineResourceGroupingComponent, TimelineResourcesComponent, HeaderRowsComponent];

@NgModule({
    imports: [RouterModule.forChild(scheduleRouteConfig), CommonModule, HttpModule, ScheduleAllModule, RecurrenceEditorAllModule, NumericTextBoxAllModule,
        DatePickerAllModule, TimePickerAllModule, DateTimePickerAllModule, CheckBoxAllModule, ToolbarAllModule, DropDownListAllModule,
        MaskedTextBoxModule, MultiSelectAllModule, SharedModule],
    declarations: declarations,
    providers: [ScheduleAllModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ScheduleSampleModule { }
