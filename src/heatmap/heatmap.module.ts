/**
 * HeatMap Control
 */
import { NgModule, ModuleWithProviders, Type } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../common/shared.module';
import { HeatMapAllModule } from '@syncfusion/ej2-angular-heatmap';
import { HeatmapDefaultComponent } from './default.component';
import { HeatmapCalendarComponent } from './calendar-heatmap.component';
import { HeatmapRowJsonComponent } from './row-json-binding.component';
import { HeatmapCellJsonComponent } from './cell-json-binding.component';
import { HeatmapArrayRowComponent } from './array-row.component';
import { HeatmapArrayCellComponent } from './array-cell.component';
import { HeatmapInversedComponent } from './inversed.component';
import { HeatmapOpposedComponent } from './opposed.component';
import { HeatmapLegendComponent } from './legend.component';
import { HeatmapPaletteComponent } from './palette.component';
import { HeatmapLargeDataComponent } from './large-data.component';
import { HeatmapRenderModeComponent } from './render-mode.component';
import { HeatmapTooltipComponent } from './tooltip-template.component';
import { HeatmapEmptyPointComponent } from './empty-points.component';
import { HeatmapBubbleHeatMapComponent } from './bubble-heatmap.component';
import { HeatmapMultiDataBindingComponent } from './multiple-data-binding.component'

export const heatmapAppRoutes: Object[] = [
    {
        path: ':theme/heatmap/default', component: HeatmapDefaultComponent,
        description: 'This demo for Essential JS2 Heatmap control shows the heat map control displayed with minimum configuration.',
        name: 'Default Functionalities', order: '01', category: 'HeatMap'
    },
    {
        path: ':theme/heatmap/bubble-heatmap', component: HeatmapBubbleHeatMapComponent,
        description: 'This demo for Essential JS2 Heatmap control shows  Size, Color and SizeAndColor bubble heat map type.',
        name: 'Bubble Heatmap', 'type': 'new', order: '01', category: 'HeatMap'
    },
    {
        path: ':theme/heatmap/calendar-heatmap', component: HeatmapCalendarComponent,
        description: 'This demo for Essential JS2 Heatmap control for displays the time series data and displays the axis labels at specific time interval.',
        name: 'Calendar Heatmap', order: '01', category: 'HeatMap', type: 'new'
    },
    {
        path: ':theme/heatmap/array-row', component: HeatmapArrayRowComponent,
        description: 'This demo for Essential JS2 Heatmap control demonstrates how to bind the data to heat map with series of array for each columns.',
        name: 'Row', order: '02', category: 'Data Binding'
    },
    {
        path: ':theme/heatmap/array-cell', component: HeatmapArrayCellComponent,
        description: 'This demo for Essential JS2 Heatmap control demonstrates how to bind the array data with values for each cell to heatmap.',
        name: 'Cell', order: '02', category: 'Data Binding'
    },
    {
        path: ':theme/heatmap/row-json-binding', component: HeatmapRowJsonComponent,
        description: 'This demo for Essential JS2 Heatmap control demonstrates how to bind the JSON object with data for each columns to heatmap.',
        name: 'JSON Row', order: '02', category: 'Data Binding'
    },
    {
        path: ':theme/heatmap/cell-json-binding', component: HeatmapCellJsonComponent,
        description: 'This demo for Essential JS2 Heatmap control demonstrates how to bind the JSON object with data for each cell to heat map.',
        name: 'JSON Cell', order: '02', category: 'Data Binding'
    },
    {
        path: ':theme/heatmap/multiple-data-binding', component: HeatmapMultiDataBindingComponent,
        description: 'This demo for Essential JS2 Heatmap control shows how to bind the multiple data to bubble heat map.',
        name: 'Multiple Data Binding', order: '02', category: 'Data Binding', type: 'new'
    },
    {
        path: ':theme/heatmap/empty-points', component: HeatmapEmptyPointComponent,
        description: 'This demo for Essential JS2 Heatmap control shows the usage of empty points or null points in heat map.',
        name: 'Empty Points', order: '03', category: 'Features'
    },
    {
        path: ':theme/heatmap/inversed', component: HeatmapInversedComponent,
        description: 'This demo for Essential JS2 Heatmap control shows how to inverse the axis in heat map',
        name: 'Inversed Axis', order: '03', category: 'Features'
    },
    {
        path: ':theme/heatmap/opposed', component: HeatmapOpposedComponent,
        description: 'This demo for Essential JS2 Heatmap control shows how to place the axis opposite to the default position in heatmap.',
        name: 'Opposed Axis', order: '03', category: 'Features'
    },
    {
        path: ':theme/heatmap/legend', component: HeatmapLegendComponent,
        description: 'This demo for Essential JS2 Heatmap control shows how to place the heatmap legend in different positions.',
        name: 'Legend Placement', order: '03', category: 'Features'
    },
    {
        path: ':theme/heatmap/large-data', component: HeatmapLargeDataComponent,
        description: 'This demo for Essential JS2 Heatmap control shows how to bind the large data in heat map using canvas rendering mode.',
        name: 'Large Data', order: '03', category: 'Features'
    },
    {
        path: ':theme/heatmap/palette', component: HeatmapPaletteComponent,
        description: 'This demo for Essential JS2 Heatmap control demonstrates applying gradient colors or solid colors for the heatmap cells.',
        name: 'Palette Mode', order: '03', category: 'Features', type: 'update'
    },
    {
        path: ':theme/heatmap/render-mode', component: HeatmapRenderModeComponent,
        description: 'This demo for Essential JS2 Heatmap shows switching the rendering mode of the heatmap cells between SVG and canvas rendering logics.',
        name: 'Rendering Mode', order: '03', category: 'Features'
    },
    {
        path: ':theme/heatmap/tooltip-template', component: HeatmapTooltipComponent,
        description: 'This demo for Essential JS2 Heatmap control shows the usage of tooltip template in heat map.',
        name: 'Tooltip Template', order: '03', category: 'Features'
    },
];

export const heatmapRouter: ModuleWithProviders = RouterModule.forChild(heatmapAppRoutes);
let declarations: Type<Object>[] = [
    HeatmapDefaultComponent,
    HeatmapCalendarComponent,
    HeatmapRowJsonComponent,
    HeatmapCellJsonComponent,
    HeatmapArrayRowComponent,
    HeatmapArrayCellComponent,
    HeatmapEmptyPointComponent,
    HeatmapInversedComponent,
    HeatmapOpposedComponent,
    HeatmapLegendComponent,
    HeatmapLargeDataComponent,
    HeatmapPaletteComponent,
    HeatmapRenderModeComponent,
    HeatmapTooltipComponent,
    HeatmapBubbleHeatMapComponent,
    HeatmapMultiDataBindingComponent
];
@NgModule({
    imports: [heatmapRouter, SharedModule, HeatMapAllModule],
    exports: [HeatmapDefaultComponent],
    declarations: declarations,
    providers: [HeatMapAllModule]
})
export class HeatmapSampleModule {
}