import { Component, ViewChild } from '@angular/core';
import { zooEventsData } from './data';
import { extend } from '@syncfusion/ej2-base';
import { ScheduleComponent, EventSettingsModel, View, EventRenderedArgs, DayService, WeekService, WorkWeekService, MonthService, ResizeService, DragAndDropService, ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'control-content',
    templateUrl: 'views.html',
    providers: [DayService, WeekService, WorkWeekService, MonthService, ResizeService, DragAndDropService],
    standalone: true,
    imports: [ScheduleModule, DropDownListModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class ViewsComponent {
  @ViewChild('scheduleObj') public scheduleObj: ScheduleComponent;

  public selectedDate: Date = new Date(2021, 1, 15);
  public eventSettings: EventSettingsModel = { dataSource: extend([], zooEventsData, null, true) as Record<string, any>[] };
  public scheduleView: View = 'Week';
  public datas: string[] = ['Day', 'Week', 'WorkWeek', 'Month'];

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
