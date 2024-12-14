import { NgModule, ModuleWithProviders, Type } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CircularGaugeAllModule } from '@syncfusion/ej2-angular-circulargauge';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { DefaultComponent } from './default-functionalities.component';
import { LabelComponent } from './ticks-and-labels.component';
import { MultipleAxisComponent } from './multiple-axes.component';
import { CustomLabelComponent } from './custom-labels.component';
import { RangeColorComponent } from './range-color-for-axis.component';
import { AxisBackGroundComponent } from './axis-background.component';
import { PointersComponent } from './pointer-types.component';
import { TextPointerComponent } from './text-pointer.component';
import { PointerImageComponent } from './image-pointer.component';
import { RangeComponent } from './range-customization.component';
import { MultipleRangesComponent } from './multiple-ranges.component';
import { LegendComponent } from './legend.component';
import { ArcGaugeComponent } from './arc-gauge.component';
import { SemiCircleComponent } from './semi-circular-gauge.component';
import { UserInteractionComponent } from './pointer-ranges-drag.component';
import { TooltipComponent } from './tooltip.component';
import { ExportComponent} from './print-export.component';
import { ClockComponent } from './clock.component';
import { RadialSliderComponent } from './radial-slider.component';
import { DirectionComponent } from './direction-compass.component';
import { SpeedometerComponent } from './speedometer.component';
import { SleepTrackerComponent } from './sleep-tracker.component';
import { SampleDataComponent } from './data-sample.component';
import { AppleWatchComponent } from './apple-watch-rings.component';
import { ButtonModule, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';

export const circulargaugeAppRoutes: Object[] = [
    { path: ':theme/circular-gauge/default-functionalities', component: DefaultComponent, name: 'Default Functionalities', order: '01', category: 'Circular Gauge', description: 'This demo for Essential<sup>®</sup> JS2 Circular Gauge control illustrates the default rendering of circular gauge.'},
    { path: ':theme/circular-gauge/ticks-and-labels', component: LabelComponent, name: 'Ticks and Labels', order: '02', category: 'Axis', description: 'This demo for Essential<sup>®</sup> JS2 Circular Gauge control shows various properties available to customize the ticks and labels of an axis.'},
    { path: ':theme/circular-gauge/multiple-axes', component: MultipleAxisComponent, name: 'Multiple Axes', order: '02', category: 'Axis', description: 'This demo for Essential<sup>®</sup> JS2 Circular Gauge control illustrates the custom labels in the circular gauge.'},
    { path: ':theme/circular-gauge/custom-labels', component: CustomLabelComponent , name: 'Custom Labels', order: '02', category: 'Axis', description: 'This demo for Essential<sup>®</sup> JS2 Circular Gauge control demonstrate the range color for axis in the circular gauge.'},
    { path: ':theme/circular-gauge/range-color-for-axis', component: RangeColorComponent, name: 'Range Color for Axis', order: '02', category: 'Axis', description: 'This demo for Essential<sup>®</sup> JS2 Circular Gauge control demonstrate the axis background in the circular gauge.'},
    { path: ':theme/circular-gauge/axis-background', component: AxisBackGroundComponent, name: 'Axis Background',  order: '02', category: 'Axis', description: 'This demo for Essential<sup>®</sup> JS2 Circular Gauge control the different types of pointers available in the circular gauge.'},
    { path: ':theme/circular-gauge/pointer-types', component: PointersComponent, name: 'Pointer Types', order: '03', category: 'Pointer', description: 'This demo for Essential<sup>®</sup> JS2 Circular Gauge control visualizes the different types of pointers available in the circular gauge.'},
    { path: ':theme/circular-gauge/text-pointer', component: TextPointerComponent, name: 'Text Pointer',  order: '03', category: 'Pointer', description: 'This demo for Essential<sup>®</sup> JS2 Circular Gauge control visualizes the text pointer in the circular gauge.'},
    { path: ':theme/circular-gauge/image-pointer', component: PointerImageComponent,  name: 'Image Pointer', order: '03', category: 'Pointer', description: 'This demo for Essential<sup>®</sup> JS2 Circular Gauge control visualizes the short-put distance covered by the athletes by using the image pointer.'},
    { path: ':theme/circular-gauge/range-customization', component: RangeComponent, name: 'Range Customization', order: '04', category: 'Range', description: 'This demo for Essential<sup>®</sup> JS2 Circular Gauge control shows various properties available to customize the ranges in the circular gauge.' },
    { path: ':theme/circular-gauge/multiple-ranges', component: MultipleRangesComponent,  name: 'Multiple Ranges', order: '04', category: 'Range', description: 'This demo for Essential<sup>®</sup> JS2 Circular Gauge control illustrates the multiple ranges in the circular gauge.'},
    { path: ':theme/circular-gauge/legend', component: LegendComponent, name: 'Legend', order: '04',  category: 'Range', description: 'This demo for Essential<sup>®</sup> JS2 Circular Gauge control shows the properties required to customize the legend.'},
    { path: ':theme/circular-gauge/arc-gauge', component: ArcGaugeComponent, name: 'Arc Gauge', order: '05',  category: 'Arc Gauge', description: 'This demo for Essential<sup>®</sup> JS2 Circular Gauge control shows the properties required to customize the pointers.'},
    { path: ':theme/circular-gauge/semi-circular-gauge', component: SemiCircleComponent, name: 'Semi-circular Gauge',  order: '05', category: 'Arc Gauge', description: 'This demo for Essential<sup>®</sup> JS2 Circular Gauge control shows the properties required to customize the pointers.'},
    { path: ':theme/circular-gauge/pointer-ranges-drag', component: UserInteractionComponent, name: 'Pointer & Ranges Drag', order: '06', category: 'User Interaction', description: 'This demo for Essential<sup>®</sup> JS2 Circular Gauge control visualizes the pointer drag support and its options.'},
    { path: ':theme/circular-gauge/tooltip', component: TooltipComponent, name: 'Tooltip', order: '06', category: 'User Interaction', description: 'This demo for Essential<sup>®</sup> JS2 Circular Gauge control visualizes the tooltip for circular gauge pointer and ranges.'},
    { path: ':theme/circular-gauge/print-export', component: ExportComponent, name: 'Print & Export', order: '07', category: 'Print & Export', description: 'This demo for Essential<sup>®</sup> JS2 Circular Gauge control will print and export the circular gauge in a required format.'},
    { path: ':theme/circular-gauge/clock', component: ClockComponent, name: 'Clock', order: '08', category: 'Use Cases', description: 'This demo for Essential<sup>®</sup> JS2 Circular Gauge control illustrates a clock by using annotation feature in the gauge.'},
    { path: ':theme/circular-gauge/radial-slider', component: RadialSliderComponent, name: 'Radial Slider', order: '08', category: 'Use Cases', description: 'This demo for Essential<sup>®</sup> JS2 Circular Gauge control to design the radial slider by using the circular gauge.'},
    { path: ':theme/circular-gauge/direction-compass', component: DirectionComponent, name: 'Direction Compass', order: '08', category: 'Use Cases', description: 'This demo for Essential<sup>®</sup> JS2 Circular Gauge control illustrates how to make a direction compass by using the circular gauge.'},
    { path: ':theme/circular-gauge/speedometer', component: SpeedometerComponent , name: 'Speedometer', order: '08', category: 'Use Cases', description: 'This demo for Essential<sup>®</sup> JS2 Circular Gauge control demonstrates live data, along with the data grid control.'},
    { path: ':theme/circular-gauge/sleep-tracker', component: SleepTrackerComponent , name: 'Sleep Tracker',  order: '08', category: 'Use Cases', description: 'This demo for Essential<sup>®</sup> JS2 Circular Gauge control to design sleep tracker by using circular gauge.'},
    { path: ':theme/circular-gauge/data-sample', component: SampleDataComponent , name: 'Data Sample', order: '08', category: 'Use Cases', description: 'This demo for Essential<sup>®</sup> JS2 Circular Gauge control demonstrates live data, along with the data grid control.'},
    { path: ':theme/circular-gauge/apple-watch-rings', component: AppleWatchComponent, name: 'Apple Watch Rings',  order: '08', category: 'Use Cases', description: 'This demo for Essential<sup>®</sup> JS2 Circular Gauge control demonstrates live data, along with the apple watch rings.'}
];

export const CircularGaugeSampleModule: ModuleWithProviders<any> = RouterModule.forChild(circulargaugeAppRoutes);