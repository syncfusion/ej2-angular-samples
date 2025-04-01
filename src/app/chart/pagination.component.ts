import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { ChartComponent, ChartTheme, ILoadedEventArgs, IAxisLabelRenderEventArgs, IMouseEventArgs, IResizeEventArgs, IAnnotationRenderEventArgs,ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadChartTheme } from './theme-color';

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
    maximum: 30
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
    { x: 1, xValue: '1 am', y: 6, datalabel: '6', datalabel1: '43' },
        { x: 2, xValue: '4 am', y: 4, datalabel: '4', datalabel1: '39' },
        { x: 3, xValue: '7 am', y: 2, datalabel: '2', datalabel1: '36' },
        { x: 4, xValue: '10 am', y: 8, datalabel: '8', datalabel1: '46' },
        { x: 5, xValue: '1 pm', y: 12, datalabel: '12', datalabel1: '54' },
        { x: 6, xValue: '4 pm', y: 11, datalabel: '11', datalabel1: '52' },
        { x: 7, xValue: '1 am', y: 6, datalabel: '6', datalabel1: '43' },
        { x: 8, xValue: '4 am', y: 7, datalabel: '7', datalabel1: '45' },
        { x: 9, xValue: '7 am', y: 9, datalabel: '9', datalabel1: '48' },
        { x: 10, xValue: '10 am', y: 14, datalabel: '14', datalabel1: '57' },
        { x: 11, xValue: '1 pm', y: 16, datalabel: '16', datalabel1: '61' },
        { x: 12, xValue: '4 pm', y: 15, datalabel: '15', datalabel1: '59' },
        { x: 13, xValue: '1 am', y: 15, datalabel: '15', datalabel1: '59' },
        { x: 14, xValue: '4 am', y: 16, datalabel: '16', datalabel1: '61' },
        { x: 15, xValue: '7 am', y: 17, datalabel: '17', datalabel1: '63' },
        { x: 16, xValue: '10 am', y: 18, datalabel: '18', datalabel1: '64' },
        { x: 17, xValue: '1 pm', y: 18, datalabel: '18', datalabel1: '64' },
        { x: 18, xValue: '4 pm', y: 15, datalabel: '15', datalabel1: '59' },
        { x: 19, xValue: '1 am', y: 14, datalabel: '14', datalabel1: '57' },
        { x: 20, xValue: '4 am', y: 13, datalabel: '13', datalabel1: '55' },
        { x: 21, xValue: '7 am', y: 12, datalabel: '12', datalabel1: '54' },
        { x: 22, xValue: '10 am', y: 14, datalabel: '14', datalabel1: '57' },
        { x: 23, xValue: '1 pm', y: 16, datalabel: '16', datalabel1: '61' },
        { x: 24, xValue: '4 pm', y: 15, datalabel: '15', datalabel1: '59' },
        { x: 25, xValue: '1 am', y: 15, datalabel: '15', datalabel1: '59' },
        { x: 26, xValue: '4 am', y: 14, datalabel: '14', datalabel1: '57' },
        { x: 27, xValue: '7 am', y: 16, datalabel: '16', datalabel1: '61' },
        { x: 28, xValue: '10 am', y: 18, datalabel: '18', datalabel1: '64' },
        { x: 29, xValue: '1 pm', y: 16, datalabel: '16', datalabel1: '61' },
        { x: 30, xValue: '4 pm', y: 17, datalabel: '17', datalabel1: '63' },
  ];


  public image: string = 'sunny_image';
  public count: number = 12;
  public day: string = 'Friday';
  public rainfalls: number = 0;
  public moistureLevels: number = 30;
  public breezeSpeeds: number = 5;
  public weather: string = 'Sunny';
    
  public temperatureData: TemperatureData[] = [
      { celsius: 12, fahrenheit: 54 },
      { celsius: 16, fahrenheit: 61 },
      { celsius: 18, fahrenheit: 64 },
      { celsius: 16, fahrenheit: 61 },
      { celsius: 18, fahrenheit: 64 }
    ];

  public buttonRanges: { celsius: { min: number; max: number; }[], fahrenheit: { min: number; max: number; }[] } = {
      celsius: [
        { min: 2, max: 12 },
        { min: 6, max: 16 },
        { min: 15, max: 18 },
        { min: 12, max: 16 },
        { min: 14, max: 18 }
      ],
      fahrenheit: [
        { min: 36, max: 54 },
        { min: 43, max: 61 },
        { min: 59, max: 64 },
        { min: 54, max: 61 },
        { min: 57, max: 64 }
      ]
    };
  public isFahrenheit: boolean = false;
  public celsius: any; 
  public fahrenheit: any;
  public buttonIndex: number = 0;
  public themes : string[] = ['bootstrap5', 'bootstrap5dark', 'tailwind', 'tailwinddark', 'material', 'materialdark', 'bootstrap4', 'bootstrap', 'bootstrapdark', 'fabric', 'fabricdark', 'highcontrast', 'fluent', 'fluentdark', 'material3', 'material3dark', 'fluent2', 'fluent2highcontrast', 'fluent2dark', 'tailwind3', 'tailwind3dark'];
  public borderColor : string[] = ['#FD7E14', '#FD7E14', '#5A61F6', '#8B5CF6', '#00bdae', '#9ECB08', '#a16ee5', '#a16ee5', '#a16ee5', '#4472c4', '#4472c4', '#79ECE4', '#1AC9E6', '#1AC9E6', '#6355C7', '#4EAAFF', '#6200EE', '#9BB449', '#9BB449', '#2F4074', '#8029F1'];
  public marker: Object = { visible: true, isFilled: true, width: 8, height: 8, dataLabel: { visible: true, position:'Top', font: { fontWeight: "Bold" } } };

  constructor() {
  }

  public onResized(args: IResizeEventArgs): void {
    const maxAnnotationX: number = args.chart.availableSize.width;
    args.chart.annotations[4].x = maxAnnotationX - 50;
    args.chart.annotations[5].x = maxAnnotationX - 50;
    args.chart.annotations[6].x = maxAnnotationX - 50;
  };
  public load(args: ILoadedEventArgs): void {
    loadChartTheme(args);
      const isDarkTheme: Boolean = /dark/i.test(args.chart.theme) || /contrast/i.test(args.chart.theme);
      args.chart.series[0].fill = 'url(#' + args.chart.theme.toLowerCase() + '-gradient-chart)';
      args.chart.series[0].border = { width: 4, color: this.borderColor[this.themes.indexOf(args.chart.theme.toLowerCase())] };
      args.chart.series[0].marker = { fill: this.borderColor[this.themes.indexOf(args.chart.theme.toLowerCase())] };
      args.chart.annotations[3].x = args.chart.theme.indexOf('Tailwind') !== -1 ? 167 : 163;
      const buttons = document.querySelectorAll('.chart-custom-button');
      const buttonContainer = document.getElementById('chart-button-container');
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
      content: '<div id="chart_image"><img src="./assets/chart/images/cloudy.png" alt="Cloud Picture" style="width: 70px; height: 70px"/></div>',
      coordinateUnits: 'Pixel',
      region: 'Chart',
      x: 20,
      y: 40
  },
  {
  content: '<div id="temperature" style="font-size: 50px;">12</div>',
  coordinateUnits: 'Pixel',
  region: 'Chart',
  x: 90,
  y: 30
  },
  {
      content: '<div id="celsius" style="font-size: 17px; vertical-align: super; opacity: 1;">°C | </div>',
      coordinateUnits: 'Pixel',
      region: 'Chart',
      x: 140,
      y: 20
  },
  {
      content: '<div id="fahrenheit" style="font-size: 17px; vertical-align: super; opacity: 0.5;">°F</div>',
      coordinateUnits: 'Pixel',
      region: 'Chart',
      x: 163,
      y: 20
  },
  {
      content: '<div id="days" style="font-size: 15px; text-align:right;">Friday</div>',
      coordinateUnits: 'Pixel',
      region: 'Chart',
      x: 800,
      y: 34
  },
  {
      content: '<div id="weather" style="font-size: 15px; text-align:right;">Sunny</div>',
      coordinateUnits: 'Pixel',
      region: 'Chart',
      x: 800,
      y: 53
  },
  {
      content: '<div id="title" style="font-size: 20px; font-weight: 600">USA, Texas</div>',
      coordinateUnits: 'Pixel',
      region: 'Chart',
      x: 800,
      y: 12
  },
  {
      content: '<div id="text" style="font-size: 11px;"></div>',
      coordinateUnits: 'Pixel',
      region: 'Chart',
      x: 190,
      y: 14
  }
]
public zoomSettings:Object = {
    enableSelectionZooming: false, enablePan: true,
    toolbarItems: [],
    mode: 'X', enableAnimation: true
}

onChartMouseClick(args: IMouseEventArgs) {
  if (this.chart) {
    const activeButton = document.querySelector('.chart-custom-button.active');
    const index = Array.from(document.querySelectorAll('.chart-custom-button')).indexOf(activeButton);

    if (index !== -1 && this.temperatureData[index]) {
      if (this.temperatureData[index]) {
        const tempData = this.temperatureData[index];
        this.celsius = tempData.celsius;
        this.fahrenheit = tempData.fahrenheit;
    }
      const temperatureElement = document.getElementById('temperature');
      const celsiusElement = document.getElementById('celsius');
      const fahrenheitElement = document.getElementById('fahrenheit');

      if (args.target === 'celsius' && temperatureElement) {
        temperatureElement.innerHTML = `<b style="font-size: 50px">${this.celsius}</b>`;
        this.isFahrenheit = false;
        if (celsiusElement) {
          celsiusElement.style.opacity = '1';
        }
        if (fahrenheitElement) {
          fahrenheitElement.style.opacity = '0.5';
        }
        this.chart.series[0].marker.dataLabel.name = 'datalabel';
      } else if (args.target === 'fahrenheit' && temperatureElement) {
        temperatureElement.innerHTML = `<b style="font-size: 50px">${this.fahrenheit}</b>`;
        this.isFahrenheit = true;
        if (celsiusElement) {
          celsiusElement.style.opacity = '0.5';
        }
        if (fahrenheitElement) {
          fahrenheitElement.style.opacity = '1';
        }
        this.chart.series[0].marker.dataLabel.name = 'datalabel1';
      }
  }
  const buttons = document.querySelectorAll('.chart-custom-button .temp');
  buttons.forEach((buttonTempElement, idx) => {
      let minTemp: any;
      let maxTemp: any;

      if (args.target === 'fahrenheit') {
      minTemp = this.buttonRanges.fahrenheit[idx].min;
      maxTemp = this.buttonRanges.fahrenheit[idx].max;
      buttonTempElement.textContent = `${minTemp}°F - ${maxTemp}°F`;
      } else {
      minTemp = this.buttonRanges.celsius[idx].min;
      maxTemp = this.buttonRanges.celsius[idx].max;
      buttonTempElement.textContent = `${minTemp}°C - ${maxTemp}°C`;
      }
});
}
}

  public annotationRender(args: IAnnotationRenderEventArgs): void {
    if (args.content.id === 'container_Annotation_0') {
      args.content.innerHTML = '<div id="chart_cloud" align="center"><img src="./assets/chart/images/' + this.image + '.png" alt="Cloud Picture" style="width: 70px; height: 70px; margin-right: 10px;"/></div>';
    }
    else if (args.content.id === 'container_Annotation_1') {
        var tempDisplay = this.isFahrenheit ? this.temperatureData[this.buttonIndex].fahrenheit : this.temperatureData[this.buttonIndex].celsius;
        args.content.innerHTML = '<div id="temperature"><b align="center" style="font-size: 50px">' + tempDisplay + '<b></div>';
    }
    else if (args.content.id === 'container_Annotation_2') {
        args.content.innerHTML = '<div id="celsius" style="font-size: 17px; vertical-align: super; cursor: pointer; opacity: 1;">°C | </div>';
    }
    else if (args.content.id === 'container_Annotation_3') {
        args.content.innerHTML = '<div id="fahrenheit" style="font-size: 17px; vertical-align: super; cursor: pointer; opacity: 0.5;">°F</div>';
    }
    else if (args.content.id === 'container_Annotation_4') {
        args.content.innerHTML = Browser.isDevice ? '<div id="days" style="text-align: right; font-size: 9px; opacity: 0.7;">' + this.day + '</div>' : '<div id="days" style="text-align: right; font-size: 15px; opacity: 0.7;">' + this.day + '</div>';
    }
    else if (args.content.id === 'container_Annotation_5') {
        args.content.innerHTML = '<div id="weather" style="text-align: right; font-size: 15px; opacity: 0.7;">' + this.weather + '</div>';
    }
    else if (args.content.id === 'container_Annotation_6') {
        args.content.innerHTML = Browser.isDevice ? "<div id='title' style='font-size: 16px; font-weight: 600'>USA, Texas</div>" : "<div id='title' style='font-size: 20px; font-weight: 600'>USA, Texas</div>";
    }
    else {
        args.content.innerHTML = '<div style="text-align:left; opacity: 0.7;">' + 'Rainfall: ' + this.rainfalls + ' mm/hr<br>' + 'Moisture: ' + this.moistureLevels + '%<br>' + 'Breeze: ' + this.breezeSpeeds + ' km/hr' + '</div>';
    }
  }

  public updateChart(buttonId: string, img: string, tempCount: number, chartDay: string, zoomPos: number, zoomFactor: number, rainfall:number, moistureLevel: number, breezeSpeed: any, weatherCondition: string): void {
    this.image = img;
    this.count = tempCount;
    this.day = chartDay;
    this.rainfalls = rainfall;
    this.moistureLevels = moistureLevel;
    this.breezeSpeeds = breezeSpeed;
    this.weather = weatherCondition;
    this.chart.primaryXAxis.zoomPosition = zoomPos;
    this.chart.primaryXAxis.zoomFactor = zoomFactor;
    this.chart.duration = 600;
    const buttons = document.querySelectorAll('.chart-custom-button');
    buttons.forEach(button => button.classList.remove('active'));
    const selectedButton = document.getElementById(buttonId) as HTMLElement;
    selectedButton.classList.add('active');
  }

  public onClick(id: string, img: string, tempCount: number,day:string, zoomPos: number, zoomFactor: number,  rainfall:number, moistureLevel: number, breezeSpeed: any, weatherCondition: string): void {
    if (id == "friday") {
      this.buttonIndex = 0;
    } else if (id == "saturday") {
      this.buttonIndex = 1;
    } else if (id == "sunday") {
      this.buttonIndex = 2;
    } else if (id == "monday") {
      this.buttonIndex = 3;
    } else if (id == "tuesday") {
      this.buttonIndex = 4;
    }
    this.updateChart(id, img, tempCount, day, zoomPos, zoomFactor, rainfall, moistureLevel, breezeSpeed, weatherCondition);
  }
}

interface TemperatureData {
  celsius: number;
  fahrenheit: number;
};
