import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ILoadedEventArgs, IZoomCompleteEventArgs, ChartComponent, ChartTheme, ISeriesRenderEventArgs } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';

/**
 * Sample for Range Area Series
 */
@Component({
  selector: 'control-content',
  templateUrl: 'range-area.html',
  styleUrls: ['chart.style.css'],
  encapsulation: ViewEncapsulation.None
})

export class RangeAreaComponent {
  //Initializing Primary X Axis
  public primaryXAxis: Object = {
    valueType: 'DateTime',
    labelFormat: 'dd MMM',
    interval: 2,
    edgeLabelPlacement: 'Shift',
    majorGridLines: { width: 0 }
  };
  //Initializing Primary Y Axis
  public primaryYAxis: Object = {
    labelFormat: '{value}˚C',
    maximum: 70,
    minimum: 0,
    interval: 10,
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

  public zoomSettings: Object = {
    enableSelectionZooming: true,
    mode: 'X',
    enableMouseWheelZooming: true,
    enablePan: true,
    enablePinchZooming: true
  };
  public title: string = 'Temperature Variation';
  public tooltip: Object = {
    enable: true,
    format:'Temperature : <b>${point.tooltip}</b><br>Range : <b>${point.low} - ${point.high}</b>',
    shared: true
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
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Material';
    args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
  };
   // custom code end
  public data: Object[] = [
      { Period : new Date(2015, 0, 1), HighTemp : 42.5, LowTemp : 12.5, LineTemp : 32.5, Text : "32.5˚C" },
      { Period : new Date(2015, 0, 2), HighTemp : 37.5, LowTemp : 17.5, LineTemp : 27.5, Text : "27.5˚C" },
      { Period : new Date(2015, 0, 3), HighTemp : 47.5, LowTemp : 15.5, LineTemp : 25.5, Text : "25.5˚C" },
      { Period : new Date(2015, 0, 4), HighTemp : 42.5, LowTemp : 18.5, LineTemp : 28.5, Text : "28.5˚C" },
      { Period : new Date(2015, 0, 5), HighTemp : 45.5, LowTemp : 16.5, LineTemp : 28.5, Text : "28.5˚C" },
      { Period : new Date(2015, 0, 6), HighTemp : 42.5, LowTemp : 12.5, LineTemp : 31.5, Text : "31.5˚C" },
      { Period : new Date(2015, 0, 7), HighTemp : 43.5, LowTemp : 13.5, LineTemp : 33.5, Text : "33.5˚C" },
      { Period : new Date(2015, 0, 8), HighTemp : 45.5, LowTemp : 15.5, LineTemp : 31.5, Text : "31.5˚C" },
      { Period : new Date(2015, 0, 9), HighTemp : 41.7, LowTemp : 12.7, LineTemp : 25.7, Text : "25.7˚C" },
      { Period : new Date(2015, 0, 10), HighTemp : 45.5, LowTemp : 11.5, LineTemp : 31.5, Text : "31.5˚C" },
      { Period : new Date(2015, 0, 11), HighTemp : 43.5, LowTemp : 15.5, LineTemp : 30.5, Text : "30.5˚C" },
      { Period : new Date(2015, 0, 12), HighTemp : 45.5, LowTemp : 21.5, LineTemp : 32.5, Text : "32.5˚C" },
      { Period : new Date(2015, 0, 13), HighTemp : 39.5, LowTemp : 9.5, LineTemp : 20.5, Text : "20.5˚C" },
      { Period : new Date(2015, 0, 14), HighTemp : 33.5, LowTemp : 15.5, LineTemp : 23.5, Text : "23.5˚C" },
      { Period : new Date(2015, 0, 15), HighTemp : 38.5, LowTemp : 11.5, LineTemp : 24.5, Text : "24.5˚C" },
      { Period : new Date(2015, 0, 16), HighTemp : 45.5, LowTemp : 14.5, LineTemp : 30.5, Text : "30.5˚C" },
      { Period : new Date(2015, 0, 17), HighTemp : 40.5, LowTemp : 9.5, LineTemp : 20.5, Text : "20.5˚C" },
      { Period : new Date(2015, 0, 18), HighTemp : 42.5, LowTemp : 15.5, LineTemp : 22.5, Text : "22.5˚C" },
      { Period : new Date(2015, 0, 19), HighTemp : 40.5, LowTemp : 13.5, LineTemp : 25.5, Text : "25.5˚C" },
      { Period : new Date(2015, 0, 20), HighTemp : 45.7, LowTemp : 20.5, LineTemp : 31.5, Text : "31.5˚C" },
      { Period : new Date(2015, 0, 21), HighTemp : 43.5, LowTemp : 19.5, LineTemp : 34.5, Text : "34.5˚C" },
      { Period : new Date(2015, 0, 22), HighTemp : 42.5, LowTemp : 15.5, LineTemp : 29.5, Text : "29.5˚C" },
      { Period : new Date(2015, 0, 23), HighTemp : 45.5, LowTemp : 10.5, LineTemp : 21.5, Text : "21.5˚C" },
      { Period : new Date(2015, 0, 24), HighTemp : 42.5, LowTemp : 13.5, LineTemp : 23.5, Text : "23.5˚C" },
      { Period : new Date(2015, 0, 25), HighTemp : 39.5, LowTemp : 9.9, LineTemp : 20.5, Text : "20.5˚C" },
      { Period : new Date(2015, 0, 26), HighTemp : 43.5, LowTemp : 10.5, LineTemp : 23.5, Text : "23.5˚C" },
      { Period : new Date(2015, 0, 27), HighTemp : 42.5, LowTemp : 13.5, LineTemp : 31.5, Text : "31.5˚C" },
      { Period : new Date(2015, 0, 28), HighTemp : 45.5, LowTemp : 13.5, LineTemp : 28.5, Text : "28.5˚C" },
      { Period : new Date(2015, 0, 29), HighTemp : 46.5, LowTemp : 15.5, LineTemp : 34.5, Text : "34.5˚C" },
      { Period : new Date(2015, 0, 30), HighTemp : 48.5, LowTemp : 18.5, LineTemp : 29.5, Text : "29.5˚C" },
      { Period : new Date(2015, 0, 31), HighTemp : 45.5, LowTemp : 11.5, LineTemp : 31.5, Text : "31.5˚C" }
  ];

  public seriesRender(args: ISeriesRenderEventArgs): void {
    var areathemes = ['bootstrap5', 'bootstrap5dark', 'tailwind', 'tailwinddark', 'material', 'materialdark', 'bootstrap4', 'bootstrap', 'bootstrapdark', 'fabric', 'fabricdark', 'highcontrast'];
    var borderColor = ['#262E0B', '#5ECB9B', '#5A61F6', '#8B5CF6', '#00bdae', '#9ECB08', '#a16ee5', '#a16ee5', '#a16ee5', '#4472c4', '#4472c4', '#79ECE4'];
    args.series.border.color = borderColor[areathemes.indexOf(args.series.chart.theme.toLowerCase())];
  };
  constructor() {
    //code
  };

}