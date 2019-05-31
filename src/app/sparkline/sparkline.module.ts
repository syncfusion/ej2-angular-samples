/**
 * Sparkline Control
 */
import { NgModule, ModuleWithProviders, Type } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SparklineAllModule } from '@syncfusion/ej2-angular-charts';
import { GridAllModule } from '@syncfusion/ej2-angular-grids';
import { DefaultSparklineComponent } from './default.component';
import { AxisTypeSparklineComponent } from './axis-type.component';
import { SeriesTypeSparklineComponent } from './series-type.component';
import { SparklineCustomizationSample } from './customization.component';
import { SparkineLiveUpdateSample } from './live-update.component';
import { SparklineGridSample } from './sparkline-grid.component';
import { SparklineRangebandSample } from './range-band.component';
import { SliderModule } from '@syncfusion/ej2-angular-inputs';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';

export const sparklineAppRoutes: Object[] = [
    { path: ':theme/sparkline/default', component: DefaultSparklineComponent, name: 'Default', order: '01', category: 'Sparkline Charts', description: 'This demo for Essential JS2 Sparkline control visualizes population, population density, population growth rate, and birth rate of various countries.' },
    { path: ':theme/sparkline/series-type', component: SeriesTypeSparklineComponent, name: 'Series Types', order: '01', 
    category: 'Sparkline Charts', description: 'This demo for Essential JS2 Sparkline control depicts the various series types available in the sparkline.' },
    { path: ':theme/sparkline/axis-type', component: AxisTypeSparklineComponent, name: 'Axis value types',
     order: '01', category: 'Sparkline Charts', description: 'This demo for Essential JS2 Sparkline control depicts the various axis types available in the sparkline.' },
    { path: ':theme/sparkline/sparkline-grid', component: SparklineGridSample, name: 'Sparkline in Grid',
     order: '01', category: 'Sparkline Charts', description: 'This demo for Essential JS2 Sparkline control demonstrates rendering sparklines in the data grid control.' },
    { path: ':theme/sparkline/customization', component: SparklineCustomizationSample, name: 'Customization', type: 'update',
     order: '01', category: 'Sparkline Charts', description: 'This demo for Essential JS2 Sparkline control depicts the properties required to customize the sparkline.' },
    { path: ':theme/sparkline/live-update', component: SparkineLiveUpdateSample, name: 'Live Update', order: '01', category: 'Sparkline Charts', description: 'This demo for Essential JS2 Sparkline control depicts the task manager with live data update for sparklines.' },
    { path: ':theme/sparkline/range-band', component: SparklineRangebandSample, name: 'Range Band', order: '01', category: 'Sparkline Charts', description: 'This demo for Essential JS2 Sparkline control depicts the range band feature and its customization options.' }
];

export const sparklineRouter: ModuleWithProviders = RouterModule.forChild(sparklineAppRoutes);
let declarations: Type<Object>[] = [DefaultSparklineComponent, AxisTypeSparklineComponent, SeriesTypeSparklineComponent,
    SparklineGridSample, SparklineRangebandSample, SparklineCustomizationSample, SparkineLiveUpdateSample];
@NgModule({
    imports: [sparklineRouter, SparklineAllModule, GridAllModule, SliderModule, DropDownListAllModule, CheckBoxModule],
    exports: [],
    declarations: declarations,
    providers: [SparklineAllModule, GridAllModule]
})
export class SparklineSampleModule {
}
