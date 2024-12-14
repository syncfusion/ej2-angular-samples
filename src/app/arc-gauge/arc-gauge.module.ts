/**
 * Arc Gauge Control
 */
import { NgModule, ModuleWithProviders, Type } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CircularGaugeAllModule } from '@syncfusion/ej2-angular-circulargauge';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { DefaultComponent } from './default.component';
import { CustomerSatisfactionComponent } from './customer-satisfaction-score.component';
import { KeyPerformanceComponent } from './key-performance-indicator.component';
import { PatternsComponent } from './patterns.component';
import { ButtonModule, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';

export const arcgaugeAppRoutes: Object[] = [
    { path: ':theme/arc-gauge/default', component: DefaultComponent, name: 'Default Functionalities', order: '01', category: 'Arc Gauge', description: 'This Essential<sup>®</sup> JS2 Arc Gauge demo shows the gauges basic rendering.'},
    { path: ':theme/arc-gauge/customer-satisfaction-score', component: CustomerSatisfactionComponent, name: 'Customer Satisfaction Score', order: '01', category: 'Arc Gauge', description: 'This Essential<sup>®</sup> JS2 Arc Gauge demo shows how the gauge can be customized to represent a customer satisfaction score scenario.'},
    { path: ':theme/arc-gauge/key-performance-indicator', component: KeyPerformanceComponent, name: 'Key Performance Indicator', order: '01', category: 'Arc Gauge', description: 'This Essential<sup>®</sup> JS2 Arc Gauge demo shows how the gauge can be customized to represent a key performance indicator scenario.'},
    { path: ':theme/arc-gauge/patterns', component: PatternsComponent, name: 'Patterns', order: '01', category: 'Arc Gauge', description: 'This Essential<sup>®</sup> JS2 Arc Gauge demo shows how the gauge can be rendered in many ways to demonstrate different user interfaces by customizing its axis, range, pointer, etc.'}
];

export const ArcGaugeSampleModule: ModuleWithProviders<any> = RouterModule.forChild(arcgaugeAppRoutes);
