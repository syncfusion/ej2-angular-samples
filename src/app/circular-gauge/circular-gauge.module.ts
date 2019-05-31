/**
 * Circulargauge Control
 */
import { NgModule, ModuleWithProviders, Type } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CircularGaugeAllModule } from '@syncfusion/ej2-angular-circulargauge';
import { GridModule } from '@syncfusion/ej2-angular-grids';

import { DefaultComponent } from './default.component';
import { RangeComponent } from './range.component';
import { MultipleAxisComponent } from './multiple-axis.component';
import { LabelComponent } from './label.component';
import { UserInteractionComponent } from './user-interactions.component';
import { TooltipComponent } from './tooltip.component';
import { PointersComponent } from './pointers.component';
import { SampleDataComponent } from './sample-data.component';
import { PointerImageComponent } from './pointer-image.component';
import { AnnotationComponent } from './annotation.component';
import { CustomizationComponent } from './customization.component';
import { DirectionComponent } from './direction.component';
import { SemiCircleComponent } from './semi-circular-gauge.component';
import { ArcGaugeComponent } from './arc-gauge.component';
import { AppleWatchComponent } from './apple-watch-rings.component';
import { SpeedometerComponent } from './speedometer.component';


export const circulargaugeAppRoutes: Object[] = [
    { path: ':theme/circular-gauge/default', component: DefaultComponent, name: 'Default', order: '01', category: 'Circular Gauge', description: 'This demo for Essential JS2 Circular Gauge control illustrates the default rendering of circular gauge.'},
    { path: ':theme/circular-gauge/range', component: RangeComponent, name: 'Range', order: '01', category: 'Circular Gauge', description: 'This demo for Essential JS2 Circular Gauge control illustrates how to highlight specific regions in an axis by using ranges.' },
    { path: ':theme/circular-gauge/label', component: LabelComponent, name: 'Ticks and Labels', type:'update', order: '01', category: 'Circular Gauge', description: 'This demo for Essential JS2 Circular Gauge control shows various properties available to customize the ticks and labels of an axis.'},
    { path: ':theme/circular-gauge/annotation', component: AnnotationComponent , name: 'Annotation', order: '01', category: 'Circular Gauge', description: 'This demo for Essential JS2 Circular Gauge control illustrates a clock by using annotation feature in the gauge.'},
    { path: ':theme/circular-gauge/customization', component: CustomizationComponent, name: 'Gauge Customization', order: '01', category: 'Circular Gauge', description: 'This demo for Essential JS2 Circular Gauge control shows the properties required to customize the pointers.'},
    { path: ':theme/circular-gauge/semi-circular-gauge', component: SemiCircleComponent, name: 'Semi-circle Gauge',  order: '01', category: 'Circular Gauge', description: 'This demo for Essential JS2 Circular Gauge control shows the properties required to customize the pointers.'},
    { path: ':theme/circular-gauge/arc-gauge', component: ArcGaugeComponent, name: 'Arc Gauge', order: '01',  category: 'Circular Gauge', description: 'This demo for Essential JS2 Circular Gauge control shows the properties required to customize the pointers.'},
    { path: ':theme/circular-gauge/direction', component: DirectionComponent, name: 'Direction Compass', order: '01', category: 'Circular Gauge', description: 'This demo for Essential JS2 Circular Gauge control illustrates how to make a direction compass by using the circular gauge.'},
    { path: ':theme/circular-gauge/pointer-image', component: PointerImageComponent, name: 'Pointer Image', order: '02', category: 'Pointer', description: 'This demo for Essential JS2 Circular Gauge control visualizes the short-put distance covered by the athletes by using the image pointer.'},
    { path: ':theme/circular-gauge/pointers', component: PointersComponent, name: 'Pointer Customization', order: '02', category: 'Pointer', description: 'This demo for Essential JS2 Circular Gauge control visualizes the different types of pointers available in the circular gauge.'},
    { path: ':theme/circular-gauge/multiple-axis', component: MultipleAxisComponent, name: 'Multiple Axis', order: '03', category: 'Axes', description: 'This demo for Essential JS2 Circular Gauge control visualizes the circular gauge with multiple axes.'},
    { path: ':theme/circular-gauge/user-interactions', component: UserInteractionComponent, name: 'Pointer Drag', order: '04', category: 'User Interaction', description: 'This demo for Essential JS2 Circular Gauge control visualizes the pointer drag support and its options.'},
    { path: ':theme/circular-gauge/tooltip', component: TooltipComponent, name: 'Tooltip', order: '04', category: 'User Interaction', description: 'This demo for Essential JS2 Circular Gauge control visualizes the tooltip template for circular gauge pointer.'},
    { path: ':theme/circular-gauge/sample-data', component: SampleDataComponent , name: 'Data Sample', order: '05', category: 'Live', description: 'This demo for Essential JS2 Circular Gauge control demonstrates live data, along with the data grid control.'},
    { path: ':theme/circular-gauge/apple-watch-rings', component: AppleWatchComponent , type: 'new', name: 'Apple Watch Rings',  order: '05', category: 'Live', description: 'This demo for Essential JS2 Circular Gauge control demonstrates live data, along with the apple watch rings.'},
    { path: ':theme/circular-gauge/speedometer', component: SpeedometerComponent , name: 'Speedometer',  order: '05', category: 'Live', description: 'This demo for Essential JS2 Circular Gauge control demonstrates live data, along with the data grid control.'}
];

export const circularRouter: ModuleWithProviders = RouterModule.forChild(circulargaugeAppRoutes);

let declarations: Type<Object>[] = [DefaultComponent, RangeComponent, MultipleAxisComponent, LabelComponent, UserInteractionComponent,
TooltipComponent, PointersComponent, PointerImageComponent, SampleDataComponent, AnnotationComponent, CustomizationComponent, DirectionComponent,
SemiCircleComponent, ArcGaugeComponent, AppleWatchComponent, SpeedometerComponent];

@NgModule({
    imports: [circularRouter, CircularGaugeAllModule, GridModule],
    exports: [],
    declarations: declarations,
    providers: [CircularGaugeAllModule]
})
export class CircularGaugeSampleModule {
}