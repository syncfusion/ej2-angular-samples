import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CalendarModule, IslamicService } from '@syncfusion/ej2-angular-calendars';
import { DefaultCalendarComponent } from './default.component';
import { SpecialCalendarComponent } from './special-dates.component';
import { DisabledCalendarComponent } from './disabled.component';
import { RangesCalendarComponent } from './date-range.component';
import { MultiSelectionComponent } from './multi-select.component';
import { IslamicCalendarComponent } from './islamic-calendar.component';
import {MonthPickerComponent} from './month-picker.component';

import { SharedModule } from '../common/shared.module';
export const calendarAppRoutes: Object[] = [
    { path: ':theme/calendar/default', component: DefaultCalendarComponent, name: 'Default Functionalities', description: 'Angular Calendar component with two way binding support to select date easily by switching between Month, Year and Decade views with rich user interface', category: 'Calendar' },
    { path: ':theme/calendar/special-dates', component: SpecialCalendarComponent, name: 'Special Dates', description: 'Calendar forAngular to highlight multiple dates like weekends, holidays, events or a range of days with options to add custom styles and/or description', category: 'Calendar' },
    { path: ':theme/calendar/disabled', component: DisabledCalendarComponent, name: 'Disable Dates', description: 'Customizable Calendar widget for Angular with disabled dates to restrict the user from selecting a defined set of dates by disabling its UI interaction', category: 'Calendar' },
    { path: ':theme/calendar/date-range', component: RangesCalendarComponent, name: 'Date Range', description: 'Calendar directive for Angular with min and max date that restrics the user from selecting date within a defined range like weekends, range of dates etc', category: 'Calendar' },
    { path: ':theme/calendar/multi-select', component: MultiSelectionComponent, name: 'Multiple Selection', description: 'A Simple Calendar directive for Angular with multiple date selection feature that allows user to select more than one date as random or range  of dates', category: 'Calendar' },
    { path: ':theme/calendar/month-picker', component: MonthPickerComponent, name: 'Month Picker', type :'new', description:'The Angular Calendar component can act as a month and year picker. It helps you to select a month or year quickly with all month related properties', category: 'Calendar' },
    { path: ':theme/calendar/islamic-calendar', component: IslamicCalendarComponent, name: 'Islamic Calendar' , category: 'Calendar' }
];

export const CalendarRouter: ModuleWithProviders = RouterModule.forChild(calendarAppRoutes);

@NgModule({
    imports: [CalendarRouter, CalendarModule, SharedModule],
    declarations: [
        DefaultCalendarComponent,
        SpecialCalendarComponent,
        DisabledCalendarComponent,
        RangesCalendarComponent,
        MultiSelectionComponent,
        MonthPickerComponent,
        IslamicCalendarComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [IslamicService]
})
export class CalendarSampleModule {
}