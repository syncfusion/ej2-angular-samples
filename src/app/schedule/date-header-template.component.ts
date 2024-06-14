import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { ScheduleComponent, View, RenderCellEventArgs, EventRenderedArgs, MonthService, DayService, WeekService, WorkWeekService, EventSettingsModel, TimelineMonthService, ResizeService, DragAndDropService, ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { Internationalization, extend } from '@syncfusion/ej2-base';
import { scheduleData } from './data';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

/**
 * Schedule date header template sample
 */

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'control-content',
    templateUrl: 'date-header-template.html',
    styleUrls: ['date-header.style.css'],
    providers: [MonthService, DayService, WeekService, WorkWeekService, TimelineMonthService, ResizeService, DragAndDropService],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ScheduleModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class DateheaderTemplateComponent {
  public scheduleObj: ScheduleComponent;
  public eventSettings: EventSettingsModel = { dataSource: extend([], scheduleData, null, true) as Record<string, any>[] };
  public currentView: View = 'Week';
  public selectedDate: Date = new Date(2021, 0, 10);
  public instance: Internationalization = new Internationalization();

  constructor(@Inject('sourceFiles') private sourceFiles: any) {
    sourceFiles.files = ['date-header.style.css'];
  }

  public getWeatherImage(value: Date): string {
    switch (value.getDay()) {
      case 0:
        return '<img class="weather-image" src="./assets/schedule/images/weather-clear.svg" alt="Clear weather"/><div class="weather-text">25°C</div>';
      case 1:
        return '<img class="weather-image" src="./assets/schedule/images/weather-clouds.svg" alt="Clouds weather"/><div class="weather-text">18°C</div>';
      case 2:
        return '<img class="weather-image" src="./assets/schedule/images/weather-rain.svg"/ alt="Rain weather"><div class="weather-text">10°C</div>';
      case 3:
        return '<img class="weather-image" src="./assets/schedule/images/weather-clouds.svg" alt="Clouds weather"/><div class="weather-text">16°C</div>';
      case 4:
        return '<img class="weather-image" src="./assets/schedule/images/weather-rain.svg" alt="Rain weather"/><div class="weather-text">8°C</div>';
      case 5:
        return '<img class="weather-image" src="./assets/schedule/images/weather-clear.svg" alt="Clear weather"/><div class="weather-text">27°C</div>';
      case 6:
        return '<img class="weather-image" src="./assets/schedule/images/weather-clouds.svg" alt="Clouds weather"/><div class="weather-text">17°C</div>';
      default:
        return null;
    }
  }

  public getDateHeaderText(value: Date): string {
    return this.instance.formatDate(value, { skeleton: 'Ed' });
  }

  public onRenderCell(args: RenderCellEventArgs): void {
    if (args.elementType === 'monthCells' && this.currentView === 'Month') {
      const ele: Element = document.createElement('div');
      ele.innerHTML = this.getWeatherImage(args.date);
      (args.element).appendChild(ele.firstChild);
    }
  }

  public onEventRendered(args: EventRenderedArgs): void {
    const categoryColor: string = args.data.CategoryColor as string;
    if (!args.element || !categoryColor) {
      return;
    }
    if (this.currentView === 'Agenda') {
      (args.element.firstChild as HTMLElement).style.borderLeftColor = categoryColor;
    } else {
      args.element.style.backgroundColor = categoryColor;
    }
  }

}
