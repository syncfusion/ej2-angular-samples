import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';

import { DefaultDateRangePickerComponent } from './default.component';
import { DateRangeComponent } from './date-range.component';
import { DaySpanComponent } from './day-span.component';
import { PresetsComponent } from './presets.component';
import { FormatComponent } from './date-format.component';


export const dateRangePickerAppRoutes: Object[] = [
    { path: ':theme/date-range-picker/default', component: DefaultDateRangePickerComponent, name: 'Default Functionalities', category: 'DateRangePicker' },
    { path: ':theme/date-range-picker/date-range', component: DateRangeComponent, name: 'Date Range', category: 'DateRangePicker' },
    { path: ':theme/date-range-picker/day-span', component: DaySpanComponent, name: 'Day Span', category: 'DateRangePicker' },
	{ path: ':theme/date-range-picker/date-format', component: FormatComponent, name: 'Format', category: 'DateRangePicker', type:'new' },
    { path: ':theme/date-range-picker/presets', component: PresetsComponent, name: 'Preset Ranges', category: 'DateRangePicker' },
];

export const DateRangePickerRouter: ModuleWithProviders = RouterModule.forChild(dateRangePickerAppRoutes);

@NgModule({
    imports: [DateRangePickerRouter, DateRangePickerModule,DropDownListModule],
    declarations: [
        DefaultDateRangePickerComponent,
        DateRangeComponent,
        DaySpanComponent,
        PresetsComponent,
		FormatComponent

    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DateRangePickerSampleModule {
}