/**
 * Lineargauge Control
 */
import { NgModule, ModuleWithProviders, Type } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LinearGaugeAllModule } from '@syncfusion/ej2-ng-lineargauge';

import { DefaultComponent } from './default.component';
import { ContainerComponent } from './container.component';
import { DataComponent } from './data.component';
import { AxesComponent } from './axes.component';
import { RangesComponent } from './ranges.component';
import { AnnotationComponent } from './annotation.component';
import { TooltipComponent } from './tooltip.component';
import { StyleComponent } from './style.component';

export const lineargaugeAppRoutes: Object[] = [
    { path: ':theme/lineargauge/default', component: DefaultComponent, name: 'Default', order: '01', category: 'Linear Gauge' },
    { path: ':theme/lineargauge/container', component: ContainerComponent, name: 'Container', order: '01', category: 'Linear Gauge' },
    { path: ':theme/lineargauge/ranges', component: RangesComponent, name: 'Ranges', order: '01', category: 'Linear Gauge' },
    { path: ':theme/lineargauge/data', component: DataComponent, name: 'Data Sample', order: '01', category: 'Linear Gauge' },
    { path: ':theme/lineargauge/axes', component: AxesComponent, name: 'Axes and Pointers', order: '01', category: 'Linear Gauge' },
    { path: ':theme/lineargauge/annotation', component: AnnotationComponent, name: 'Annotation', order: '01', category: 'Linear Gauge' },
    { path: ':theme/lineargauge/tooltip', component: TooltipComponent, name: 'Tooltip', order: '01', category: 'Linear Gauge' },
    { path: ':theme/lineargauge/style', component: StyleComponent, name: 'Styles', order: '01', category: 'Linear Gauge' }
];

export const linearRouter: ModuleWithProviders = RouterModule.forChild(lineargaugeAppRoutes);

let declarations: Type<Object>[] = [DefaultComponent, ContainerComponent, RangesComponent, DataComponent, AxesComponent, AnnotationComponent, TooltipComponent, StyleComponent];

@NgModule({
    imports: [linearRouter, LinearGaugeAllModule],
    exports: [],
    declarations: declarations,
    providers: [LinearGaugeAllModule]
})
export class LinearGaugeSampleModule {
}