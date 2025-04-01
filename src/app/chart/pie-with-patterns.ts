import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { AccumulationChart, AccumulationChartComponent, ChartAllModule, IAccLoadedEventArgs, AccumulationTheme, AccumulationChartAllModule, IAccPointRenderEventArgs } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadAccumulationChartTheme, accpatternPointRender } from './theme-color';

/**
 * Sample for Pie with Various Radius
 */
@Component({
  selector: 'control-content',
  templateUrl: 'pie-with-patterns.html',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [SBActionDescriptionComponent, ChartAllModule, AccumulationChartAllModule, SBDescriptionComponent]
})
export class PieWithPatternsComponent {
  public data: object[] = [
    { x: 'Internet Explorer', y: 6.12, text: Browser.isDevice ? 'Internet Explorer:<br> 6.12%' : 'Internet Explorer: 6.12%' },
    { x: 'Chrome', y: 57.28, text: Browser.isDevice ? 'Chrome:<br> 57.282%' : 'Chrome: 57.28%' },
    { x: 'Safari', y: 4.73, text: Browser.isDevice ? 'Safari:<br> 4.73%' : 'Safari: 4.73%' },
    { x: 'QQ', y: 5.96, text: Browser.isDevice ? 'QQ:<br>5.96%' : 'QQ: 5.96%' },
    { x: 'UC Browse', y: 4.37, text: Browser.isDevice ? 'UC Browse:<br>4.37%' : 'UC Browse: 4.37%' },
    { x: 'Edge', y: 7.48, text: Browser.isDevice ? 'Edge:<br> 7.48%' : 'Edge: 7.48%' },
    { x: 'Others', y: 14.06, text: Browser.isDevice ? 'Others:<br> 14.06%' : 'Others: 14.06%' }
]
  @ViewChild('pie')
  public pie: AccumulationChartComponent | AccumulationChart;
  //Initializing Legend
  public legendSettings: Object = {
    visible: false
  };
  //Initializing Datalabel
  public dataLabel: Object = {

    name: 'text', visible: true, position: 'Outside',
    font: { fontWeight: '600' },
    connectorStyle: { length: '20px', type: 'Curve' },
  };
  //Border
  public border: Object = {
    width: 2
  }
  // custom code start
  public load(args: IAccLoadedEventArgs): void {
    loadAccumulationChartTheme(args);
  }
  public pointRender(args: IAccPointRenderEventArgs): void {
    accpatternPointRender(args);
  };
  public tooltip: Object = {
    enable: true,
    format: '<b>${point.x}</b><br>Browser Share: <b>${point.y}%</b>',header:""
  };
  public title: string = 'Browser Market Share';
  constructor() {
    //code
  };

}


