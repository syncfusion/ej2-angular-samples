/**
 * 3D Chart Control
 */
import { NgModule, ModuleWithProviders, Type } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Chart3DAllModule } from '@syncfusion/ej2-angular-charts';
import { BacktoBackColumnComponent } from './back-to-back-column.component';
import { BarComponent } from './bar.component';
import { ColumnComponent } from './column.component';
import { EmptyPointColumnComponent } from './empty-point.component';
import { StackingBarComponent } from './stacked-bar.component';
import { StackingBar100Component } from './stacked-bar-100.component';
import { StackingColumnComponent } from './stacked-column.component';
import { StackingColumn100Component } from './stacked-column-100.component';
import { CylinderComponent } from './cylinder.component';

export const threeDimensionChartAppRoutes: Object[] = [
    {
        path: ':theme/three-dimension-chart/column',
        component: ColumnComponent,
        name: 'Column',
        order: '01',
        category: '3D Chart'
    },
    {
        path: ':theme/three-dimension-chart/back-to-back-column',
        component: BacktoBackColumnComponent,
        name: 'Back to Back Column',
        order: '01',
        category: '3D Chart'
    },
    {
        path: ':theme/three-dimension-chart/cylinder',
        component: CylinderComponent,
        name: 'Cylindrical Column',
        order: '01',
        category: '3D Chart'
    },
    {
        path: ':theme/three-dimension-chart/bar',
        component: BarComponent,
        name: 'Bar',
        order: '01',
        category: '3D Chart'
    },
    {
        path: ':theme/three-dimension-chart/stacked-column',
        component: StackingColumnComponent,
        name: 'Stacking Column with Grouping',
        order: '01',
        category: '3D Chart'
    },
    {
        path: ':theme/three-dimension-chart/stacked-column-100',
        component: StackingColumn100Component,
        name: '100% Stacked Column',
        order: '01',
        category: '3D Chart'
    },
    {
        path: ':theme/three-dimension-chart/stacked-bar',
        component: StackingBarComponent,
        name: 'Stacked Bar',
        order: '01',
        category: '3D Chart'
    },
    {
        path: ':theme/three-dimension-chart/stacked-bar-100',
        component: StackingBar100Component,
        name: '100% Stacked Bar',
        order: '01',
        category: '3D Chart'
    },
    {
        path: ':theme/three-dimension-chart/empty-point',
        component: EmptyPointColumnComponent,
        name: 'Column with null and 0 values',
        order: '01',
        category: '3D Chart'
    }
];

export const ThreeDimensionChartSampleModule: ModuleWithProviders<any> = RouterModule.forChild(threeDimensionChartAppRoutes);

