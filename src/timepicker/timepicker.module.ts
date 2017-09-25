import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TimePickerModule } from '@syncfusion/ej2-ng-calendars';
import { DropDownListModule } from '@syncfusion/ej2-ng-dropdowns';
import { CheckBoxModule } from '@syncfusion/ej2-ng-buttons';

import { DefaultTimePickerComponent } from './default.component';
import { RangeTimePickerComponent } from './range.component';
import { GlobalizationComponent } from './globalization.component';
import { FormatTimePickerComponent } from './format.component';

export const timePickerAppRoutes: Object[] = [
    { path: ':theme/timepicker/default', component: DefaultTimePickerComponent, name: 'Default Functionalities', category: 'TimePicker' },
    { path: ':theme/timepicker/range', component: RangeTimePickerComponent, name: 'Time Range', category: 'TimePicker' },
    { path: ':theme/timepicker/globalization', component: GlobalizationComponent, name: 'Globalization', category: 'TimePicker' },
    { path: ':theme/timepicker/format', component: FormatTimePickerComponent, name: 'Time Format', category: 'TimePicker' }
];

export const TimePickerRouter: ModuleWithProviders = RouterModule.forChild(timePickerAppRoutes);

@NgModule({
    imports: [TimePickerRouter, TimePickerModule, DropDownListModule, CheckBoxModule ],
    declarations: [
        DefaultTimePickerComponent,
        RangeTimePickerComponent,
        GlobalizationComponent,
        FormatTimePickerComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TimePickerSampleModule {
}