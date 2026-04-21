import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SankeyDefaultComponent } from './default.component';
import { SankeyOrientationComponent } from './orientation.component';
import { SankeyPrintExportComponent } from './print-export.component';

export const sankeyAppRoutes: Object[] = [
  { path: ':theme/sankey-chart/default', component: SankeyDefaultComponent, name: 'Default', order: '01', category: 'Sankey' },
  { path: ':theme/sankey-chart/orientation', component: SankeyOrientationComponent, name: 'Vertical Mode', order: '01', category: 'Sankey' },
  { path: ':theme/sankey-chart/print-export', component: SankeyPrintExportComponent, name: 'Print and Export', order: '01', category: 'Sankey' }
];

export const SankeySampleModule: ModuleWithProviders<any> = RouterModule.forChild(sankeyAppRoutes);