import { Component } from '@angular/core';
import {
  View, EventSettingsModel, DayService, WeekService, WorkWeekService, MonthService, AgendaService
} from '@syncfusion/ej2-angular-schedule';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'control-content',
  templateUrl: 'calendar-integration.html',
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService]
})
export class CalendarIntegrationComponent {
  public readonly = true;
  public currentView: View = 'Month';
  private calendarId = 'en.usa%23holiday@group.v.calendar.google.com';
  private publicKey = 'AIzaSyBgbX_tgmVanBP4yafDPPXxWr70sjbKAXM';
  private dataManger: DataManager = new DataManager({
    url: 'https://www.googleapis.com/calendar/v3/calendars/' + this.calendarId + '/events?key=' + this.publicKey,
    adaptor: new WebApiAdaptor(),
    crossDomain: true
  });
  public eventSettings: EventSettingsModel = { dataSource: this.dataManger };

  public onDataBinding(e: Record<string, any>): void {
    const items: Record<string, any>[] = (e.result as Record<string, Record<string, any>[]>).items;
    const scheduleData: Record<string, any>[] = [];
    if (items.length > 0) {
      for (const event of items) {
        let when: string = event.start.dateTime as string;
        let start: string = event.start.dateTime as string;
        let end: string = event.end.dateTime as string;
        if (!when) {
          when = event.start.date as string;
          start = event.start.date as string;
          end = event.end.date as string;
        }
        scheduleData.push({
          Id: event.id,
          Subject: event.summary,
          StartTime: new Date(start),
          EndTime: new Date(end),
          IsAllDay: !event.start.dateTime
        });
      }
    }
    e.result = scheduleData;
  }
}
