/**
 * Lineargauge Control
 */
import { NgModule, ModuleWithProviders, Type } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LinearGaugeAllModule } from '@syncfusion/ej2-angular-lineargauge';

import { DefaultComponent } from './default.component';
import { ContainerComponent } from './container.component';
import { DataComponent } from './data.component';
import { AxesComponent } from './axes.component';
import { RangesComponent } from './ranges.component';
import { AnnotationComponent } from './annotation.component';
import { TooltipComponent } from './tooltip.component';
import { StyleComponent } from './style.component';

export const lineargaugeAppRoutes: Object[] = [
    { path: ':theme/linear-gauge/default', component: DefaultComponent, name: 'Default', order: '01', category: 'Linear Gauge', description: 'This demo for Essential JS2 Linear Gauge control illustrates the default rendering of linear gauge.' },
    { path: ':theme/linear-gauge/container', component: ContainerComponent, name: 'Container', order: '01', category: 'Linear Gauge', description: 'This demo for Essential JS2 Linear Gauge control demonstrates the various types of containers available in linear gauge.' },
    { path: ':theme/linear-gauge/ranges', component: RangesComponent, name: 'Ranges', order: '01', category: 'Linear Gauge', description: 'This demo for Essential JS2 Linear Gauge control illustrates how to highlight specific regions in an axis by using ranges.' },
    { path: ':theme/linear-gauge/data', component: DataComponent, name: 'Data Sample', order: '01', category: 'Linear Gauge', description: 'This demo for Essential JS2 Linear Gauge control illustrates exercise tracking of an athlete by using ranges, pointers, and annotation features.' },
    { path: ':theme/linear-gauge/axes', component: AxesComponent, name: 'Axes and Pointers', order: '01', category: 'Linear Gauge', description: 'This demo for Essential JS2 Linear Gauge control shows various properties available to customize the axes and pointers.' },
    { path: ':theme/linear-gauge/annotation', component: AnnotationComponent, name: 'Annotation', order: '01', category: 'Linear Gauge', description: 'This demo for Essential JS2 Linear Gauge control illustrates the CPU Utilization of a resource by using annotation feature.' },
    { path: ':theme/linear-gauge/tooltip', component: TooltipComponent, name: 'Tooltip', order: '01', category: 'Linear Gauge', description: 'This demo for Essential JS2 Linear Gauge control visualizes the tooltip functionality for bar pointer.' },
    { path: ':theme/linear-gauge/style', component: StyleComponent, name: 'Styles', order: '01', category: 'Linear Gauge', description: 'This demo for Essential JS2 Linear Gauge control visualizes the available options for customization.' }
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