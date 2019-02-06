import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { BrowserModule } from '@angular/platform-browser';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DefaultDatePickerComponent } from './default.component';
import { SpecialDatePickerComponent } from './special-dates.component';
import { DisabledDatePickerComponent } from './disabled.component';
import { RangeDatePickerComponent } from './date-range.component';
import { FormatDatePickerComponent } from './date-format.component';
import { ReactiveFormDatePickerComponent } from './reactiveform.component';

export const datePickerAppRoutes: Object[] = [
    { path: ':theme/datepicker/default', component: DefaultDatePickerComponent, name: 'Default Functionalities', category: 'DatePicker' },
    { path: ':theme/datepicker/date-range', component: RangeDatePickerComponent, name: 'Date Range', category: 'DatePicker' },
    { path: ':theme/datepicker/date-format', component: FormatDatePickerComponent, name: 'Format', category: 'DatePicker' },
    { path: ':theme/datepicker/special-dates', component: SpecialDatePickerComponent, name: 'Special Dates', category: 'DatePicker' },
    { path: ':theme/datepicker/disabled', component: DisabledDatePickerComponent, name: 'Disable Dates', category: 'DatePicker' },
    { path: ':theme/datepicker/reactiveform', component: ReactiveFormDatePickerComponent, name: 'Reactive', order: '02', category: 'Forms Support'}

];

export const DatePickerRouter: ModuleWithProviders = RouterModule.forChild(datePickerAppRoutes);

@NgModule({
    imports: [DatePickerRouter, BrowserModule, DatePickerModule, DropDownListModule, FormsModule, ReactiveFormsModule],
    declarations: [
        DefaultDatePickerComponent,
        SpecialDatePickerComponent,
        DisabledDatePickerComponent,
        RangeDatePickerComponent,
        FormatDatePickerComponent,
        ReactiveFormDatePickerComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DatePickerSampleModule {
}