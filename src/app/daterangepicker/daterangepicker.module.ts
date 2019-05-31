import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DefaultDateRangePickerComponent } from './default.component';
import { DateRangeComponent } from './date-range.component';
import { DaySpanComponent } from './day-span.component';
import { PresetsComponent } from './presets.component';
import { FormatComponent } from './date-format.component';
import { ReactiveFormDateRangePickerComponent } from './reactiveform.component';
import { MonthRangePickerComponent } from './month-range-picker.component';

export const dateRangePickerAppRoutes: Object[] = [
    { path: ':theme/daterangepicker/default', component: DefaultDateRangePickerComponent, name: 'Default Functionalities', description: 'A simple and light weight DateRangePicker Angular directive with two way binding support to select range of dates effortlessly with its flexible user interface', category: 'DateRangePicker' },
    { path: ':theme/daterangepicker/date-range', component: DateRangeComponent, name: 'Date Range', description: 'DateRangePicker directive for Angular with min and max date options that restricts the user from selecting range of dates  like past days, future days etc', category: 'DateRangePicker' },
    { path: ':theme/daterangepicker/day-span', component: DaySpanComponent, name: 'Day Span', description: 'DateRangePicker componet for Angular to limit the number of dates that can be selected from current selection like future days,  past 7 days, next 30 days etc', category: 'DateRangePicker' },
	{ path: ':theme/daterangepicker/date-format', component: FormatComponent, name: 'Format', description: 'Customizable DateRangePicker component for Angular with options to change date and time formats of preferred culture to provide more readability in UI', category: 'DateRangePicker' },
    { path: ':theme/daterangepicker/presets', component: PresetsComponent, name: 'Preset Ranges', description: 'Daterangepicker widget that allows user to select defined range of dates like past month, past year, current week effortlessly from the popup in just one click', category: 'DateRangePicker' },
    { path: ':theme/daterangepicker/month-range-picker', component: MonthRangePickerComponent, name: 'Month Range Picker', type:'new', description:'The Angular DateRangePicker component can act as a month and year picker. It helps you to select a month or year quickly with all month related properties', category: 'DateRangePicker' },
    {
        path: ':theme/daterangepicker/reactiveform', component: ReactiveFormDateRangePickerComponent, name: 'Reactive', order: '02', description: 'Compatible DateRangepicker directive that confirms with the built in Angular validation to display error messages based on the validation state of the component',
        category: 'Forms Support'
    }

];

export const DateRangePickerRouter: ModuleWithProviders = RouterModule.forChild(dateRangePickerAppRoutes);

@NgModule({
    imports: [DateRangePickerRouter, DateRangePickerModule, DropDownListModule, BrowserModule, FormsModule, ReactiveFormsModule],
    declarations: [
        DefaultDateRangePickerComponent,
        DateRangeComponent,
        DaySpanComponent,
        PresetsComponent,
        FormatComponent,
        MonthRangePickerComponent,
        ReactiveFormDateRangePickerComponent

    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DateRangePickerSampleModule {
}