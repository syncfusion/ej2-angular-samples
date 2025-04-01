import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadChartTheme } from './theme-color';

/**
 * Sample for Step area Series
 */
@Component({
  selector: 'control-content',
  templateUrl: 'step-without-riser.html',
  styleUrls: ['chart.style.css'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
})
export class WithoutRiserChartComponent {

  public chartArea: Object = {
    border: {
      width: 0
    }
  };
  public width: string = Browser.isDevice ? '100%' : '75%';

  public data: Object[] = [{ x: new Date(1980, 0, 1), y: 23 },
  { x: new Date(1981, 0, 1), y: 89 },
  { x: new Date(1982, 0, 1), y: 45 },
  { x: new Date(1983, 0, 1), y: 67 },
  { x: new Date(1984, 0, 1), y: 76 },
  { x: new Date(1985, 0, 1), y: 34 },
  { x: new Date(1986, 0, 1), y: 90 },
  { x: new Date(1987, 0, 1), y: 65 },
  { x: new Date(1988, 0, 1), y: 77 },
  { x: new Date(1989, 0, 1), y: 43 },
  { x: new Date(1990, 0, 1), y: 92 },
  { x: new Date(1991, 0, 1), y: 81 },
  { x: new Date(1992, 0, 1), y: 65 },
  { x: new Date(1993, 0, 1), y: 87 },
  { x: new Date(1994, 0, 1), y: 50 },
  { x: new Date(1995, 0, 1), y: 98 },
  { x: new Date(1996, 0, 1), y: 62 },
  { x: new Date(1997, 0, 1), y: 75 },
  { x: new Date(1998, 0, 1), y: 64 },
  { x: new Date(1999, 0, 1), y: 88 },
  { x: new Date(2000, 0, 1), y: 99 },
  { x: new Date(2001, 0, 1), y: 77 },
  { x: new Date(2002, 0, 1), y: 65 },
  { x: new Date(2003, 0, 1), y: 89 },
  { x: new Date(2004, 0, 1), y: 45 },
  { x: new Date(2005, 0, 1), y: 67 },
  { x: new Date(2006, 0, 1), y: 56 },
  { x: new Date(2007, 0, 1), y: 78 },
  { x: new Date(2008, 0, 1), y: 82 },
  { x: new Date(2009, 0, 1), y: 90 },
  { x: new Date(2010, 0, 1), y: 55 },
  { x: new Date(2011, 0, 1), y: 65 },
  { x: new Date(2012, 0, 1), y: 87 },
  { x: new Date(2013, 0, 1), y: 76 },
  { x: new Date(2014, 0, 1), y: 45 },
  { x: new Date(2015, 0, 1), y: 67 },
  { x: new Date(2016, 0, 1), y: 89 },
  { x: new Date(2017, 0, 1), y: 76 },
  { x: new Date(2018, 0, 1), y: 45 },
  { x: new Date(2019, 0, 1), y: 67 },
  { x: new Date(2020, 0, 1), y: 89 }];



  //Initializing Primary X Axis
  public primaryXAxis: Object = {
    valueType: 'DateTime',
    labelFormat: 'yyyy', // Format to show only year
    intervalType: 'Years',
    edgeLabelPlacement: 'Shift',
    minimum: new Date(1980, 0, 1), // Start from 1970
    maximum: new Date(2020, 0, 1), // End at 2020
    majorGridLines: { width: 0 },
    minorTickLines: { width: 0 },
    interval: 4,
    labelIntersectAction: 'Rotate90'
  };
  //Initializing Primary Y Axis
  public primaryYAxis: Object = {
    title: 'Sales in Units',
    labelFormat: '{value}',
    lineStyle: { width: 0 },
    minimum: 0,
    maximum: 100,
    interval: 20,
    majorTickLines: { width: 0 }
  };
  public border: Object = {
    width: 2.5
  };
  public tooltip: Object = {
    enable: true,
    showNearestTooltip: true
  };

  //Initializing Legend
  public legendSettings: Object = {
    visible: false,
  };

  // custom code start
  public load(args: ILoadedEventArgs): void {
    loadChartTheme(args);
  };
  // custom code end
  public title: string = 'Sales of Product Over Time';
  constructor() {
    //code
  };

}