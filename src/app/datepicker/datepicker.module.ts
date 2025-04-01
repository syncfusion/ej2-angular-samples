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
import { MonthPickerComponent } from './month-picker.component';
import { ReactiveFormDatePickerComponent } from './reactiveform.component';
import { MaskSupportDatePickerComponent} from './input-mask.component';

export const datePickerAppRoutes: Object[] = [
    { path: ':theme/datepicker/default', component: DefaultDatePickerComponent, name: 'Default Functionalities', description: 'A simple Angular DatePicker directive with two way binding support to select date values easily with rich user interface and cross browser compatibility', category: 'DatePicker' },
    { path: ':theme/datepicker/date-range', component: RangeDatePickerComponent, name: 'Date Range', description: 'Datepicker widget with min and max date options that restricts the users from selecting dates within a defined range of days like past days, future days etc', category: 'DatePicker' },
    { path: ':theme/datepicker/date-format', component: FormatDatePickerComponent,  type: 'update', name: 'Format', description: 'The InputFormats feature allows users to define multiple input formats, automatically converting typed values to the display format for a seamless experience.', category: 'DatePicker' },
    { path: ':theme/datepicker/special-dates', component: SpecialDatePickerComponent, name: 'Special Dates', description: 'Datepicker directive for Angular to highlight multiple dates like weekends, holidays, add special events with options to add custom styles and/or description' , category: 'DatePicker' },
    { path: ':theme/datepicker/disabled', component: DisabledDatePickerComponent, name: 'Disable Dates', description: 'Customizable Datepicker directive for Angular with disabled dates that restricts date selection of defined set of days like weekends, holidays, past days etc', category: 'DatePicker' },
    { path: ':theme/datepicker/input-mask', component: MaskSupportDatePickerComponent, name: 'Mask Support', description: 'This example demonstrates how to render the date time format in the input field using enableMask in a angular DatePicker', category: 'DatePicker' },
    { path: ':theme/datepicker/month-picker', component: MonthPickerComponent, name: 'Month Picker', description:'The Angular DatePicker component can act as a month and year picker. It helps you to select a month or year quickly with all month related properties', category: 'DatePicker' },
    { path: ':theme/datepicker/reactiveform', component: ReactiveFormDatePickerComponent, name: 'Reactive', order: '02', description: 'Compatible Datepicker directive that confirms with the built in Angular validation to display error messages based on the validation state of the component', category: 'Forms Support'}

];

export const DatePickerSampleModule: ModuleWithProviders<any> = RouterModule.forChild(datePickerAppRoutes);

