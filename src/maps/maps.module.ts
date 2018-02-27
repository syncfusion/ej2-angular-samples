/**
 * Maps Control
 */
import { NgModule, ModuleWithProviders, Type } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../common/shared.module';
import { MapsAllModule } from '@syncfusion/ej2-ng-maps';
import { MapsAnnotationComponent } from './annotation.component';
import { MapsDefaultComponent } from './default.component';
import { MapsProjectionComponent } from './projection.component';
import { MapsMultilayerComponent } from './multilayer.component';
import { MapsDrilldownComponent } from './drilldown.component';
import { MapsHeatmapComponent } from './heatmap.component';
import { MapsMarkerComponent } from './marker.component';
import { MapsMarkerTemplateComponent } from './markertemplate.component';
import { MapsLabelComponent } from './labels.component';
import { MapsBubbleComponent } from './bubble.component';
import { MapsEarthquakeComponent } from './earthquake.component';
import { MapsLegendComponent } from './legend.component';
import { MapsCurvedLinesComponent } from './curvedlines.component';
import { MapsPieComponent } from './pie.component';
import { MapsTooltipComponent } from './tooltip.component';
import { MapsSeatSelectionComponent } from './seatselection.component';
import { MapsSelectionComponent } from './selection.component';
import { MapsZoomingComponent } from './zooming.component';
import { MapsHighlightComponent } from './highlight.component';
import { MapsNavigationLineComponent } from './navigationLines.component';


export const mapAppRoutes: Object[] = [
    { path: ':theme/maps/default', component: MapsDefaultComponent, name: "Default", order: "01", category: "Maps" },
    { path: ':theme/maps/projection', component: MapsProjectionComponent, name: "Changing Projection", order: "02", category: "Features" },
    { path: ':theme/maps/multilayer', component: MapsMultilayerComponent, name: "Multi-layers", order: "02", category: "Features" },
    { path: ':theme/maps/marker', component: MapsMarkerComponent, name: "Marker", order: "02", category: "Features" },
    { path: ':theme/maps/markertemplate', component: MapsMarkerTemplateComponent, name: "Marker template", order: "02", category: "Features" },
    { path: ':theme/maps/labels', component: MapsLabelComponent, name: "Labels", order: "02", category: "Features" },
    { path: ':theme/maps/bubble', component: MapsBubbleComponent, name: 'Map with Bubble', order: '02', category: 'Features' },
    { path: ':theme/maps/navigationLines', component: MapsNavigationLineComponent, name: "Navigation Lines", order: "02", category: "Features" },
    { path: ':theme/maps/legend', component: MapsLegendComponent, name: "Grouping countries", order: "02", category: "Features" },
    { path: ':theme/maps/annotation', component: MapsAnnotationComponent, name: 'Annotations', order: '02', category: 'Features' },
    { path: ':theme/maps/tooltip', component: MapsTooltipComponent, name: "Tooltip", order: "03", category: "User Interaction" },
    { path: ':theme/maps/selection', component: MapsSelectionComponent, name: "Selection & Highlight", order: "03", category: "User Interaction" },
    { path: ':theme/maps/zooming', component: MapsZoomingComponent, name: "Zooming & Panning", order: "03", category: "User Interaction" },
    { path: ':theme/maps/drilldown', component: MapsDrilldownComponent, name: "Drill Down", order: "03", category: "User Interaction" },
    { path: ':theme/maps/heatmap', component: MapsHeatmapComponent, name: "Heat Map", order: "04", category: "Use Cases"  },
    { path: ':theme/maps/curvedlines', component: MapsCurvedLinesComponent, name: "Flight routes", order: "04", category: "Use Cases"  },
    { path: ':theme/maps/earthquake', component: MapsEarthquakeComponent, name: "Earthquake indication", order: "04", category: "Use Cases"  },
    { path: ':theme/maps/highlight', component: MapsHighlightComponent, name: "Highlighted Region", order: "04", category: "Use Cases"  },
    { path: ':theme/maps/pie', component: MapsPieComponent, name: "Map with Pie chart", order: "04", category: "Use Cases"  },    
    { path: ':theme/maps/seatSelection', component: MapsSeatSelectionComponent, name: "Bus seat booking", order: "04", category: "Use Cases"  }
];

export const mapRouter: ModuleWithProviders = RouterModule.forChild(mapAppRoutes);
let declarations: Type<Object>[] = [
    MapsAnnotationComponent,
    MapsDefaultComponent,
    MapsProjectionComponent, MapsMultilayerComponent,
    MapsDrilldownComponent, MapsHeatmapComponent,
    MapsMarkerComponent, MapsMarkerTemplateComponent, MapsLabelComponent,
    MapsBubbleComponent,
    MapsEarthquakeComponent, MapsLegendComponent,
    MapsCurvedLinesComponent,
    MapsPieComponent,
    MapsTooltipComponent, MapsSeatSelectionComponent, MapsZoomingComponent,
    MapsSelectionComponent, MapsHighlightComponent, MapsNavigationLineComponent

];
@NgModule({
    imports: [mapRouter, MapsAllModule, SharedModule],
    exports: [],
    declarations: declarations,
    providers: [MapsAllModule]
})
export class MapsSampleModule {
}