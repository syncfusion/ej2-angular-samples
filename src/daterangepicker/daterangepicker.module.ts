import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DateRangePickerModule } from '@syncfusion/ej2-ng-calendars';

import { DefaultDateRangePickerComponent } from './default.component';
import { GlobalizationComponent } from './globalization.component';
import { MinMaxComponent } from './minMax.component';
import { MinMaxDaysComponent } from './minMaxDays.component';
import { PresetsComponent } from './presets.component';


export const dateRangePickerAppRoutes: Object[] = [
    { path: ':theme/daterangepicker/default', component: DefaultDateRangePickerComponent, name: 'Default Functionalities', category: 'DateRangePicker' },
    { path: ':theme/daterangepicker/minMax', component: MinMaxComponent, name: 'Date Range', category: 'DateRangePicker' },
    { path: ':theme/daterangepicker/minMaxDays', component: MinMaxDaysComponent, name: 'Restrict Range', category: 'DateRangePicker' },
    { path: ':theme/daterangepicker/globalization', component: GlobalizationComponent, name: 'Globalization', category: 'DateRangePicker' },
    { path: ':theme/daterangepicker/presets', component: PresetsComponent, name: 'Preset Ranges', category: 'DateRangePicker' },
];

export const DateRangePickerRouter: ModuleWithProviders = RouterModule.forChild(dateRangePickerAppRoutes);

@NgModule({
    imports: [DateRangePickerRouter, DateRangePickerModule],
    declarations: [
        DefaultDateRangePickerComponent,
        GlobalizationComponent,
        MinMaxComponent,
        MinMaxDaysComponent,
        PresetsComponent

    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DateRangePickerSampleModule {
}