import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  AccumulationChartComponent,
  AccumulationChartAllModule,
  IAccLoadedEventArgs,
  ILegendClickEventArgs,
  ILegendRenderEventArgs
} from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { loadAccumulationChartTheme } from './theme-color';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
  selector: 'control-content',
  templateUrl: 'pie-legend-template.html',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [SBActionDescriptionComponent, AccumulationChartAllModule, SBDescriptionComponent]
  
})
export class PieLegendTemplateComponent implements OnInit {
  @ViewChild('accumulation', { static: false })
  public chart!: AccumulationChartComponent;
  public title!: string;
  public subTitle!: string;
  public series!: Object[];
  public tooltip!: Object;
  public legendSettings!: any;
  public titleStyle: any;
  

  public data: any[] = [
    { x: 'United States', y: 29.55, image: 'United States', text: Browser.isDevice ? 'USA: 29.55%' : 'United States: 29.55%', description: '13.4M barrels per day', tooltip: '13.4M' },
    { x: 'Saudi Arabia', y: 23.83, image: 'Saudi Arabia', text: Browser.isDevice ? 'SAU: 23.83%' : 'Saudi Arabia: 23.83%', description: '10.8M barrels per day', tooltip: '10.8M' },
    { x: 'Russia', y: 23.69, image: 'Russia', text: Browser.isDevice ? 'RUS: 23.69%' : 'Russia: 23.69%', description: '10.8M barrels per day', tooltip: '10.8M' },
    { x: 'Canada', y: 12.12, image: 'Canada', text: Browser.isDevice ? 'CAN: 12.12%' : 'Canada: 12.12%', description: '5.5M barrels per day', tooltip: '5.5M' },
    { x: 'China', y: 10.83, image: 'China', text: Browser.isDevice ? 'CHN: 10.83%' : 'China: 10.83%', description: '4.9M barrels per day', tooltip: '4.9M' }
  ];

  ngOnInit(): void {
    this.title = 'Top 5 Oil Producing Countries (2023)';
    this.subTitle = 'Source: Wikipedia.org';
    this.titleStyle = {
      position: 'Custom',
      x: Browser.isDevice ? 150 : 492,
      y: 22.75
    };
    this.series = [
      {
        type: 'Pie',
        dataSource: this.data,
        xName: 'x',
        yName: 'y',
        animation: { enable: false },
        tooltipMappingName: 'tooltip',
        border: { color: '#ffffff', width: 1 },
        radius: Browser.isDevice ? '65%' : '70%',
        innerRadius: '0%',
        dataLabel: {
          visible: true,
          position: Browser.isDevice ? 'Inside' : 'Outside',
          name: Browser.isDevice ? '' : 'text',
          format: Browser.isDevice ? '{value}%' : '',
          enableRotation: Browser.isDevice ? true : false,
          font: { size: Browser.isDevice ? '8px' : '12px', fontWeight: '600' },
          connectorStyle: { type: 'Line' }
        }
      }
    ];
    
    this.tooltip = {
      enable: true,
      header: '<b>${point.x}</b>',
      format: 'Production: <b>${point.tooltip}</b> barrels/day'
    };

    this.legendSettings = {
      visible: true,
      width: Browser.isDevice ? '35%' : '20%',
      position: 'Right',
      itemPadding: 15,
      template:
        '<div class="legend-template" style="display:flex; align-items:flex-start; gap:' + (Browser.isDevice ? '6px' : '8px') + '; opacity:1; max-width:' + (Browser.isDevice ? '160px' : '280px') + '; box-sizing:border-box;">' +
                    '<img class="e-legend-img" src="" width="' + (Browser.isDevice ? '24' : '36') + '" height="' + (Browser.isDevice ? '24' : '36') + '" style="flex:0 0 ' + (Browser.isDevice ? '24px' : '36px') + '; margin-top:' + (Browser.isDevice ? '0px' : '2px') + ';" />' +
                    '<div style="display:flex; flex-direction:column; min-width:0; text-align:left;">' +
                    '<span class="e-legend-label" style="font-weight:600; font-size:' + (Browser.isDevice ? '10px' : '13px') + '; color:LABEL_COLOR; line-height:' + (Browser.isDevice ? '12px' : '18px') + '; white-space:normal; overflow-wrap:break-word; word-break:break-word; max-width:' + (Browser.isDevice ? '130px' : '220px') + ';"></span>' +
                    '<span class="e-legend-desc" style="font-size:' + (Browser.isDevice ? '10px' : '12px') + '; margin-top:' + (Browser.isDevice ? '0px' : '2px') + '; line-height:' + (Browser.isDevice ? '12px' : '15px') + '; white-space:normal; overflow-wrap:break-word; word-break:break-word; max-width:' + (Browser.isDevice ? '130px' : '220px') + ';"></span>' +
                    '</div>' +
                    '</div>'
    };
  }
 
  public legendRender(args: ILegendRenderEventArgs): void {
    const desc: any = this.data.find((d: any) => d.x === args.text)?.description;
    const matchedPoint: any = (this.chart.series[0] as any).points.find((p: any) => p.x === args.text);
    const opacity: any = matchedPoint && !matchedPoint.visible ? '0.5' : '1';
    (args as any).template = (args as any).template
      .replace('opacity:1;', 'opacity:' + opacity + ';')
      .replace('LABEL_COLOR', (args as any).fill)
      .replace('src=""', 'src="./assets/chart/images/' + args.text + '.png"')
      .replace('></span>', '>' + args.text + '</span>')
      .replace(/<span class="e-legend-desc"([^>]*)><\/span>/, '<span class="e-legend-desc"$1>' + (desc || '') + '</span>');
  }


  public load(args: IAccLoadedEventArgs): void {
    loadAccumulationChartTheme(args);
  }
}
