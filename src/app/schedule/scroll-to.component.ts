import { Component, ViewChild } from '@angular/core';
import { scheduleData } from './data';
import { extend } from '@syncfusion/ej2-base';
import { ScheduleComponent, EventSettingsModel, View, DayService, WeekService, EventRenderedArgs, TimelineViewsService, ResizeService, DragAndDropService, ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { ChangeEventArgs, TimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'control-content',
    templateUrl: 'scroll-to.html',
    providers: [DayService, WeekService, TimelineViewsService, ResizeService, DragAndDropService],
    standalone: true,
    imports: [ScheduleModule, TimePickerModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class ScrollTimeComponent {
  @ViewChild('scheduleObj') public scheduleObj: ScheduleComponent;

  public data: Record<string, any>[] = extend([], scheduleData, null, true) as Record<string, any>[];
  public selectedDate: Date = new Date(2021, 0, 10);
  public eventSettings: EventSettingsModel = { dataSource: this.data };
  public currentView: View = 'Week';
  public date: Record<string, any> = new Date(2000, 0, 1, 9);

  public onChange(args: ChangeEventArgs): void {
    this.scheduleObj.scrollTo(args.text);
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
