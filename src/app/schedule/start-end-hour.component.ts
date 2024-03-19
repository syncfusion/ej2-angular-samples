import { Component, ViewChild } from '@angular/core';
import { TimePickerComponent, TimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { extend, Internationalization } from '@syncfusion/ej2-base';
import { ScheduleComponent, EventSettingsModel, View, WorkHoursModel, DayService, WeekService, EventRenderedArgs, TimelineViewsService, ResizeService, DragAndDropService, ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { employeeEventData } from './data';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'control-content',
    templateUrl: 'start-end-hour.html',
    providers: [DayService, WeekService, TimelineViewsService, ResizeService, DragAndDropService],
    standalone: true,
    imports: [ScheduleModule, TimePickerModule, ButtonModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class StartEndHourComponent {
  @ViewChild('scheduleObj') public scheduleObj: ScheduleComponent;
  @ViewChild('ejStartTimePicker') public ejStartTimePicker: TimePickerComponent;
  @ViewChild('ejEndTimePicker') public ejEndTimePicker: TimePickerComponent;

  public instance: Internationalization = new Internationalization();
  public selectedDate: Date = new Date(2021, 1, 15);
  public data: Record<string, any>[] = extend([], employeeEventData, null, true) as Record<string, any>[];
  public eventSettings: EventSettingsModel = { dataSource: this.data };
  public currentView: View = 'Week';
  public workHours: WorkHoursModel = { highlight: false };
  public startDate: Record<string, any> = new Date(2000, 0, 1, 8);
  public endDate: Record<string, any> = new Date(2000, 0, 1, 20);
  public startHour = '08:00';
  public endHour = '20:00';

  public onSubmit(): void {
    this.scheduleObj.startHour = this.instance.formatDate(this.ejStartTimePicker.value, { skeleton: 'Hm' });
    this.scheduleObj.endHour = this.instance.formatDate(this.ejEndTimePicker.value, { skeleton: 'Hm' });
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
