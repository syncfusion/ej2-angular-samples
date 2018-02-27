import { Component, ViewChild } from '@angular/core';
import { extend } from '@syncfusion/ej2-base';
import { ScheduleComponent, EventSettingsModel } from '@syncfusion/ej2-ng-schedule';
import { DayService, WeekService, WorkWeekService, MonthService, AgendaService, EventRenderedArgs, } from '@syncfusion/ej2-ng-schedule';
import { leaveData } from './datasource';

@Component({
  templateUrl: 'default-events.html',
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService]
})
export class DefaultEventsComponent {
  public selectedDate: Date = new Date(2018, 1, 15);
  public eventSettings: EventSettingsModel = { dataSource: <Object[]>extend([], leaveData, null, true) };;

  @ViewChild('scheduleObj')
  public scheduleObj: ScheduleComponent;

  public onEventRendered(args: EventRenderedArgs): void {
    let categoryColor: string;
    let start: number = new Date(args.data.StartTime as string).setHours(0, 0, 0, 0);
    let end: number = new Date(args.data.EndTime as string).setHours(0, 0, 0, 0);
    if (args.data.IsAllDay as boolean) {
      categoryColor = '#8e24aa';
    } else if (start !== end) {
      categoryColor = '#f57f17';
    } else {
      categoryColor = '#7fa900';
    }
    if (this.scheduleObj.currentView === 'Agenda') {
      (args.element.firstChild as HTMLElement).style.borderLeftColor = categoryColor;
    } else {
      args.element.style.backgroundColor = categoryColor;
    }
  }
}