import { Component, ViewEncapsulation } from '@angular/core';
import {
  ChartAllModule, ChartComponent, ChartTheme, ILoadedEventArgs,IPointRenderEventArgs
} from '@syncfusion/ej2-angular-charts';
import { TabModule, TabAllModule, SelectingEventArgs } from '@syncfusion/ej2-angular-navigations'
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadChartTheme, bubblePointRender } from './theme-color';

@Component({
  selector: 'control-content',
  templateUrl: 'series-animation.html',
  styleUrls: ['chart.style.css'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent, TabAllModule, TabModule],
})
export class SeriesAnimationComponent {

  public activeChart: string = 'lineCharts';
  public headerText: { text: string, content: string }[] = [
    { text: "Line", content: "lineCharts" },
    { text: "Column", content: "columnCharts" },
    { text: "Spline", content: "splineCharts" },
    { text: "Area", content: "areaCharts" },
    { text: "Bar", content: "barCharts" },
    { text: "Bubble", content: "bubbleCharts" },
    { text: "Scatter", content: "scatterCharts" },
    { text: "Step Line", content: "stepLineCharts" },
    { text: "Range Column", content: "rangeCharts" }
  ];

  public primaryXAxis: Object = {
    valueType: 'Category',
    majorGridLines: { width: 0 },
    majorTickLines: { width: 0 },
    minorTickLines: { width: 0 }
  };

  public primaryYAxis: Object = {
    labelFormat: '{value}',
    maximum: 100,
    minimum: 0,
    edgeLabelPlacement: 'Shift',
    lineStyle: { width: 0 },
    majorTickLines: { width: 0 }
  };

  public bubbleXAxis: Object = {
    minimum: 1,
    maximum: 7,
    interval: 1,
    majorGridLines: { width: 0 },
    majorTickLines: { width: 0 }
  };

  public bubbleYAxis: Object = {
    minimum: 0,
    maximum: 100,
    lineStyle: { width: 0 },
    majorTickLines: { width: 0 }
  };

  public scatterXAxis: Object = {
    minimum: 1,
    interval: 1,
    maximum: 10,
    majorGridLines: { width: 0 },
    majorTickLines: { width: 0 },
    edgeLabelPlacement: 'Shift'
  };

  public scatterYAxis: Object = {
    majorTickLines: { width: 0 },
    lineStyle: { width: 0 },
    minimum: 0,
    maximum: 80,
    interval: 10,
    rangePadding: 'None'
  };

  public chartArea: Object = { border: { width: 0 } };
  public width: string = '100%';

  public splineSeries: Object = {
    dataSource: this.getSpline(),
    xName: "x",
    yName: "y",
    type: "Spline",
    width: 2.5,
    marker: { visible: true, height: 8, width: 8, dataLabel: { visible: true, position: 'Outer' } },
    animation: { enable: true }
  };

  public lineSeries: Object = {
    dataSource: this.getLine(),
    xName: "x",
    yName: "y",
    type: "Line",
    width: 2.5,
    marker: { visible: true, height: 8, width: 8, dataLabel: { visible: true, position: 'Outer' } },
    animation: { enable: true }
  };

  public columnSeries: Object = {
    dataSource: this.getColumn(),
    xName: "x",
    yName: "y",
    type: "Column",
    marker: { visible: false, dataLabel: { visible: true, position: 'Outer' } },
    animation: { enable: true },
    cornerRadius: { topLeft: 4, topRight: 4 }
  };

  public areaSeries: Object = {
    dataSource: this.getArea(),
    xName: "x",
    yName: "y",
    type: "SplineArea",
    marker: { visible: false, dataLabel: { visible: true, position: 'Outer' } },
    animation: { enable: true }
  };

  public barSeries: Object = {
    dataSource: this.getBar(),
    xName: "x",
    yName: "y",
    type: "Bar",
    marker: { visible: false, dataLabel: { visible: true, position: 'Outer' } },
    animation: { enable: true },
    cornerRadius: { bottomRight: 4, topRight: 4 }
  };

  public bubbleSeries: Object = {
    dataSource: this.getBubbleData(),
    type: "Bubble",
    border: { width: 2 },
    xName: "x",
    yName: "y",
    size: "size",
    animation: { enable: true }
  };

  public marker: Object = {
    visible: false, width: 8, height: 8, shape: 'Circle', dataLabel: { visible: false }
  };
  public animation: Object = {
    enable: true
  };

  public stepLineSeries: Object = {
    dataSource: this.getStepLine(),
    xName: "x",
    yName: "y",
    width: 2.5,
    type: "StepLine",
    marker: { visible: false, dataLabel: { visible: false } },
    animation: { enable: true }
  };

  public rangeSeries: Object = {
    dataSource: this.getRangeColumnData(),
    xName: "x",
    low: "low",
    high: "high",
    type: "RangeColumn",
    columnSpacing: 0.1,
    marker: { visible: false, dataLabel: { visible: true, position: 'Outer' } },
    animation: { enable: true },
    cornerRadius: { topLeft: 4, topRight: 4, bottomRight: 4, bottomLeft: 4 }
  };

  private getSpline(): DataPoint[] {
    return [
      { x: '1', y: 30 },
      { x: '2', y: 10 },
      { x: '3', y: 80 },
      { x: '4', y: 20 },
      { x: '5', y: 30 },
      { x: '6', y: 5 },
      { x: '7', y: 69 },
      { x: '8', y: 15 },
      { x: '9', y: 60 },
      { x: '10', y: 70 }
    ]
  }

  private getLine(): DataPoint[] {
    return [
      { x: '1', y: 10 },
      { x: '2', y: 30 },
      { x: '3', y: 80 },
      { x: '4', y: 20 },
      { x: '5', y: 30 },
      { x: '6', y: 40 },
      { x: '7', y: 69 },
      { x: '8', y: 15 },
      { x: '9', y: 60 },
      { x: '10', y: 70 }
    ];
  }

  private getColumn(): DataPoint[] {
    return [
      { x: '1', y: 90 },
      { x: '2', y: 10 },
      { x: '3', y: 50 },
      { x: '4', y: 20 },
      { x: '5', y: 30 },
      { x: '6', y: 70 },
      { x: '7', y: 9 }
    ];
  }

  private getArea(): DataPoint[] {
    return [
      { x: '1', y: 10 },
      { x: '2', y: 20 },
      { x: '3', y: 80 },
      { x: '4', y: 15 },
      { x: '5', y: 30 },
      { x: '6', y: 40 },
      { x: '7', y: 69 },
      { x: '8', y: 15 }
    ];
  }

  private getBar(): DataPoint[] {
    return [
      { x: '1', y: 90 },
      { x: '2', y: 10 },
      { x: '3', y: 50 },
      { x: '4', y: 20 },
      { x: '5', y: 30 },
      { x: '6', y: 70 },
      { x: '7', y: 9 }
    ];
  }

  private getStepLine(): DataPoint[] {
    return [
      { x: '1', y: 10 },
      { x: '2', y: 30 },
      { x: '3', y: 80 },
      { x: '4', y: 20 },
      { x: '5', y: 30 },
      { x: '6', y: 40 },
      { x: '7', y: 69 },
      { x: '8', y: 15 },
      { x: '9', y: 60 },
      { x: '10', y: 70 }
    ];
  }

  private getBubbleData(): Object[] {
    return [
      { x: '1.5', y: 80, size: 4 },
      { x: '2', y: 60, size: 6 },
      { x: '3', y: 70, size: 2 },
      { x: '4', y: 13, size: 4 },
      { x: '5', y: 30, size: 3 },
      { x: '6', y: 20, size: 4 },
      { x: '6.5', y: 40, size: 6 },
    ];
  }

  public scatterData1: Object[] = [
    { x: '1', y: 60, y1: 45 },
    { x: '1.25', y: 40, y1: 30 },
    { x: '1.5', y: 25, y1: 10 },
    { x: '1.75', y: 15, y1: 50 },
    { x: '2', y: 15, y1: 65 },
    { x: '2.25', y: 35, y1: 50 },
    { x: '2.5', y: 40, y1: 30 },
    { x: '2.75', y: 60, y1: 25 },
    { x: '3', y: 65, y1: 25 },
    { x: '3.25', y: 30, y1: 15 },
    { x: '3.5', y: 20, y1: 60 },
    { x: '3.75', y: 50, y1: 40 },
    { x: '4', y: 50, y1: 35 },
    { x: '4.25', y: 55, y1: 50 },
    { x: '4.5', y: 75, y1: 15 },
    { x: '4.75', y: 45, y1: 60 },
    { x: '5', y: 45, y1: 50 },
    { x: '5.25', y: 35, y1: 30 },
    { x: '5.5', y: 30, y1: 20 },
    { x: '5.75', y: 55, y1: 40 },
    { x: '6', y: 70, y1: 55 },
    { x: '6.25', y: 60, y1: 25 },
    { x: '6.5', y: 15, y1: 40 },
    { x: '6.75', y: 40, y1: 15 },
    { x: '7', y: 30, y1: 25 },
    { x: '7.25', y: 60, y1: 35 },
    { x: '7.5', y: 60, y1: 35 },
    { x: '7.75', y: 25, y1: 15 },
    { x: '8', y: 25, y1: 10 },
    { x: '8.25', y: 50, y1: 30 },
    { x: '8.5', y: 45, y1: 65 },
    { x: '8.75', y: 55, y1: 20 },
    { x: '9', y: 50, y1: 60 },
    { x: '9.25', y: 30, y1: 45 },
    { x: '9.5', y: 10, y1: 20 },
    { x: '9.75', y: 40, y1: 35 },
    { x: '10', y: 55, y1: 15 }
  ];

  public scatterData2: Object[] = [
    { x: '1', y: 70, y1: 25 },
    { x: '1.25', y: 55, y1: 40 },
    { x: '1.5', y: 45, y1: 40 },
    { x: '1.75', y: 30, y1: 45 },
    { x: '2', y: 20, y1: 55 },
    { x: '2.25', y: 30, y1: 45 },
    { x: '2.5', y: 10, y1: 35 },
    { x: '2.75', y: 25, y1: 15 },
    { x: '3', y: 50, y1: 20 },
    { x: '3.25', y: 60, y1: 30 },
    { x: '3.5', y: 25, y1: 60 },
    { x: '3.75', y: 50, y1: 45 },
    { x: '4', y: 30, y1: 15 },
    { x: '4.25', y: 55, y1: 20 },
    { x: '4.5', y: 65, y1: 75 },
    { x: '4.75', y: 45, y1: 35 },
    { x: '5', y: 60, y1: 45 },
    { x: '5.25', y: 35, y1: 10 },
    { x: '5.5', y: 15, y1: 30 },
    { x: '5.75', y: 30, y1: 60 },
    { x: '6', y: 55, y1: 50 },
    { x: '6.25', y: 25, y1: 45 },
    { x: '6.5', y: 35, y1: 10 },
    { x: '6.75', y: 20, y1: 30 },
    { x: '7', y: 40, y1: 65 },
    { x: '7.25', y: 30, y1: 45 },
    { x: '7.5', y: 30, y1: 60 },
    { x: '7.75', y: 45, y1: 30 },
    { x: '8', y: 60, y1: 45 },
    { x: '8.25', y: 50, y1: 40 },
    { x: '8.5', y: 20, y1: 25 },
    { x: '8.75', y: 70, y1: 15 },
    { x: '9', y: 75, y1: 15 },
    { x: '9.25', y: 30, y1: 50 },
    { x: '9.5', y: 50, y1: 35 },
    { x: '9.75', y: 55, y1: 20 },
    { x: '10', y: 15, y1: 70 }
  ];
  public scatterData3: Object[] = [
    { x: '1', y: 20, y1: 30 },
    { x: '1.25', y: 30, y1: 20 },
    { x: '1.5', y: 35, y1: 60 },
    { x: '1.75', y: 40, y1: 30 },
    { x: '2', y: 55, y1: 20 },
    { x: '2.25', y: 45, y1: 35 },
    { x: '2.5', y: 60, y1: 45 },
    { x: '2.75', y: 25, y1: 30 },
    { x: '3', y: 45, y1: 15 },
    { x: '3.25', y: 50, y1: 45 },
    { x: '3.5', y: 50, y1: 35 },
    { x: '3.75', y: 15, y1: 40 },
    { x: '4', y: 15, y1: 70 },
    { x: '4.25', y: 45, y1: 55 },
    { x: '4.5', y: 75, y1: 10 },
    { x: '4.75', y: 60, y1: 25 },
    { x: '5', y: 30, y1: 55 },
    { x: '5.25', y: 45, y1: 35 },
    { x: '5.5', y: 60, y1: 25 },
    { x: '5.75', y: 40, y1: 45 },
    { x: '6', y: 10, y1: 50 },
    { x: '6.25', y: 20, y1: 65 },
    { x: '6.5', y: 65, y1: 40 },
    { x: '6.75', y: 30, y1: 30 },
    { x: '7', y: 25, y1: 65 },
    { x: '7.25', y: 35, y1: 40 },
    { x: '7.5', y: 20, y1: 45 },
    { x: '7.75', y: 60, y1: 50 },
    { x: '8', y: 35, y1: 60 },
    { x: '8.25', y: 25, y1: 45 },
    { x: '8.5', y: 30, y1: 15 },
    { x: '8.75', y: 50, y1: 70 },
    { x: '9', y: 45, y1: 75 },
    { x: '9.25', y: 20, y1: 35 },
    { x: '9.5', y: 40, y1: 50 },
    { x: '9.75', y: 45, y1: 30 },
    { x: '10', y: 50, y1: 25 }
  ];
  public scatterData4: Object[] = [
    { x: '1', y: 50, y1: 60 }, { x: '1.25', y: 45, y1: 55 },
    { x: '1.5', y: 15, y1: 30 },
    { x: '1.75', y: 55, y1: 20 },
    { x: '2', y: 60, y1: 45 },
    { x: '2.25', y: 55, y1: 35 },
    { x: '2.5', y: 55, y1: 20 },
    { x: '2.75', y: 30, y1: 50 },
    { x: '3', y: 70, y1: 50 },
    { x: '3.25', y: 25, y1: 35 },
    { x: '3.5', y: 30, y1: 35 },
    { x: '3.75', y: 45, y1: 60 },
    { x: '4', y: 65, y1: 15 },
    { x: '4.25', y: 20, y1: 70 },
    { x: '4.5', y: 25, y1: 75 },
    { x: '4.75', y: 35, y1: 25 },
    { x: '5', y: 40, y1: 60 },
    { x: '5.25', y: 50, y1: 30 },
    { x: '5.5', y: 20, y1: 10 },
    { x: '5.75', y: 35, y1: 40 },
    { x: '6', y: 35, y1: 45 },
    { x: '6.25', y: 30, y1: 25 },
    { x: '6.5', y: 30, y1: 70 },
    { x: '6.75', y: 60, y1: 20 },
    { x: '7', y: 45, y1: 25 },
    { x: '7.25', y: 40, y1: 35 },
    { x: '7.5', y: 20, y1: 55 },
    { x: '7.75', y: 50, y1: 40 },
    { x: '8', y: 50, y1: 40 },
    { x: '8.25', y: 35, y1: 55 },
    { x: '8.5', y: 60, y1: 35 },
    { x: '8.75', y: 30, y1: 60 },
    { x: '9', y: 10, y1: 65 },
    { x: '9.25', y: 25, y1: 50 },
    { x: '9.5', y: 40, y1: 50 },
    { x: '9.75', y: 30, y1: 25 },
    { x: '10', y: 65, y1: 30 },
  ];
  public scatterData: Object[] = [
    { x: '1', y: 15, y1: 10 }, { x: '1.25', y: 35, y1: 20 },
    { x: '1.5', y: 60, y1: 50 }, { x: '1.75', y: 25, y1: 15 },
    { x: '2', y: 25, y1: 35 }, { x: '2.25', y: 30, y1: 30 },
    { x: '2.5', y: 45, y1: 30 }, { x: '2.75', y: 40, y1: 20 },
    { x: '3', y: 30, y1: 45 }, { x: '3.25', y: 55, y1: 35 },
    { x: '3.5', y: 65, y1: 20 }, { x: '3.75', y: 40, y1: 50 },
    { x: '4', y: 40, y1: 60 }, { x: '4.25', y: 60, y1: 25 },
    { x: '4.5', y: 15, y1: 25 }, { x: '4.75', y: 75, y1: 55 },
    { x: '5', y: 50, y1: 40 }, { x: '5.25', y: 45, y1: 30 },
    { x: '5.5', y: 20, y1: 15 }, { x: '5.75', y: 65, y1: 35 },
    { x: '6', y: 65, y1: 65 }, { x: '6.25', y: 35, y1: 50 },
    { x: '6.5', y: 70, y1: 35 }, { x: '6.75', y: 50, y1: 40 },
    { x: '7', y: 25, y1: 60 }, { x: '7.25', y: 60, y1: 45 },
    { x: '7.5', y: 45, y1: 20 }, { x: '7.75', y: 30, y1: 15 },
    { x: '8', y: 60, y1: 50 }, { x: '8.25', y: 25, y1: 35 },
    { x: '8.5', y: 30, y1: 10 }, { x: '8.75', y: 45, y1: 25 },
    { x: '9', y: 75, y1: 45 }, { x: '9.25', y: 40, y1: 50 },
    { x: '9.5', y: 20, y1: 15 }, { x: '9.75', y: 30, y1: 40 },
    { x: '10', y: 60, y1: 25 }, { x: '7.25', y: 60, y1: 45 },
    { x: '7.5', y: 45, y1: 20 }, { x: '7.75', y: 30, y1: 15 },
    { x: '8', y: 60, y1: 50 }, { x: '8.25', y: 25, y1: 35 },
    { x: '8.5', y: 30, y1: 10 }, { x: '8.75', y: 45, y1: 25 },
    { x: '9', y: 75, y1: 45 }, { x: '9.25', y: 40, y1: 50 },
    { x: '9.5', y: 20, y1: 15 }, { x: '9.75', y: 30, y1: 40 },
    { x: '10', y: 60, y1: 25 }
  ];

  private getRangeColumnData(): Object[] {
    return [
      { x: '1', low: 30, high: 60 },
      { x: '2', low: 42, high: 73 },
      { x: '3', low: 35, high: 80 },
      { x: '4', low: 20, high: 50 },
      { x: '5', low: 30, high: 80 },
      { x: '6', low: 10, high: 40 },
      { x: '7', low: 15, high: 69 }
    ];
  }

  private shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

    private  lineIntervalId: any;
    private  columnIntervalId: any;
    private  splineIntervalId: any;
    private  areaIntervalId: any;
    private  barIntervalId: any;
    private  bubbleIntervalId: any;
    private  scatterIntervalId: any;
    private  stepLineIntervalId: any;
    private  rangeIntervalId: any;


  private lineClearInterval() {
    if (this.lineIntervalId) {
      clearInterval(this.lineIntervalId);
      this.lineIntervalId = null;
    }
  }
  private columnClearInterval() {
    if (this.columnIntervalId) {
      clearInterval(this.columnIntervalId);
      this.columnIntervalId = null;
    }
  }
  private splineClearInterval() {
    if (this.splineIntervalId) {
      clearInterval(this.splineIntervalId);
      this.splineIntervalId = null;
    }
  }
  private areaClearInterval() {
    if (this.areaIntervalId) {
      clearInterval(this.areaIntervalId);
      this.areaIntervalId = null;
    }
  }
  private barClearInterval() {
    if (this.barIntervalId) {
      clearInterval(this.barIntervalId);
      this.barIntervalId = null;
    }
  }
  private bubbleClearInterval() {
    if (this.bubbleIntervalId) {
      clearInterval(this.bubbleIntervalId);
      this.bubbleIntervalId = null;
    }
  }
  private scatterClearInterval() {
    if (this.scatterIntervalId) {
      clearInterval(this.scatterIntervalId);
      this.scatterIntervalId = null;
    }
  }
  private stepLineClearInterval() {
    if (this.stepLineIntervalId) {
      clearInterval(this.stepLineIntervalId);
      this.stepLineIntervalId = null;
    }
  }
  private rangeClearInterval() {
    if (this.rangeIntervalId) {
      clearInterval(this.rangeIntervalId);
      this.rangeIntervalId = null;
    }
  }

  public splineLoaded(args: ILoadedEventArgs): void {
    args.chart.element.setAttribute('title', '');
  }

  public lineLoaded(args: ILoadedEventArgs): void {
    args.chart.element.setAttribute('title', '');
  }

  public columnLoaded(args: ILoadedEventArgs): void {
    args.chart.element.setAttribute('title', '');
  }

  public areaLoaded(args: ILoadedEventArgs): void {
    args.chart.element.setAttribute('title', '');
  }

  public barLoaded(args: ILoadedEventArgs): void {
    args.chart.element.setAttribute('title', '');
  }
  public bubbleLoaded(args: ILoadedEventArgs): void {
    args.chart.element.setAttribute('title', '');
  }

  public scatterLoaded(args: ILoadedEventArgs): void {
    args.chart.element.setAttribute('title', '');
  }

  public stepLoaded(args: ILoadedEventArgs): void {
    args.chart.element.setAttribute('title', '');
  }

  public rangeLoaded(args: ILoadedEventArgs): void {
    args.chart.element.setAttribute('title', '');
  }

  public splineLoad(args: ILoadedEventArgs): void {
    loadChartTheme(args);
    this.splineClearInterval();
    this.splineIntervalId = setInterval(() => {
      let container = document.getElementById('splineChart');
        if (container && container.children.length > 0 && container.id === args.chart.element.id) {
      const newData = this.getSpline().map(item => ({
        x: item.x,
        y: Math.floor(Math.random() * (95 - 10 + 1)) + 10
      }));
      args.chart.series[0].setData(newData, 1400);
    } else {
      this.splineClearInterval();
    }
    }, 2000);
  }

  public lineLoad(args: ILoadedEventArgs): void {
    loadChartTheme(args);
    this.lineClearInterval();
    this.lineIntervalId = setInterval(() => {
      let container = document.getElementById('lineChart');
        if (container && container.children.length > 0 && container.id === args.chart.element.id) {
      const newData = this.getLine().map(item => ({
        x: item.x,
        y: Math.floor(Math.random() * (95 - 10 + 1)) + 10
      }));
      args.chart.series[0].setData(newData, 1400);
    } else {
      this.lineClearInterval();
    }
    }, 2000);
  }

  public columnLoad(args: ILoadedEventArgs): void {
    loadChartTheme(args);
    this.columnClearInterval();
    this.columnIntervalId = setInterval(() => {
      let container = document.getElementById('columnChart');
        if (container && container.children.length > 0 && container.id === args.chart.element.id) {
      const newData = this.getColumn().map(item => ({
        x: item.x,
        y: Math.floor(Math.random() * (95 - 10 + 1)) + 10
      }));
      args.chart.series[0].setData(newData, 1400);
    } else {
      this.columnClearInterval();
    }
    }, 2000);
  }

  public areaLoad(args: ILoadedEventArgs): void {
    loadChartTheme(args);
    this.areaClearInterval();
    this.areaIntervalId = setInterval(() => {
      let container = document.getElementById('areaChart');
        if (container && container.children.length > 0 && container.id === args.chart.element.id) {
      const newData = this.getArea().map(item => ({
        x: item.x,
        y: Math.floor(Math.random() * (95 - 10 + 1)) + 10
      }));
      args.chart.series[0].setData(newData, 1400);
    } else {
      this.areaClearInterval();
    }
    }, 2000);
  }

  public barLoad(args: ILoadedEventArgs): void {
    loadChartTheme(args);
    this.barClearInterval();
    this.barIntervalId = setInterval(() => {
      let container = document.getElementById('barChart');
        if (container && container.children.length > 0 && container.id === args.chart.element.id) {
      const newData = this.getBar().map(item => ({
        x: item.x,
        y: Math.floor(Math.random() * (95 - 10 + 1)) + 10
      }));
      args.chart.series[0].setData(newData, 1400);
    } else {
      this.barClearInterval();
    }
    }, 2000);
  }

  public bubbleLoad(args: ILoadedEventArgs): void {
    loadChartTheme(args);
    this.bubbleClearInterval();
    this.bubbleIntervalId = setInterval(() => {
      let container = document.getElementById('bubbleChart');
        if (container && container.children.length > 0 && container.id === args.chart.element.id) {
      const newBubbleData = this.getBubbleData().map(item => ({
        ...item,
        y: Math.random() * (95 - 5) + 5,
        size: Math.random() * (9.5 - 3.5) + 3.5
      }));
      args.chart.series[0].setData(this.shuffleArray(newBubbleData), 1400);
    } else {
      this.bubbleClearInterval();
    }
    }, 2000);
  }

  public scatterLoad(args: ILoadedEventArgs): void {
    loadChartTheme(args);
    this.scatterClearInterval();
    let index = 1;
    const datasets = [this.shuffleArray(this.scatterData), this.shuffleArray(this.scatterData1), this.shuffleArray(this.scatterData2), this.shuffleArray(this.scatterData3), this.shuffleArray(this.scatterData4)];
    this.scatterIntervalId = setInterval(() => {
      let container = document.getElementById('scatterChart');
        if (container && container.children.length > 0 && container.id === args.chart.element.id) {
      const scatterDataSource = datasets[index % datasets.length];
      index++;
      if (scatterDataSource && scatterDataSource.length > 0) {
        args.chart.series[0].setData(scatterDataSource, 2000);
        args.chart.series[1].setData(scatterDataSource, 2000);
      }
    } else {
      this.scatterClearInterval();
    }
    }, 2000);
  }

  public stepLoad(args: ILoadedEventArgs): void {
    loadChartTheme(args);
    this.stepLineClearInterval();
    this.stepLineIntervalId = setInterval(() => {
      let container = document.getElementById('stepLineChart');
        if (container && container.children.length > 0 && container.id === args.chart.element.id) {
      const newData = this.getStepLine().map(item => ({
        x: item.x,
        y: Math.floor(Math.random() * (95 - 10 + 1)) + 10
      }));
      args.chart.series[0].setData(newData, 1400);
    } else {
      this.stepLineClearInterval();
    }
    }, 2000);
  }

  public rangeLoad(args: ILoadedEventArgs): void {
    loadChartTheme(args);
    this.rangeClearInterval();
    this.rangeIntervalId = setInterval(() => {
      let container = document.getElementById('rangeChart');
        if (container && container.children.length > 0 && container.id === args.chart.element.id) {
      const newData = this.getRangeColumnData().map((item: DataPoint) => ({
        x: item.x,
        high: Math.floor(Math.random() * (95 - 50 + 1)) + 50,
        low: Math.floor(Math.random() * (45 - 5 + 1)) + 5
      }));
      args.chart.series[0].setData(newData, 1400);
    } else {
      this.rangeClearInterval();
    }
    }, 2000);
  }

  public bubblePointRender(args: IPointRenderEventArgs): void {
    bubblePointRender(args);
  }
}
interface DataPoint {
  x: string;
  y: number;
}