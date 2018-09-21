import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';

import { DefaultTimePickerComponent } from './default.component';
import { RangeTimePickerComponent } from './time-range.component';
import { FormatTimePickerComponent } from './time-format.component';
import { ListFormattingTimePickerComponent } from './list-formatting.component';

export const timePickerAppRoutes: Object[] = [
    { path: ':theme/time-picker/default', component: DefaultTimePickerComponent, name: 'Default Functionalities', category: 'TimePicker' },
    { path: ':theme/time-picker/time-range', component: RangeTimePickerComponent, name: 'Time Range', category: 'TimePicker' },
    { path: ':theme/time-picker/time-format', component: FormatTimePickerComponent, name: 'Format', category: 'TimePicker' },
	{ path: ':theme/time-picker/list-formatting', component: ListFormattingTimePickerComponent, name: 'Time Duration', category: 'TimePicker', type:'new' }
];

export const TimePickerRouter: ModuleWithProviders = RouterModule.forChild(timePickerAppRoutes);

@NgModule({
    imports: [TimePickerRouter, TimePickerModule, DropDownListModule, CheckBoxModule ],
    declarations: [
        DefaultTimePickerComponent,
        RangeTimePickerComponent,
        FormatTimePickerComponent,
		ListFormattingTimePickerComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TimePickerSampleModule {
}