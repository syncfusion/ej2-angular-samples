import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DefaultDateTimePickerComponent } from './default.component';
import { SpecialDateTimePickerComponent } from './special-dates.component';
import { DisabledDateTimePickerComponent } from './disabled.component';
import { RangeDateTimePickerComponent } from './date-time-range.component';
import { FormatDateTimePickerComponent } from './date-time-format.component';
import { ReactiveFormDateTimePickerComponent } from './reactiveform.component';

export const dateTimePickerAppRoutes: Object[] = [
    { path: ':theme/datetimepicker/default', component: DefaultDateTimePickerComponent, name: 'Default Functionalities', category: 'DateTimePicker' },
    { path: ':theme/datetimepicker/date-time-range', component: RangeDateTimePickerComponent, name: 'Date Range', category: 'DateTimePicker' },
    { path: ':theme/datetimepicker/date-time-format', component: FormatDateTimePickerComponent, name: 'Format', category: 'DateTimePicker' },
    { path: ':theme/datetimepicker/special-dates', component: SpecialDateTimePickerComponent, name: 'Special Dates', category: 'DateTimePicker' },
    { path: ':theme/datetimepicker/disabled', component: DisabledDateTimePickerComponent, name: 'Disable Dates', category: 'DateTimePicker' },
    {
        path: ':theme/datetimepicker/reactiveform', component: ReactiveFormDateTimePickerComponent, name: 'Reactive', order: '02',
        category: 'Forms Support'
    }

];

export const DateTimePickerRouter: ModuleWithProviders = RouterModule.forChild(dateTimePickerAppRoutes);

@NgModule({
    imports: [DateTimePickerRouter, DateTimePickerModule, BrowserModule, DropDownListModule, FormsModule, ReactiveFormsModule],
    declarations: [
        DefaultDateTimePickerComponent,
        SpecialDateTimePickerComponent,
        DisabledDateTimePickerComponent,
        RangeDateTimePickerComponent,
        FormatDateTimePickerComponent,
        ReactiveFormDateTimePickerComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DateTimePickerSampleModule {
}