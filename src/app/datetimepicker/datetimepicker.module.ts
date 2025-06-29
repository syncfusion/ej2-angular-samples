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
import { MaskSupportDateTimePickerComponent} from './input-mask.component';

export const dateTimePickerAppRoutes: Object[] = [
    { path: ':theme/datetimepicker/default', component: DefaultDateTimePickerComponent, name: 'Default Functionalities', description: 'A simple light weight and easily customizable DateTimepicker component for Angular  to select date and time values precisely based on your application needs', category: 'DateTimePicker' },
    { path: ':theme/datetimepicker/date-time-range', component: RangeDateTimePickerComponent, name: 'Date Range', description: 'Flexible DateTimePicker component for Typescript to restrict date selection from defined range of values like current month, past days, next week, future days', category: 'DateTimePicker' },
    { path: ':theme/datetimepicker/date-time-format', component: FormatDateTimePickerComponent, name: 'Format', description: 'The InputFormats feature allows users to define multiple input formats, automatically converting typed values to the display format for a seamless experience.', category: 'DateTimePicker' },
    { path: ':theme/datetimepicker/special-dates', component: SpecialDateTimePickerComponent, name: 'Special Dates', description: 'DateTimepicker to highlight multiple dates like weekends, holidays, special events and time duration with options to add custom styles and/or description', category: 'DateTimePicker' },
    { path: ':theme/datetimepicker/disabled', component: DisabledDateTimePickerComponent, name: 'Disable Dates', description: 'Datetimepicker directive for Angular with disabled date and time that restricts the selection for specific date and time duration by disabling user interaction', category: 'DateTimePicker' },
    { path: ':theme/datetimepicker/input-mask', component: MaskSupportDateTimePickerComponent, name: 'Mask Support', description: 'This example demonstrates how to render the date time format in the input field using enableMask in a angular DateTimePicker', category: 'DateTimePicker' },
    {
        path: ':theme/datetimepicker/reactiveform', component: ReactiveFormDateTimePickerComponent, name: 'Reactive', order: '02', description: 'Compatible DateTimepicker directive that confirms with the built in Angular validation to display error messages based on the validation state of the component',
        category: 'Forms Support'
    }

];

export const DateTimePickerSampleModule: ModuleWithProviders<any> = RouterModule.forChild(dateTimePickerAppRoutes);

