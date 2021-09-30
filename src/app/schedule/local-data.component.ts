import { Component } from '@angular/core';
import { zooEventsData } from './data';
import { extend } from '@syncfusion/ej2-base';
import {
  EventSettingsModel, View, EventRenderedArgs, DayService, WeekService, WorkWeekService,
  MonthService, AgendaService, ResizeService, DragAndDropService
} from '@syncfusion/ej2-angular-schedule';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'control-content',
  templateUrl: 'local-data.html',
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, ResizeService, DragAndDropService]
})
export class LocalDataComponent {
  public data: Record<string, any>[] = extend([], zooEventsData, null, true) as Record<string, any>[];
  public selectedDate: Date = new Date(2021, 1, 15);
  public eventSettings: EventSettingsModel = { dataSource: this.data };
  public currentView: View = 'Week';

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
