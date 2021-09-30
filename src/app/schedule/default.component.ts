import { Component } from '@angular/core';
import { extend } from '@syncfusion/ej2-base';
import { EventSettingsModel, DayService, WeekService, WorkWeekService, MonthService, AgendaService, ResizeService, DragAndDropService } from '@syncfusion/ej2-angular-schedule';
import { scheduleData } from './data';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'control-content',
  templateUrl: 'default.html',
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, ResizeService, DragAndDropService]
})
export class DefaultComponent {
  public selectedDate: Date = new Date(2021, 0, 10);
  public eventSettings: EventSettingsModel = { dataSource: extend([], scheduleData, null, true) as Record<string, any>[] };
}
