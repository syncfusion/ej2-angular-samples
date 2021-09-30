import { Component, ViewChild } from '@angular/core';
import { recurrenceData } from './data';
import { extend } from '@syncfusion/ej2-base';
import {
  ScheduleComponent, EventSettingsModel, EventRenderedArgs, View, DayService,
  WeekService, MonthService, ResizeService, DragAndDropService
} from '@syncfusion/ej2-angular-schedule';
import { ChangeEventArgs } from '@syncfusion/ej2-buttons';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'control-content',
  templateUrl: 'recurrence-events.html',
  providers: [DayService, WeekService, MonthService, ResizeService, DragAndDropService]
})
export class RecurrenceComponent {
  public data: Record<string, any>[] = extend([], recurrenceData, null, true) as Record<string, any>[];
  public selectedDate: Date = new Date(2021, 1, 20);
  public eventSettings: EventSettingsModel = { dataSource: this.data };
  public currentView: View = 'Week';
  @ViewChild('scheduleObj') public scheduleObj: ScheduleComponent;

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

  public onChange(args: ChangeEventArgs): void {
    this.scheduleObj.eventSettings.editFollowingEvents = args.checked;
  }

}
