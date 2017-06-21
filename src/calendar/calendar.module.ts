import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CalendarModule } from '@syncfusion/ej2-ng-calendars';

import { DefaultCalendarComponent } from './default.component';
import { SpecialCalendarComponent } from './special.component';
import { DisabledCalendarComponent } from './disabled.component';
import { RangesCalendarComponent } from './range.component';
import { InternationalizationComponent } from './internationalization.component';
import { SharedModule } from '../common/shared.module';
export const calendarAppRoutes: Object[] = [
    { path: 'calendar/default', component: DefaultCalendarComponent, name: 'Default Functionalities', category: 'Calendar' },
    { path: 'calendar/special', component: SpecialCalendarComponent, name: 'Special Dates', category: 'Calendar' },
    { path: 'calendar/disabled', component: DisabledCalendarComponent, name: 'Disable Dates', category: 'Calendar' },
    { path: 'calendar/range', component: RangesCalendarComponent, name: 'Date Range', category: 'Calendar' },
    { path: 'calendar/internationalization', component: InternationalizationComponent, name: 'Internationalization', category: 'Calendar' }
];

export const CalendarRouter: ModuleWithProviders = RouterModule.forChild(calendarAppRoutes);

@NgModule({
    imports: [CalendarRouter, CalendarModule, SharedModule],
    declarations: [
        DefaultCalendarComponent,
        SpecialCalendarComponent,
        DisabledCalendarComponent,
        RangesCalendarComponent,
        InternationalizationComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CalendarSampleModule {
}