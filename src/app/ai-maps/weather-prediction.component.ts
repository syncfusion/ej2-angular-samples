import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { ButtonAllModule, Button } from '@syncfusion/ej2-angular-buttons';
import { MapsAllModule } from '@syncfusion/ej2-angular-maps';
import { getAzureChatAIRequest } from '../../azure-openai';

interface MarkerData {
  latitude: number;
  longitude: number;
  name: string;
  temperature: number;
  weatherCondition: string;
}

@Component({
  selector: 'app-weather-prediction',
  standalone: true,
  imports: [ButtonAllModule, MapsAllModule],
  templateUrl: './weather-prediction.component.html',
  styleUrl: './weather-prediction.component.css'
})

export class WeatherPredictionComponent {
  constructor(@Inject('sourceFiles') private sourceFiles: any) {
    this.sourceFiles.files = [
      'ai-weather-prediction.component.html',
      'weather-prediction.component.css',
    ];
  }
  @ViewChild('maps', { static: false }) map!: ElementRef;
  @ViewChild('tomorrowButton', { static: false }) tomorrowButton!: ElementRef;
  @ViewChild('secondDayButton', { static: false }) secondDayButtonInstance!: ElementRef;
  @ViewChild('thirdDayButton', { static: false }) thirdDayButtonInstance!: ElementRef;
  @ViewChild('fourthDayButton', { static: false }) fourthDayButtonInstance!: ElementRef;
  @ViewChild('fifthDayButton', { static: false }) fifthDayButtonInstance!: ElementRef;
  public height: string = "630px";
  public todayDate: Date = new Date();
  public tomorrow: string = "Tomorrow"
  public secondDay: string = "Second Day";
  public thirdDay: string = "Third Day";
  public fourth: string = "Fourth Day";
  public fifthDay: string = "Fifth Day";
  public secondDayDate: Date = this.addDays(this.todayDate, 2);
  public thirdDayDate: Date = this.addDays(this.todayDate, 3);
  public fourthDayDate: Date = this.addDays(this.todayDate, 4);
  public fifthDayDate: Date = this.addDays(this.todayDate, 5);
  public markerDataSource: MarkerData[] = [];
  public secondDayText: string = this.secondDayDate.toLocaleDateString('en-US', { weekday: 'long' });
  public thirdDayText: string = this.thirdDayDate.toLocaleDateString('en-US', { weekday: 'long' });
  public fourthDayText: string = this.fourthDayDate.toLocaleDateString('en-US', { weekday: 'long' });
  public fifthDayText: string = this.fifthDayDate.toLocaleDateString('en-US', { weekday: 'long' });
  public centerPosition?: object;
  public margin?: object;
  public zoomSettings?: object;
  public tooltipSettings?: object;
  public urlTemplate?: string;
  public markerSettings?: any;
  public annotations?: { content: string; x: string; y: string; zIndex: string }[];
  ngOnInit() {
    this.centerPosition = {
      latitude: 35.07653392014242,
      longitude: -95.40586193773237
    }
    this.margin = {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    }
    this.zoomSettings = {
      enable: false,
      maxZoom: 19,
      zoomFactor: 5,
      toolbarSettings: {
        buttonSettings: {
          toolbarItems: ['Zoom', 'ZoomIn', 'ZoomOut', 'Pan', 'Reset'],
        }
      }
    }
    this.annotations = [
      {
        content: '<div style="display: flex">' +
          '<div style="background-color: dodgerblue; color:white; font-size: 16px; padding:5px 10px 5px; width: max-content;">Weather Forecast</div>' +
          '<div style="background-color: white; color:black; font-size: 16px; padding:5px 10px 5px">Today</div>' +
          '</div>',
        x: '80%',
        y: '0%',
        zIndex: '1'
      }
    ]
    this.urlTemplate = 'https://a.tile.openstreetmap.org/level/tileX/tileY.png';
    this.tooltipSettings = {
      visible: true,
      valuePath: 'name'
    }
    this.markerSettings = [{
      visible: true,
      template: '<div style="display:flex; transform:translate(-50%, -50%)">' +
        '<div style="background-color:black; opacity:0.8; align-content:center; padding-left:5px;padding-right:5px">' +
        '<img class="markerTemplate" src="${weatherImage}" alt="Weather" height="35px" width="35px" />' +
        '</div>' +
        '<div style="background-color:#fff; opacity:0.8; padding-left:5px;padding-right:5px">' +
        '<span style="font-size:12px;font-weight:bold">${city_name}</span><br />' +
        '<span style="font-size:16px;font-weight:bold">${temperature} °C</span>' +
        '</div>' +
        '</div>',
      dataSource: this.markerDataSource,
      animationDuration: 0,
    }]
  }

  private addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(date.getDate() + days);
    return result;
  }

  public getWeatherData(day: string): void {
    let weatherDataRequest;
    let offset: number = 0;
    let buttonInstance: Button;
    if ((day === 'Tomorrow') || (day === 'Second Day') || (day === 'Third Day') || (day === 'Fourth Day') || (day === 'Fifth Day')) {
      if (day === 'Tomorrow') {
        offset = 1;
        buttonInstance = this.tomorrowButton as any;
      } else if (day === 'Second Day') {
        offset = 2;
        buttonInstance = this.secondDayButtonInstance as any;
      } else if (day === 'Third Day') {
        offset = 3;
        buttonInstance = this.thirdDayButtonInstance as any;
      } else if (day === 'Fourth Day') {
        offset = 4;
        buttonInstance = this.fourthDayButtonInstance as any;
      } else if (day === 'Fifth Day') {
        offset = 5;
        buttonInstance = this.fifthDayButtonInstance as any;
      }
      const dateTime = new Date();
      dateTime.setDate(dateTime.getDate() + offset);
      const dayValue = dateTime.getDate().toString();
      const month = (dateTime.getMonth() + 1).toString();
      const year = dateTime.getFullYear().toString();
      const date = `${dayValue}/${month}/${year}`;
      weatherDataRequest = this.generateWeatherRequest(date);
    } else {
      weatherDataRequest = this.generateWeatherRequest('today');
    }
    weatherDataRequest.then((data: any) => {
      if (data) {
        if (data.indexOf('```json') > -1) {
          let cleanedResponseText = data.split('```json')[1].trim();
          data = cleanedResponseText.split("```")[0].trim();
        }
        data = JSON.parse(data);
        this.markerDataSource = data.map((marker: any) => ({
          ...marker,
          weatherImage: this.getWeatherImage(marker.weather_condition)
        }));
        (this.map as any).layers[0].markerSettings[0].dataSource = this.markerDataSource;
        if (buttonInstance) {
          (this.map as any).annotations[0].content = '<div style="display: flex">' +
            '<div style="background-color: dodgerblue; color:white; font-size: 16px; padding:5px 10px 5px; width: max-content;">Weather Forecast</div>' +
            '<div style="background-color: white; color:black; font-size: 16px; padding:5px 10px 5px">' + buttonInstance.content + '</div>' +
            '</div>';
        }
      }
    });
  }

  public generateWeatherRequest(date: string): Promise<any> {
    const prompt = 'Generate ' + date + '\'s temperature in Celsius for 15 important cities in USA as a JSON object, with fields such as "city_name", "temperature", "latitude", "longitude" and "weather_condition". The weather conditions must be sunny day, rainy day, cloudy day, snowy day and foggy day based on the temperature of the state. Strictly provide flat JSON object list alone without nested objects.';
    return getAzureChatAIRequest({ messages: [{ role: 'user', content: prompt }] });
  }

  public getWeatherImage(condition: string): string {
    switch (condition.toLowerCase()) {
      case 'sunny day': return 'https://ej2.syncfusion.com/demos/src/maps/images/weather-clear.png';
      case 'snowy day': return 'weather-snow.svg';
      case 'foggy day': return 'weather-foggy.svg';
      case 'cloudy day': return 'https://ej2.syncfusion.com/demos/src/maps/images/weather-clouds.png';
      case 'rainy day': return 'https://ej2.syncfusion.com/demos/src/maps/images/weather-rain.png';
      default: return 'weather-unknown';
    }
  }

  public onMapsLoaded(): void {
    if (this.markerDataSource.length === 0) {
      this.getWeatherData('Today');
    }
  }
}
