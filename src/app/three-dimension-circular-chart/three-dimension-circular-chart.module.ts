/**
 * 3D Chart Control
 */
import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Pie } from './pie.component';
import { Donut } from './donut.component';
import { PieLegend } from './pie-legend.component';
import { PieRadius } from './pie-radius.component';
import { PieSelection } from './selection.component';

export const threeDimensionCircularChartAppRoutes: Object[] = [
    {
        path: ':theme/three-dimension-circular-chart/pie',
        component: Pie,
        name: 'Pie',
        order: '01',
        category: '3D Circular Chart'
    },
    {
        path: ':theme/three-dimension-circular-chart/donut',
        component: Donut,
        name: 'Donut',
        order: '01',
        category: '3D Circular Chart'
    },
    {
        path: ':theme/three-dimension-circular-chart/pie-legend',
        component: PieLegend,
        name: 'Pie with Legend',
        order: '01',
        category: '3D Circular Chart'
    },
    {
        path: ':theme/three-dimension-circular-chart/pie-radius',
        component: PieRadius,
        name: 'Pie with Various Radius',
        order: '01',
        category: '3D Circular Chart'
    },
    {
        path: ':theme/three-dimension-circular-chart/selection',
        component: PieSelection,
        name: 'Selection',
        order: '01',
        category: '3D Circular Chart'
    }
];

export const ThreeDimensionCircularChartSampleModule: ModuleWithProviders<any> = RouterModule.forChild(threeDimensionCircularChartAppRoutes);

