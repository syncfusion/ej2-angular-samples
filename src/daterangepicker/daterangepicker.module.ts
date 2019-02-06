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

export const dateRangePickerAppRoutes: Object[] = [
    { path: ':theme/daterangepicker/default', component: DefaultDateRangePickerComponent, name: 'Default Functionalities', category: 'DateRangePicker' },
    { path: ':theme/daterangepicker/date-range', component: DateRangeComponent, name: 'Date Range', category: 'DateRangePicker' },
    { path: ':theme/daterangepicker/day-span', component: DaySpanComponent, name: 'Day Span', category: 'DateRangePicker' },
	{ path: ':theme/daterangepicker/date-format', component: FormatComponent, name: 'Format', category: 'DateRangePicker' },
    { path: ':theme/daterangepicker/presets', component: PresetsComponent, name: 'Preset Ranges', category: 'DateRangePicker' },
    {
        path: ':theme/daterangepicker/reactiveform', component: ReactiveFormDateRangePickerComponent, name: 'Reactive', order: '02',
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
        ReactiveFormDateRangePickerComponent

    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DateRangePickerSampleModule {
}