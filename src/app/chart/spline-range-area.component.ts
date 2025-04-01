import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { chartDataValues } from './financial-data';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadChartTheme } from './theme-color';

/**
 * Sample for Range Area Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'spline-range-area.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
})

export class SplineRangeAreaComponent {
  //Initializing Primary X Axis
  public primaryXAxis: Object = {
    valueType: 'DateTime',
    labelFormat: 'dd MMM',
    edgeLabelPlacement: (Browser.isDevice) ? 'Shift' : 'Hide',
    majorGridLines: { width: 0 },
  };
  //Initializing Primary Y Axis
  public primaryYAxis: Object = {
    labelFormat: '{value}˚C',
    lineStyle: { width: 0 },
    majorTickLines: { width: 0 },
    minimum: -10,
    maximum: 25,
    interval: 5
  };
  public marker: Object = {
    visible: false
  }
  public legend: Object = {
    visible: true,
    enableHighlight : true
  }

  public title: string = 'Temperature Variation by Month';
  public tooltip: Object = {
    enable: true,
    format:'Temperature : <b>${point.low} - ${point.high}</b>',
    shared: false,
    showNearestTooltip: true,
    header: '<b>${point.x}</b>',
  };
  public chartArea: Object = {
    border: {
      width: 0
    }
  };
  public width: string = Browser.isDevice ? '100%' : '75%';

  public opacity: number = 0.7;
  public border: Object = { width: 2 };
  // custom code start
  public load(args: ILoadedEventArgs): void {
    loadChartTheme(args);
  };
  // custom code end
  public data: Object[] = chartDataValues;

  public data1: Object[] = [
    { x: 'Jan', high: 29, low: 19 },
    { x: 'Feb', high: 32, low: 22 },
    { x: 'Mar', high: 35, low: 25 },
    { x: 'Apr', high: 37, low: 27 },
    { x: 'May', high: 35, low: 25 },
    { x: 'Jun', high: 32, low: 22 },
    { x: 'Jul', high: 30, low: 20 },
    { x: 'Aug', high: 32, low: 22 },
    { x: 'Sep', high: 35, low: 25 },
    { x: 'Oct', high: 37, low: 27 },
    { x: 'Nov', high: 35, low: 25 },
    { x: 'Dec', high: 32, low: 22 }

  ];

  constructor() {
    //code
  };

}