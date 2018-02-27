import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DateRangePickerModule } from '@syncfusion/ej2-ng-calendars';
import { DropDownListModule } from '@syncfusion/ej2-ng-dropdowns';

import { DefaultDateRangePickerComponent } from './default.component';
import { DateRangeComponent } from './daterange.component';
import { DaySpanComponent } from './dayspan.component';
import { PresetsComponent } from './presets.component';
import { FormatComponent } from './format.component';


export const dateRangePickerAppRoutes: Object[] = [
    { path: ':theme/daterangepicker/default', component: DefaultDateRangePickerComponent, name: 'Default Functionalities', category: 'DateRangePicker' },
    { path: ':theme/daterangepicker/daterange', component: DateRangeComponent, name: 'Date Range', category: 'DateRangePicker' },
    { path: ':theme/daterangepicker/dayspan', component: DaySpanComponent, name: 'Day Span', category: 'DateRangePicker' },
	{ path: ':theme/daterangepicker/format', component: FormatComponent, name: 'Format', category: 'DateRangePicker', type:'new' },
    { path: ':theme/daterangepicker/presets', component: PresetsComponent, name: 'Preset Ranges', category: 'DateRangePicker' },
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