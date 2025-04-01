import { Component , ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme, IAccPointRenderEventArgs, IAccLoadedEventArgs, AccumulationTheme, ChartAllModule, AccumulationChartAllModule } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { DashboardLayoutModule } from '@syncfusion/ej2-angular-layouts';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { accPointRender, loadAccumulationChartTheme, loadChartTheme } from './theme-color';

@Component({
    selector: 'control-content',
    templateUrl: 'overview-chart.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, DashboardLayoutModule, ChartAllModule, AccumulationChartAllModule, SBDescriptionComponent]
})

export class OverViewChartComponent {
  public layoutColor: string;
  public cellSpacing: number[] = [15, 15];
  public cellAspectRatio: number = Browser.isDevice ? 1 : 0.8;
  public columns: number = Browser.isDevice ? 2 : 8;
  public columnSizeX: number = Browser.isDevice ? 1: 5;
  public columnSizeY: number = Browser.isDevice ? 1 : 2;
  public pieColumn: number = Browser.isDevice ? 1 : 5;
  public pieSizeX: number = Browser.isDevice ? 1 : 3;
  public pieSizeY: number = Browser.isDevice ? 1 : 2;
  public splineRow: number = Browser.isDevice ? 1 : 4;
  public splineSizeX: number = Browser.isDevice ? 2 : 8;
  public splineSizeY: number = Browser.isDevice ? 1 : 3;
  public chartArea: Object = {
    border: { width: 0,},
  };

  // Column Chart Data
  public columnChartDataCollection: Object[] = [
    { Period: "2020", Percentage: 60, TextMapping: "60%" },
    { Period: "2021", Percentage: 56, TextMapping: "56%" },
    { Period: "2022", Percentage: 71, TextMapping: "71%" },
    { Period: "2023", Percentage: 85, TextMapping: "85%" },
    { Period: "2024", Percentage: 73, TextMapping: "73%" }
  ];
  public columnChartData: Object[] = [
    { Period: "2020", Percentage: 40, TextMapping: "40%" },
    { Period: "2021", Percentage: 44, TextMapping: "44%" },
    { Period: "2022", Percentage: 29, TextMapping: "29%" },
    { Period: "2023", Percentage: 15, TextMapping: "15%" },
    { Period: "2024", Percentage: 27, TextMapping: "27%" }
  ];

  //Initializing Primary X Axis
  public columnChartprimaryXAxis: Object = {
    valueType: 'Category',
    majorGridLines: { width: 0 },
    lableStyle: { size: '11px' }
  };
  //Initializing Primary Y Axis
  public columnChartprimaryYAxis: Object = {
    labelFormat: '{value}%',
    lineStyle: { width: 0 },
    maximum: 100,
    minimum: 0,
    majorTickLines: { width: 0 },
    lableStyle: { size: '11px' },
    titleStyle: { size: '13px' }
  };

  public columnChartlegendSettings: Object = {
    padding:5,
    shapeHeight:8,
    shapeWidth:8,
    enableHighlight: true
  };

  public columnChartmarker: Object = {
    dataLabel: {
      visible: true, position: 'Middle', name:'TextMapping',
      font: {
        color:'#FFFFFF'
      }
    },
  };

  public chartCornerRadius: Object = {
    topLeft: 4, topRight: 4
  };

  public series1Fill: string = '#2485fa'
  public series2Fill: string = '#FEC200'

  //Pie Chart
  
  public data: Object[] = [
    { Product : "TV : 30 (12%)", Percentage : 12, TextMapping : "TV, 30 <br>12%"},
    { Product : "PC : 20 (8%)", Percentage : 8, TextMapping : "PC, 20 <br>8%"},
    { Product : "Laptop : 40 (16%)",  Percentage : 16, TextMapping : "Laptop, 40 <br>16%"},
    { Product : "Mobile : 90 (36%)", Percentage : 36, TextMapping : "Mobile, 90 <br>36%"},
    { Product : "Camera : 27 (11%)", Percentage : 11, TextMapping : "Camera, 27 <br>11%"}
  ];

  public animation: Object = {
    enable: true
  };
  public border: Object = { width:3 };
  public pieTooltipSetting: Object = { enable: true, format: '${point.x}', enableHighlight: true };
  public palettes: string[] = ["#61EFCD", "#CDDE1F", "#FEC200", "#CA765A", "#2485FA", "#F57D7D", "#C152D2",
    "#8854D9", "#3D4EB8", "#00BCD7", "#4472c4", "#ed7d31", "#ffc000", "#70ad47", "#5b9bd5", "#c1c1c1", "#6f6fe2", "#e269ae", "#9e480e", "#997300"];

  public dataLabel: Object = {
    visible: true,
    position: 'Outside', name: 'TextMapping',
    connectorStyle: { length: '10px', type:'Curve' }
  };
  public enableBorderOnMouseMove: boolean = false;
  public enableSmartLabels: boolean = false;
  public pielegendSettings: Object = {
    visible: false,
  };
  public startAngle: number = 270;
  public endAngle: number = 270;
  public accumulationload(args: IAccLoadedEventArgs): void {
    loadAccumulationChartTheme(args);
  };  

  //Spline Area
  
  public spLineAreaData: Object[] = [
       { Period : "Jan", Percentage : 3600 },
       { Period : "Feb", Percentage : 6200 },
       { Period : "Mar", Percentage : 8100 },
       { Period : "Apr", Percentage : 5900 },
       { Period : "May", Percentage : 8900 },
       { Period : "Jun", Percentage : 7200 },
       { Period : "Jul", Percentage : 4300 },
       { Period : "Aug", Percentage : 4600 },
       { Period : "Sep", Percentage : 5500 },
       { Period : "Oct", Percentage : 6350 },
       { Period : "Nov", Percentage : 5700 },
       { Period : "Dec", Percentage : 8000 }
  ];
  public spLineAreaData2: Object[] = [
      { Period : "Jan", Percentage : 6400,},
      { Period : "Feb", Percentage : 5300 },
      { Period : "Mar", Percentage : 4900 },
      { Period : "Apr", Percentage : 5300 },
      { Period : "May", Percentage : 4200 },
      { Period : "Jun", Percentage : 6500 },
      { Period : "Jul", Percentage : 7900 },
      { Period : "Aug", Percentage : 3800 },
      { Period : "Sep", Percentage : 6800 },
      { Period : "Oct", Percentage : 3400 },
      { Period : "Nov", Percentage : 6400 },
      { Period : "Dec", Percentage : 6800 }
  ];

  //Initializing Primary X Axis
  public spLineAreaprimaryXAxis: Object = {
    valueType: 'Category',
    majorGridLines: { width: 0 },
    majorTickLines: { width: 0 },
    edgeLabelPlacement: 'Shift',
    lableStyle: { size: '11px' }
  };
  //Initializing Primary Y Axis
  public spLineAreaprimaryYAxis: Object = {
    labelFormat: '${value}',
    lineStyle: { width: 0 },
    maximum: 12000,
    minimum: 0,
    majorTickLines: { width: 0 },
    lableStyle: { size: '11px' },
    textStyle: { size: '13px' }
  };
  public spLineLegendSettings: Object = {
    enableHighlight: true,
  }
  public spLineAreatooltipSettings: Object = {
    enable: true,
    enableHighlight: true, 
    showNearestTooltip: true,
    enableMarker: false
  };
  public spLineAreaBorder: Object = {
    width: 2.75,
    color:'#2485fa'
  };
  public spLineAreaBorder1: Object = {
    width: 2.75,
    color:'#FEC200'
  };

  public spLineAreaFill: string = '#2485fa'
  public spLineAreaFill1: string = '#FEC200'

  public load(args: ILoadedEventArgs ): void {    
    loadChartTheme(args);
    args.chart.series[0].fill = 'url(#' +'gradient-chart)';
    args.chart.series[1].fill = 'url(#' +'gradient-chart1)';
};

public pointRender(args: IAccPointRenderEventArgs): void {
  accPointRender(args);
};

  constructor() {
     //code
  }
}
