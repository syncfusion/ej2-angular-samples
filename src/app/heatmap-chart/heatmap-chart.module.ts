/**
 * HeatMap Control
 */
import { NgModule, ModuleWithProviders, Type } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HeatMapAllModule } from '@syncfusion/ej2-angular-heatmap';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { HeatmapDefaultComponent } from './default-functionalities.component';
import { HeatmapCalendarComponent } from './calendar-heatmap.component';
import { HeatmapRowJsonComponent } from './json-row.component';
import { HeatmapCellJsonComponent } from './json-cell.component';
import { HeatmapArrayRowComponent } from './row.component';
import { HeatmapArrayCellComponent } from './cell.component';
import { HeatmapInversedComponent } from './inversed-axis.component';
import { HeatmapOpposedComponent } from './opposed-axis.component';
import { HeatmapLegendComponent } from './legend-placement.component';
import { HeatmapMultilevelLabelComponent } from './multi-level-labels.component';
import { HeatmapCellSelectionComponent } from './cell-selection.component';
import { HeatmapPaletteComponent } from './palette-mode.component';
import { HeatmapColorRangeComponent } from './color-range.component';
import { HeatmapLargeDataComponent } from './large-data.component';
import { HeatmapRenderModeComponent } from './render-mode.component';
import { HeatmapTooltipComponent } from './tooltip-template.component';
import { HeatmapEmptyPointComponent } from './empty-points.component';
import { LabelTemplateComponent } from './label-template.component';
import { HeatmapBubbleTypesComponent } from './bubble-types.component';
import { HeatmapColorAndSizeAttributesComponent } from './color-and-size-attributes.component'

export const heatmapAppRoutes: Object[] = [
    {
        path: ':theme/heatmap-chart/default-functionalities', component: HeatmapDefaultComponent,
        description: 'This demo for Essential<sup>®</sup> JS2 Heatmap control shows the heat map control displayed with minimum configuration.',
        name: 'Default Functionalities', order: '01', category: 'Heatmap Chart',
        sourceFiles: [
            {displayName: 'default-functionalities.component.ts', path: './src/heatmap-chart/default-functionalities.component.ts'},
            {displayName: 'default-data.ts', path: './src/heatmap-chart/default-data.ts'}
        ]
    },
    {
        path: ':theme/heatmap-chart/calendar-heatmap', component: HeatmapCalendarComponent,
        description: 'This demo for Essential<sup>®</sup> JS2 Heatmap control for displays the time series data and displays the axis labels at specific time interval.',
        name: 'Calendar Heatmap', order: '01', category: 'Heatmap Chart',
        sourceFiles: [
            {displayName: 'calendar-heatmap.component.ts', path: './src/heatmap-chart/calendar-heatmap.component.ts'},
            {displayName: 'calendar-data-source.ts', path: './src/heatmap-chart/calendar-data-source.ts'}
        ]
    },
    {
        path: ':theme/heatmap-chart/bubble-types', component: HeatmapBubbleTypesComponent,
        description: 'This demo for Essential<sup>®</sup> JS2 Heatmap control shows  Size, Color and SizeAndColor bubble heat map type.',
        name: 'Bubble Types', order: '02', category: 'Bubble Heatmap',
        sourceFiles: [
            {displayName: 'bubble-types.component.ts', path: './src/heatmap-chart/bubble-types.component.ts'},
            {displayName: 'table-bubble-data.ts', path: './src/heatmap-chart/table-bubble-data.ts'}
        ]
    },
    {
        path: ':theme/heatmap-chart/color-and-size-attributes', component: HeatmapColorAndSizeAttributesComponent,
        description: 'This demo for Essential<sup>®</sup> JS2 Heatmap control shows how to bind the multiple data to bubble heat map.',
        name: 'Color and Size Attributes', order: '02', category: 'Bubble Heatmap'
    },
    {
        path: ':theme/heatmap-chart/row', component: HeatmapArrayRowComponent,
        description: 'This demo for Essential<sup>®</sup> JS2 Heatmap control demonstrates how to bind the data to heat map with series of array for each columns.',
        name: 'Row', order: '03', category: 'Data Binding'
    },
    {
        path: ':theme/heatmap-chart/cell', component: HeatmapArrayCellComponent,
        description: 'This demo for Essential<sup>®</sup> JS2 Heatmap control demonstrates how to bind the array data with values for each cell to heatmap.',
        name: 'Cell', order: '03', category: 'Data Binding'
    },
    {
        path: ':theme/heatmap-chart/json-row', component: HeatmapRowJsonComponent,
        description: 'This demo for Essential<sup>®</sup> JS2 Heatmap control demonstrates how to bind the JSON object with data for each columns to heatmap.',
        name: 'JSON Row', order: '03', category: 'Data Binding'
    },
    {
        path: ':theme/heatmap-chart/json-cell', component: HeatmapCellJsonComponent,
        description: 'This demo for Essential<sup>®</sup> JS2 Heatmap control demonstrates how to bind the JSON object with data for each cell to heat map.',
        name: 'JSON Cell', order: '03', category: 'Data Binding'
    },
    {
        path: ':theme/heatmap-chart/empty-points', component: HeatmapEmptyPointComponent,
        description: 'This demo for Essential<sup>®</sup> JS2 Heatmap control shows the usage of empty points or null points in heat map.',
        name: 'Empty Points', order: '04', category: 'Features',
        sourceFiles: [
            {displayName: 'empty-points.component.ts', path: './src/heatmap-chart/empty-points.component.ts'},
            {displayName: 'empty-point-data-source.ts', path: './src/heatmap-chart/empty-point-data-source.ts'}
        ]
    },
    {
        path: ':theme/heatmap-chart/inversed-axis', component: HeatmapInversedComponent,
        description: 'This demo for Essential<sup>®</sup> JS2 Heatmap control shows how to inverse the axis in heat map',
        name: 'Inversed Axis', order: '04', category: 'Features',
        sourceFiles: [
            {displayName: 'inversed.component.ts', path: './src/heatmap-chart/inversed.component.ts'},
            {displayName: 'inversed-axis-data.ts', path: './src/heatmap-chart/inversed-axis-data.ts'}
        ]
    },
    {
        path: ':theme/heatmap-chart/opposed-axis', component: HeatmapOpposedComponent,
        description: 'This demo for Essential<sup>®</sup> JS2 Heatmap control shows how to place the axis opposite to the default position in heatmap.',
        name: 'Opposed Axis', order: '04', category: 'Features',
        sourceFiles: [
            {displayName: 'opposed.component.ts', path: './src/heatmap-chart/opposed.component.ts'},
            {displayName: 'opposed-axis-data.ts', path: './src/heatmap-chart/opposed-axis-data.ts'}
        ]
    },
    {
        path: ':theme/heatmap-chart/label-template', component: LabelTemplateComponent,
        description: 'This demo for Essential<sup>®</sup> JS2 Heatmap control demonstrates how to bind the JSON object with data for each cell to heat map.',
        name: 'Label Template', order: '04', category: 'Features'
    },
    {
        path: ':theme/heatmap-chart/multi-level-labels', component: HeatmapMultilevelLabelComponent,
        description: 'This demo for Essential<sup>®</sup> JS2 Heatmap control shows how to group the axis labels',
        name: 'Multi Level Labels', order: '04', category: 'Features',
        sourceFiles: [
            {displayName: 'multi-level-labels.component.ts', path: './src/heatmap-chart/multi-level-labels.component.ts'},
            {displayName: 'multi-level-label-data.ts', path: './src/heatmap-chart/multi-level-label-data.ts'}
        ]
    },
    {
        path: ':theme/heatmap-chart/cell-selection', component: HeatmapCellSelectionComponent,
        description: 'This demo for Essential<sup>®</sup> JS2 Heatmap control shows how to select the cell.',
        name: 'Selection', order: '04', category: 'Features',
        sourceFiles: [
            {displayName: 'cell-selection.component.ts', path: './src/heatmap-chart/cell-selection.component.ts'},
            {displayName: 'cell-selection-data.ts', path: './src/heatmap-chart/cell-seletion-data.ts'}
        ]
    },
    {
        path: ':theme/heatmap-chart/legend-placement', component: HeatmapLegendComponent,
        description: 'This demo for Essential<sup>®</sup> JS2 Heatmap control shows how to place the heatmap legend in different positions.',
        name: 'Legend Placement', order: '04', category: 'Features',
        sourceFiles: [
            {displayName: 'legend-placement.component.ts', path: './src/heatmap-chart/legend-placement.component.ts'},
            {displayName: 'legend-sample-data.ts', path: './src/heatmap-chart/legend-sample-data.ts'}
        ]
    },
    {
        path: ':theme/heatmap-chart/large-data', component: HeatmapLargeDataComponent,
        description: 'This demo for Essential<sup>®</sup> JS2 Heatmap control shows how to bind the large data in heat map using canvas rendering mode.',
        name: 'Large Data', order: '04', category: 'Features',
        sourceFiles: [
            {displayName: 'large-data.component.ts', path: './src/heatmap-chart/large-data.component.ts'},
            {displayName: 'large-data.ts', path: './src/heatmap-chart/large-data.ts'}
        ]
    },    
    {
        path: ':theme/heatmap-chart/palette-mode', component: HeatmapPaletteComponent,
        description: 'This demo for Essential<sup>®</sup> JS2 Heatmap control demonstrates applying gradient colors or solid colors for the heatmap cells.',
        name: 'Palette Mode', order: '04', category: 'Features',
        sourceFiles: [
            {displayName: 'palette-mode.component.ts', path: './src/heatmap-chart/palette-mode.component.ts'},
            {displayName: 'palette-sample-data.ts', path: './src/heatmap-chart/palette-sample-data.ts'}
        ]
    },
    {
        path: ':theme/heatmap-chart/color-range', component: HeatmapColorRangeComponent,
        description: 'This demo for Essential<sup>®</sup> JS2 Heatmap control demonstrates applying color range for the heatmap cells.',
        name: 'Color Range', order: '04', category: 'Features',
        sourceFiles: [
            {displayName: 'color-range.component.ts', path: './src/heatmap-chart/color-range.component.ts'},
            {displayName: 'color-range-data.ts', path: './src/heatmap-chart/color-range-data.ts'}
        ]
    },
    {
        path: ':theme/heatmap-chart/render-mode', component: HeatmapRenderModeComponent,
        description: 'This demo for Essential<sup>®</sup> JS2 Heatmap shows switching the rendering mode of the heatmap cells between SVG and canvas rendering logics.',
        name: 'Rendering Mode', order: '04', category: 'Features',
        sourceFiles: [
            {displayName: 'render-mode.component.ts', path: './src/heatmap-chart/render-mode.component.ts'},
            {displayName: 'render-mode-data.ts', path: './src/heatmap-chart/render-mode-data.ts'}
        ]
    },
    {
        path: ':theme/heatmap-chart/tooltip-template', component: HeatmapTooltipComponent,
        description: 'This demo for Essential<sup>®</sup> JS2 Heatmap control shows the usage of tooltip template in heat map.',
        name: 'Tooltip Template', order: '04', category: 'Features',
        sourceFiles: [
            {displayName: 'tooltip-template.component.ts', path: './src/heatmap-chart/tooltip-template.component.ts'},
            {displayName: 'default-table-data-source.ts', path: './src/heatmap-chart/default-table-data-source.ts'}
        ]
    },
];


export const HeatmapSampleModule: ModuleWithProviders<any> = RouterModule.forChild(heatmapAppRoutes);