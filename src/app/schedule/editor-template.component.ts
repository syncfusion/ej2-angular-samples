import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { extend, isNullOrUndefined } from '@syncfusion/ej2-base';
import { EventRenderedArgs, ScheduleComponent, MonthService, DayService, WeekService, WorkWeekService, EventSettingsModel, ResizeService, DragAndDropService, ActionEventArgs, ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { ChangeEventArgs } from '@syncfusion/ej2-calendars';
import { doctorsEventData } from './data';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { SBDescriptionComponent } from '../common/dp.component';
import { DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

/**
 * Schedule editor template sample
 */

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'control-content',
    templateUrl: 'editor-template.html',
    styles: [`
    .custom-event-editor .e-textlabel {
        padding-right: 15px;
        text-align: right;
    }

    .custom-event-editor td {
        padding: 7px;
        padding-right: 16px;
    }`],
    providers: [MonthService, DayService, WeekService, WorkWeekService, ResizeService, DragAndDropService],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ScheduleModule, NgIf, DropDownListModule, DateTimePickerModule, SBDescriptionComponent, SBActionDescriptionComponent, FormsModule ]
})
export class EditTempComponent {
  @ViewChild('scheduleObj')
  public scheduleObj: ScheduleComponent;
  public eventSettings: EventSettingsModel = {
    dataSource: extend([], doctorsEventData, null, true) as Record<string, any>[], fields: {
      startTime: { name: 'StartTime', validation: { required: true } },
      endTime: { name: 'EndTime', validation: { required: true } }
    }
  };
  public selectedDate: Date = new Date(2021, 1, 15);
  public showQuickInfo = false;
  public startDate: Date;
  public endDate: Date;
  public statusData: string[] = ['New', 'Requested', 'Confirmed'];

  public onPopupOpen(args: any): void {
    if (args.type === 'Editor' && !isNullOrUndefined(args.data)) {
      this.startDate = args.data.StartTime;
      this.endDate = args.data.EndTime;
    }
  }

  public onDateChange(args: ChangeEventArgs): void {
    if (!isNullOrUndefined(args.event)) {
      if (args.element.id === "StartTime") {
        this.startDate = args.value;
      } else if (args.element.id === "EndTime") {
        this.endDate = args.value;
      }
    }
  }
  public onPopupClose() {
    this.startDate = null;
    this.endDate = null;
  }

  public onEventRendered(args: EventRenderedArgs): void {
    switch (args.data.EventType) {
      case 'Requested':
        (args.element as HTMLElement).style.backgroundColor = '#F57F17';
        break;
      case 'Confirmed':
        (args.element as HTMLElement).style.backgroundColor = '#7fa900';
        break;
      case 'New':
        (args.element as HTMLElement).style.backgroundColor = '#8e24aa';
        break;
    }
  }

  public onActionBegin(args: ActionEventArgs): void {
    if (args.requestType === 'eventCreate' || args.requestType === 'eventChange') {
      const data: Record<string, any> = args.data instanceof Array ? args.data[0] : args.data;
      if (!this.scheduleObj.isSlotAvailable(data.StartTime as Date, data.EndTime as Date)) {
        args.cancel = true;
      }
    }
  }

}
