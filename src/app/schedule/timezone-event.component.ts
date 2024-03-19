import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { extend } from '@syncfusion/ej2-base';
import { DropDownListComponent, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { Timezone, WorkHoursModel } from '@syncfusion/ej2-schedule';
import { EventSettingsModel, View, EventRenderedArgs, ScheduleComponent, DayService, WeekService, WorkWeekService, MonthService, AgendaService, ResizeService, DragAndDropService, ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { fifaEventsData } from './data';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
declare var moment: any;

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'control-content',
    templateUrl: 'timezone-event.html',
    styleUrls: ['timezone-event.style.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, ResizeService, DragAndDropService],
    standalone: true,
    imports: [DropDownListModule, ScheduleModule, SBActionDescriptionComponent, SBDescriptionComponent]
})

export class TimezoneComponent {
  @ViewChild('scheduleObj') public scheduleObj: ScheduleComponent;
  @ViewChild('timezoneDropdown') public timezoneDropdownObj: DropDownListComponent;

  public fifaEvents: Record<string, any>[] = extend([], fifaEventsData, null, true) as Record<string, any>[];
  public selectedDate: Date = new Date(2021, 5, 20);
  public eventSettings: EventSettingsModel;
  public workHours: WorkHoursModel = { start: '11:00' };
  public currentView: View = 'Week';

  public timezoneData: Record<string, any>[] = [
    { timezone: 'America/New_York', text: '(UTC-05:00) Eastern Time' },
    { timezone: 'UTC', text: 'UTC' },
    { timezone: 'Europe/Moscow', text: '(UTC+03:00) Moscow+00 - Moscow' },
    { timezone: 'Asia/Kolkata', text: '(UTC+05:30) India Standard Time' },
    { timezone: 'Australia/Perth', text: '(UTC+08:00) Western Time - Pert' }
  ];
  public fields: Record<string, any> = { text: 'text', value: 'timezone' };
  public dropDownValue = 'UTC';

  constructor() {
    const timezone: Timezone = new Timezone();     // Here remove the local offset from events
    for (const fifaEvent of this.fifaEvents) {
      fifaEvent.StartTime = timezone.removeLocalOffset(fifaEvent.StartTime as Date);
      fifaEvent.EndTime = timezone.removeLocalOffset(fifaEvent.EndTime as Date);
    }
    if (/MSIE \d|Trident.*rv:/.test(navigator.userAgent)) {
      Timezone.prototype.offset = (date: Date, timezoneOffset: string): number => {
        return moment.tz.zone(timezoneOffset).utcOffset(date.getTime());
      };
    }
    this.eventSettings = { dataSource: this.fifaEvents };
  }

  public onEventRendered(args: EventRenderedArgs): void {
    const categoryColor: string = args.data.CategoryColor as string;
    if (!args.element || !categoryColor) {
      return;
    }
    if (this.scheduleObj.currentView === 'Agenda') {
      (args.element.firstChild as HTMLElement).style.borderLeftColor = categoryColor;
    } else {
      args.element.style.backgroundColor = categoryColor;
    }
  }

  public onTimezoneDropDownChange(args: any): void {
    this.scheduleObj.timezone = this.timezoneDropdownObj.value.toString();
  }

}
