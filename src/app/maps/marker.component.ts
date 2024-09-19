/**
 * Marker Sample
 */
import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { MapsTheme, Maps, Marker, MapsTooltip, ILoadEventArgs, MapsModule } from '@syncfusion/ej2-angular-maps';
import { topPopulation } from './marker-location';
import { CheckBox, ChangeEventArgs as CheckBoxChangeEvents } from '@syncfusion/ej2-buttons';
import { EmitType } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
Maps.Inject(Marker, MapsTooltip);
declare var require: any;
let worlMap: object[] = require('./world-map.json');
let population: object[] = require('./top-population.json');
@Component({
    selector: 'control-content',
    templateUrl: 'marker.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, MapsModule, SBDescriptionComponent]
})
export class MapsMarkerComponent {
  @ViewChild('maps')
  public maps: Maps;
  public load = (args: ILoadEventArgs) => {
    // custom code start
    let theme: string = location.hash.split('/')[1];
    theme = theme ? theme : 'Material';
    args.maps.theme = <MapsTheme>(theme.charAt(0).toUpperCase() +
    theme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-high/i, 'High').replace(/5.3/i, '5');
    // custom code end
  }
  public zoomSettings: object = {
    enable: true
  };
  public titleSettings: object = {
    text: 'Top 25 populated cities in the world',
    titleStyle: { size: '16px' }
  };
  public layers: object[] = [{
    shapeData: worlMap,
    dataSource: population,
    shapeSettings: { fill: '#C3E6ED' },
    markerSettings: [{
      dataSource: topPopulation,
      visible: true,
      animationDuration: 0,
      shape: 'Circle',
      fill: 'white',
      width: 10,
      border: { width: 2, color: '#285255' },
      tooltipSettings: {
        template: '<div><div class="toolback"><div class="listing2"><center> ${name} </center></div><hr style="margin-top: 2px;margin-bottom:5px;border:0.5px solid #DDDDDD"><div><span class="listing1">Country : </span><span class="listing2">${Country}</span></div><div><span class="listing1">Continent : </span><span class="listing2">${Continent}</span></div><div><span class="listing1">Population : </span><span class="listing2">${population}</span></div></div></div>',
        visible: true,
        valuePath: 'population',
      }
    }]
  }];
  ngAfterViewInit(): void {
    let shape: EmitType<CheckBoxChangeEvents>;
    let shapeCheckBox: CheckBox = new CheckBox(
      {
        change: shape, checked: false
      },
      '#shape');
    shapeCheckBox.change = shape = (e: CheckBoxChangeEvents) => {
      if (e.checked) {
        this.maps.layers[0].markerSettings[0].shapeValuePath = 'shape';
      } else {
        this.maps.layers[0].markerSettings[0].shapeValuePath = null;
      }
      this.maps.refresh();
    };
    let color: EmitType<CheckBoxChangeEvents>;
    let colorCheckBox: CheckBox = new CheckBox(
      {
        change: color, checked: false
      },
      '#color');
    colorCheckBox.change = color = (e: CheckBoxChangeEvents) => {
      if (e.checked) {
        this.maps.layers[0].markerSettings[0].colorValuePath = 'color';
      } else {
        this.maps.layers[0].markerSettings[0].colorValuePath = null;
      }
      this.maps.refresh();
    };
  }
  // custom code start
  constructor(@Inject('sourceFiles') private sourceFiles: any) {
    sourceFiles.files = ['top-population.json', 'world-map.json'];
  };
  // custom code end
}
