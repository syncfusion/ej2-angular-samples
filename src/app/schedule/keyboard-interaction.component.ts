import { Component, ViewChild } from '@angular/core';
import { scheduleData } from './data';
import { extend } from '@syncfusion/ej2-base';
import { ScheduleComponent, EventSettingsModel, EventRenderedArgs, DayService, WeekService, WorkWeekService, MonthService, AgendaService, ResizeService, DragAndDropService, ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'control-content',
    templateUrl: 'keyboard-interaction.html',
    providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, ResizeService, DragAndDropService],
    standalone: true,
    imports: [ScheduleModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class KeyboardComponent {
  @ViewChild('scheduleObj') public scheduleObj: ScheduleComponent;

  public data: Record<string, any>[] = extend([], scheduleData, null, true) as Record<string, any>[];
  public selectedDate: Date = new Date(2021, 0, 15);
  public eventSettings: EventSettingsModel = { dataSource: this.data };

  constructor() {
    document.body.addEventListener('keydown', (e: KeyboardEvent) => {
      const scheduleElement: HTMLElement = document.getElementById('Schedule');
      if (e.altKey && e.keyCode === 74 && scheduleElement) {
        scheduleElement.focus();
      }
    });
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
