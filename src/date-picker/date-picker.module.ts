import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';

import { DefaultDatePickerComponent } from './default.component';
import { SpecialDatePickerComponent } from './special-dates.component';
import { DisabledDatePickerComponent } from './disabled.component';
import { RangeDatePickerComponent } from './date-range.component';
import { FormatDatePickerComponent } from './date-format.component';

export const datePickerAppRoutes: Object[] = [
    { path: ':theme/date-picker/default', component: DefaultDatePickerComponent, name: 'Default Functionalities', category: 'DatePicker' },
    { path: ':theme/date-picker/date-range', component: RangeDatePickerComponent, name: 'Date Range', category: 'DatePicker' },
    { path: ':theme/date-picker/date-format', component: FormatDatePickerComponent, name: 'Format', category: 'DatePicker' },
    { path: ':theme/date-picker/special-dates', component: SpecialDatePickerComponent, name: 'Special Dates', category: 'DatePicker' },
    { path: ':theme/date-picker/disabled', component: DisabledDatePickerComponent, name: 'Disable Dates', category: 'DatePicker' }
];

export const DatePickerRouter: ModuleWithProviders = RouterModule.forChild(datePickerAppRoutes);

@NgModule({
    imports: [DatePickerRouter, DatePickerModule,DropDownListModule],
    declarations: [
        DefaultDatePickerComponent,
        SpecialDatePickerComponent,
        DisabledDatePickerComponent,
        RangeDatePickerComponent,
        FormatDatePickerComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DatePickerSampleModule {
}