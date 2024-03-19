import { Component, ViewChild } from '@angular/core';
import { fifaEventsData } from './data';
import { extend } from '@syncfusion/ej2-base';
import { EventSettingsModel, EventRenderedArgs, ScheduleComponent, MonthService, DayService, WeekService, ResizeService, DragAndDropService, ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'control-content',
    templateUrl: 'extended-views.html',
    providers: [MonthService, DayService, WeekService, ResizeService, DragAndDropService],
    standalone: true,
    imports: [ScheduleModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class ExtendedViewsComponent {
  public data: Record<string, any>[] = extend([], fifaEventsData, null, true) as Record<string, any>[];
  public selectedDate: Date = new Date(2021, 5, 16);
  public eventSettings: EventSettingsModel = { dataSource: this.data };
  public isSelected = true;
  public dayInterval = 3;
  public weekInterval = 2;
  public monthInterval = 4;
  @ViewChild('scheduleObj') public scheduleObj: ScheduleComponent;

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
