/**
 * Circulargauge Control
 */
import { NgModule, ModuleWithProviders, Type } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CircularGaugeAllModule } from '@syncfusion/ej2-ng-circulargauge';
import { GridModule } from '@syncfusion/ej2-ng-grids';

import { DefaultComponent } from './default.component';
import { RangeComponent } from './range.component';
import { MultipleAxisComponent } from './multiple-axis.component';
import { LabelComponent } from './label.component';
import { UserInteractionComponent } from './user-interactions.component';
import { TooltipComponent } from './tooltip.component';
import { PointersComponent } from './pointers.component';
import { SampleDataComponent } from './sampledata.component';
import { PointerImageComponent } from './pointer-image.component';
import { AnnotationComponent } from './annotation.component';
import { CustomizationComponent } from './customization.component';
import { DirectionComponent } from './direction.component';


export const circulargaugeAppRoutes: Object[] = [
    { path: 'circulargauge/default', component: DefaultComponent, name: 'Default', order: '01', category: 'Circular Gauge'},
    { path: 'circulargauge/range', component: RangeComponent, name: 'Range', order: '01', category: 'Circular Gauge' },
    { path: 'circulargauge/label', component: LabelComponent, name: 'Ticks and Labels', order: '01', category: 'Circular Gauge'},
    { path: 'circulargauge/annotation', component: AnnotationComponent , name: 'Annotation', order: '01', category: 'Circular Gauge'},
    { path: 'circulargauge/customization', component: CustomizationComponent, name: 'Gauge Customization', order: '01', category: 'Circular Gauge'},
    { path: 'circulargauge/direction', component: DirectionComponent, name: 'Direction Compass', order: '01', category: 'Circular Gauge'},
    { path: 'circulargauge/pointer-image', component: PointerImageComponent, name: 'Pointer Image', order: '02', category: 'Pointer'},
    { path: 'circulargauge/pointers', component: PointersComponent, name: 'Pointer Customization', order: '02', category: 'Pointer'},
    { path: 'circulargauge/multiple-axis', component: MultipleAxisComponent, name: 'Multiple Axis', order: '03', category: 'Axes'},
    { path: 'circulargauge/user-interactions', component: UserInteractionComponent, name: 'Pointer Drag', order: '04', category: 'User Interaction'},
    { path: 'circulargauge/tooltip', component: TooltipComponent, name: 'Tooltip', order: '04', category: 'User Interaction'},
    { path: 'circulargauge/sampledata', component: SampleDataComponent , name: 'Data Sample', order: '05', category: 'Live'}
];

export const circularRouter: ModuleWithProviders = RouterModule.forChild(circulargaugeAppRoutes);

let declarations: Type<Object>[] = [DefaultComponent, RangeComponent, MultipleAxisComponent, LabelComponent, UserInteractionComponent,
TooltipComponent, PointersComponent, PointerImageComponent, SampleDataComponent, AnnotationComponent, CustomizationComponent, DirectionComponent];

@NgModule({
    imports: [circularRouter, CircularGaugeAllModule, GridModule],
    exports: [],
    declarations: declarations,
    providers: [CircularGaugeAllModule]
})
export class CircularGaugeSampleModule {
}