import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CalendarModule, IslamicService } from '@syncfusion/ej2-angular-calendars';
import { DefaultCalendarComponent } from './default.component';
import { SpecialCalendarComponent } from './special-dates.component';
import { DisabledCalendarComponent } from './disabled.component';
import { RangesCalendarComponent } from './date-range.component';
import { MultiSelectionComponent } from './multi-select.component';
import { IslamicCalendarComponent } from './islamic-calendar.component';

import { SharedModule } from '../common/shared.module';
export const calendarAppRoutes: Object[] = [
    { path: ':theme/calendar/default', component: DefaultCalendarComponent, name: 'Default Functionalities', category: 'Calendar' },
    { path: ':theme/calendar/special-dates', component: SpecialCalendarComponent, name: 'Special Dates', category: 'Calendar' },
    { path: ':theme/calendar/disabled', component: DisabledCalendarComponent, name: 'Disable Dates', category: 'Calendar' },
    { path: ':theme/calendar/date-range', component: RangesCalendarComponent, name: 'Date Range', category: 'Calendar' },
    { path: ':theme/calendar/multi-select', component: MultiSelectionComponent, name: 'Multiple Selection', category: 'Calendar' },
    { path: ':theme/calendar/islamic-calendar', component: IslamicCalendarComponent, name: 'Islamic Calendar', type :'new', category: 'Calendar' }
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
        IslamicCalendarComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [IslamicService]
})
export class CalendarSampleModule {
}