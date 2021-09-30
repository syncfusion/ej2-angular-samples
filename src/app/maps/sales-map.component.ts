/**
 * Zoom Marker Sample
 */
import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { MapsTheme, Maps, Marker, MapsTooltip, ILoadEventArgs, Zoom } from '@syncfusion/ej2-angular-maps';
import { salesMap } from './marker-location';
import { EmitType } from '@syncfusion/ej2-base';
Maps.Inject(Marker, MapsTooltip, Zoom);
declare var require: any;
let worlMap: object[] = require('./world-map.json');
let population: object[] = require('./sales-map.json');
@Component({
  selector: 'control-content',
  templateUrl: 'sales-map.html',
  encapsulation: ViewEncapsulation.None
})
export class MapsSalesMapComponent {
  @ViewChild('maps')
  public maps: Maps;
  // custom code start
  public load = (args: ILoadEventArgs) => {
    let theme: string = location.hash.split('/')[1];
    theme = theme ? theme : 'Material';
    args.maps.theme = <MapsTheme>(theme.charAt(0).toUpperCase() +
    theme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i,  'Contrast');
  }
  // custom code end
  public zoomSettings: object = {
    enable: true,
    mouseWheelZoom: false,
    pinchZooming: false
  };
  public titleSettings: object = {
    text: 'Sales details of products in various countries',
    titleStyle: { size: '16px' }
  };
  public layers: object[] = [{
    shapeData: worlMap,
    dataSource: population,
    shapeSettings: {
      fill: '#C1DFF5'
    },
    markerClusterSettings: {
        allowClustering: true,
        allowClusterExpand: true,
        shape: 'Image',
        height: 40,
        width: 40,
        labelStyle: { color: 'white' },
        imageUrl: './assets/maps/images/cluster.svg'
    },
    markerSettings: [{
      dataSource: salesMap,
      visible: true,
      animationDuration: 0,
      height: 15,
      width: 15,
      shape: 'Image',
      imageUrl: './assets/maps/images/ballon.png',
      tooltipSettings: {
        format: '<b>Name</b> : ${name}<br><b>Product</b> : ${product}<br><b>Total value</b> : ${worth}',
        visible: true,
        valuePath: 'name',
      }
    }]
  }];
  constructor(@Inject('sourceFiles') private sourceFiles: any) {
    sourceFiles.files = ['sales-map.json', 'world-map.json'];
  };
}
