import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ILoadedEventArgs, IZoomCompleteEventArgs, ChartComponent, ChartTheme, ISeriesRenderEventArgs, ChartAllModule } from '@syncfusion/ej2-angular-charts';
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
    templateUrl: 'range-area.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
})

export class RangeAreaComponent {
  //Initializing Primary X Axis
  public primaryXAxis: Object = {
    valueType: 'DateTime',
    labelFormat: 'dd MMM',
    edgeLabelPlacement: (Browser.isDevice) ? 'Shift' : 'Hide',
    majorGridLines: { width: 0 }
  };
  //Initializing Primary Y Axis
  public primaryYAxis: Object = {
    labelFormat: '{value}˚C',
    maximum: 25,
    minimum: -10,
    interval: 5,
    lineStyle: { width: 0 },
    majorTickLines: { width: 0 }
  };
  public marker :Object = {
    visible :true,
    width : 7 ,
    height : 7
  }
  public legend: Object = {
    visible: false
  }


  public title: string = 'Temperature Variation by Month';
  public tooltip: Object = {
    enable: true,
    format:'Temperature : <b>${point.low} - ${point.high}</b>',
    shared: false,
    showNearestTooltip: true,
    header: '<b>${point.x}</b>'
  };
  public chartArea: Object = {
    border: {
      width: 0
    }
  };
  public width: string = Browser.isDevice ? '100%' : '75%';

  public opacity: number = 0.4;
  public border: Object = { width: 2 };
   // custom code start
  public load(args: ILoadedEventArgs): void {
    loadChartTheme(args);
  };
   // custom code end
  public data: Object[] = chartDataValues;

  constructor() {
    //code
  };

}