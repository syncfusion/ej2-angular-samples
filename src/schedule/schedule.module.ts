import { NgModule, Type, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { ScheduleAllModule, RecurrenceEditorAllModule } from '@syncfusion/ej2-ng-schedule';
import { NumericTextBoxAllModule } from '@syncfusion/ej2-ng-inputs';
import { DatePickerAllModule, TimePickerAllModule, DateTimePickerAllModule } from '@syncfusion/ej2-ng-calendars';
import { CheckBoxAllModule } from '@syncfusion/ej2-ng-buttons';
import { ToolbarAllModule } from '@syncfusion/ej2-ng-navigations';
import { MaskedTextBoxModule } from '@syncfusion/ej2-ng-inputs';
import { DropDownListAllModule, MultiSelectAllModule } from '@syncfusion/ej2-ng-dropdowns';


import { DefaultComponent } from './default.component';
import { ScrollTimeComponent } from './scroll-time.component';
import { EditorValidationComponent } from './editor-validation.component';
import { TooltipComponent } from './tooltip.component';
import { KeyboardComponent } from './keyboard.component';
import { EventsComponent } from './events.component';
import { DefaultEventsComponent } from './default-events.component';
import { RecurrenceComponent } from './recurrence-events.component';
import { TimezoneComponent } from './timezone-event.component';
import { ViewsComponent } from './views.component';
import { ViewConfigComponent } from './view-config.component';
import { MonthAgendaComponent } from './month-agenda.component';
import { LocalDataComponent } from './local-data.component';
import { RemoteDataComponent } from './remote-data.component';
import { AgendaComponent } from './agenda.component';
import { CellTemplateComponent } from './cell-template.component';
import { DateheaderTemplateComponent } from './dateheader-template.component';
import { EventsTemplateComponent } from './events-template.component';
import { WorkDaysComponent } from './work-days.component';
import { HideWeekEndComponent } from './hide-weekend.component';
import { WorkHoursComponent } from './work-hours.component';
import { HeaderBarComponent } from './header-bar.component';
import { CellDimensionComponent } from './cell-dimension.component';
import { StartEndHourComponent } from './start-end-hour.component';
import { ReadOnlyComponent } from './readonly.component';
import { EditorCustomFieldComponent } from './editor-custom-field.component';
import { RecGeneraterComponent } from './rec-editor-generaterule.component';
import { RecPopulateComponent } from './recurrence-editor-populate.component';
import { EditTempComponent } from './editor-template.component';
import { SharedModule } from '../common/shared.module';


export const scheduleRouteConfig: Object[] = [
    { 'path': ':theme/schedule/default', component: DefaultComponent, name: 'Default Functionalities', order: '01', category: 'Schedule' },
    { 'path': ':theme/schedule/default-events', component: DefaultEventsComponent, name: 'Normal', order: '02', category: 'Appointments' },
    { 'path': ':theme/schedule/recurrence-events', component: RecurrenceComponent, name: 'Recurrence', order: '02', category: 'Appointments' },
    { 'path': ':theme/schedule/timezone-event', component: TimezoneComponent, name: 'Timezone', order: '02', category: 'Appointments' },
    { 'path': ':theme/schedule/views', component: ViewsComponent, name: 'Basic', order: '03', category: 'Views' },
    { 'path': ':theme/schedule/agenda', component: AgendaComponent, name: 'Agenda', order: '03', category: 'Views' },
    { 'path': ':theme/schedule/month-agenda', component: MonthAgendaComponent, name: 'Month Agenda', order: '03', category: 'Views' },
    { 'path': ':theme/schedule/view-config', component: ViewConfigComponent, name: 'View-based Settings', order: '03', category: 'Views' },
    { 'path': ':theme/schedule/local-data', component: LocalDataComponent, name: 'Local Data', order: '04', category: 'Data Binding' },
    { 'path': ':theme/schedule/remote-data', component: RemoteDataComponent, name: 'Remote Data', order: '04', category: 'Data Binding' },
    { 'path': ':theme/schedule/cell-template', component: CellTemplateComponent, name: 'Cells', order: '05', category: 'Template' },
    { 'path': ':theme/schedule/dateheader-template', component: DateheaderTemplateComponent, name: 'Date Header', order: '05', category: 'Template' },
    { 'path': ':theme/schedule/events-template', component: EventsTemplateComponent, name: 'Events', order: '05', category: 'Template' },
    { 'path': ':theme/schedule/tooltip', component: TooltipComponent, name: 'Tooltip', order: '05', category: 'Template' },
    { 'path': ':theme/schedule/editor-validation', component: EditorValidationComponent, name: 'Field Validation', order: '06', category: 'Editor' },
    { 'path': ':theme/schedule/editor-custom-field', component: EditorCustomFieldComponent, name: 'Additional Fields', order: '06', category: 'Editor' },
    { 'path': ':theme/schedule/editor-template', component: EditTempComponent, name: 'Editor Template', order: '06', category: 'Editor' },
    { 'path': ':theme/schedule/header-bar', component: HeaderBarComponent, name: 'Header Bar', order: '07', category: 'Customization' },
    { 'path': ':theme/schedule/scroll-time', component: ScrollTimeComponent, name: 'Scroll Time', order: '07', category: 'Customization' },
    { 'path': ':theme/schedule/work-days', component: WorkDaysComponent, name: 'Work Days', order: '07', category: 'Customization' },
    { 'path': ':theme/schedule/hide-weekend', component: HideWeekEndComponent, name: 'Hide Weekend', order: '07', category: 'Customization' },
    { 'path': ':theme/schedule/work-hours', component: WorkHoursComponent, name: 'Work Hours', order: '07', category: 'Customization' },
    { 'path': ':theme/schedule/start-end-hour', component: StartEndHourComponent, name: 'Day Hour Limit', order: '07', category: 'Customization' },
    { 'path': ':theme/schedule/cell-dimension', component: CellDimensionComponent, name: 'Cell Dimension', order: '07', category: 'Customization' },
    { 'path': ':theme/schedule/readonly', component: ReadOnlyComponent, name: 'Readonly Events', order: '07', category: 'Customization' },
    { 'path': ':theme/schedule/rec-editor-generaterule', component: RecGeneraterComponent, name: 'Rule Generator', order: '08', category: 'Recurrence Editor' },
    { 'path': ':theme/schedule/recurrence-editor-populate', component: RecPopulateComponent, name: 'Populate Rule', order: '08', category: 'Recurrence Editor' },
    { 'path': ':theme/schedule/keyboard', component: KeyboardComponent, name: 'Keyboard Interaction', order: '09', category: 'Miscellaneous' },
    { 'path': ':theme/schedule/events', component: EventsComponent, name: 'Events', order: '09', category: 'Miscellaneous' },
];

let declarations: Type<Object>[] = [DefaultComponent, ScrollTimeComponent, TooltipComponent, EditorValidationComponent, KeyboardComponent, EventsComponent,
    DefaultEventsComponent, RecurrenceComponent, TimezoneComponent, ViewsComponent, MonthAgendaComponent, ViewConfigComponent, AgendaComponent,
    LocalDataComponent, RemoteDataComponent, CellTemplateComponent, DateheaderTemplateComponent, EventsTemplateComponent, WorkDaysComponent,
    HideWeekEndComponent, HeaderBarComponent, CellDimensionComponent, StartEndHourComponent, EditorValidationComponent, EditorCustomFieldComponent,
    WorkHoursComponent, ReadOnlyComponent, RecGeneraterComponent, RecPopulateComponent, EditTempComponent];

@NgModule({
    imports: [RouterModule.forChild(scheduleRouteConfig), CommonModule, HttpModule, ScheduleAllModule, RecurrenceEditorAllModule, NumericTextBoxAllModule,
        DatePickerAllModule, TimePickerAllModule, DateTimePickerAllModule, CheckBoxAllModule, ToolbarAllModule, DropDownListAllModule,
        MaskedTextBoxModule, MultiSelectAllModule, SharedModule],
    declarations: declarations,
    providers: [ScheduleAllModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ScheduleSampleModule { }
