import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { ChartComponent, ChartTheme, ILoadedEventArgs, IAxisLabelRenderEventArgs, IAnnotationRenderEventArgs,ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
  selector: 'control-content',
  templateUrl: 'pagination.html',
  styleUrls: ['chart.style.css'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
})
export class PaginationComponent {
  @ViewChild('chart', { static: true }) 
  public chart: ChartComponent;

  public primaryXAxis: Object = {
    interval: 1,
    zoomFactor: 0.175, 
    zoomPosition: 0,
    majorGridLines: { width: 0 },
    enableAutoIntervalOnZooming: false,
    labelPlacement: 'OnTicks',
    labelRotation: Browser.isDevice ? -90 : 0,
    valueType: 'Category',
    edgeLabelPlacement: 'Shift',
    isIndexed: true
  };

  public primaryYAxis: Object = {
    majorGridLines: { width: 0 },
    visible: false,
    maximum: 32
  };
  //Initializing Legend
  public legendSettings: Object = {
    visible: false
  };
  public chartArea: Object = { border: { width: 0 } };
  public width: string = Browser.isDevice ? '100%' : '75%';
  public border: Object = {
    width: 2
  };

  public chartData: any[] = [
    { x: 1, xValue: '1 am', y: 20 }, { x: 2, xValue: '4 am', y: 20 }, { x: 3, xValue: '7 am', y: 20 },
    { x: 4, xValue: '10 am', y: 21 }, { x: 5, xValue: '1 pm', y: 21 }, { x: 6, xValue: '4 pm', y: 24 },
    { x: 7, xValue: '1 am', y: 19 }, { x: 8, xValue: '4 am', y: 20 }, { x: 9, xValue: '7 am', y: 20 },
    { x: 10, xValue: '10 am', y: 21 }, { x: 11, xValue: '1 pm', y: 24 }, { x: 12, xValue: '4 pm', y: 24 },
    { x: 13, xValue: '1 am', y: 21 }, { x: 14, xValue: '4 am', y: 21 }, { x: 15, xValue: '7 am', y: 21 },
    { x: 16, xValue: '10 am', y: 22 }, { x: 17, xValue: '1 pm', y: 23 }, { x: 18, xValue: '4 pm', y: 24 },
    { x: 19, xValue: '1 am', y: 20 }, { x: 20, xValue: '4 am', y: 19 }, { x: 21, xValue: '7 am', y: 19 },
    { x: 22, xValue: '10 am', y: 18 }, { x: 23, xValue: '1 pm', y: 19 }, { x: 24, xValue: '4 pm', y: 19 },
    { x: 25, xValue: '1 am', y: 16 }, { x: 26, xValue: '4 am', y: 15 }, { x: 27, xValue: '7 am', y: 14 },
    { x: 28, xValue: '10 am', y: 15 }, { x: 29, xValue: '1 pm', y: 16 }, { x: 30, xValue: '4 pm', y: 18 }
  ];


  public image: string = 'sunny_image';
  public count: number = 25;
  public day: string = 'Friday';
  public marker: Object = { visible: false, dataLabel: { visible: true, format:'{value}°C', position:'Top' } };

  constructor() {
  }

  public load(args: ILoadedEventArgs): void {
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
    args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
      selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
      const isDarkTheme = /dark/i.test(selectedTheme) || /contrast/i.test(selectedTheme);
      const buttons = document.querySelectorAll('.custom-button');
      const buttonContainer = document.getElementById('button-container');
      buttons.forEach(button => {
          if (isDarkTheme) {
              button.classList.add('dark-theme-bg');
              button.classList.remove('light-theme-bg');
              buttonContainer.style.backgroundColor = '#333';
          } else {
              button.classList.add('light-theme-bg');
              button.classList.remove('dark-theme-bg');
              buttonContainer.style.backgroundColor = 'rgb(237, 236, 236)';
          }
      });
    if (Browser.isDevice) {
      buttonContainer.style.width = '97%';
    } else {
      buttonContainer.style.width = '75%';
    }
  }

  public annotations: Object[] = [
    {
        content: '<div id="chart_image"><img src="./assets/chart/images/cloudy.png" alt="Cloud Picture" style="width: 41px; height: 41px"/></div>',
        coordinateUnits: 'Pixel',
        region: 'Chart',
        x: Browser.isDevice ? '6%' : '3%',
        y: '9%'
    },
    {
        content: '<div id="days" style="font-size: 11px;">Friday, 01:00 am</div>',
        coordinateUnits: 'Pixel',
        region: 'Chart',
        x: Browser.isDevice ? '87%' : '94%',
        y: Browser.isDevice ? '10%' : '11%'
    },
    {
        content: '<div id="title" style="font-size: 20px; font-weight: 600">USA, Texas</div>',
        coordinateUnits: 'Pixel',
        region: 'Chart',
        x: Browser.isDevice ? '88%' : '93%',
        y: Browser.isDevice ? '4%' : '3%'
    }
]
public zoomSettings:Object = {
    enableSelectionZooming: true,
    toolbarItems: [],
    mode: 'X'
} 

  public annotationRender(args: IAnnotationRenderEventArgs): void {
    if (args.content.id === 'container_Annotation_0') {
      args.content.innerHTML = `<div id="chart_cloud" align="center"><img src="./assets/chart/images/${this.image}.png" alt="Cloud Picture" style="width: 41px; height: 41px; margin-right: 10px;"/><b align="center" style="font-size: 23px">${this.count} <span style="font-size: 12px; vertical-align: super;">°C | °F</span></b></div>`;
    } else if (args.content.id === 'container_Annotation_1') {
      args.content.innerHTML = Browser.isDevice ? `<div  id="days" style="font-size: 9px;">${this.day}, 01:00 am</div>` : `<div  id="days" style="font-size: 11px;">${this.day}, 01:00 am</div>`;
      if (this.day === 'Saturday' || this.day === 'Tuesday') {
        Browser.isDevice ? args.location.x -= 8 : args.location.x -= 12;
      } else if (this.day === 'Sunday') {
        Browser.isDevice ? args.location.x -= 5 : args.location.x -= 8;
      } else if (this.day === 'Monday') {
        args.location.x -= 10
      }
    } else {
      args.content.innerHTML = Browser.isDevice ? `<div id="title" style="font-size: 16px; font-weight: 600">USA, Texas</div>` : `<div id="title" style="font-size: 20px; font-weight: 600">USA, Texas</div>`;
    }
  }

  public updateChart(buttonId: string, img: string, tempCount: number, chartDay: string, zoomPos: number, zoomFactor: number): void {
    this.image = img;
    this.count = tempCount;
    this.day = chartDay;
    this.chart.primaryXAxis.zoomPosition = zoomPos;
    this.chart.primaryXAxis.zoomFactor = zoomFactor;
    this.chart.duration = 600;
    const buttons = document.querySelectorAll('.custom-button');
    buttons.forEach(button => button.classList.remove('active'));
    const selectedButton = document.getElementById(buttonId) as HTMLElement;
    selectedButton.classList.add('active');
  }

  public onClick(id: string, img: string, tempCount: number,day:string, zoomPos: number, zoomFactor: number): void {
    this.updateChart(id, img, tempCount, day, zoomPos, zoomFactor);
  }
}
