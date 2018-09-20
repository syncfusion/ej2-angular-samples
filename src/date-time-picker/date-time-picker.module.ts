import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';

import { DefaultDateTimePickerComponent } from './default.component';
import { SpecialDateTimePickerComponent } from './special-dates.component';
import { DisabledDateTimePickerComponent } from './disabled.component';
import { RangeDateTimePickerComponent } from './date-time-range.component';
import { FormatDateTimePickerComponent } from './date-time-format.component';


export const dateTimePickerAppRoutes: Object[] = [
    { path: ':theme/date-time-picker/default', component: DefaultDateTimePickerComponent, name: 'Default Functionalities', category: 'DateTimePicker' },
    { path: ':theme/date-time-picker/date-time-range', component: RangeDateTimePickerComponent, name: 'Date Range', category: 'DateTimePicker' },
    { path: ':theme/date-time-picker/date-time-format', component: FormatDateTimePickerComponent, name: 'Format', category: 'DateTimePicker' },
    { path: ':theme/date-time-picker/special-dates', component: SpecialDateTimePickerComponent, name: 'Special Dates', category: 'DateTimePicker' },
    { path: ':theme/date-time-picker/disabled', component: DisabledDateTimePickerComponent, name: 'Disable Dates', category: 'DateTimePicker' }
	
];

export const DateTimePickerRouter: ModuleWithProviders = RouterModule.forChild(dateTimePickerAppRoutes);

@NgModule({
    imports: [DateTimePickerRouter, DateTimePickerModule,DropDownListModule],
    declarations: [
        DefaultDateTimePickerComponent,
        SpecialDateTimePickerComponent,
        DisabledDateTimePickerComponent,
        RangeDateTimePickerComponent,
        FormatDateTimePickerComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DateTimePickerSampleModule {
}