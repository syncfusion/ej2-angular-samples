import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme, ChartAllModule, ISeriesRenderEventArgs } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadChartTheme } from './theme-color';

/**
 * Sample for Line Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'custom-animation.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
})
export class CustomAnimationComponent {

    public seriesData: Object[] = [
      { x: new Date(2010, 0, 1), y: 5.00, y1: 4.54, y2: 3.62, y3: 2.92, y4: 1.87 },
      { x: new Date(2011, 0, 1), y: 5.69, y1: 4.50, y2: 3.23, y3: 3.00, y4: 1.87 },
      { x: new Date(2012, 0, 1), y: 4.99, y1: 4.60, y2: 4.19, y3: 2.97, y4: 1.85 },
      { x: new Date(2013, 0, 1), y: 5.65, y1: 5.04, y2: 2.99, y3: 2.97, y4: 1.84 },
      { x: new Date(2014, 0, 1), y: 5.43, y1: 4.39, y2: 3.07, y3: 2.00, y4: 1.84 },
      { x: new Date(2015, 0, 1), y: 5.51, y1: 3.86, y2: 3.19, y3: 1.88, y4: 1.65 },
      { x: new Date(2016, 0, 1), y: 6.12, y1: 4.12, y2: 3.28, y3: 1.81, y4: 1.69 },
      { x: new Date(2017, 0, 1), y: 6.68, y1: 6.35, y2: 4.12, y3: 1.79, y4: 1.38 },
      { x: new Date(2018, 0, 1), y: 5.52, y1: 3.90, y2: 3.39, y3: 1.75, y4: 1.72 },
      { x: new Date(2019, 0, 1), y: 5.59, y1: 4.01, y2: 3.46, y3: 1.75, y4: 1.31 },
      { x: new Date(2020, 0, 1), y: 5.46, y1: 4.64, y2: 3.52, y3: 1.78, y4: 1.75 },
      { x: new Date(2021, 0, 1), y: 6.08, y1: 4.12, y2: 3.58, y3: 1.74, y4: 1.29 },
      { x: new Date(2022, 0, 1), y: 6.23, y1: 3.64, y2: 3.40, y3: 1.73, y4: 1.64 }
    ];
    
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
      valueType: 'DateTime', labelFormat: 'y',
      majorGridLines: { width: 0 },
      edgeLabelPlacement: 'Shift',
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
      title: 'Yield (In Tons per Hectare)',
      lineStyle: { width: 0 },
      majorTickLines: { width: 0 },
      minorTickLines: { width: 0 },
      maximum: 8,
      interval: 2
    };
    public chartArea: Object = {
        border: {
            width: 0
        },
        margin: {
          bottom: 12
        }
    };
    public width: string = Browser.isDevice ? '100%' : '75%';
    public animation1: Object= { enable: true, duration: 1500 };
    public animation2: Object={ enable: true,delay: 2300,  duration: 1500 };
    public animation3: Object= { enable: true,delay: 3400,  duration: 1500 };
    public animation4: Object= { enable: true,delay: 4800,  duration: 1500 };
    public animation5: Object={ enable: true,delay: 6200,  duration: 1500 };
    public tooltip: Object = {
      enable: true,
      header: '<b>Almond Yield - ${point.x}</b>',
      format: '${series.name}: <b>${point.y}</b>',
      showNearestTooltip: true,
      enableHighlight: true
    };
    public legend: Object = {
      visible: true, enableHighlight: true
    }

    // custom code start
    public load(args: ILoadedEventArgs): void {
        loadChartTheme(args);
    };

    // custom code end
    public title: string = 'Almond Yield Comparison Across Countries (2010–2022)';
    constructor() {
       //code
    };

}