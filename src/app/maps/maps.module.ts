/**
 * Maps Control
 */
import { NgModule, ModuleWithProviders, Type } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MapsAllModule } from '@syncfusion/ej2-angular-maps';
import { MapsAnnotationComponent } from './annotation.component';
import { PolygonComponent } from './polygon.component';
import { MapsDefaultComponent } from './default.component';
import { MapsClusteringComponent } from './clusteringmarker.component';
import { MapsDynamicMarkerComponent } from './dynamicmarker.component';
import { MapsProjectionComponent } from './projection.component';
import { MapsMultilayerComponent } from './multilayer.component';
import { MapsDrilldownComponent } from './drilldown.component';
import { MapsHeatmapComponent } from './heatmap.component';
import { MapsMarkerComponent } from './marker.component';
import { MapsMarkerTemplateComponent } from './marker-template.component';
import { MapsLabelComponent } from './labels.component';
import { MapsBubbleComponent } from './bubble.component';
import { MapsEarthquakeComponent } from './earthquake.component';
import { MapsLegendComponent } from './legend.component';
import { MapsCurvedLinesComponent } from './curved-lines.component';
import { MapsPieComponent } from './pie.component';
import { MapsTooltipComponent } from './tooltip.component';
import { MapsSeatSelectionComponent } from './seat-selection.component';
import { MapsSelectionComponent } from './selection.component';
import { MapsZoomingComponent } from './zooming.component';
import { MapsHighlightComponent } from './highlight.component';
import { MapsNavigationLineComponent } from './navigation-lines.component';
import { MapsExportComponent } from './export.component';
import { MapsPrintComponent} from './print.component';
import { ColorMappingComponent} from './color-mapping.component';
import { MapsOsmComponent} from './osm.component';
import { MapsProgrammaticZoomComponent } from './programmatic-zoom.component';
import { MapsSalesMapComponent } from './sales-map.component';
import { MapsOsmWithNavigationComponent} from './osm-with-navigation-lines.component';
import { MapsOsmWithSublayerComponent} from './osm-with-sublayers.component';
import { MapsOsmWithMarkerClusterComponent} from './osm-with-marker-clustering.component';
import { MapsOsmWithLegendComponent} from './osm-with-legend.component';
import { MapsWithSliderComponent } from './map-with-slider.component';
import { MapsCyberAttackComponent} from './cyber-attack-map.component';
import { SliderModule, TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { ButtonModule, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import {DropDownListModule} from '@syncfusion/ej2-angular-dropdowns';


export const mapAppRoutes: Object[] = [
    { path: ':theme/maps/default', component: MapsDefaultComponent, name: "Default", order: "01", category: "Maps", description: 'This demo for Essential<sup>®</sup> JS2 Maps control visualizes the continents in the world by rendering those in a map layer.' },
    { path: ':theme/maps/projection', component: MapsProjectionComponent, name: "Changing Projection", order: "02", category: "Features", description: 'This demo for Essential<sup>®</sup> JS2 Maps control shows the details of permanent and non-permanent countries in the UN Security Council, in 2017.' },
    { path: ':theme/maps/multilayer', component: MapsMultilayerComponent, name: "Multi-layers", order: "02", category: "Features", description: 'This demo for Essential<sup>®</sup> JS2 Maps control depicts the layer along with sublayers for California and Texas.' },
    { path: ':theme/maps/marker', component: MapsMarkerComponent, name: "Marker", order: "02", category: "Features", description: 'This demo for Essential<sup>®</sup> JS2 Maps control shows the top 25 populated cities in the world by displaying the markers in their locations.' },
    { path: ':theme/maps/marker-template', component: MapsMarkerTemplateComponent, name: "Marker template", order: "02", category: "Features", description: 'This demo for Essential<sup>®</sup> JS2 Maps control indicates the temperature of various cities of Australia in marker templates.' },
    { path: ':theme/maps/clusteringmarker', component: MapsClusteringComponent, name: "Marker Clustering", order: "02", category: "Features", description: 'This demo for Essential<sup>®</sup> JS2 Maps control indicates the create the marker cluster in more than one marker intersect' },
    { path: ':theme/maps/labels', component: MapsLabelComponent, name: "Labels", order: "02", category: "Features", description: 'This demo for Essential<sup>®</sup> JS2 Maps control shows the names of all the states in USA in data label. Intersect action and smart labels mode can be changed.' },
    { path: ':theme/maps/bubble', component: MapsBubbleComponent, name: 'Map with Bubble', order: '02', category: 'Features', description: 'This demo for Essential<sup>®</sup> JS2 Maps control illustrates the top 30 countries which has highest Internet users in bubbles of the year 2016.' },
    { path: ':theme/maps/navigation-lines', component: MapsNavigationLineComponent, name: "Navigation Lines", order: "02", category: "Features", description: 'This demo for Essential<sup>®</sup> JS2 Maps control illustrates the sea routes between various cities for shipping.' },
    { path: ':theme/maps/legend', component: MapsLegendComponent, name: "Legend", order: "02", category: "Features",  description: 'This demo for Essential<sup>®</sup> JS2 Maps control visualizes grouping of countries in the legend based on its population density.' },
    { path: ':theme/maps/color-mapping', component: ColorMappingComponent, name: "Color Mapping", order: "02", category: "Features", description: 'This demo for Essential<sup>®</sup> JS2 Maps with color mapping.' },
    { path: ':theme/maps/annotation', component: MapsAnnotationComponent, name: 'Annotations', order: '02', category: 'Features', description: 'This demo for Essential<sup>®</sup> JS2 Maps control depicts the facts about Africa continent and a direction compass in an annotation.' },
    { path: ':theme/maps/polygon', component: PolygonComponent, name: 'Polygon', order: '03', category: 'Polygon',  description: 'This demo for Essential<sup>®</sup> JS2 Maps control depicts the polygon shape rendering over OSM map.' },
    { path: ':theme/maps/osm', component: MapsOsmComponent, name: 'OpenStreetMap', order: '04', category: 'Map Providers',  description: 'This demo for Essential<sup>®</sup> JS2 Maps control depicts the osm sample.' },
    { path: ':theme/maps/osm-with-sublayers', component: MapsOsmWithSublayerComponent, name: 'OSM with Sublayer', order: '04', category: 'Map Providers', description: 'This demo for Essential<sup>®</sup> JS2 Maps control depicts the flight route from Los Angeles to Mexico City using navigation lines in the OpenStreetMap.' },
    { path: ':theme/maps/osm-with-marker-clustering', component: MapsOsmWithMarkerClusterComponent, name: 'OSM with Marker Clustering', order: '04', category: 'Map Providers', description: 'This demo for Essential<sup>®</sup> JS2 Maps control depicts the marker clustering in the OpenStreetMap.' },
    { path: ':theme/maps/osm-with-navigation-lines', component: MapsOsmWithNavigationComponent, name: 'OSM with Navigation Lines',  order: '04', category: 'Map Providers', description: 'This demo for Essential<sup>®</sup> JS2 Maps control depicts the flight route from Los Angeles to Mexico City using navigation lines in the OpenStreetMap.' },
    { path: ':theme/maps/osm-with-legend', component: MapsOsmWithLegendComponent, name: 'OSM with Legend', order: '04', category: 'Map Providers', description: 'This demo for Essential<sup>®</sup> JS2 Maps control depicts the markers and legend in the OpenStreetMap.' },
    { path: ':theme/maps/tooltip', component: MapsTooltipComponent, name: "Tooltip", order: "05", category: "User Interaction", description: 'This demo for Essential<sup>®</sup> JS2 Maps control depicts the countries that were appeared in the finals of Cricket World Cup and their counts.' },
    { path: ':theme/maps/selection', component: MapsSelectionComponent, name: "Selection & Highlight", order: "05", category: "User Interaction", description: 'This demo for Essential<sup>®</sup> JS2 Maps control visualizes USA president election results in the year 2016. Default and interactive are the two types of legend.' },
    { path: ':theme/maps/zooming', component: MapsZoomingComponent, name: "Zooming & Panning", order: "05", category: "User Interaction", description: 'This demo for Essential<sup>®</sup> JS2 Maps control depicts the properties required to zoom and pan the rendered map.' },
    { path: ':theme/maps/programmatic-zoom', component: MapsProgrammaticZoomComponent, name: "Zoom to fit all the markers in maps", order: "04", category: "User Interaction", description: 'This demo for Essential<sup>®</sup> JS2 Maps control demonstrates the rendering of normal geometry type shapes on the map.'  },
    { path: ':theme/maps/drilldown', component: MapsDrilldownComponent, name: "Drill Down", order: "05", category: "User Interaction", description: 'This demo for Essential<sup>®</sup> JS2 Maps control demonstrates drill down with all the continents in the initial view and countries on drill.' },
    { path: ':theme/maps/print', component: MapsPrintComponent, name: "Print", order: "06", category: "Print and Export", description: 'This demo for Essential<sup>®</sup> JS2 Maps control illustrates the printing functionality in the maps control.' },
    { path: ':theme/maps/export', component: MapsExportComponent, name: "Export", order: "06", category: "Print and Export", description: 'This demo for Essential<sup>®</sup> JS2 Maps control illustrates the exporting functionality in the maps control.' },
    { path: ':theme/maps/heatmap', component: MapsHeatmapComponent, name: "Heat Map", order: "07", category: "Use Cases", description: 'This demo for Essential<sup>®</sup> JS2 Maps control visualizes the state wise population of India in the year 2011. Color for states will be applied based on its value.'  },
    { path: ':theme/maps/curved-lines', component: MapsCurvedLinesComponent, name: "Flight routes", order: "07", category: "Use Cases", description: 'This demo for Essential<sup>®</sup> JS2 Maps control demonstrates the flight routes from India to China using navigation lines feature.'  },
    { path: ':theme/maps/dynamicmarker', component: MapsDynamicMarkerComponent, name: "Dynamic marker", order: "07", category: "Use Cases", description: 'This demo for Essential<sup>®</sup> JS2 Maps control visualizes the dynamically added the marker and navigation line.' },
    { path: ':theme/maps/earthquake', component: MapsEarthquakeComponent, name: "Earthquake indication", order: "07", category: "Use Cases", description: 'This demo for Essential<sup>®</sup> JS2 Maps control demonstrates the earth quack occurred in Sumatra, Indonesia in the year 2009.'  },
    { path: ':theme/maps/highlight', component: MapsHighlightComponent, name: "Highlighted Region", order: "07", category: "Use Cases", description: 'This demo for Essential<sup>®</sup> JS2 Maps control depicts the ATM populated areas in Oklahoma by highlighting the regions.'  },
    { path: ':theme/maps/cyber-attack-map', component: MapsCyberAttackComponent, name: "Cyber Attack Map", order: "07", category: "Use Cases", description: 'This demo for Essential<sup>®</sup> JS2 Maps control visualizes the cyber attack.'  },
    { path: ':theme/maps/pie', component: MapsPieComponent, name: "Map with Pie chart", order: "07", category: "Use Cases", description: 'This demo for Essential<sup>®</sup> JS2 Maps control visualizes the placing of pie charts on the maps using marker templates.'  },
    { path: ':theme/maps/map-with-slider', component: MapsWithSliderComponent, name: "Map with Slider", order: "07",  category: "Use Cases", description: 'This demo for Essential<sup>®</sup> JS2 Maps control visualizes the maps using slider.'  },
    { path: ':theme/maps/sales-map', component: MapsSalesMapComponent, name: "Sales map", order: "07", category: "Use Cases", description: 'This demo for Essential<sup>®</sup> JS2 Maps control demonstrates the rendering of normal geometry type shapes on the map.'  },
    { path: ':theme/maps/seat-selection', component: MapsSeatSelectionComponent, name: "Bus seat booking", order: "07", category: "Use Cases", description: 'This demo for Essential<sup>®</sup> JS2 Maps control demonstrates the rendering of normal geometry type shapes on the map.'  }
];

export const MapsSampleModule: ModuleWithProviders<any> = RouterModule.forChild(mapAppRoutes);
