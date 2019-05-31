import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DefaultTimePickerComponent } from './default.component';
import { RangeTimePickerComponent } from './time-range.component';
import { FormatTimePickerComponent } from './time-format.component';
import { ListFormattingTimePickerComponent } from './list-formatting.component';
import { ReactiveFormTimePickerComponent } from './reactiveform.component';

export const timePickerAppRoutes: Object[] = [
    { path: ':theme/timepicker/default', component: DefaultTimePickerComponent, name: 'Default Functionalities', description: 'A simple Timepicker directive for Angular with two way binding support to input time entries with customizable options to fit into large scale applications', category: 'TimePicker' },
    { path: ':theme/timepicker/time-range', component: RangeTimePickerComponent, name: 'Time Range', description: 'Timepicker directive for Angular with min and max time options to restrict time selection within defined duration like next 30 minutes, next 4 hours etc', category: 'TimePicker' },
    { path: ':theme/timepicker/time-format', component: FormatTimePickerComponent, name: 'Format', description: 'Highly customizable Timepicker directive for Angular with options to change the time display format based on preferred culture for more readability in UI', category: 'TimePicker' },
    { path: ':theme/timepicker/list-formatting', component: ListFormattingTimePickerComponent, name: 'Time Duration', description: 'A simple Timepicker directive for Angular to highlight a set of time intervals in pop-up by adding custom styles and/or description based on you needs', category: 'TimePicker' },
    {
        path: ':theme/timepicker/reactiveform', component: ReactiveFormTimePickerComponent, name: 'Reactive', order: '02', description: 'Compatible Timepicker directive that confirms with the built in Angular validation to display error messages based on the validation state of the component',
        category: 'Forms Support'
    }

];

export const TimePickerRouter: ModuleWithProviders = RouterModule.forChild(timePickerAppRoutes);

@NgModule({
    imports: [TimePickerRouter, TimePickerModule, DropDownListModule, BrowserModule, FormsModule, ReactiveFormsModule, CheckBoxModule],
    declarations: [
        DefaultTimePickerComponent,
        RangeTimePickerComponent,
        FormatTimePickerComponent,
        ListFormattingTimePickerComponent,
        ReactiveFormTimePickerComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TimePickerSampleModule {
}