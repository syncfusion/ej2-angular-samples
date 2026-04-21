import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { SankeyAllModule, SankeyLegendService, SankeyTooltipService, SankeyHighlightService, SankeyLoadedEventArgs, Sankey, SankeyExportService } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { loadSankeyTheme } from './theme-color';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
  selector: 'control-content',
  templateUrl: 'orientation.html',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    SankeyAllModule,
    SBActionDescriptionComponent,
    SBDescriptionComponent
  ],
  providers: [
    SankeyLegendService,
    SankeyTooltipService,
    SankeyHighlightService,
    SankeyExportService
  ]
})
export class SankeyOrientationComponent {
  @ViewChild('sankey')
  public sankey: Sankey;
  public title: string = Browser.isDevice ? 'U.S. Greenhouse Gas Emissions' : 'U.S. Greenhouse Gas Emissions by Economic Sector (2022)';
  public subTitle: string = 'Source: EPA 2022 GHG Inventory';
  public orientation = 'Vertical';
  public linkStyle = { opacity: 0.5, curvature: 0.55, colorType: 'Source' };
  public nodeStyle = { width: 30, padding: 8, opacity: 1 };
  public labelSettings = Browser.isDevice ? { visible: false } : { visible: true };
  public tooltip = {
    enable: true,
    nodeTemplate: '${name}: ${value} MMT CO₂e',
    linkTemplate: Browser.isDevice ? '${start.name}: ${start.out} MMT CO₂e → <br/> ${target.name}: ${target.in} MMT CO₂e' : '${start.name}: ${start.out} MMT CO₂e → ${target.name}: ${target.in} MMT CO₂e',
  };
  public legendSettings = Browser.isDevice ? { visible: false } : { visible: true, position: 'Right', margin: { left: 100 } };

  public load(args: SankeyLoadedEventArgs) {
    loadSankeyTheme(args);
  }
  constructor() { }
}