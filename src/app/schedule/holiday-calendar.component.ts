import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { holidayList, scheduleEvent } from './data';
import { extend } from '@syncfusion/ej2-base';
import {
  ScheduleComponent, EventSettingsModel, EventRenderedArgs, DayService, WeekService, WorkWeekService, MonthService, ResizeService,
  DragAndDropService, ActionEventArgs, CellClickEventArgs, ScheduleModule
} from '@syncfusion/ej2-angular-schedule';
import { ChangeEventArgs, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { ToastComponent, ToastPositionModel, ToastModule } from '@syncfusion/ej2-angular-notifications'
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'control-content',
  templateUrl: 'holiday-calendar.html',
  styles: [`
    .schedule-holiday-calendar.e-schedule .e-appointment.e-read-only .e-appointment-details .e-subject.e-text-center {
      text-align: left;
    }`],
  encapsulation: ViewEncapsulation.None,
  providers: [DayService, WeekService, WorkWeekService, MonthService, ResizeService, DragAndDropService],
  standalone: true,
  imports: [ScheduleModule, ToastModule, CheckBoxModule, SBActionDescriptionComponent, SBDescriptionComponent]
})

export class HolidayCalendarComponent {

  @ViewChild('scheduleObj') public scheduleObj: ScheduleComponent;
  @ViewChild('toastpos') public toastObj: ToastComponent;

  public data: Record<string, any>[] = extend([], scheduleEvent, null, true) as Record<string, any>[];
  public holidayList: Record<string, any>[] = extend([], holidayList, null, true) as Record<string, any>[];

  public selectedDate: Date = new Date(2024, 7, 5);
  public eventSettings: EventSettingsModel = {
    dataSource: this.data.concat(this.holidayList),
  };

  public toastPosition: ToastPositionModel = { X: 'Right', Y: 'Top' };
  public target: string = '.e-schedule';

  public holidayEventCollection: boolean = true;
  public holidayListCollection: boolean = true;

  public updateHolidayEventCollection(args: ChangeEventArgs) {
    this.holidayEventCollection = args.checked as boolean;
    this.scheduleObj.refreshEvents();
  }

  public updateHolidayListCollection(args: ChangeEventArgs) {
    this.holidayListCollection = args.checked as boolean;
    this.scheduleObj.refreshEvents();
  }

  public isEventWithinHolidayRange(eventStartDate: Date, eventEndDate: Date) {
    let isInRange: boolean = false;
    for (let holiday of this.holidayList) {
      const holidayStartDate: Date = new Date(holiday.StartTime);
      const holidayEndDate: Date = new Date(holiday.EndTime);
      if (
        (eventStartDate >= holidayStartDate &&
          eventStartDate <= holidayEndDate) ||
        (eventEndDate >= holidayStartDate && eventEndDate <= holidayEndDate) ||
        (eventStartDate <= holidayStartDate && eventEndDate >= holidayEndDate)
      ) {
        isInRange = true;
        break;
      }
    }
    return isInRange;
  }

  public showToastForAction(actionName: string, holidayDateRange: boolean) {
    if (!holidayDateRange) return;
    const messages: { [key: string]: string } = {
      resizeStop: 'You cannot resize an event within the holiday date range',
      dragStop: 'You cannot drop an event within the holiday date range',
      eventCreate: 'You cannot add an event within the holiday date range',
      eventChange: 'You cannot edit an event within the holiday date range',
    };
    if (messages[actionName]) {
      this.toastObj.content = messages[actionName];
      this.toastObj.show();
    }
  }

  public onActionBegin(args: ActionEventArgs) {
    const { requestType, data } = args;
    const isCreateOrChange = requestType === 'eventCreate' || requestType === 'eventChange';
    if (isCreateOrChange) {
      const eventData = requestType === 'eventCreate' ? (data as any[])[0] : (data as any);
      const adjustedEndTime = eventData.IsAllDay
        ? new Date(eventData.EndTime.setMinutes(eventData.EndTime.getMinutes() - 1))
        : eventData.EndTime;
      const isHolidayDateRange = !this.holidayEventCollection &&
        !eventData.RecurrenceRule &&
        this.isEventWithinHolidayRange(eventData.StartTime, adjustedEndTime);
      args.cancel = isHolidayDateRange;
      this.showToastForAction(requestType, isHolidayDateRange);
    }
  }

  public onEventRendered(args: EventRenderedArgs) {
    const event = args.data;
    if (!this.holidayEventCollection) {
      if (!event.isHoliday && event.IsAllDay) {
        event.EndTime.setMinutes(event.EndTime.getMinutes() - 1);
      }
      args.cancel = !event.isHoliday && this.isEventWithinHolidayRange(event.StartTime, event.EndTime);
    }
    if (event.isHoliday && !this.holidayListCollection) {
      args.cancel = true;
    }
    args.element.style.backgroundColor = event.CategoryColor;
  }

  public clickOnHoliday(args: CellClickEventArgs) {
    args.cancel = !this.holidayEventCollection && this.isEventWithinHolidayRange(
      args.startTime,
      args.endTime.setMinutes(args.endTime.getMinutes() - 1) as any);
  }

  public onEventDragOrResize(args: any) {
    const isHolidayDateRange = !this.holidayEventCollection && this.isEventWithinHolidayRange(
      args.data.StartTime, args.data.EndTime.setMinutes(args.data.EndTime.getMinutes() - 1) as any);
    args.cancel = isHolidayDateRange;
    this.showToastForAction(args.name, isHolidayDateRange);
  }

}
