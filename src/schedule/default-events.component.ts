import { Component, ViewChild } from '@angular/core';
import { extend } from '@syncfusion/ej2-base';
import {
  ScheduleComponent, EventSettingsModel, DayService, WeekService, WorkWeekService, MonthService, AgendaService,
  EventRenderedArgs, EventFieldsMapping, ResizeService
} from '@syncfusion/ej2-angular-schedule';
import { DataManager, Query } from '@syncfusion/ej2-data';
import { leaveData } from './datasource';

@Component({
  selector: 'control-content',
  templateUrl: 'default-events.html',
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, ResizeService]
})
export class DefaultEventsComponent {
  public selectedDate: Date = new Date(2018, 1, 15);
  public eventSettings: EventSettingsModel = { dataSource: <Object[]>extend([], leaveData, null, true) };

  @ViewChild('scheduleObj')
  public scheduleObj: ScheduleComponent;

  public onEventRendered(args: EventRenderedArgs): void {
    let categoryColor: string;
    let appData: { [key: string]: Object } = args.data as { [key: string]: Object };
    let eventFields: EventFieldsMapping = this.scheduleObj.eventFields;
    let parentApp: { [key: string]: Object } = <{ [key: string]: Object }>new DataManager(this.scheduleObj.eventsData).
      executeLocal(new Query().where(eventFields.id, 'equal', appData[eventFields.id] as string | number))[0];
    let start: number = new Date(parentApp[eventFields.startTime] as string).setHours(0, 0, 0, 0);
    let end: number = new Date(parentApp[eventFields.endTime] as string).setHours(0, 0, 0, 0);
    if (appData.IsAllDay as boolean) {
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