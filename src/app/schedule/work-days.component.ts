import { Component, ViewChild } from '@angular/core';
import { scheduleData } from './data';
import { extend } from '@syncfusion/ej2-base';
import { ChangeEventArgs, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { ScheduleComponent, EventSettingsModel, View, EventRenderedArgs, WeekService, WorkWeekService, MonthService, TimelineViewsService, TimelineMonthService, ResizeService, WorkHoursModel, DragAndDropService, ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'control-content',
    templateUrl: 'work-days.html',
    providers: [WeekService, MonthService, WorkWeekService, TimelineViewsService,
        TimelineMonthService, ResizeService, DragAndDropService],
    standalone: true,
    imports: [ScheduleModule, DropDownListModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class WorkDaysComponent {
  @ViewChild('scheduleObj') public scheduleObj: ScheduleComponent;

  public selectedDate: Date = new Date(2021, 0, 14);
  public currentView: View = 'WorkWeek';
  public workDays: number[] = [1, 3, 5];
  public workHours: WorkHoursModel = { start: '08:00' };
  public data: Record<string, any>[] = extend([], scheduleData, null, true) as Record<string, any>[];
  public eventSettings: EventSettingsModel = { dataSource: this.data };
  public workDaysData: Record<string, any>[] = [
    { Id: '1,3,5', days: 'Mon, Wed, Fri' },
    { Id: '1,2,3,4,5', days: 'Mon, Tue, Wed, Thu, Fri' },
    { Id: '2,3,4,5', days: 'Tue, Wed, Thu, Fri' },
    { Id: '4,5,6,1,2', days: 'Thu, Fri, Sat, Mon, Tue' }
  ];
  public workDaysValue = '1,3,5';
  public workDaysFields: Record<string, any> = { text: 'days', value: 'Id' };
  public dayOfWeekList: Record<string, any>[] = [
    { Id: '0', date: 'Sunday' },
    { Id: '1', date: 'Monday' },
    { Id: '2', date: 'Tuesday' },
    { Id: '3', date: 'Wednesday' },
    { Id: '4', date: 'Thursday' },
    { Id: '5', date: 'Friday' },
    { Id: '6', date: 'Saturday' }
  ];
  public dayOfWeekValue = '0';
  public dayOfWeekField: Record<string, any> = { text: 'date', value: 'Id' };

  public changeDayOfWeek(e: ChangeEventArgs): void {
    this.scheduleObj.firstDayOfWeek = parseInt(e.value as string, 10);
    this.scheduleObj.dataBind();
  }

  public changeWorkDays(e: ChangeEventArgs): void {
    this.scheduleObj.workDays = e.value.toString().split(',').map(Number);
    this.scheduleObj.dataBind();
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
