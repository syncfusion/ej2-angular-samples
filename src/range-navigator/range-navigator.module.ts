/**
 * Range Navigator Control
 */
import { NgModule, ModuleWithProviders, Type } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChartAllModule, RangeNavigatorAllModule, ChartAnnotationService } from '@syncfusion/ej2-angular-charts';
import { ButtonAllModule, SwitchAllModule } from '@syncfusion/ej2-angular-buttons';
import { GridAllModule } from '@syncfusion/ej2-angular-grids';
import { DefaultComponent } from './default.component';
import { LightWeightComponent } from './light-weight.component';
import { DateTimeComponent } from './date-time.component';
import { DoubleComponent } from './double.component';
import { LogarthmicComponent } from './logarithmic.component';
import { MultilevelComponent } from './multilevel.component';
import { FilterComponent } from './filter.component';
import { RTLComponent } from './right-to-left.component';
import { RangeNavigatorExportComponent } from './export.component';
import { RangeNavigatorEmptyPointComponent } from './empty-data.component';
import { PeriodicSelectorRNComponent } from './period-selector.component';
import { StockChartRNComponent } from './period-selector-stocks.component';

export const rangeNavigatorAppRoutes: Object[] = [
    { path: ':theme/range-navigator/default', component: DefaultComponent, name: 'Default', order: '01', category: 'Range Navigator' },
    {
        path: ':theme/range-navigator/light-weight', component: LightWeightComponent,
        name: 'Lightweight', order: '01', category: 'Range Navigator'
    },
    { path: ':theme/range-navigator/date-time', component: DateTimeComponent, name: 'Date Time', order: '02', category: 'Axis' },
    { path: ':theme/range-navigator/double', component: DoubleComponent, name: 'Numeric Axis', order: '02', category: 'Axis' },
    { path: ':theme/range-navigator/logarithmic', component: LogarthmicComponent, name: 'Logarithmic Axis', order: '02', category: 'Axis' },
    { path: ':theme/range-navigator/multilevel', component: MultilevelComponent, name: 'Multilevel Labels', order: '02', category: 'Axis' },
    {
        path: ':theme/range-navigator/period-selector', component: PeriodicSelectorRNComponent,
        name: 'Default', order: '03', category: 'Period Selector'
    },
    {
        path: ':theme/range-navigator/period-selector-stocks', component: StockChartRNComponent,
        name: 'Stock Chart', order: '03', category: 'Period Selector'
    },
    {
        path: ':theme/range-navigator/empty-data', component: RangeNavigatorEmptyPointComponent,
        name: 'Empty Points', order: '04', category: 'Customization'
    },
    {
        path: ':theme/range-navigator/filter', component: FilterComponent, name: 'Filter',
        order: '04', category: 'Customization'
    },
    {
        path: ':theme/range-navigator/export', component: RangeNavigatorExportComponent,
        name: 'Print and Export', order: '05', category: 'Print and Export'
    },
    { path: ':theme/range-navigator/right-to-left', component: RTLComponent, name: 'RTL', order: '06', category: 'RTL' }
];

export const rangeNavigatorRouter: ModuleWithProviders = RouterModule.forChild(rangeNavigatorAppRoutes);

let declarations: Type<Object>[] = [DefaultComponent, LightWeightComponent, DateTimeComponent, DoubleComponent, LogarthmicComponent,
    MultilevelComponent, FilterComponent, RTLComponent, RangeNavigatorExportComponent,
    RangeNavigatorEmptyPointComponent, PeriodicSelectorRNComponent, StockChartRNComponent];
@NgModule({
    imports: [
        rangeNavigatorRouter, ChartAllModule, RangeNavigatorAllModule, GridAllModule,
        ButtonAllModule, SwitchAllModule
    ],
    exports: [],
    declarations: declarations,
    providers: [ChartAnnotationService]
})
export class RangeNavigatorSampleModule {
}