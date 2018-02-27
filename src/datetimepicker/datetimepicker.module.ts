import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DateTimePickerModule } from '@syncfusion/ej2-ng-calendars';
import { DropDownListModule } from '@syncfusion/ej2-ng-dropdowns';

import { DefaultDateTimePickerComponent } from './default.component';
import { SpecialDateTimePickerComponent } from './special.component';
import { DisabledDateTimePickerComponent } from './disabled.component';
import { RangeDateTimePickerComponent } from './range.component';
import { FormatDateTimePickerComponent } from './format.component';


export const dateTimePickerAppRoutes: Object[] = [
    { path: ':theme/datetimepicker/default', component: DefaultDateTimePickerComponent, name: 'Default Functionalities', category: 'DateTimePicker' },
    { path: ':theme/datetimepicker/range', component: RangeDateTimePickerComponent, name: 'Date Range', category: 'DateTimePicker' },
    { path: ':theme/datetimepicker/format', component: FormatDateTimePickerComponent, name: 'Format', category: 'DateTimePicker' },
    { path: ':theme/datetimepicker/special', component: SpecialDateTimePickerComponent, name: 'Special Dates', category: 'DateTimePicker' },
    { path: ':theme/datetimepicker/disabled', component: DisabledDateTimePickerComponent, name: 'Disable Dates', category: 'DateTimePicker' }
	
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