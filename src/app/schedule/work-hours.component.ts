import { Component, ViewChild } from '@angular/core';
import { extend, Internationalization } from '@syncfusion/ej2-base';
import { ScheduleComponent, EventSettingsModel, View, WorkHoursModel, DayService, DragAndDropService, WeekService, WorkWeekService, MonthService, EventRenderedArgs, TimelineViewsService, TimelineMonthService, ResizeService, ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { employeeEventData } from './data';
import { TimePickerComponent, TimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'control-content',
    templateUrl: 'work-hours.html',
    providers: [DayService, WeekService, WorkWeekService, MonthService, TimelineViewsService,
        TimelineMonthService, ResizeService, DragAndDropService],
    standalone: true,
    imports: [ScheduleModule, TimePickerModule, ButtonModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class WorkHoursComponent {
  @ViewChild('scheduleObj') public scheduleObj: ScheduleComponent;
  @ViewChild('startTime') public startTimeObj: TimePickerComponent;
  @ViewChild('endTime') public endTimeObj: TimePickerComponent;

  public selectedDate: Date = new Date(2021, 1, 15);
  public data: Record<string, any>[] = extend([], employeeEventData, null, true) as Record<string, any>[];
  public eventSettings: EventSettingsModel = { dataSource: this.data };
  public workHours: WorkHoursModel = { start: '08:00', end: '20:00' };
  public currentView: View = 'Week';
  public startDate: Record<string, any> = new Date(2000, 0, 1, 8);
  public endDate: Record<string, any> = new Date(2000, 0, 1, 20);
  public instance: Internationalization = new Internationalization();

  public onSubmit(): void {
    this.scheduleObj.workHours.start = this.instance.formatDate(this.startTimeObj.value, { skeleton: 'Hm' });
    this.scheduleObj.workHours.end = this.instance.formatDate(this.endTimeObj.value, { skeleton: 'Hm' });
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

}
