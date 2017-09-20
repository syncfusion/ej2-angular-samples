import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DatePickerModule } from '@syncfusion/ej2-ng-calendars';

import { DefaultDatePickerComponent } from './default.component';
import { SpecialDatePickerComponent } from './special.component';
import { DisabledDatePickerComponent } from './disabled.component';
import { RangeDatePickerComponent } from './range.component';
import { FormatDatePickerComponent } from './format.component';
import { GlobalizationComponent } from './globalization.component';

export const datePickerAppRoutes: Object[] = [
    { path: ':theme/datepicker/default', component: DefaultDatePickerComponent, name: 'Default Functionalities', category: 'DatePicker' },
    { path: ':theme/datepicker/range', component: RangeDatePickerComponent, name: 'Date Range', category: 'DatePicker' },
    { path: ':theme/datepicker/format', component: FormatDatePickerComponent, name: 'Date Format', category: 'DatePicker' },
    { path: ':theme/datepicker/special', component: SpecialDatePickerComponent, name: 'Special Dates', category: 'DatePicker' },
    { path: ':theme/datepicker/disabled', component: DisabledDatePickerComponent, name: 'Disable Dates', category: 'DatePicker' },
    { path: ':theme/datepicker/globalization', component: GlobalizationComponent, name: 'Globalization', category: 'DatePicker' }
];

export const DatePickerRouter: ModuleWithProviders = RouterModule.forChild(datePickerAppRoutes);

@NgModule({
    imports: [DatePickerRouter, DatePickerModule],
    declarations: [
        DefaultDatePickerComponent,
        SpecialDatePickerComponent,
        DisabledDatePickerComponent,
        RangeDatePickerComponent,
        FormatDatePickerComponent,
        GlobalizationComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DatePickerSampleModule {
}