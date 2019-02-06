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
    { path: ':theme/timepicker/default', component: DefaultTimePickerComponent, name: 'Default Functionalities', category: 'TimePicker' },
    { path: ':theme/timepicker/time-range', component: RangeTimePickerComponent, name: 'Time Range', category: 'TimePicker' },
    { path: ':theme/timepicker/time-format', component: FormatTimePickerComponent, name: 'Format', category: 'TimePicker' },
    { path: ':theme/timepicker/list-formatting', component: ListFormattingTimePickerComponent, name: 'Time Duration', category: 'TimePicker' },
    {
        path: ':theme/timepicker/reactiveform', component: ReactiveFormTimePickerComponent, name: 'Reactive', order: '02',
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