import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';

/**
 * Sample for Range Area Series
 */
@Component({
  selector: 'control-content',
  templateUrl: 'spline-range-area.html',
  styleUrls: ['chart.style.css'],
  encapsulation: ViewEncapsulation.None
})

export class SplineRangeAreaComponent {
  //Initializing Primary X Axis
  public primaryXAxis: Object = {
    valueType: 'Category',
    edgeLabelPlacement: 'Shift',
    majorGridLines: { width: 0 }
  };
  //Initializing Primary Y Axis
  public primaryYAxis: Object = {
    labelFormat: '{value}˚C',
    lineStyle: { width: 0 },
    majorTickLines: { width: 0 },
    minimum: 0,
    maximum: 40
  };
  public marker: Object = {
    visible: false
  }
  public legend: Object = {
    visible: true
  }

  public title: string = 'Monthly Temperature Range';
  public tooltip: Object = {
    enable: true
  };
  public chartArea: Object = {
    border: {
      width: 0
    }
  };
  public width: string = Browser.isDevice ? '100%' : '80%';

  public opacity: number = 0.4;
  public border: Object = { width: 2 };
  // custom code start
  public load(args: ILoadedEventArgs): void {
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Material';
    args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
  };
  // custom code end
  public data: Object[] = [
    { x: 'Jan', high: 14, low: 4 },
    { x: 'Feb', high: 17, low: 7 },
    { x: 'Mar', high: 20, low: 10 },
    { x: 'Apr', high: 22, low: 12 },
    { x: 'May', high: 20, low: 10 },
    { x: 'Jun', high: 17, low: 7 },
    { x: 'Jul', high: 15, low: 5 },
    { x: 'Aug', high: 17, low: 7 },
    { x: 'Sep', high: 20, low: 10 },
    { x: 'Oct', high: 22, low: 12 },
    { x: 'Nov', high: 20, low: 10 },
    { x: 'Dec', high: 17, low: 7 }

  ];

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