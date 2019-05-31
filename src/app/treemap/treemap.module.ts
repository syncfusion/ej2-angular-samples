/**
 * Maps Control
 */
import { NgModule, ModuleWithProviders, Type } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../common/shared.module';
import { TreeMapAllModule } from '@syncfusion/ej2-angular-treemap';
import { TreemapDefaultComponent } from './default.component';
import { TreemapLayoutComponent } from './layout.component';
import { TreemapDrillDownComponent } from './drilldown.component';
import { TreemapCustomComponent } from './custom.component';
import { TreemapLabelComponent } from './label.component';
import { TreemapTooltipComponent } from './tooltip.component';
import { TreemapLegendComponent } from './legend.component';
import { TreemapSelectComponent } from './selection.component';
import { TreemapPrintComponent } from './print.component';
import { TreemapPieComponent } from './pie.component';
import { TreemapcolorMappingComponent } from './color-mapping.component';
import { TreemapRTLComponent } from './rtl.component';

export const treemapAppRoutes: Object[] = [
    { path: ':theme/treemap/default', component: TreemapDefaultComponent, name: 'Default Functionalities', order: '01', category: 'TreeMap', description: 'This demo for Essential JS2 TreeMap control visualizes the sales of cars across various countries in 2017.' },
    { path: ':theme/treemap/layout', component: TreemapLayoutComponent, type:'update',  name: 'Layout', order: '01', category: 'TreeMap', description: 'This demo for Essential JS2 TreeMap control illustrates the GDP nominal of top 10 countries in the year 2015. The layout of the TreeMap can also be changed.' },
    { path: ':theme/treemap/drilldown', component: TreemapDrillDownComponent, type:'update', name: 'Drilldown', order: '01', category: 'TreeMap', description: 'This demo for Essential JS2 TreeMap control demonstrates drill-down with the continents at the top level followed by regions and countries.' },
    { path: ':theme/treemap/custom', component: TreemapCustomComponent, name: 'Customization', order: '01', category: 'TreeMap', description: 'This demo for Essential JS2 TreeMap control depicts the gold medal categories of the 2016 US Summer Olympics. Each category is denoted with label template.' },
    { path: ':theme/treemap/label', component: TreemapLabelComponent, name: 'Data Label', order: '01', category: 'TreeMap', description: 'This demo for Essential JS2 TreeMap control depicts the population level of various countries in 2017 along with data labels.' },
    { path: ':theme/treemap/tooltip', component: TreemapTooltipComponent, name: 'Tooltip', order: '01', category: 'TreeMap', description: 'This demo for Essential JS2 TreeMap control depicts the number of international airports available in various countries in South America along with tooltip.' },
    { path: ':theme/treemap/legend', component: TreemapLegendComponent, type:'update',  name: 'Legend', order: '01',  category: 'TreeMap', description: 'This demo for Essential JS2 TreeMap control visualizes the 2016 U.S.A. presidential election results. Default and interactive are the two types of legend.' },
    { path: ':theme/treemap/color-mapping', component: TreemapcolorMappingComponent, name: 'Color Mapping',  order: '01', category: 'TreeMap', description: 'This demo for Essential JS2 TreeMap control with color mapping.' },
    { path: ':theme/treemap/selection', component: TreemapSelectComponent,
     name: 'Selection & Highlight', order: '01', category: 'TreeMap', description: 'This demo for Essential JS2 TreeMap control depicts the details of goods imported by Japan. Selection and highlight options have been enabled.' },
    { path: ':theme/treemap/print', component: TreemapPrintComponent, name: 'Print & Export', order: '01', category: 'TreeMap', description: 'This demo for Essential JS2 TreeMap control depicts the top 10 best-selling smartphone brands. Print and export options have been enabled.' },
    { path: ':theme/treemap/pie', component: TreemapPieComponent, name: 'TreeMap with Pie', order: '01', category: 'TreeMap', description: 'This demo for Essential JS2 TreeMap control visualizes the population level of various continents in 2011 based on the gender and age group.' },
    { path: ':theme/treemap/rtl', component: TreemapRTLComponent, type:'new',  name: 'RTL', order: '01', category: 'TreeMap', description: 'This demo for Essential JS2 TreeMap control visualizes the population level of various continents in 2011 based on the gender and age group.' },
];

export const treemapRouter: ModuleWithProviders = RouterModule.forChild(treemapAppRoutes);
let declarations: Type<Object>[] = [
    TreemapDefaultComponent,
    TreemapLayoutComponent,
    TreemapDrillDownComponent,
    TreemapCustomComponent,
    TreemapLabelComponent,
    TreemapTooltipComponent,
    TreemapLegendComponent,
    TreemapSelectComponent,
    TreemapPrintComponent,
    TreemapPieComponent,
    TreemapcolorMappingComponent,
    TreemapRTLComponent
];
@NgModule({
    imports: [treemapRouter,  SharedModule, TreeMapAllModule],
    exports: [],
    declarations: declarations,
    providers: [TreeMapAllModule]
})
export class TreemapSampleModule {
}