/**
 * Lineargauge Control
 */
import { NgModule, ModuleWithProviders, Type } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LinearGaugeAllModule } from '@syncfusion/ej2-angular-lineargauge';

import { DefaultComponent } from './default-functionalities.component';
import { ContainerComponent } from './container.component';
import { TrackComponent } from './track.component';
import { TicksComponent} from './ticks.component';
import { LabelsComponent } from './labels.component';
import { RangesComponent } from './range.component';
import { MarkerPointerComponent } from './marker-pointer.component';
import { BarPointerComponent } from './bar-pointer.component';
import { CustomPointerComponent } from './custom-pointer.component';
import { TooltipComponent } from './tooltip.component';
import { ExportComponent } from './print-export.component';
import { ProgressBarComponent } from './progress-bar.component';
import { StepProgressBarComponent } from './step-progress-bar.component';
import { SliderComponent } from './slider.component';
import { ThermometerComponent } from './thermometer.component';
import { StepsCounterComponent } from './steps-counter.component';
import { VolumeSettingsComponent } from './volume-settings.component';
import { BatteryIndicatorComponent } from './battery-indicator.component';
import { ButtonModule, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';

export const lineargaugeAppRoutes: Object[] = [
    { path: ':theme/linear-gauge/default-functionalities', component: DefaultComponent, name: 'Default Functionalities', order: '01', category: 'Linear Gauge', description: 'This demo for Essential<sup>®</sup> JS2 Linear Gauge control illustrates the default rendering of linear gauge.' },
    { path: ':theme/linear-gauge/container', component: ContainerComponent, name: 'Container', order: '02', category: 'Axis', description: 'This demo for Essential<sup>®</sup> JS2 Linear Gauge control demonstrates the various types of containers available in linear gauge.' },
    { path: ':theme/linear-gauge/track', component: TrackComponent, name: 'Track', order: '02', category: 'Axis', description: 'This demo for Essential<sup>®</sup> JS2 Linear Gauge control visualizes the available options for customization.' },
    { path: ':theme/linear-gauge/ticks', component: TicksComponent, name: 'Ticks', order: '02', category: 'Axis', description: 'This demo for Essential<sup>®</sup> JS2 Linear Gauge control illustrates gradient support for pointers and ranges.' },
    { path: ':theme/linear-gauge/labels', component: LabelsComponent, name: 'Labels', order: '02', category: 'Axis', description: 'This demo for Essential<sup>®</sup> JS2 Linear Gauge control illustrates the CPU Utilization of a resource by using annotation feature.' },
    { path: ':theme/linear-gauge/range', component: RangesComponent, name: 'Range', order: '03', category: 'Range', description: 'This demo for Essential<sup>®</sup> JS2 Linear Gauge control illustrates how to highlight specific regions in an axis by using ranges.' },
    { path: ':theme/linear-gauge/marker-pointer', component: MarkerPointerComponent, name: 'Marker Pointer', order: '04', category: 'Pointer', description: 'This demo for Essential<sup>®</sup> JS2 Linear Gauge control shows various properties available to customize the axes and pointers.' },
    { path: ':theme/linear-gauge/bar-pointer', component: BarPointerComponent, name: 'Bar Pointer', order: '04', category: 'Pointer', description: 'This demo for Essential<sup>®</sup> JS2 Linear Gauge control shows various properties available to customize the axes and pointers.' },
    { path: ':theme/linear-gauge/custom-pointer', component: CustomPointerComponent, name: 'Custom Pointer', order: '04', category: 'Pointer', description: 'This demo for Essential<sup>®</sup> JS2 Linear Gauge control shows various properties available to customize the axes and pointers.' },
    { path: ':theme/linear-gauge/tooltip', component: TooltipComponent, name: 'Tooltip', order: '05', category: 'User Interaction', description: 'This demo for Essential<sup>®</sup> JS2 Linear Gauge control visualizes the tooltip functionality for bar pointer.' },
    { path: ':theme/linear-gauge/print-export', component: ExportComponent, name: 'Print & Export', order: '06', category: 'Print & Export', description: 'This demo for Essential<sup>®</sup> JS2 Linear Gauge control will print and export gauge in required format.' },
    { path: ':theme/linear-gauge/progress-bar', component: ProgressBarComponent, name: 'Progress Bar', order: '07', category: 'Use Cases', description: 'This demo for Essential<sup>®</sup> JS2 Linear Gauge control illustrates exercise tracking of an athlete by using ranges, pointers, and annotation features.' },
    { path: ':theme/linear-gauge/step-progress-bar', component: StepProgressBarComponent, name: 'Step Progress Bar', order: '07', category: 'Use Cases', description: 'This demo for Essential<sup>®</sup> JS2 Linear Gauge control illustrates exercise tracking of an athlete by using ranges, pointers, and annotation features.' },
    { path: ':theme/linear-gauge/slider', component: SliderComponent, name: 'Slider', order: '07', category: 'Use Cases', description: 'This demo for Essential<sup>®</sup> JS2 Linear Gauge control illustrates exercise tracking of an athlete by using ranges, pointers, and annotation features.' },
    { path: ':theme/linear-gauge/thermometer', component: ThermometerComponent, name: 'Thermometer', order: '07', category: 'Use Cases', description: 'This demo for Essential<sup>®</sup> JS2 Linear Gauge control illustrates exercise tracking of an athlete by using ranges, pointers, and annotation features.' },
    { path: ':theme/linear-gauge/steps-counter', component: StepsCounterComponent, name: 'Steps Counter', order: '07', category: 'Use Cases', description: 'This demo for Essential<sup>®</sup> JS2 Linear Gauge control illustrates exercise tracking of an athlete by using ranges, pointers, and annotation features.' },
    { path: ':theme/linear-gauge/volume-settings', component: VolumeSettingsComponent, name: 'Volume Settings', order: '07', category: 'Use Cases', description: 'This demo for Essential<sup>®</sup> JS2 Linear Gauge control illustrates exercise tracking of an athlete by using ranges, pointers, and annotation features.' },
    { path: ':theme/linear-gauge/battery-indicator', component: BatteryIndicatorComponent, name: 'Battery Indicator', order: '07', category: 'Use Cases', description: 'This demo for Essential<sup>®</sup> JS2 Linear Gauge control illustrates exercise tracking of an athlete by using ranges, pointers, and annotation features.' }
];

export const LinearGaugeSampleModule: ModuleWithProviders<any> = RouterModule.forChild(lineargaugeAppRoutes);
