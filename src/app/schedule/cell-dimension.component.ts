import { Component, Inject, ViewEncapsulation, ViewChild } from '@angular/core';
import { extend } from '@syncfusion/ej2-base';
import { View, EventSettingsModel, EventRenderedArgs, ScheduleComponent, MonthService, DayService, WeekService, WorkWeekService, TimelineViewsService, TimelineMonthService, ResizeService, DragAndDropService, ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { employeeEventData } from './data';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'control-content',
    templateUrl: 'cell-dimension.html',
    styleUrls: ['cell-dimension.style.css'],
    // tslint:disable-next-line:max-line-length
    providers: [MonthService, DayService, WeekService, WorkWeekService, TimelineViewsService, TimelineMonthService, ResizeService, DragAndDropService],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ScheduleModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class CellDimensionComponent {
  @ViewChild('scheduleObj')
  public scheduleObj: ScheduleComponent;
  public data: Record<string, any>[] = extend([], employeeEventData, null, true) as Record<string, any>[];
  public currentView: View = 'Week';
  public selectedDate: Date = new Date(2021, 1, 15);
  public eventSettings: EventSettingsModel = { dataSource: this.data };
  public showTimeIndicator = false;

  constructor(@Inject('sourceFiles') private sourceFiles: any) {
    sourceFiles.files = ['cell-dimension.style.css'];
  }

  public onEventRendered(args: EventRenderedArgs): void {
    const categoryColor: string = args.data.CategoryColor as string;
    if (!args.element || !categoryColor) {
      return;
    }
    if (this.currentView === 'Agenda') {
      (args.element.firstChild as HTMLElement).style.borderLeftColor = categoryColor;
    } else {
      args.element.style.backgroundColor = categoryColor;
    }
  }

}
