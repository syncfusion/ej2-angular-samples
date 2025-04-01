import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ITooltipRenderEventArgs, IPointRenderEventArgs, ChartTheme, ChartAllModule, ILegendRenderEventArgs } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadChartTheme } from './theme-color';
/**
 * Sample for Waterfall Series
 */
@Component({
  selector: 'control-content',
  templateUrl: 'horizontal-waterfall.html',
  styleUrls: ['chart.style.css'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
})
export class HorizontalWaterfallChartComponent {

  public dataSource: Object[] = [
    { x: 'JAN', y: 55 },
    { x: 'MAR', y: 42 },
    { x: 'JUNE', y: -12 },
    { x: 'AUG', y: 40 },
    { x: 'OCT', y: -26 },
    { x: 'DEC', y: 45 },
    { x: '2023' }
  ];

  //Initializing Primary X Axis
  public primaryXAxis: Object = {
    valueType: 'Category',
    edgeLabelPlacement: 'Shift',
    majorGridLines: { width: 1 },
    majorTickLines: { width: 0 },
    isInversed: true

  };
  //Initializing Primary Y Axis
  public primaryYAxis: Object = {
    minimum: 0, maximum: 150, interval: 25,
    labelFormat: '{value}K',
    edgeLabelPlacement: 'Shift',
    majorGridLines: { width: 1 }
  };
  public chartArea: Object = {
    border: {
      width: 0
    }
  };
  public width: string = Browser.isDevice ? '100%' : '70%';

  public title: string = 'Revenue Variation';

  public legend: Object = {
    mode: 'Point', toggleVisibility: false, visible: true
  };
  public marker: Object = {
    dataLabel: { visible: true, position: 'Middle' }
  };
  public border: Object = {
    width: 0.2, color: 'Black'
  }
  public connector: Object = {
    width: 0.8, dashArray: '1,2', color: '#5F6A6A'
  };

  public cornerRadius: Object = {
    topLeft: 3, bottomLeft: 3, bottomRight: 3, topRight: 3
  }

  public sum: number[] = [6];
  //Initializing Tooltip
  public tooltip: Object = {
    enable: true, header: '', format: "<b>${point.x}</b> <br> Product Revenue : <b>${point.y}</b>"
  }

  public legendRender(args: ILegendRenderEventArgs): void {
    if (args.text === 'JAN') {
      args.text = 'Increase';
    }
    else if (args.text === 'OCT') {
      args.text = 'Decrease';
      args.fill = '#e56590'
    }
    else if (args.text === '2023') {
      args.text = 'Total';
      args.fill = '#4E81BC'
    }
    else {
      args.cancel = true;
    }
  };


  // custom code start
  public load(args: ILoadedEventArgs): void {
    loadChartTheme(args);
  };
  // custom code end

  constructor() {
    //code
  };

}