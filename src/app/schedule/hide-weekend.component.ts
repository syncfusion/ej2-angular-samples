import { Component, Inject, ViewChild, ViewEncapsulation } from '@angular/core';
import { ButtonComponent, ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { extend } from '@syncfusion/ej2-base';
import { MultiSelectChangeEventArgs, MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';
import { ScheduleComponent, EventSettingsModel, View, DayService, WeekService, MonthService, EventRenderedArgs, TimelineViewsService, TimelineMonthService, WorkHoursModel, ResizeService, DragAndDropService, ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { employeeEventData } from './data';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

/**
 * Sample for Schedule hide weekend
 */
@Component({
    // tslint:disable-next-line:component-selector
    selector: 'control-content',
    templateUrl: 'hide-weekend.html',
    providers: [DayService, WeekService, MonthService, TimelineViewsService, TimelineMonthService, ResizeService, DragAndDropService],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ScheduleModule, MultiSelectModule, ButtonModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class HideWeekEndComponent {
  public selectedDate: Date = new Date(2021, 1, 15);
  public data: Record<string, any>[] = extend([], employeeEventData, null, true) as Record<string, any>[];
  public eventSettings: EventSettingsModel = { dataSource: this.data };
  public workDays: number[] = [1, 3, 4, 5];
  public workHours: WorkHoursModel = { start: '08:00' };
  public showWeekend = false;
  public currentView: View = 'Week';

  @ViewChild('scheduleObj') public scheduleObj: ScheduleComponent;
  @ViewChild('toggleBtn') public toggleBtn: ButtonComponent;

  public workDaysData: Record<string, any>[] = [
    { Name: 'Sunday', Value: '0' },
    { Name: 'Monday', Value: '1' },
    { Name: 'Tuesday', Value: '2' },
    { Name: 'Wednesday', Value: '3' },
    { Name: 'Thursday', Value: '4' },
    { Name: 'Friday', Value: '5' },
    { Name: 'Saturday', Value: '6' }
  ];
  public workDaysFields: Record<string, any> = { text: 'Name', value: 'Value' };
  public workDaysValue: string[] = ['1', '3', '4', '5'];

  constructor(@Inject('sourceFiles') private sourceFiles: any) {
    sourceFiles.files = ['hide-weekend.css'];
  }

  public onMultiSelectChange(args: MultiSelectChangeEventArgs): void {
    const value: number[] = (args.value as number[]).slice(0).map(Number).sort();
    this.scheduleObj.workDays = value.length === 0 ? [0] : value;
    this.scheduleObj.dataBind();
  }

  public btnClick(): void {
    if (this.toggleBtn.element.classList.contains('e-active')) {
      this.scheduleObj.showWeekend = true;
      this.toggleBtn.content = 'Hide';
      this.scheduleObj.dataBind();
    } else {
      this.scheduleObj.showWeekend = false;
      this.toggleBtn.content = 'Show';
      this.scheduleObj.dataBind();
    }
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
